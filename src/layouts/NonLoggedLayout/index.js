import React from 'react';
import Login from './login';

import {pebbleColor} from 'theme/colors';

const styles = {
  wrap: {
    height: '100%',
    paddingTop: '50px',
    display: 'flex',
    alignItems: 'center'
  }
};

class NonLoggedLayout extends React.Component {
  render() {
    return (
      <div style={styles.wrap} data-test>
        <Login />
      </div>
    );
  }
}

export default NonLoggedLayout;

