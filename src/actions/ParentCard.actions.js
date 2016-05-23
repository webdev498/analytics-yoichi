import {REQUEST_API_DATA, RECEIVE_API_DATA, ERROR_API_DATA} from 'Constants';
import Cookies from 'cookies-js';

function requestApiData(id, api) {
  return {
    type: REQUEST_API_DATA,
    id
  };
}

function receiveApiData(id, json) {
  return {
    type: RECEIVE_API_DATA,
    id,
    data: json
  }
}

function errorApiData(id, ex) {
  return {
    type: ERROR_API_DATA,
    id,
    errorData: ex
  }
}

export function fetchApiData(id, api) {
  const accessToken = Cookies.get("access_token");
  const tokenType = Cookies.get("token_type");

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    dispatch(requestApiData(id));

    return fetch(api, {
      method: 'GET',
      headers: {
        'Authorization': `${tokenType} ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveApiData(id, json))
    })
    .catch((ex) => {
      dispatch(errorApiData(id, ex))
    })
  }
}