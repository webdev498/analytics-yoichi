import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import LoginView from 'login/login.view';
import Dashboard from 'views/Dashboard/index';
import NonLoggedLayout from 'layouts/NonLoggedLayout/index';

import { isLoaded as isAuthLoaded} from '../redux/reducer/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState(), nextState.location.hash, store)) {
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
        <Route path="dashboard" component={Dashboard}/>
      </Route>


      { /* Catch all route */ }
      <Route path="*" component={Dashboard} />
    </Route>
  );
};
