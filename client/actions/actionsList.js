import {
  REQUEST_ACTIONS_LIST,
  RECEIVE_ACTIONS_LIST,
  ERROR_ACTIONS_LIST
} from 'Constants';

import {baseUrl} from 'config';
import {fetchData} from 'utils/utils';

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
      url = `${baseUrl}/api/analytics/actions/list?mediaType=json`;

    dispatch(actionsListRequest());

    return fetchData(url, cookies)
    .then(json => {
      dispatch(actionsListRecieve(json));
    })
    .catch(ex => {
      dispatch(actionsListError(ex));
    });
  };
}
