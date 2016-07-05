import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
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
        <Redirect from='dashboard' to='alerts' />

        <Route path='alerts' />
        <Route path='alert/:alertId/:date' />
        <Route path='country' />
        <Route path='traffic' />
        <Route path='asset' />
        <Route path='user-agent' />
      </Route>

      { /* Catch all route */ }
      <Route path='*' component={NonLoggedLayout} />
    </Route>
  );
};
