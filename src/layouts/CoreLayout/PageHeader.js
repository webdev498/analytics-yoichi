import React, {PropTypes} from 'react';

import AppBar from 'material-ui/AppBar';

import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu/Menu';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import {updateApiData} from 'actions/ParentCard';
import {logout} from 'actions/auth';

import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {Colors} from 'theme/colors';
import { Link } from 'react-router';
import {
  openKibanaInNewWindow
} from '../../../env.js';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from 'theme/AppTheme';
const muiTheme = getMuiTheme(AppTheme);

const TimeRanges = [
  {
    text: '1 Hour',
    param: '1h'
  },
  {
    text: '6 Hours',
    param: '6h'
  },
  {
    text: '12 Hours',
    param: '12h'
  },
  {
    text: '1 Day',
    param: '1d'
  },
  {
    text: '1 Week',
    param: '1w'
  },
  {
    text: '1 Month',
    param: '1mo'
  }
];

const styles = {
  appBar: {
    height: '64px',
    position: 'fixed',
    zIndex: 1101,
    top: 0,
    width: '100%',
    fontWeight: 300
  },
  menuStyle: {
    color: Colors.arctic,
    height: '64px',
    lineHeight: '64px'
  },
  userWrap: {
    height: '64px',
    color: Colors.arctic,
    textAlign: 'right',
    margin: '0 15px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  usericon: {
    fontSize: '32px',
    lineHeight: '32px',
    marginLeft: '10px'
  },
  label: {
    opacity: 0.54,
    textDecoration: 'none',
    color: Colors.arctic
  },
  dropicon: {
    top: 0,
    opacity: 0.54
  }
};

function getTimeRangeItems() {
  return TimeRanges.map((val, index) => {
    return <MenuItem value={index + 1} primaryText={val.text} key={index} />;
  });
}

export class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1, showMenu: false};
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    updateApiData: PropTypes.func.isRequired,
    hideKibana: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    showKibana: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(muiTheme)};
  }

  handleTimeChange(event, index, value) {
    this.props.updateApiData(TimeRanges[index], this.props.params);
    this.setState({value});
  }

  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  render() {
    const {props} = this,
      name = props.auth.user ? props.auth.user.name : '';

    let kibanaStyle = {display: 'none'};

    if (props.showKibana) {
      kibanaStyle = {...styles.menuStyle, color: Colors.navigation};
    }

    const title = (
      <Link to='/' style={styles.label}>
        {props.title}
      </Link>
    );

    return (
      <AppBar title={title}
        style={{...styles.appBar, ...props.style}}
        showMenuIconButton={false}>

        {
          openKibanaInNewWindow
          ? null
          : <MenuItem
            ref='backBtn'
            style={{...kibanaStyle}}
            onClick={this.props.hideKibana}>
            Back to Summary
          </MenuItem>
        }

        <DropDownMenu
          ref='dropDown'
          style={styles.menuStyle}
          labelStyle={{...styles.menuStyle, ...styles.label}}
          iconStyle={{...styles.menuStyle, ...styles.dropicon}}
          value={this.state.value}
          onChange={this.handleTimeChange}
          underlineStyle={{borderTop: 0}}>
          {getTimeRangeItems()}
        </DropDownMenu>

        {
          name
          ? (
            <div onClick={this.toggleMenu} ref='menuToggleDiv'>
              <div style={styles.userWrap}>
                <span style={styles.label}>{name}</span>
                <FontIcon style={styles.usericon} className='material-icons'>
                  account_circle
                </FontIcon>
              </div>

              {
                this.state.showMenu
                ? (
                  <Paper style={styles.menuWrap}
                    rounded={false}>
                    <Menu value={1}
                      onChange={this.handleChange}
                      autoWidth={false}>
                        {/* <MenuItem value={1} primaryText='View Token'/>*/}
                      <MenuItem value={2} primaryText='Log Out' onClick={props.logout} />
                    </Menu>
                  </Paper>
                )
                : null
              }
            </div>
          )
          : null
        }

      </AppBar>
    );
  }
}

PageHeader.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, {
  updateApiData, logout
})(PageHeader);
