import {
  REQUEST_LAYOUT_DATA,
  RECEIVE_LAYOUT_DATA,
  ERROR_LAYOUT_DATA
} from 'Constants';

import Cookies from 'cookies-js';
import {baseUrl} from 'config';

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
  }
}

export function errorPageData(id, ex) {
  return {
    type: ERROR_LAYOUT_DATA,
    id,
    errorData: ex
  }
}

function getUrl(id) {
  return `${baseUrl}/api/store/dashboard/${id}`;
}

export function fetchLayoutData(id) {
  const accessToken = Cookies.get("access_token");
  const tokenType = Cookies.get("token_type");

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch, getState) {
    const currentDuration = getState().apiData.get('duration');

    dispatch(requestPageData(id));

    return fetch(getUrl(id), {
      method: 'GET',
      headers: {
        'Authorization': `${tokenType} ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receivePageData(id, {json}))
    })
    .catch((ex) => {
      dispatch(errorPageData(id, ex))
    })
  }
}