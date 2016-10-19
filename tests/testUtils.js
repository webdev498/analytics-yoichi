import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from 'theme/AppTheme';
const muiTheme = getMuiTheme(AppTheme);
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export function simulateEvent(wrappedTarget, eventType) {
  if (wrappedTarget.node) {
    // wrappedTarget was obtained using enzyme's mount()
    const domNode = ReactDOM.findDOMNode(wrappedTarget.node);
    TestUtils.Simulate[eventType](domNode);
  }
  else {
    // wrappedTarget was obtained using enzyme's shallow()
    wrappedTarget.simulate(eventType);
  }
}

export function wrapThemeProvider(component) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      {component}
    </MuiThemeProvider>
  );
}
