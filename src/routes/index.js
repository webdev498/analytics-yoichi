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

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" >
      <IndexRoute component={NonLoggedLayout} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin} component={CoreLayout}>
        <Redirect from="dashboard" to="dashboard/taf" />

        <Route path="dashboard" component={Dashboard}>
          <Route path="taf" component={Dashboard} />
        </Route>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NonLoggedLayout} />
    </Route>
  );
};
