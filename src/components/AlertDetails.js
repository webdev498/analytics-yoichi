import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';

import { connect } from 'react-redux';
import {fetchTrafficDetailsApiData} from 'actions/ParentCard';

import {
  formatDateInLocalTimeZone
} from 'utils/utils';

const styles = {
  card: {
    display: 'flex'
  },
  rankScore: {
    height: '100px',
    width: '100px',
    lineHeight: '100px',
    fontSize: '35px',
    fontWeight: '600',
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

class AlertDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  // constructor(props) {
  //   super(props);

  //   this.getTrafficDetails = this.getTrafficDetails.bind(this);
  //   this._getAlertParams = this._getAlertParams.bind(this);
  //   this.getAlertDetails = this.getAlertDetails.bind(this);
  // }

  getTrafficDetails() {
    const data = this.props.data.data.rank_alert;
    const {props} = this;
    console.log('from alert details:', props);
    const {id, api} = props.meta.fetchDataFor;
    api.queryParams.filter = encodeURI(data.trafficFilter);
    api.queryParams.date = data.triggered || props.params.date;
    props.fetchTrafficDetailsApiData(id, api, data.trafficFilter, api.queryParams.date);
  }

  _getAlertParams() {
    const alertDetails = this.props.data;
    const params = [];
    const source = alertDetails.source;
    if (source) {
      source.ip && params.push({text: 'From IP ' + source.ip});
      source.port && params.push({text: ' : ' + source.port});
      source.country && params.push({text: source.country, flag: source.country.toLowerCase()});
      // source.country && params.push({text: ':' + source.country});

      const additionalInfo = source.additionalInfo;
      if (additionalInfo) {
        additionalInfo.user && params.push({text: ' initiated by ' + additionalInfo.user});
        additionalInfo.machine && params.push({text: ' initiated by ' + additionalInfo.machine});
      }
    }

    if (alertDetails.destination) {
      const dest = alertDetails.destination;

      dest.ip && params.push({text: ' to IP ' + dest.ip});
      dest.port && params.push({text: ' : ' + dest.port});
      dest.country && params.push({text: dest.county, flat: dest.country.toLowerCase()});
      // dest.reputation &&
      const additionalInfo = dest.additionalInfo;
      if (additionalInfo) {
        additionalInfo.user && params.push({text: ' initiated by ' + additionalInfo.user});
        additionalInfo.machine && params.push({text: ' initiated by ' + additionalInfo.machine});
      }
    }

    return params;
  }

  getAlertDetails() {
    return this._getAlertParams().map((item) => {
      if (item.flag) {
        (
          <span>
            <span>{item.text}</span>
            <span className={'flag-icon flag-icon-' + item.country}></span>
          </span>
        );
      }
      else {
        return (<span>{item.text}</span>);
      }
    });
  }

  render() {
    let {data} = this.props;
    if (!data) return null;

    if (data.errorCode) {
      return <div style={styles.error}><b>Error:</b> &nbsp; {data.errorMessage}</div>;
    }

    data = data.data.rank_alert;

    // should be called when the main page data is loaded,
    // or get the api updated.
    this.getTrafficDetails();

    let dateTime = formatDateInLocalTimeZone(data.created),
      dateFormatted = dateTime.date + ' ' + dateTime.time;

    return (
      <div style={styles.card}>
        <div style={styles.rankScore}>
          {data.score}
        </div>
        <div style={styles.details}>
          <ul style={styles.list}>
            <li style={styles.item}>
              <b style={styles.itemTitle}>
                Date
              </b>
              <span>{dateFormatted}</span>
            </li>
            <li style={styles.item}>
              <b style={styles.itemTitle}>
                Description
              </b>
              <span>{data.description}</span>
            </li>
            <li style={styles.item}>
              <b style={styles.itemTitle}>
                Message
              </b>
              <span>{data.message}</span>
            </li>
            <li style={styles.item}>
              <b style={styles.itemTitle}>
                Details
              </b>
              <span>
                {this.getAlertDetails()}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  fetchTrafficDetailsApiData
})(AlertDetails);
