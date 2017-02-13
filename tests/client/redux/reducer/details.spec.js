import {
  REQUEST_DETAILS_API_DATA,
  RECEIVE_DETAILS_API_DATA,
  ERROR_DETAILS_API_DATA,
  REMOVE_DETAILS_COMPONENT
} from 'Constants';

import detailsDataReducer from 'redux/reducer/details';

import { Map } from 'immutable';

const initialState = Map();

describe('details Reducer', function() {
  it('Should be a function.', function() {
    expect(detailsDataReducer).to.be.a('function');
  });
});
