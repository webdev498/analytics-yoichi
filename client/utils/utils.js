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

export function getQueryParamsForDetails(fields, dataObj) {
  let parameters = Object.assign({}, fields);

  if (dataObj.toolText) {
    let toolTexts = dataObj.toolText.split(' |');
    for (let parameter in parameters) {
      let value = toolTexts[parameters[parameter].toolTextIndex];
      if (parameter === 'date') {
        value = new Date(value).toISOString();
        value = value.replace('Z', '');
      }
      parameters[parameter].value = value;
    }
  }
  else if (dataObj.shortLabel) {
    for (let parameter in parameters) {
      parameters[parameter].value = dataObj.shortLabel;
    }
  }
  return parameters;
}

// export function debounce(func, wait, immediate) {
//   var timeout;
//   console.log('test3');
//   return function() {
//     var context = this, args = arguments;
//     var later = function() {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//       console.log('test1');
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     console.log('test2');
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// };

export function debounce(fn, delay) {
  console.log('test1');
  var timer = null;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    console.log('test2');
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
