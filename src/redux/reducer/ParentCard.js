import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA,
  ERROR_API_DATA,
  TIME_INTERVAL_UPDATE,
  PARENT_CARD_EVENT,
  REMOVE_COMPONENT
} from 'Constants';

import {Map, fromJS} from 'immutable';

const duration = window.localStorage.rankDuration || '1h';
const initialState = fromJS({duration, components: {}});

function requestApi(id, state) {
  const dataMap = Map({
    id,
    isFetching: true,
    data: null,
    isError: false
  });

  return state.updateIn(['components'], val => val.set(id, dataMap));
}

function receiveApi(id, state, action) {
  const {data} = action,
    {json, api, query} = data;

  const dataMap = Map({
    id,
    isFetching: false,
    isError: false,
    data: json,
    api,
    query
  });

  return state.updateIn(['components'], val => val.set(id, dataMap));
}

function errorApi(id, state, action) {
  const {errorData, api} = action;

  const dataMap = Map({
    id,
    isFetching: false,
    isError: true,
    errorData,
    api
  });

  return state.updateIn(['components'], val => val.set(id, dataMap));
}

function apiStates(state, action, fn) {
  let {id} = action;
  id = id.split(',');

  id.forEach(currentId => {
    state = fn(currentId, state, action);
  });

  return state;
}

export default function APIDataReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_API_DATA: {
      return apiStates(state, action, requestApi);
    }
    case RECEIVE_API_DATA: {
      return apiStates(state, action, receiveApi);
    }
    case ERROR_API_DATA: {
      return apiStates(state, action, errorApi);
    }
    case TIME_INTERVAL_UPDATE: {
      const {data: duration} = action;
      window.localStorage.rankDuration = duration;
      return state.set('duration', duration);
    }
    case REMOVE_COMPONENT: {
      const {id} = action;
      return state.deleteIn(['components', id]);
    }
    case PARENT_CARD_EVENT: {
      const {id, eventData} = action;

      if (state.hasIn(['components', id])) {
        return state.updateIn(['components', id], value => {
          const newValue = value.set('eventData', eventData);
          return newValue;
        });
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
