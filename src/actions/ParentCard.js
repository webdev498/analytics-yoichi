import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA,
  ERROR_API_DATA,
  TIME_INTERVAL_UPDATE,
  PARENT_CARD_EVENT,
  REMOVE_COMPONENT
} from 'Constants';

import Cookies from 'cookies-js';
import {baseUrl} from 'config';

export function requestApiData(id, api) {
  return {
    type: REQUEST_API_DATA,
    id,
    api
  };
}

export function receiveApiData(id, json) {
  return {
    type: RECEIVE_API_DATA,
    id,
    data: json
  };
}

export function errorApiData(id, ex) {
  return {
    type: ERROR_API_DATA,
    id,
    errorData: ex
  };
}

export function changeTimeRange(timeRange) {
  return {
    type: TIME_INTERVAL_UPDATE,
    data: timeRange
  };
}

export function parentCardEvent(id, callback) {
  return {
    type: PARENT_CARD_EVENT,
    id,
    callback
  };
}

export function removeComponentWithId(id) {
  return {
    type: REMOVE_COMPONENT,
    id
  };
}

function getUrl(api, duration) {
  const {queryParams: query, path, pathParams} = api;

  let url = path;

  const pathKeys = Object.keys(pathParams);
  pathKeys.forEach((key) => {
    let templateString = `{${key}}`;
    url = url.replace(templateString, pathParams[key]);
  });

  const keys = Object.keys(query);
  let queryString = '';

  if (keys.length > 0) {
    queryString += '?';

    keys.forEach((key) => {
      if ((key === 'window' || key === 'timeShift') && (query[key] === '')) {
        queryString += key + '=' + duration + '&';
      }
      else {
        queryString += key + '=' + query[key] + '&';
      }
    });

    queryString = queryString.slice(0, queryString.length - 1);
  }

  return baseUrl + url + queryString;
}

export function fetchApiData(id, api) {
  const accessToken = Cookies.get('access_token');
  const tokenType = Cookies.get('token_type');

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch, getState) {
    const currentDuration = getState().apiData.get('duration');

    dispatch(requestApiData(id, api));

    const defaultHeaders = Object.assign({
      'Authorization': `${tokenType} ${accessToken}`
    }, api.headers);

    return fetch(getUrl(api, currentDuration), {
      method: 'GET',
      headers: defaultHeaders
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveApiData(id, {json, api}));
    })
    .catch((ex) => {
      dispatch(errorApiData(id, ex));
    });
  };
}

// Update api data for all the components that are visible on the page
// when time range is changed.
export function updateApiData(newDuration) {
  return function(dispatch, getState) {
    const {apiData} = getState();

    const currentDuration = apiData.get('duration');

    if (currentDuration !== newDuration.param) {
      dispatch(changeTimeRange(newDuration.param));

      if (apiData && apiData.has('components')) {
        const components = apiData.get('components');
        components.forEach((component, index) => {
          const id = component.get('id');
          const api = component.get('api');
          fetchApiData(id, api)(dispatch, getState);
        });
      }
    }
  };
}

export function action(id, callback) {
  return function(dispatch, getState) {
    const {apiData} = getState();

    if (apiData && apiData.has('components')) {
      const components = apiData.get('components');

      components.forEach((component, index) => {
        const componentId = component.get('id');
        if (componentId === id) {
          dispatch(id, callback);
        }
      });
    }
  };
}

export function removeComponent(id) {
  return function(dispatch) {
    dispatch(removeComponentWithId(id));
  };
}

export function fetchTrafficDetailsApiData(id, api, trafficFilter, alertDate) {
  const accessToken = Cookies.get('access_token');
  const tokenType = Cookies.get('token_type');

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch, getState) {
    const currentDuration = getState().apiData.get('duration');

    dispatch(requestApiData(id, api));

    const defaultHeaders = Object.assign({
      'Authorization': `${tokenType} ${accessToken}`
    }, api.headers);

    return fetch(getUrl(api, currentDuration), {
      method: 'GET',
      headers: defaultHeaders
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveApiData(id, {json, api, trafficFilter, alertDate}));
    })
    .catch((ex) => {
      dispatch(errorApiData(id, ex));
    });
  };
}
