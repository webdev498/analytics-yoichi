import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';

import AssetWidget from 'components/AssetWidget';
import {formatBytes, getCountryNameByCountryCode} from 'utils/utils';
import ScoreWidget from 'components/ScoreWidget';

const styles = {
  rankScore: {
    height: '45px',
    width: '45px',
    lineHeight: '45px',
    fontSize: '20px',
    marginTop: '33px'
  },
  list: {
    listStyleType: 'none',
    fontSize: '13px',
    padding: 0,
    margin: 0
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
  subTitle: {
    fontSize: '11px',
    fontWeight: '300'
  },
  titleValue: {
    alignSelf: 'flex-end',
    fontSize: '20px'
  },
  value: {
    fontWeight: '300',
    marginLeft: 'auto'
  },
  heading: {
    fontWeight: '300'
  },
  text: {
    fontSize: '11px',
    textTransform: 'uppercase',
    paddingLeft: '5px',
    fontWeight: '300'
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
    return (data && data.rows && data.rows.length === 1)
      ? data.rows[0][0]
      : 0;
  }

  getElement(report) {
    if (report.title) {
      const listItemStyle = report.subTitle ? {display: 'block'} : {};

      return (
        <li style={{...styles.item, ...listItemStyle}}>
          <h3 style={styles.title}>{report.title}</h3>
          {
            report.subTitle
            ? <div style={styles.subTitle}>{report.subTitle}</div>
            : <span style={{...styles.value, ...styles.titleValue}}>{report.value}</span>
          }
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
      subTitle: '(number of connections)',
      value: null
    });

    reports.taf_asset_top_dest_countries.rows.forEach(([country, count]) => {
      details.push({
        heading: getCountryNameByCountryCode[country],
        value: count.toLocaleString()
      });
    });

    details.push({
      title: 'Source Countries',
      subTitle: '(number of connections)',
      value: null
    });

    reports.taf_asset_top_source_countries.rows.forEach(([country, count]) => {
      details.push({
        heading: getCountryNameByCountryCode[country],
        value: count.toLocaleString()
      });
    });

    return details.map((report) => this.getElement(report));
  }

  render() {
    let {data} = this.props;
    if (!data) return null;

    const {assetDetail, assetReports} = data;

    return (
      <div style={styles.card}>
        <AssetWidget data={assetDetail} style={{padding: 0}} />

        <ScoreWidget scoreValue={assetDetail.risk.score} style={styles.rankScore} />

        <ul style={styles.list}>
          {this.getReports(assetReports)}
        </ul>
      </div>
    );
  }
}

export default AssetDetail;
