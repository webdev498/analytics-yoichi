import React from 'react';

import AppBar from 'material-ui/lib/app-bar';
import CardHeader from 'material-ui/lib/card/card-header';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FaceIcon from 'material-ui/lib/svg-icons/social/person';

import * as AuthActions from 'actions/auth.actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function select(state) {
  return { auth: state.auth };
}

const getStyles = props => (
  {
    backgroundColor: '#00bcd4',
    height: '64px',
    position: 'fixed',
    zIndex: 1101,
    top: 0,
    width: '100%',
    ...props.style
  }
)

class PageHeader extends React.Component {
  static fetchData(dispatch) {
    var authActions = bindActionCreators(AuthActions, dispatch);
    return Promise.all([
      authActions.loadUser()
    ]);
  }

  constructor(props) {
    super(props);
    this.state = {value: 2};
  }

  componentDidMount() {
    if (!this.props.list) {
      this.constructor.fetchData(this.props.dispatch);
    }
  }

  handleChange = (event, index, value) => {
    this.setState({value})
  };

  render () {
    let name = this.props.auth.user ? this.props.auth.user.name : "";
    return (
        <AppBar {...this.props} style={getStyles(this.props)}
                iconClassNameRight='muidocs-icon-navigation-expand-more'>

          <DropDownMenu value={1}
                        onChange={this.handleChange}
                        menuStyle={{top: '64px'}}>
            <MenuItem value={1} primaryText='1 Hour'/>
            <MenuItem value={2} primaryText='6 Hour'/>
            <MenuItem value={3} primaryText='12 Hour'/>
            <MenuItem value={4} primaryText='1 Day'/>
            <MenuItem value={5} primaryText='1 Week'/>
            <MenuItem value={5} primaryText='1 Month'/>
          </DropDownMenu>

          <MenuItem primaryText={name} leftIcon={<FaceIcon />} />

        {/*
          <Menu value={1}
                        onChange={this.handleChange}
                        menuStyle={{top: '64px'}}>
            <MenuItem value={1} primaryText='View Token'/>
            <MenuItem value={2} primaryText='Log Out'/>
          </Menu>
          */}
        </AppBar>
      )
  }
}

export default connect(select)(PageHeader);