import React, {PropTypes} from 'react';

import AppBar from 'material-ui/AppBar';

import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu/Menu';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import FaceIcon from 'material-ui/svg-icons/social/person';

import {updateApiData} from 'actions/ParentCard';
import {logout} from 'actions/auth';

import { connect } from 'react-redux';

const getStyles = props => ({
  backgroundColor: '#00bcd4',
  height: '64px',
  position: 'fixed',
  zIndex: 1101,
  top: 0,
  width: '100%',
  ...props.style
});

const TimeRanges = [
  {
    text: '1 hour',
    param: '1h'
  },
  {
    text: '6 hour',
    param: '6h'
  },
  {
    text: '12 hour',
    param: '12h'
  },
  {
    text: '1 day',
    param: '1d'
  },
  {
    text: '1 week',
    param: '1w'
  },
  {
    text: '1 month',
    param: '1mo'
  }
];

function getTimeRangeItems() {
  return TimeRanges.map((val, index) => {
    return <MenuItem value={index + 1} primaryText={val.text} key={index} />;
  });
}

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  static propTypes = {
    updateApiData: PropTypes.func.isRequired,
    hideKibana: PropTypes.func.isRequired
  }

  handleTimeChange(event, index, value) {
    this.props.updateApiData(TimeRanges[index]);
    this.setState({value});
  }

  render() {
    const {props} = this,
      name = props.auth.user ? props.auth.user.name : '';

    let kibanaStyle = {display: 'none'},
      menuStyle = {};

    if (props.showKibana) {
      kibanaStyle = {};
      menuStyle = {display: 'none'};
    }

    return (
      <AppBar {...props} style={getStyles(props)}
        iconClassNameRight='muidocs-icon-navigation-expand-more'>

        <MenuItem
          style={kibanaStyle}
          onClick={this.props.hideKibana} >
          Back to Summary
        </MenuItem>

        <DropDownMenu
          style={menuStyle}
          value={this.state.value}
          onChange={this.handleTimeChange.bind(this)}>
          {getTimeRangeItems()}
        </DropDownMenu>

        {name ? <MenuItem primaryText={name} leftIcon={<FaceIcon />} /> : null}

        {
          name
          ? <Menu value={1}
            onChange={this.handleChange}
            menuStyle={{top: '64px'}} >
              {/* <MenuItem value={1} primaryText='View Token'/>*/}
            <MenuItem value={2} primaryText='Log Out' onClick={props.logout} />
          </Menu>
          : null
        }

      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, {
  updateApiData, logout
})(PageHeader);
