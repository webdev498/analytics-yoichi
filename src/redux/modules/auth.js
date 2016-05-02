import Cookies from 'cookies-js';

import 'whatwg-fetch';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case 'USER_DETAILS_LOADED':
      return {
        ...state,
        application: action.result.application,
        roles: action.result.roles,
        user: action.result.user
      };
    default:
      return state;
  }
}

export function isLoaded(globalState, urlHash, store) {
  if(urlHash) {
    let individualParameters = urlHash.split("&");

    if (individualParameters.length > 0) {
      const accessToken = (individualParameters[0]).replace("#access_token=","");
      const tokenType = (individualParameters[1]).replace("token_type=","");

      Cookies.set('access_token', accessToken, { path: '/' });
      Cookies.set('token_type', tokenType, { path: '/' });
      Cookies.set('loggedin', 'true');

      return true;
    }

    return false;
  }

  return Cookies.get('access_token') && Cookies.get('token_type');
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/auth/entity')
  };
}

export function logout() {
  return {
    types: [LOGOUT],
    promise: (client) => client.get('/logout')
  };
}
