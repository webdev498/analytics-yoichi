import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';

import {
  formatDateInLocalTimeZone
} from 'utils/utils';

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

class AlertDetailsNew extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    let {data} = this.props;
    if (!data) return null;

    if (data.errorCode) {
      return <div style={styles.error}><b>Error:</b> &nbsp; {data.errorMessage}</div>;
    }

    data = data.data.rank_alert;

    let dateTime = formatDateInLocalTimeZone(data.created),
      dateFormatted = dateTime.date + ' ' + dateTime.time;

    return (
      <div style={styles.card}>
        <div style={styles.rankScore}>
          {data.score}
        </div>
        <div>
          <h5 style={styles.itemTitle}>
            Summary
          </h5>
          <div>
            {data.message}
          </div>
        </div>
        <div>
          <h5 style={styles.itemTitle}>
            DATE & TIME
          </h5>
          <div>{dateFormatted}</div>
        </div>
      </div>
    );
  }
}

AlertDetailsNew.contextTypes = {
  store: React.PropTypes.object
};

export default AlertDetailsNew;
