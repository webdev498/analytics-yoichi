import {
  REQUEST_LAYOUT_DATA,
  RECEIVE_LAYOUT_DATA,
  ERROR_LAYOUT_DATA
} from 'Constants';

import {Map, fromJS} from 'immutable';

const initialState = fromJS({});

export default function PageDataReducer(state = initialState, action) {
  const actionType = action.type;
  switch (actionType) {
    case REQUEST_LAYOUT_DATA: {
      const {id} = action;
      if (state.has(id)) {
        return state.update(id, value => {
          return value.set('isFetching', true)
                    .set('isError', false)
                    .set('layout', [])
                    .set('errorData', null);
        });
      }
      else {
        const dataMap = Map({
          id,
          isFetching: true,
          isError: false
        });

        return state.set(id, dataMap);
      }
    }
    case RECEIVE_LAYOUT_DATA: {
      const {id, data} = action;

      return state.update(id, value => {
        return value.set('isFetching', false)
                    .set('isError', false)
                    .set('layout', data.json.layout)
                    .set('errorData', null);
      });
    }
    case ERROR_LAYOUT_DATA: {
      const {id, errorData} = action;

      const newState = state.update(id, value => {
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
