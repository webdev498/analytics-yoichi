import {logoutUtil} from '../actions/auth';

export function fetchData(url, cookies, dispatch) {
  let accessToken = cookies.access_token,
    tokenType = cookies.token_type,
    authorizationHeader = {
      'Authorization': `${tokenType} ${accessToken}`
    };

  return fetch(url, {
    method: 'GET',
    headers: authorizationHeader
  })
  .then(res => {
    if (res.status === 401) {   // if auth token expires, logout.
      logoutUtil(dispatch);
    }
    else if (!res.ok) {
      throw new Error({data: res.json()});
    }

    return res.json();
  });
}

export function getSearchUrl(query) {
  return `/api/analytics/reporting/execute/taf_search_assets?term=${encodeURIComponent(query)}`;
};

export function parseQuery(qstr) {
  const query = {},
    arr = qstr.split('&');

  arr.forEach(val => {
    const b = val.split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  });

  return query;
}

export function getPosition(el) {
  // yay readability
  let lx = 0, ly = 0;
  for (lx = 0, ly = 0;
    el != null;
    lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx, y: ly};
}

export function autoScrollTo(id, decreasePositionBy) {
  let position = getPosition(document.getElementById(id));
  window.scrollTo(0, position.y - decreasePositionBy);
}