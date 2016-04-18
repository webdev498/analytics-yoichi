/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './login.actions';

// import { localeChange } from '../../redux/modules/locale';
// import { defineMessages, FormattedMessage } from 'react-intl';

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class LoginView extends React.Component {
  handleLogin () {
    console.log(this.refs);
    loginUser({
      username: this.refs.username.value.trim(),
      password: this.refs.password.value.trim()
    });
  }

  render () {
    return (
      <div className="login col-md-5">
        <form className="form">
          <div className="card">
            <div className="card-head style-primary">
              <header>Sign In</header>
            </div>
            <div className="card-body floating-label">
              <div className="form-group">
                <input type="text" className="form-control" id="Username2" />
                <label htmlFor="Username2">Username</label>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="Password2" />
                <label htmlFor="Password2">Password</label>
              </div>
            </div>
            <div className="card-actionbar">
              <div className="card-actionbar-row">
                <button type="submit"
                        className="btn btn-flat btn-primary ink-reaction">
                        Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginView;
