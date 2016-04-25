import React from 'react';

import Header from './Header.component';
import Login from '../../login/login.view';

class NonLoggedLayout extends React.Component {
  render() {
    return (
      <div>
        <div id="content">
          <div className="section-body contain-lg">
              <Login />
          </div>
        </div>
      </div>
    )
  }
}

export default NonLoggedLayout;

