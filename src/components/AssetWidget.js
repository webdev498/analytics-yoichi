import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';

const styles = {
  wrap: {
    display: 'flex',
    padding: '10px 0'
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
    fontWeight: '600',
    paddingTop: '5px'
  },
  subHeading: {
    textTransform: 'capitalize',
    fontWeight: 'light'
  }
};

class AssetWidget extends React.Component {
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
    else if (asset.type === 'host') {
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
    return (
      <div style={styles.wrap}>
        {this.getImage(props.data)}
        <div>
          <div style={styles.heading}>{info.displayName}</div>
          <div style={styles.subHeading}>{info.title}</div>
        </div>
      </div>
    );
  }
}

export default AssetWidget;
