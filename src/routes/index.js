import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import NonLoggedLayout from 'layouts/NonLoggedLayout';

import {isLoggedIn} from 'actions/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    if (!isLoggedIn(store.getState(), nextState.location.query, store)) {
      replace('/login');
    }

    cb();
  };

  return (
    <Route path='/' >
      <Route path='login' component={NonLoggedLayout} />

      { /* Routes requiring login */ }
      { /* <Route onEnter={requireLogin} component={CoreLayout}> */}
      <Route component={CoreLayout}>
        <Redirect from='dashboard' to='/' />
        <IndexRoute />
        <Route path='alerts' />
        <Route path='alert/:alertId/:date' />
        <Route path='country' />
        <Route path='traffic' />
        <Route path='asset' />
        <Route path='user-agent' />
        <Route path='new-summary-page' />
        <Route path='network-graph' />
        <Route path='timeline-graph' />
      </Route>

      { /* Catch all route */ }
      <Redirect path='*' to='/' component={NonLoggedLayout} />
    </Route>
  );
};
