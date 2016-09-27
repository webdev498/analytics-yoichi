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

  callApi(apiObj, props) {
    const {id, api} = apiObj;
    const {params, fetchApiData, data} = props;

    if (api.method === 'POST') {
      let body = data;

      const bodyPath = api.body.replace('$customParam', ''),
        keys = bodyPath.split('.');

      keys.forEach(key => {
        body = body[key];
      });

      fetchApiData(id, api, params, body);
    }
    else {
      const updatedQueryParams = Object.assign({}, api.queryParams, {
        filter: data.data.rank_alert.trafficFilter,
        date: params.date
      });

      const updatedApi = Object.assign({}, api, {queryParams: updatedQueryParams});

      console.log('updatedApi', updatedApi, api);

      fetchApiData(id, updatedApi, params);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    let {meta: {fetchDataFor}} = nextProps;
    if (data && fetchDataFor) {
      if (!Array.isArray(fetchDataFor)) {
        fetchDataFor = [fetchDataFor];
      }

      fetchDataFor.forEach(apiObj => {
        this.callApi(apiObj, nextProps);
      });
    }
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

AlertDetailsNew.contextTypes = {
  store: React.PropTypes.object
};

export default AlertDetailsNew;
