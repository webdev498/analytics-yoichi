import Cookies from 'cookies-js';
import {USER_DETAILS_LOADING, USER_DETAILS_LOADED, USER_DETAILS_ERROR} from 'Constants';
import {baseUrl} from 'config';

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

export function logout() {
  return {
    types: [LOGOUT],
    promise: (client) => client.get('/logout')
  };
}

export function fetchUserData() {
  const accessToken = Cookies.get("access_token");
  const tokenType = Cookies.get("token_type");

  const authorizationHeader = {
    'Authorization': `${tokenType} ${accessToken}`
  };

  return function (dispatch) {
    dispatch(userDetailsLoading());

    return fetch(baseUrl + '/api/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `${tokenType} ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch(userDetailsLoaded(json));
    })
    .catch((ex) => {
      dispatch(userDetailsError(ex))
    });
  }
}

export function isLoggedIn(globalState, query, store) {
  if((query && query["access_token"])) {
    const accessToken = query["access_token"];
    const tokenType = query["token_type"];

    Cookies.set('access_token', accessToken, { path: '/' });
    Cookies.set('token_type', tokenType, { path: '/' });

    return true;
  }

  return Cookies.get('access_token') && Cookies.get('token_type');
}