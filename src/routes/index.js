import React from 'react';
import { Route, IndexRoute } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import NonLoggedLayout from 'layouts/NonLoggedLayout/index';
import HomeView from 'views/HomeView/HomeView';
import LoginView from 'login/login.view';

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/login' component={NonLoggedLayout}></Route>
  </Route>
);
