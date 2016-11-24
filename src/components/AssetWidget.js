import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

import {Colors} from 'theme/colors';

const styles = {
  wrap: {
    display: 'flex',
    padding: '10px 0',
    color: Colors.grape
  },
  icon: {
    fontSize: '24px'
  },
  imgWrap: {
    fontSize: '24px',
    fontWeight: '100',
    backgroundColor: Colors.smoke,
    color: Colors.white,
    height: '45px',
    width: '45px',
    lineHeight: '45px',
    borderRadius: '50%',
    textAlign: 'center',
    marginRight: '10px'
  },
  heading: {
    textTransform: 'capitalize',
    fontSize: '14px',
    fontWeight: '600'
  },
  subHeading: {
    width: '110px',
    textTransform: 'capitalize',
    fontWeight: 'light',
    overflowWrap: 'break-word'
  }
};

class AssetWidget extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  getImage(asset) {
    if (asset.type === 'user') {
      const name = asset.info.name;

      return (
        <div style={styles.imgWrap}>
          {name[0].toUpperCase()}
        </div>
      );
    }
    else if (asset.type === 'ip') {
      return (
        <div>
          <FontIcon style={{...styles.imgWrap, ...styles.icon}} className='material-icons'>language</FontIcon>
        </div>
      );
    }
    else if (asset.type === 'host' || asset.type === 'machine') {
      return (
        <div>
          <FontIcon style={{...styles.imgWrap, ...styles.icon}} className='material-icons'>desktop_mac</FontIcon>
        </div>
      );
    }

    return null;
  }

  render() {
    const {props} = this,
      info = props.data.info;

    const headingStyle = {...styles.heading, ...props.headingStyle};
    if (!info.title) {
      headingStyle.paddingTop = '5px';
    }

    return (
      <div style={{...styles.wrap, ...props.style}}>
        {this.getImage(props.data)}
        <div>
          <div style={headingStyle}>{info.displayName}</div>
          {info.title ? <div style={styles.subHeading}>{info.title}</div> : null}
          {info.department ? <div style={styles.subHeading}>{info.department}</div> : null}
          {info.servicePack ? <div style={styles.subHeading}>{info.servicePack}</div> : null}
          {info.OS ? <div style={styles.subHeading}>{info.OS}</div> : null}
        </div>
      </div>
    );
  }
}

export default AssetWidget;
