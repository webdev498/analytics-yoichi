import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import AlertIcon from 'material-ui/svg-icons/alert/warning';
import CountryIcon from 'material-ui/svg-icons/social/public';
import TrafficIcon from 'material-ui/svg-icons/action/swap-vert';
import AssetsIcon from 'material-ui/svg-icons/hardware/desktop-mac';
import UserAgentIcon from 'material-ui/svg-icons/device/dvr';
import {Colors} from 'theme/colors';

const styles = {
  leftNav: {
    position: 'fixed',
    top: '64px',
    backgroundColor: Colors.pebble,
    color: Colors.arctic
  },
  icon: {
    fill: Colors.navigation
  },
  link: {
    height: '56px',
    lineHeight: '56px'
  }
};

class Sidebar extends React.Component {
  static propTypes = {
    style: PropTypes.object
  }

  render() {
    const {props} = this;
    return (
      <LeftNav open containerStyle={{...styles.leftNav, ...props.style}}>
        <Link to='/alert'>
          <MenuItem style={styles.link} leftIcon={<AlertIcon style={styles.icon} />}>
            Alert Details
          </MenuItem>
        </Link>
        <Link to='/country'>
          <MenuItem style={styles.link} leftIcon={<CountryIcon style={styles.icon} />}>
            Country Details
          </MenuItem>
        </Link>
        <Link to='/traffic'>
          <MenuItem style={styles.link} leftIcon={<TrafficIcon style={styles.icon} />}>
            Traffic Details
          </MenuItem>
        </Link>
        <Link to='/asset'>
          <MenuItem style={styles.link} leftIcon={<AssetsIcon style={styles.icon} />}>
            Asset Details
          </MenuItem>
        </Link>
        <Link to='/user-agent'>
          <MenuItem style={styles.link} leftIcon={<UserAgentIcon style={styles.icon} />}>
            User-Agent Details
          </MenuItem>
        </Link>
      </LeftNav>
    );
  }
}

export default Sidebar;
