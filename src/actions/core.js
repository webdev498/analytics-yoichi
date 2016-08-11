import {
  REQUEST_LAYOUT_DATA,
  RECEIVE_LAYOUT_DATA,
  ERROR_LAYOUT_DATA
} from 'Constants';

import Cookies from 'cookies-js';
import {baseUrl} from 'config';
import {logoutUtil} from './auth';
import { push } from 'react-router-redux';

import alerts from 'json/alerts';
import alert from 'json/alert';
import traffic from 'json/traffic';
import asset from 'json/asset';
import userAgent from 'json/user-agent';
import newSummaryPage from 'json/new-summary-page';

const layouts = {
  alerts,
  alert,
  traffic,
  asset,
  userAgent,
  newSummaryPage
};

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
  let temp = urlId.slice(1, urlId.length);
  if (temp === 'new-summary-page') {
    return newSummaryPage;
  }
  else if (temp === 'alerts') {
    return alerts;
  }
  else if (temp === 'alert') {
    return alert;
  }
  else if (temp === 'traffic') {
    return traffic;
  }
  else if (temp === 'asset') {
    return asset;
  }
  else if (temp === 'user-agent') {
    return userAgent;
  }
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
      else if (response.status === 400) {
        dispatch(receivePageData(id, {json: getLayout(urlId)}));
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

export function updateRoute(url) {
  return function(dispatch, getState) {
    dispatch(push(url));
  };
}
