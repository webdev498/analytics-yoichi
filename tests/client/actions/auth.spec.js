import {USER_DETAILS_LOADING, USER_DETAILS_LOADED, USER_DETAILS_ERROR, SET_COOKIES} from 'Constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {baseUrl} from 'config';

import {
  userDetailsLoading,
  userDetailsLoaded,
  userDetailsError,
  setCookies,
  isLoggedIn
} from 'actions/auth';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
describe('auth actions', () => {
  it('should return USER_DETAILS_LOADING state', () => {
    const state = userDetailsLoading();
    expect(state).to.be.an.object;
    expect(state).to.have.a.property('type', USER_DETAILS_LOADING);
  });

  it('should return USER_DETAILS_LOADED state', () => {
    const data = {test: 1},
      state = userDetailsLoaded(data);
    expect(state).to.be.an.object;
    expect(state).to.have.a.property('type', USER_DETAILS_LOADED);
    expect(state).to.have.a.property('data', data);
  });

  it('should return USER_DETAILS_ERROR state', () => {
    const errorData = {test: 1},
      state = userDetailsError(errorData);

    expect(state).to.be.an.object;
    expect(state).to.have.a.property('type', USER_DETAILS_ERROR);
    expect(state).to.have.a.property('errorData', errorData);
  });

  it('should return SET_COOKIES state', () => {
    const cookies = {test: 1},
      state = setCookies(cookies);

    expect(state).to.be.an.object;
    expect(state).to.have.a.property('type', SET_COOKIES);
    expect(state).to.have.a.property('data', cookies);
  });

  // context('fetchUserData function');

  context('isLoggedIn function', () => {
    let store;
    beforeEach(() => {
      store = mockStore({});
    });

    it('should return undefined, if the cookies are not set, and location does not have hash', () => {
      const location = {},
        flag = isLoggedIn(location, store);

      expect(flag).to.be.undefined;
    });

    it('should return false, if hash does not have either access_token or token_type', () => {
      let location = {hash: '#a=test'},
        flag = isLoggedIn(location, store);
      expect(flag).to.be.false;

      location = {hash: '#access_token=test'};
      flag = isLoggedIn(location, store);
      expect(flag).to.be.false;

      location = {hash: '#token_type=test'};
      flag = isLoggedIn(location, store);
      expect(flag).to.be.false;
    });

    it('should return true, if hash has access_token and token_type and should set the cookies', () => {
      let location = {hash: '#access_token=test&token_type=test'},
        flag = isLoggedIn(location, store);
      expect(flag).to.be.true;

      let actions = store.getActions();
      expect(actions).to.have.length(1);
      const action = actions[0];
      expect(action).to.have.a.property('type', SET_COOKIES);
      expect(action).to.have.a.property('data');
      expect(action.data).to.be.an.object;
    });

    it('should dispatch SET_COOKIES, when hash is not provided', () => {
      let location = {};
      isLoggedIn(location, store);

      let actions = store.getActions();
      expect(actions).to.have.length(1);

      const action = actions[0];
      expect(action).to.have.a.property('type', SET_COOKIES);
      expect(action).to.have.a.property('data');
      expect(action.data).to.be.an.object;
    });
  });

  // context('logoutUtil function');

  // context('logout function');
});
