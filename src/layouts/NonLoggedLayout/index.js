import React from 'react';

import AppBar from 'material-ui/AppBar';
import Login from 'login/login.view';

class NonLoggedLayout extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="RANK" showMenuIconButton={false} />
        <Login />
      </div>
    )
  }
}

export default NonLoggedLayout;

