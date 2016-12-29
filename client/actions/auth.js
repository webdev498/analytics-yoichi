import Cookies from 'cookies-js';
import {USER_DETAILS_LOADING, USER_DETAILS_LOADED, USER_DETAILS_ERROR, SET_COOKIES} from 'Constants';
import {baseUrl} from 'config';

import { push } from 'react-router-redux';

import {parseQuery} from 'utils/utils';

export function userDetailsLoading() {
  return {
    type: USER_DETAILS_LOADING
  };
}

export function userDetailsLoaded(data) {
  return {
    type: USER_DETAILS_LOADED,
    data
  };
}

export function userDetailsError(errorData) {
  return {
    type: USER_DETAILS_ERROR,
    errorData
  };
}

export function setHeaders(cookies) {
  return {
    type: SET_COOKIES,
    data: cookies
  };
}

export function fetchUserData() {
  return function(dispatch, getState) {
    const cookies = getState().auth.cookies,
      accessToken = cookies.access_token,
      tokenType = cookies.token_type,
      authorizationHeader = {
        'Authorization': `${tokenType} ${accessToken}`
      };

    dispatch(userDetailsLoading());

    return fetch(baseUrl + '/api/user/profile', {
      method: 'GET',
      headers: authorizationHeader
    })
    .then(response => response.json())
    .then(json => {
      dispatch(userDetailsLoaded(json));
    })
    .catch(ex => {
      dispatch(userDetailsError(ex));
    });
  };
}

export function isLoggedIn(location, store) {
  let hash = location && location.hash;

  if (hash) {
    const query = parseQuery(hash),
      accessToken = query['access_token'],
      tokenType = query['token_type'];

    Cookies.set('access_token', accessToken, { path: '/' });
    Cookies.set('token_type', tokenType, { path: '/' });

    store.dispatch(setHeaders({
      'access_token': accessToken,
      'token_type': tokenType
    }));

    return true;
  }
  else {
    store.dispatch(setHeaders({
      'access_token': Cookies.get('access_token'),
      'token_type': Cookies.get('token_type')
    }));
  }

  return Cookies.get('access_token') && Cookies.get('token_type');
}

export function logoutUtil(dispatch) {
  // delete the auth cookies
  Cookies('access_token', undefined);
  Cookies('token_type', undefined);

  dispatch(setHeaders(null));

  // redirect to login page
  dispatch(push('/login'));
}

export function logout() {
  return function(dispatch) {
    logoutUtil(dispatch);
  };
}