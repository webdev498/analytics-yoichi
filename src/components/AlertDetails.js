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

class AlertDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    this.loadTimeline(nextProps);
  }

  loadTimeline(props) {
    let {data, params, options} = props;

    if (!data) return;

    let alertName = data.data.rank_alert.name,
      apiPath = '/api/alert/traffic',
      pathParams = {};

    if (alertName && alertName === 'anomaly') {
      apiPath = '/api/anomaly/{alertId}/timeline';
      pathParams = {
        alertId: ':pathParam'
      };
    }
    let apiObj = {
      method: 'GET',
      path: apiPath,
      pathParams: pathParams,
      queryParams: {
        count: 10,
        from: 0,
        window: '',
        filter: data.data.rank_alert.trafficFilter,
        date: 'date:pathParam'
      }
    };

    options = Object.assign({}, options, {
      customParams: {
        alertType: data.data.rank_alert.name,
        filter: data.data.rank_alert.trafficFilter
      }
    });

    props.fetchApiData(props.timelineId, apiObj, params, options);
  }

  render() {
    let {data} = this.props;
    if (!data) return null;

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

AlertDetails.contextTypes = {
  store: React.PropTypes.object
};

export default AlertDetails;
