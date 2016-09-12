import Cookies from 'cookies-js';
import {USER_DETAILS_LOADING, USER_DETAILS_LOADED, USER_DETAILS_ERROR} from 'Constants';
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

export function userDetailsError(json, errorData) {
  return {
    type: USER_DETAILS_ERROR,
    errorData
  };
}

export function fetchUserData() {
  const accessToken = Cookies.get('access_token');
  const tokenType = Cookies.get('token_type');

  const authorizationHeader = {
    'Authorization': `${tokenType} ${accessToken}`
  };

  return function(dispatch) {
    // dispatch(userDetailsLoaded(
    //   {
    //     '__authDetails': {
    //       'user': {
    //         'id': 'mohan',
    //         'name': 'Mohan Rao'
    //       },
    //       'application': {
    //         'id': 'taf_dashboard',
    //         'name': 'taf_dashboard'
    //       },
    //       'roles': [
    //         'ROLE_USER',
    //         'ROLE_ADMIN',
    //         'ROLE_SUPER_USER'
    //       ]
    //     }
    //   }
    // ));

    dispatch(userDetailsLoading());

    return fetch(baseUrl + '/api/user/profile', {
      method: 'GET',
      headers: authorizationHeader
    })
    .then(response => response.json())
    .then(json => {
      dispatch(userDetailsLoaded(json));
    })
    .catch((ex) => {
      dispatch(userDetailsError(ex));
    });
  };
}

export function isLoggedIn(location, store) {
  let hash = location && location.hash;

  if (hash) {
    const query = parseQuery(hash);
    const accessToken = query['access_token'];
    const tokenType = query['token_type'];

    Cookies.set('access_token', accessToken, { path: '/' });
    Cookies.set('token_type', tokenType, { path: '/' });

    return true;
  }

  // if ((query && query['access_token'])) {
  //   const accessToken = query['access_token'];
  //   const tokenType = query['token_type'];

  //   Cookies.set('access_token', accessToken, { path: '/' });
  //   Cookies.set('token_type', tokenType, { path: '/' });

  //   return true;
  // }

  return Cookies.get('access_token') && Cookies.get('token_type');
}

export function logoutUtil(dispatch) {
  // delete the auth cookies
  Cookies('access_token', undefined);
  Cookies('token_type', undefined);

  // redirect to login page
  dispatch(push('/login'));
}

export function logout() {
  return function(dispatch) {
    logoutUtil(dispatch);
  };
}
