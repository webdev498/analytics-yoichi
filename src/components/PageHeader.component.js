import React from 'react';

import AppBar from 'material-ui/lib/app-bar';
import CardHeader from 'material-ui/lib/card/card-header';

const getStyles = (props) => {
  return {
    backgroundColor: '#00bcd4',
    height: '64px',
    position: 'fixed',
    zIndex: 1101,
    top: 0,
    width: '100%',
    ...props.style
  };
}

const PageHeader = (props) => (
  <AppBar {...props}
            style={getStyles(props)}
            iconClassNameRight="muidocs-icon-navigation-expand-more">
  </AppBar>
);

export default PageHeader;