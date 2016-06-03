import Cookies from 'cookies-js';

import 'whatwg-fetch';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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

export function logout() {
  return {
    types: [LOGOUT],
    promise: (client) => client.get('/logout')
  };
}
