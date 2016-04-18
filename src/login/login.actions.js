// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  console.log(1);
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body:   'username=' + creds.username +
            '&password=' + window.encodeURIComponent(creds.password) +
            '&response_type=token' +
            '&client_id=taf_dashboard' +
            '&redirect_uri=' + window.encodeURIComponent('http://localhost:3000/')

  }

  console.log(2, config);

  // return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(creds))
    console.log(3)
    fetch('https://demo.ranksoftwareinc.com/oauth/authorize', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        console.log(response);
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          // dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          // Dispatch the success action
          // dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  // }
}


// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}
