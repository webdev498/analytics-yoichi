import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';

import './Sidebar.scss';

import Search from './Search';

const styles = {
  leftNav: {
    position: 'fixed',
    top: '64px',
    left: 0,
    bottom: 0,
    backgroundColor: Colors.grape,
    color: Colors.arctic,
    zIndex: 10
  },
  search: {
    top: '64px',
    position: 'fixed',
    left: '72px',
    bottom: 0,
    zIndex: 10
  },
  icon: {
    color: Colors.navigation,
    width: '72px',
    textAlign: 'center'
  },
  searchLink: {
    cursor: 'pointer',
    backgroundColor: Colors.search
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
      <div>
        <nav className='sidebar' style={{...styles.leftNav, ...props.style}}>
          <div style={{...styles.wrap, ...styles.searchLink}}
            key='searchlink'
            onClick={props.toggleSearch}
            className='search-link'>
            <FontIcon style={styles.icon} className='material-icons'>search</FontIcon>
            <span style={styles.text}>search</span>
          </div>
          {this.getLinks(props.location.pathname)}
        </nav>
        { props.showSearch ? (
          <Search className='search'
            style={styles.search}
            toggleSearch={props.toggleSearch} />
          )
          : null
        }
      </div>
    );
  }
}

export default Sidebar;
