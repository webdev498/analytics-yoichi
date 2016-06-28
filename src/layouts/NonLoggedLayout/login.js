/* @flow */
import React from 'react';
import Cookies from 'cookies-js';
import { push } from 'react-router-redux';

import Card from 'material-ui/Card/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CustomCardHeader from 'components/CustomCardHeader';
import {loginUrl, responseType, clientId, redirectUri, defaultRoute} from 'config';

// import './login.scss';
import {garnetColor, grapeColor} from 'theme/colors';

const styles = {
  card: {
    width: '400px',
    margin: '0 auto',
    height: '400px',
    backgroundColor: garnetColor
  },
  header: {
    backgroundColor: garnetColor
  },
  inputWrap: {
    padding: '0 20px'
  },
  textField: {
    width: '100%'
  },
  buttonWrap: {
    textAlign: 'right',
    marginTop: '25px',
    marginRight: '20px'
  },
  button: {
    backgroundColor: grapeColor
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

  render() {
    return (
      <Card style={styles.card} >
        <CustomCardHeader title='Rank'
          style={styles.header} />

        <form action={loginUrl} method='post'>
          <div style={styles.inputWrap}>
            <TextField
              style={styles.textField}
              floatingLabelText='Username'
              name='username' />
          </div>

          <div style={styles.inputWrap}>
            <TextField
              style={styles.textField}
              floatingLabelText='Password'
              type='password'
              name='password' />
          </div>

          <div style={styles.buttonWrap}>
            <RaisedButton
              primary
              style={styles.button}
              backgroundColor='#444c63'
              label='Login'
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
