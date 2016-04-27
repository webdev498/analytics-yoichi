import React from 'react';

import Header from './Header.component';
import Login from '../../login/login.view';

class NonLoggedLayout extends React.Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

export default NonLoggedLayout;

