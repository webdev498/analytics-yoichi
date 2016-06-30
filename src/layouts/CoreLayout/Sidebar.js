import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import LeftNav from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';

import FontIcon from 'material-ui/FontIcon';

// import AlertIcon from 'material-ui/svg-icons/alert/warning';
// import CountryIcon from 'material-ui/svg-icons/social/public';
// import TrafficIcon from 'material-ui/svg-icons/action/swap-vert';
// import AssetsIcon from 'material-ui/svg-icons/hardware/desktop-mac';
// import UserAgentIcon from 'material-ui/svg-icons/device/dvr';
import {Colors} from 'theme/colors';

const styles = {
  leftNav: {
    position: 'fixed',
    top: '64px',
    paddingTop: '20px',
    backgroundColor: Colors.pebble,
    color: Colors.arctic
  },
  icon: {
    color: Colors.navigation,
    width: '72px',
    textAlign: 'center'
  },
  link: {
    height: '56px',
    lineHeight: '56px'
  },
  wrap: {
    height: '56px',
    width: '190px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: Colors.arctic
  },
  text: {
    textTransform: 'uppercase'
  },
  active: {
    color: Colors.turquoise,
    backgroundColor: Colors.grape
  }
};

const links = [
  {
    to: '/alert',
    icon: 'warning',
    text: 'alert'
  },
  {
    to: '/country',
    icon: 'public',
    text: 'country'
  },
  {
    to: '/traffic',
    icon: 'swap_vert',
    text: 'traffic'
  },
  {
    to: '/asset',
    icon: 'desktop_mac',
    text: 'asset'
  },
  {
    to: '/user-agent',
    icon: 'dvr',
    text: 'user-agent'
  }
];

class Sidebar extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    location: PropTypes.object.isRequired
  }

  getLinks(path) {
    return links.map((link) => {
      let style = {};
      if (link.to === path) {
        style = styles.active;
      }

      return (
        <Link to={link.to} style={{...styles.wrap, ...style}}>
          <FontIcon style={styles.icon} className='material-icons'>
            {link.icon}
          </FontIcon>
          <span style={styles.text}>{link.text}</span>
        </Link>
      );
    });
  }

  render() {
    const {props} = this;
    return (
      <LeftNav open containerStyle={{...styles.leftNav, ...props.style}}>
        {this.getLinks(props.location.pathname)}
      </LeftNav>
    );
  }
}

export default Sidebar;
