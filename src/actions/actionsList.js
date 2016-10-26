import {
  REQUEST_ACTIONS_LIST,
  RECEIVE_ACTIONS_LIST,
  ERROR_ACTIONS_LIST
} from 'Constants';
import {baseUrl} from 'config';

export function actionsListRequest() {
  return {
    type: REQUEST_ACTIONS_LIST
  };
}

export function actionsListRecieve(data) {
  return {
    type: RECEIVE_ACTIONS_LIST,
    data
  };
}

export function actionsListError(json, errorData) {
  return {
    type: ERROR_ACTIONS_LIST,
    errorData
  };
}

export function fetchActionsList() {
  return function(dispatch, getState) {
    const cookies = getState().auth.cookies,
      accessToken = cookies.access_token,
      tokenType = cookies.token_type,
      authorizationHeader = {
        'Authorization': `${tokenType} ${accessToken}`
      };

    dispatch(actionsListRequest());

    return fetch(baseUrl + '/api/analytics/actions/list?mediaType=json', {
      method: 'GET',
      headers: authorizationHeader
    })
    .then(response => response.json())
    .then(json => {
      dispatch(actionsListRecieve(json));
    })
    .catch((ex) => {
      dispatch(actionsListError(ex));
    });
  };
}
