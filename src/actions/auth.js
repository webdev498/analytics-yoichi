import Cookies from 'cookies-js';

export function loadUser() {
  const accessToken = Cookies.get("access_token");
  const tokenType = Cookies.get("token_type");

  const authorizationHeader = {
    'Authorization': `${tokenType} ${accessToken}`
  };

  return dispatch => fetch('https://demo.ranksoftwareinc.com/api/auth/entity', {
    method: 'GET',
    headers: {
      'Authorization': `${tokenType} ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(json => {
    dispatch({
      type: 'USER_DETAILS_LOADED',
      result: json
    });
  })
}