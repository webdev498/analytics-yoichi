import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';

import AssetWidget from 'components/AssetWidget';
import {formatBytes} from 'utils/utils';

const styles = {
  card: {
    paddingBottom: '33px'
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
    fontSize: '13px',
    marginTop: '33px',
    padding: '0 33px',
    backgroundColor: Colors.subHeadingBGColor,
    position: 'absolute',
    left: 0,
    right: 0
  },
  item: {
    display: 'flex',
    paddingTop: '5px'
  },
  title: {
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'capitalize',
    margin: 0,
    paddingTop: '30px',
    display: 'inline-block'
  },
  titleValue: {
    alignSelf: 'flex-end',
    fontSize: '20px'
  },
  value: {
    color: Colors.coral,
    marginLeft: 'auto'
  },
  heading: {
  },
  text: {
    fontSize: '11px',
    color: Colors.smoke,
    textTransform: 'uppercase',
    paddingLeft: '5px'
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

  getValue(data) {
    return (data.rows & data.rows.length === 1)
      ? data.rows[0][0]
      : 0;
  }

  getElement(report) {
    if (report.title) {
      return (
        <li style={styles.item}>
          <h3 style={styles.title}>{report.title}</h3>
          <span style={{...styles.value, ...styles.titleValue}}>{report.value}</span>
        </li>
      );
    }
    else {
      return (
        <li style={styles.item}>
          <span style={styles.heading}>{report.heading}</span>
          <span style={styles.value}>{report.value}</span>
        </li>
      );
    }
  }

  getReports(reports) {
    const details = [];

    details.push({
      title: 'sessions',
      value: this.getValue(reports.taf_asset_session_count)
    });

    details.push({
      title: 'assets accessed',
      value: this.getValue(reports.taf_asset_internal_resource_count)
    });

    details.push({
      title: 'Incoming Bandwidth',
      value: null
    });

    details.push({
      heading: 'External',
      value: formatBytes(this.getValue(reports.taf_asset_total_incoming_bandwidth_external), 2,
                          {numberStyle: styles.value, textStyle: styles.text})
    });

    details.push({
      heading: 'Internal',
      value: formatBytes(this.getValue(reports.taf_asset_total_incoming_bandwidth_internal), 2,
                          {numberStyle: styles.value, textStyle: styles.text})
    });

    details.push({
      title: 'Outgoing Bandwidth',
      value: null
    });

    details.push({
      heading: 'External',
      value: formatBytes(this.getValue(reports.taf_asset_total_outgoing_bandwidth_external), 2,
                          {numberStyle: styles.value, textStyle: styles.text})
    });

    details.push({
      heading: 'Internal',
      value: formatBytes(this.getValue(reports.taf_asset_total_outgoing_bandwidth_internal), 2,
                          {numberStyle: styles.value, textStyle: styles.text})
    });

    details.push({
      title: 'Destination Countries',
      value: null
    });

    reports.taf_asset_top_dest_countries.rows.forEach(([country, count]) => {
      details.push({
        heading: country,
        value: count
      });
    });

    // details.push({
    //   title: 'Source Countries',
    //   value: null
    // });

    // reports.taf_asset_top_source_countries.rows.forEach(({row: [country, count]}) => {
    //   details.push({
    //     heading: country,
    //     value: count
    //   });
    // });

    // details.push({
    //   heading: 'Countries',
    //   value: this.getValue(reports.taf_asset_top_source_countries)
    // });

    return details.map((report) => this.getElement(report));
  }

  render() {
    let {data} = this.props;
    if (!data) return null;

    const {assetDetail, assetReports} = data;

    console.log(assetReports);

    return (
      <div style={styles.card}>
        <div>
          {<AssetWidget data={assetDetail} />}
        </div>
        <div style={styles.rankScore}>
          {assetDetail.risk.score}
        </div>
        <ul style={styles.list}>
          {this.getReports(assetReports)}
        </ul>
      </div>
    );
  }
}

export default AssetDetail;
