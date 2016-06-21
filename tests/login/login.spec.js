import {
  LOGIN_SUBMIT,
  loginSubmit
} from 'login/login.actions'

import {Map} from 'immutable';

describe('login', function () {
  describe('actions', function () {
    it('submit', function () {
      const obj = {
        username: 'ojassvi',
        password: 'password'
      }

      const rObj = loginSubmit(obj);
      console.log("some obj", rObj);
    });
  });
});
