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
    fontSize: '13px',
    display: 'inline-block',
    fontWeight: '600',
    margin: 0
  },
  date: {
    fontWeight: '300'
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

  componentWillReceiveProps(nextProps) {
    const {data, meta, params, fetchApiData} = nextProps;

    if (data) {
      const {data: {rank_alert: {chartsFilter}}} = data;

      if (chartsFilter) {
        const {fetchDataFor: {id, api}} = meta;
        fetchApiData(id, api, params, chartsFilter);
      }
    }
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
          <div style={styles.date}>
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
