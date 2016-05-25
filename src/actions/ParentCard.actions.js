import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA,
  ERROR_API_DATA,
  UPDATE_API_DATA,
  TIME_INTERVAL_UPDATE
} from 'Constants';

import Cookies from 'cookies-js';
import {baseUrl} from 'config';

export function requestApiData(id, api) {
  return {
    type: REQUEST_API_DATA,
    id
  };
}

export function receiveApiData(id, json) {
  return {
    type: RECEIVE_API_DATA,
    id,
    data: json
  }
}

export function errorApiData(id, ex) {
  return {
    type: ERROR_API_DATA,
    id,
    errorData: ex
  }
}

export function changeTimeRange(timeRange) {
  return {
    type: TIME_INTERVAL_UPDATE,
    data: timeRange
  }
}

function getUrl(url, query, duration) {
  const keys = Object.keys(query);
  let queryString = "";

  if(keys.length > 0) {
    queryString += "?";

    keys.forEach((key) => {
      if(key === 'window' || key === 'timeShift') {
        queryString += key + "=" + duration + "&";
      }
      else {
        queryString += key + "=" + query[key] + "&";
      }
    });

    queryString = queryString.slice(0, queryString.length - 1);
  }

  return baseUrl + url + queryString;
}

export function fetchApiData(id, api, query) {
  const accessToken = Cookies.get("access_token");
  const tokenType = Cookies.get("token_type");

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch, getState) {
    const currentDuration = getState().apiData.get('duration');

    dispatch(requestApiData(id));

    return fetch(getUrl(api, query, currentDuration), {
      method: 'GET',
      headers: {
        'Authorization': `${tokenType} ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveApiData(id, {json, api, query}))
    })
    .catch((ex) => {
      dispatch(errorApiData(id, ex))
    })
  }
}

// Update api data for all the components that are visible on the page
// when time range is changed.
export function updatedApiData(newDuration) {
  return function(dispatch, getState) {
    const {apiData} = getState();

    const currentDuration = apiData.get('duration');

    if(currentDuration !== newDuration.param) {
      dispatch(changeTimeRange(newDuration.param));

      if(apiData && apiData.has('components')) {
        const components = apiData.get('components');

        components.forEach((component, index) => {
          const id = component.get('id');
          const api = component.get('api');
          const query = component.get('query');
          fetchApiData(id, api, query)(dispatch, getState);
        });
      }
    }
  }
}