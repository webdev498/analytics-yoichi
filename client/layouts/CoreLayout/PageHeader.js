import React, {PropTypes} from 'react';

import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu/Menu';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from 'theme/AppTheme';

import Image from 'components/widgets/Image';

import {updateApiData} from 'actions/parentCard';
import {logout} from 'actions/auth';

import { connect } from 'react-redux';

import {Colors} from '../../../commons/colors';
import { Link } from 'react-router';

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
    text: '24 Hours',
    param: '24h'
  },
  {
    text: '48 Hours',
    param: '48h'
  },
  {
    text: '1 Week',
    param: '1w'
  },
  {
    text: '1 Month',
    param: '1mo'
  },
  {
    text: '2 Month',
    param: '2mo'
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
  dropicon: {
    top: 0,
    opacity: 0.54
  },
  logoWrap: {
    display: 'flex',
    height: '100%'
  },
  label: {
    textDecoration: 'none',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  clientLogo: {
    display: 'flex',
    maxHeight: '40px'
  },
  rankLogo: {
    display: 'flex',
    marginRight: '20px'
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
    let value = 1;
    TimeRanges.forEach((range, index) => {
      if (range.param === props.duration) {
        value = index + 1;
      }
    });

    this.state = {value, showMenu: false};
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  static propTypes = {
    updateApiData: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    duration: PropTypes.string.isRequired
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

    const title = (
      <div style={styles.logoWrap}>
        <Link to='/' style={styles.label}>
          <img src='/rank-logo.png' style={styles.rankLogo} alt='Logo' />
        </Link>
        <div style={styles.label}>
          <Image imageUrl='/client-logo.png'
            alt='Client Logo'
            style={styles.clientLogo} />
        </div>
      </div>
    );

    return (
      <AppBar title={title}
        style={{...styles.appBar, ...props.style}}
        showMenuIconButton={false}>

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
                      <MenuItem value={1} primaryText='Log Out' onClick={props.logout} />
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
  return { auth: state.auth, duration: state.duration };
}

export default connect(mapStateToProps, {
  updateApiData, logout
})(PageHeader);
