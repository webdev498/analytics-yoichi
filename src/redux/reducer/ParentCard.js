import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA,
  ERROR_API_DATA,
  TIME_INTERVAL_UPDATE
} from 'Constants';

import {Map, fromJS} from 'immutable';

const initialState = fromJS({duration: '1h', components: {}});

export default function APIDataReducer(state = initialState, action) {
  const actionType = action.type;
  switch (actionType) {
    case REQUEST_API_DATA: {
      const {id} = action;

      if (state.hasIn(['components', id])) {
        return state.updateIn(['components', id], value => {
          return value.set('isFetching', true)
                      .set('isError', false);
        });
      }
      else {
        const dataMap = Map({
          id,
          isFetching: true,
          isError: false
        });

        return state.updateIn(['components'], val => val.set(id, dataMap));
      }
    }
    case RECEIVE_API_DATA: {
      const {id, data} = action;

      const newState = state.updateIn(['components', id], value => {
        return value.set('isFetching', false)
                    .set('isError', false)
                    .set('data', data.json)
                    .set('api', data.api)
                    .set('query', data.query);
      });

      return newState;
    }
    case ERROR_API_DATA: {
      const {id, errorData} = action;

      const newState = state.updateIn(['components', id], value => {
        return value.set('isFetching', false)
                    .set('isError', true)
                    .set('errorData', errorData);
      });

      return newState;
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
