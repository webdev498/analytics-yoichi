/* @flow */
import React, {PropTypes} from 'react';
import Cookies from 'cookies-js';
import { push } from 'react-router-redux';

import Card from 'material-ui/Card/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CustomCardHeader from 'components/CustomCardHeader';
import {loginUrl, responseType, clientId, redirectUri, defaultRoute} from 'config';

import {Colors} from 'theme/colors';

const styles = {
  card: {
    width: '300px',
    margin: '0 auto',
    height: '400px',
    backgroundColor: Colors.garnet,
    position: 'relative'
  },
  container: {
  },
  header: {
    backgroundColor: Colors.garnet,
    padding: '0 35px'
  },
  inputWrap: {
    padding: '0 35px'
  },
  textField: {
    width: '100%'
  },
  input: {
    color: Colors.navigation,
    borderColor: Colors.turquoise
  },
  floatingLabel: {
    color: Colors.navigation,
    fontWeight: '300'
  },
  floatingLabelFocus: {
    color: Colors.turquoise
  },
  underlineFocus: {
    borderColor: Colors.turquoise
  },
  buttonWrap: {
    textAlign: 'right',
    marginTop: '25px',
    marginRight: '20px'
  },
  button: {
    fontWeight: 300
  },
  form: {
    marginTop: '100px'
  },
  error: {
    position: 'absolute',
    right: '35px',
    left: '35px',
    top: '100px',
    color: Colors.cherry,
    textAlign: 'center',
    fontSize: '11px'
  }
};

class LoginView extends React.Component {
  componentDidMount() {
    const accessToken = Cookies.get('access_token');
    const tokenType = Cookies.get('token_type');

    const {store} = this.context;

    if (accessToken && tokenType) {
      store.dispatch(push(defaultRoute));
    }
  }

  getErrorState() {
    const search = window.location.search;
    if (search.includes('loginError')) {
      return <div style={styles.error}>Incorrect username or password.<br />Please try again</div>;
    }

    return null;
  }

  render() {
    return (
      <Card style={styles.card}
        containerStyle={styles.container} >
        <CustomCardHeader title='Rank'
          style={styles.header} />

        {this.getErrorState()}

        <form action={loginUrl} method='post' style={styles.form}>
          <div style={styles.inputWrap}>
            <TextField
              floatingLabelStyle={styles.floatingLabel}
              floatingLabelFocusStyle={styles.floatingLabelFocus}
              style={styles.textField}
              underlineFocusStyle={styles.underlineFocus}
              inputStyle={styles.input}
              floatingLabelText='Username'
              required
              name='username' />
          </div>

          <div style={styles.inputWrap}>
            <TextField
              floatingLabelStyle={styles.floatingLabel}
              floatingLabelFocusStyle={styles.floatingLabelFocus}
              style={styles.textField}
              underlineFocusStyle={styles.underlineFocus}
              inputStyle={styles.input}
              floatingLabelText='Password'
              type='password'
              required
              name='password' />
          </div>

          <div style={styles.buttonWrap}>
            <RaisedButton
              style={styles.button}
              backgroundColor={Colors.pebble}
              labelColor={Colors.navigation}
              labelStyle={styles.button}
              label='Sign In'
              type='submit' />
          </div>

          <input type='hidden' name='response_type' value={responseType} />
          <input type='hidden' name='client_id' value={clientId} />
          <input type='hidden' name='redirect_uri' value={redirectUri} />
        </form>
      </Card>
    );
  }
}

LoginView.contextTypes = {
  store: React.PropTypes.object
};

export default LoginView;
