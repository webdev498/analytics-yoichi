import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import * as messages from 'i18n/';
import { connect } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired
  };

  get content () {
    const intlData = {
      locale: this.props.locale,
      messages: messages[this.props.locale]
    };
    return (
      <IntlProvider {...intlData}>
        <Router history={this.props.history}>
          {this.props.routes}
        </Router>
      </IntlProvider>
    );
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            {this.content}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

function mapStateToProps (state) {
  return { locale: state.locale };
}
export default connect(mapStateToProps)(Root);

