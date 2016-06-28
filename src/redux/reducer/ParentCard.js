import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA,
  ERROR_API_DATA,
  TIME_INTERVAL_UPDATE
} from 'Constants';

import {Map, fromJS} from 'immutable';

const initialState = fromJS({duration: '1h', components: {}});

export default function APIDataReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_API_DATA: {
      const {id} = action;
      const dataMap = Map({
        id,
        isFetching: true,
        isError: false
      });

      return state.updateIn(['components'], val => val.set(id, dataMap));
    }
    case RECEIVE_API_DATA: {
      const {id, data} = action,
        {json, api, query} = data;

      let newState;
      const dataMap = Map({
        id,
        isFetching: false,
        isError: false,
        data: json,
        api,
        query
      });

      newState = state.updateIn(['components'], val => val.set(id, dataMap));

      return newState;
    }
    case ERROR_API_DATA: {
      const {id, errorData} = action;

      const dataMap = Map({
        id,
        isFetching: false,
        isError: true,
        errorData
      });

      return state.updateIn(['components'], val => val.set(id, dataMap));
    }
    case TIME_INTERVAL_UPDATE: {
      const {data: duration} = action;
      return state.set('duration', duration);
    }
    default: {
      return state;
    }
  }
}
