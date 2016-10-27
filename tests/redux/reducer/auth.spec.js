import {USER_DETAILS_LOADING, USER_DETAILS_LOADED, USER_DETAILS_ERROR} from 'Constants';

import {
  default as authReducer
} from 'redux/reducer/auth';

describe('Redux Auth Reducer', function() {
  it('Should be a function.', function() {
    expect(authReducer).to.be.a('function');
  });

  it('Should initialize with a state of {isLoading: true, isError: false}.', function() {
    expect(authReducer(undefined, {})).to.deep.equal({isLoading: true, isError: false, sidebar: []});
  });

  it('Should return the previous state if an action was not matched.', function() {
    let state = authReducer(undefined, {});
    expect(state).to.deep.equal({isLoading: true, isError: false, sidebar: []});
    state = authReducer(state, {type: '@@@@@@@'});
    expect(state).to.deep.equal({isLoading: true, isError: false, sidebar: []});

    const errorData = {msg: 'error'};
    state = authReducer(state, {
      type: USER_DETAILS_ERROR,
      errorData
    });
    expect(state).to.deep.equal({isLoading: false, isError: true, errorData, sidebar: []});

    state = authReducer(state, {type: '@@@@@@@'});
    expect(state).to.deep.equal({isLoading: false, isError: true, errorData, sidebar: []});
  });

  it('Should update the state with isLoading propery for "USER_DETAILS_LOADING" action.', function() {
    let state;
    state = authReducer(state, {
      type: USER_DETAILS_LOADING
    });
    expect(state).to.deep.equal({isLoading: true, isError: false, sidebar: []});
  });

  it('Should update the state with user info for "USER_DETAILS_LOADED" action.', function() {
    let state;
    const application = {},
      roles = {},
      user = {},
      sidebar = [];

    state = authReducer(state, {
      type: USER_DETAILS_LOADED,
      data: {
        __authDetails: {application, roles, user},
        taf: {sidebar}
      }
    });

    expect(state).to.deep.equal({
      isLoading: false,
      isError: false,
      application,
      roles,
      user,
      sidebar
    });
  });

  it('Should update the state with error msg for "USER_DETAILS_ERROR" action.', function() {
    let state;

    const errorData = {msg: 'error'};
    state = authReducer(state, {
      type: USER_DETAILS_ERROR,
      errorData
    });
    expect(state).to.deep.equal({isLoading: false, isError: true, sidebar: [], errorData});
  });
});
