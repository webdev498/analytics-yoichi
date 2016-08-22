import {
  REQUEST_LAYOUT_DATA,
  RECEIVE_LAYOUT_DATA,
  ERROR_LAYOUT_DATA
} from 'Constants';

import Cookies from 'cookies-js';
import {baseUrl} from 'config';
import {logoutUtil} from './auth';
import { push } from 'react-router-redux';

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

function getLayout(urlId) {
  const temp = urlId.slice(1, urlId.length),
    layout = require('json/' + temp).default;
  return layout;
}

export function fetchLayoutData(id, params) {
  const accessToken = Cookies.get('access_token');
  const tokenType = Cookies.get('token_type');

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch, getState) {
    dispatch(requestPageData(id));

    // if path id is / then layout id is new-summary-page.
    id = (id === '/') ? '/new-summary-page' : id;
    // if id has path params, then first part of the url is used to fetch layout json.
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
      else if (response.status === 404) {
        dispatch(receivePageData(id, {json: getLayout(urlId)}));
      }
      else {
        return response.json();
      }
    })
    .then(json => {
      if (json) {
        dispatch(receivePageData(id, {json}));
      }
    })
    .catch((ex) => {
      dispatch(errorPageData(id, ex));
    });
  };
};

export function updateRoute(url) {
  return function(dispatch, getState) {
    dispatch(push(url));
  };
}
