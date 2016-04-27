import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

const HeaderComponent = () => (
  <AppBar
    title="RANK"
    style={{position: 'fixed', zIndex: 1101, top: 0}}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

export default HeaderComponent;
