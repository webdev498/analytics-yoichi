import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import LeftNav from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';

const styles = {
  leftNav: {
    position: 'fixed',
    top: '64px',
    backgroundColor: Colors.pebble,
    color: Colors.arctic
  },
  icon: {
    color: Colors.navigation,
    width: '72px',
    textAlign: 'center'
  },
  link: {
    height: '80px',
    lineHeight: '80px'
  },
  wrap: {
    height: '80px',
    width: '200px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: Colors.arctic
  },
  text: {
    textTransform: 'capitalize'
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
    return links.map((link, index) => {
      let style = {};
      if (link.to === path) {
        style = styles.active;
      }

      return (
        <Link to={link.to} style={{...styles.wrap, ...style}} key={index}>
          <FontIcon style={{...styles.icon, ...style}} className='material-icons'>
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
