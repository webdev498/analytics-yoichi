import {USER_DETAILS_LOADING, USER_DETAILS_LOADED, USER_DETAILS_ERROR, SET_COOKIES} from 'Constants';
import {baseUrl} from 'config';

import {
  userDetailsLoading,
  userDetailsLoaded,
  userDetailsError,
  setCookies
} from 'actions/auth';

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
});
