/* @flow */
import React from 'react';
import Card from 'material-ui/lib/card/card';
import TextField from 'material-ui/lib/text-field';
import CardActions from 'material-ui/lib/card/card-actions';
import RaisedButton from 'material-ui/lib/raised-button';

import CustomCardHeader from '../components/CustomCardHeader.component';
import {loginUrl, responseType, clientId, redirectUri} from '../config';

import './login.scss';

const LoginView = () => (
  <Card className='login'>
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


export default LoginView;
