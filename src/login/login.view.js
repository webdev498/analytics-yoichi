/* @flow */
import React from 'react';
import Cookies from 'cookies-js';
import { push } from 'react-router-redux';

import Card from 'material-ui/Card/Card';
import TextField from 'material-ui/TextField';
import CardActions from 'material-ui/Card/CardActions';
import RaisedButton from 'material-ui/RaisedButton';

import CustomCardHeader from '../components/CustomCardHeader';
import {loginUrl, responseType, clientId, redirectUri} from '../config';

import {defaultRoute} from 'config';

import './login.scss';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const accessToken = Cookies.get("access_token");
    const tokenType = Cookies.get("token_type");

    const {store} = this.context;

    if(accessToken && tokenType) {
      store.dispatch(push(defaultRoute));
    }
  }

  render () {
    const {props} = this;
    return (
      <Card className='login' {...props} >
        <CustomCardHeader title='Sign in' />

        <form className='login-form' action={loginUrl} method='post'>
          <div style={{padding: '0 20px'}}>
            <TextField style={{width: '100%'}} floatingLabelText='Username' name='username' />
          </div>

          <div style={{padding: '0 20px'}}>
            <TextField style={{width: '100%'}} floatingLabelText='Password' type='password' name='password'/>
          </div>

          <div style={{textAlign: 'right', marginTop: '25px', marginRight: '20px'}}>
            <RaisedButton primary={true} label='Login' type='submit' />
          </div>

          <input type='hidden' name='response_type' value={responseType} />
          <input type='hidden' name='client_id' value={clientId} />
          <input type='hidden' name='redirect_uri' value={redirectUri} />
        </form>
      </Card>
    )
  }
}

LoginView.contextTypes = {
  store: React.PropTypes.object
}

export default LoginView;
