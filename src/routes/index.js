import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import LoginView from 'login/login.view';
import Dashboard from 'views/Dashboard/index';
import NonLoggedLayout from 'layouts/NonLoggedLayout/index';

import {isLoggedIn} from 'actions/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    if (!isLoggedIn(store.getState(), nextState.location.hash, store)) {
      replace('/');
    }

    cb();
  };

  return (
    <Route path="/" >
      <IndexRoute component={NonLoggedLayout} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin} component={CoreLayout}>
        <Redirect from="dashboard" to="dashboard/alert" />

        <Route path="dashboard" component={Dashboard}>
          <Route path="alert" component={Dashboard} />
          <Route path="country" component={Dashboard} />
          <Route path="traffic" component={Dashboard} />
          <Route path="asset" component={Dashboard} />
          <Route path="user-agent" component={Dashboard} />
        </Route>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NonLoggedLayout} />
    </Route>
  );
};
