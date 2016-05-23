import {REQUEST_API_DATA, RECEIVE_API_DATA, ERROR_API_DATA} from 'Constants';

import {Map, fromJS} from 'immutable';

const initialState = fromJS({components: {}});

export default function APIDataReducer(state = initialState, action) {
  const actionType = action.type;
  switch (actionType) {
    case REQUEST_API_DATA: {
      const {id} = action;
      const dataMap = Map({
        id,
        isFetching: true,
        data: null,
        isError: false
      });

      const newState = state.updateIn(['components'], val => val.set(id, dataMap));
      return newState;
    }
    case RECEIVE_API_DATA: {
      const {id, data} = action;

      const newState = state.updateIn(['components', id], value => {
        return value.set('isFetching', false)
                    .set('isError', false)
                    .set('data', data);
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
    default: {
      return state;
    }
  }
}