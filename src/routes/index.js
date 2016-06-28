import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import Dashboard from 'views/Dashboard/index';
import NonLoggedLayout from 'layouts/NonLoggedLayout';

import {isLoggedIn} from 'actions/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    if (!isLoggedIn(store.getState(), nextState.location.query, store)) {
      replace('/');
    }

    cb();
  };

  return (
    <Route path='/' >
      <IndexRoute component={NonLoggedLayout} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin} component={CoreLayout}>
        <Redirect from='dashboard' to='alert' />

        <Route path='alert' component={Dashboard} />
        <Route path='country' component={Dashboard} />
        <Route path='traffic' component={Dashboard} />
        <Route path='asset' component={Dashboard} />
        <Route path='user-agent' component={Dashboard} />
      </Route>

      { /* Catch all route */ }
      <Route path='*' component={NonLoggedLayout} />
    </Route>
  );
};
