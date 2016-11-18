import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';

import {Colors} from 'theme/colors';

const styles = {
  wrap: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
    top: 0,
    bottom: 0
  },
  searchWrap: {
    display: 'flex',
    backgroundColor: Colors.pebble
  },
  textField: {
    margin: 0,
    border: '1px solid'
  },
  search: {
    display: 'block',
    backgroundColor: 'transparent',
    border: 0,
    outline: 0,
    width: '100%',
    color: Colors.turquoise
  },
  icon: {
    color: Colors.navigation,
    display: 'block',
    height: '72px',
    lineHeight: '72px',
    margin: '0 30px',
    textAlign: 'center',
    cursor: 'pointer'
  }
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    };
  }

  clear = () => {
    this.refs.searchInput.value = '';
  };

  render() {
    const {props} = this;
    return (
      <div style={styles.wrap}>
        <div style={styles.searchWrap}>
          <FontIcon style={styles.icon} className='material-icons' onClick={props.toggleSearch}>
            arrow_back
          </FontIcon>

          <input ref='searchInput' placeholder='Search Assets' style={styles.search} />

          <FontIcon style={styles.icon} className='material-icons' onClick={this.clear}>clear</FontIcon>
        </div>
      </div>
    );
  }
}
