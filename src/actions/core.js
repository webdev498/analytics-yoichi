import {
  REQUEST_LAYOUT_DATA,
  RECEIVE_LAYOUT_DATA,
  ERROR_LAYOUT_DATA
} from 'Constants';

import Cookies from 'cookies-js';
import {baseUrl} from 'config';
import {logoutUtil} from './auth';

export function requestPageData(id, api) {
  return {
    type: REQUEST_LAYOUT_DATA,
    id
  };
}

export function receivePageData(id, json) {
  return {
    type: RECEIVE_LAYOUT_DATA,
    id,
    data: json
  };
}

export function errorPageData(id, ex) {
  return {
    type: ERROR_LAYOUT_DATA,
    id,
    errorData: ex
  };
}

function getUrl(id) {
  return `${baseUrl}/api/store/dashboard${id}`;
}

export function fetchLayoutData(id, params) {
  const accessToken = Cookies.get('access_token');
  const tokenType = Cookies.get('token_type');

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch, getState) {
    dispatch(requestPageData(id));

    let urlId = id.indexOf('/', 1) > -1 ? id.slice(0, id.indexOf('/', 1)) : id;

    return fetch(getUrl(urlId), {
      method: 'GET',
      headers: {
        'Authorization': `${tokenType} ${accessToken}`
      }
    })
    .then(response => {
      // if auth token expires, logout.
      if (response.status === 401) {
        logoutUtil(dispatch);
      }
      return response.json();
    })
    .then(json => {
      dispatch(receivePageData(id, {json}));
    })
    .catch((ex) => {
      dispatch(errorPageData(id, ex));
    });
  };
};
