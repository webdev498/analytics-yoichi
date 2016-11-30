import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';

import {Colors} from 'theme/colors';

const styles = {
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
  assetName: {
    textTransform: 'none',
    fontSize: '14px',
    overflowWrap: 'break-word',
    paddingTop: '5px'
  }
};

class AssetIconWidget extends React.Component {
  static propTypes = {
    asset: PropTypes.object.isRequired
  }

  getImage() {
    let {asset} = this.props;
    asset = asset.row[0];

    if (asset.type === 'user') {
      const name = asset.info.name;

      return (
        <div style={{display: 'flex', color: 'rgb(68, 76, 99)'}}>
          <div style={styles.imgWrap}>
            {name[0].toUpperCase()}
          </div>
          <div>
            <div style={styles.assetName}>
              {asset.info.displayName}
            </div>
          </div>
        </div>
      );
    }
    else if (asset.type === 'ip') {
      return (
        <div style={{display: 'flex', color: 'rgb(68, 76, 99)'}}>
          <div>
            <FontIcon style={{...styles.imgWrap, ...styles.icon}} className='material-icons'>language</FontIcon>
          </div>
          <div>
            <div style={styles.assetName}>
              {asset.info.displayName}
            </div>
          </div>
        </div>
      );
    }
    else if (asset.type === 'host' || asset.type === 'machine') {
      return (
        <div style={{display: 'flex', color: 'rgb(68, 76, 99)'}}>
          <div>
            <FontIcon style={{...styles.imgWrap, ...styles.icon}} className='material-icons'>desktop_mac</FontIcon>
          </div>
            <div style={styles.assetName}>
              {asset.info.displayName}
            </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return this.getImage();
  }
}

export default AssetIconWidget;
