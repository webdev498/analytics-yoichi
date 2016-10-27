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
    height: '72px',
    lineHeight: '72px'
  },
  wrap: {
    height: '72px',
    width: '200px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: Colors.arctic
  },
  text: {
    textTransform: 'capitalize',
    fontSize: '13px'
  },
  active: {
    color: Colors.turquoise,
    backgroundColor: Colors.grape
  }
};

class Sidebar extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    location: PropTypes.object.isRequired,
    sidebar: PropTypes.array.isRequired
  }

  getLinks(path) {
    const {sidebar: links} = this.props;
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
