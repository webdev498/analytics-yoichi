import React, {PropTypes} from 'react';
import SummaryWidget from 'components/SummaryWidget';

import {
  formatDateInLocalTimeZone
} from 'utils/utils';

const styles = {
  card: {
    fontSize: '13px'
  },
  section: {
    paddingTop: '35px'
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

    let {date, time} = formatDateInLocalTimeZone(data.created);

    return (
      <div style={styles.card}>
        <SummaryWidget data={data} />
        <div style={styles.section}>
          <h5 style={styles.itemTitle}>
            DATE & TIME
          </h5>
          <div>
            {date}
            <span>&nbsp;&nbsp;&nbsp;</span>
            {time}
          </div>
        </div>
      </div>
    );
  }
}

AlertDetailsNew.contextTypes = {
  store: React.PropTypes.object
};

export default AlertDetailsNew;
