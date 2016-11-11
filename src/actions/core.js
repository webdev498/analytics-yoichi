import {
  REQUEST_LAYOUT_DATA,
  RECEIVE_LAYOUT_DATA,
  ERROR_LAYOUT_DATA
} from 'Constants';

import {baseUrl} from 'config';
import {logoutUtil} from './auth';
import { push } from 'react-router-redux';

export function requestPageData(id) {
  return {
    type: REQUEST_LAYOUT_DATA,
    id
  };
}

export function receivePageData(id, json) {
  return {
    type: RECEIVE_LAYOUT_DATA,
    data: json,
    id
  };
}

export function errorPageData(id, ex) {
  return {
    type: ERROR_LAYOUT_DATA,
    errorData: ex,
    id
  };
}

function getUrl(id) {
  return `${baseUrl}/api/store/dashboard${id}`;
}

export function fetchLayoutData(id) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch, getState) {
    const cookies = getState().auth.cookies,
      accessToken = cookies.access_token,
      tokenType = cookies.token_type,
      authorizationHeader = {
        'Authorization': `${tokenType} ${accessToken}`
      };

    dispatch(requestPageData(id));

    // if path id is / then layout id is summary-page.
    id = (id === '/') ? '/summary-page' : id;

    // if id has path params, then first part of the url is used to fetch layout json.
    let urlId = id.indexOf('/', 1) > -1 ? id.slice(0, id.indexOf('/', 1)) : id;

    return fetch(getUrl(urlId), {
      method: 'GET',
      headers: authorizationHeader
    })
    .then(response => {
      const status = response.status;
      // if auth token expires, logout.
      if (status === 401) {
        logoutUtil(dispatch);
      }
      else if (status === 404 || status === 500) {
        // dispatch(receivePageData(id, {json: getLayout(urlId)}));
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
    .catch(ex => {
      dispatch(errorPageData(id, ex));
    });
  };
};

export function updateRoute(url) {
  return function(dispatch, getState) {
    dispatch(push(url));
  };
}
