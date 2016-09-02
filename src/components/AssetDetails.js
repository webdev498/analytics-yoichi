import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';

import AssetWidget from 'components/AssetWidget';

const styles = {
  card: {
    // display: 'flex'
  },
  rankScore: {
    height: '60px',
    width: '60px',
    lineHeight: '60px',
    fontSize: '28px',
    borderRadius: '50%',
    backgroundColor: Colors.coral,
    color: Colors.arctic,
    textAlign: 'center'
  },
  list: {
    listStyleType: 'none',
    fontSize: '13px'
  },
  item: {
    padding: '3px'
  },
  itemTitle: {
    width: '100px',
    display: 'inline-block'
  },
  error: {
    textAlign: 'center',
    marginBottom: '33px'
  }
};

class AssetDetail extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    let {data} = this.props;
    if (!data) return null;

    const {assetDetail, assetReport} = data;

    return (
      <div style={styles.card}>
        <div>
          {<AssetWidget data={assetDetail} />}
        </div>
        <div style={styles.rankScore}>
          {assetDetail.risk.score}
        </div>
      </div>
    );
  }
}

export default AssetDetail;
