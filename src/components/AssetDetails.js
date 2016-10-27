import React, {PropTypes} from 'react';

import AssetWidget from 'components/AssetWidget';
import RadarChart from 'components/RadarChart';
import {formatBytes, getCountryNameByCountryCode} from 'utils/utils';
import ScoreWidget from 'components/ScoreWidget';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';

const styles = {
  assetWidget: {
    overflowWrap: 'break-word',
    width: '180px',
    padding: 0
  },
  rankScore: {
    height: '45px',
    width: '45px',
    lineHeight: '45px',
    fontSize: '20px',
    marginRight: '10px'
  },
  scoreDetails: {
    display: 'flex',
    marginTop: '33px',
    cursor: 'pointer'
  },
  scoreDesc: {
    display: 'inline-flex',
    flexGrow: 1
  },
  scoreIcon: {
    marginTop: 0,
    lineHeight: '12px',
    height: '12px',
    width: '24px',
    marginLeft: 'auto'
  },
  chart: {
    position: 'absolute',
    backgroundColor: Colors.cloud,
    left: 0,
    right: 0
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
    margin: 0
  },
  subTitle: {
    fontSize: '11px',
    fontWeight: '300'
  },
  titleValue: {
    fontSize: '18px'
  },
  value: {
    fontWeight: '300',
    fontSize: '16px',
    marginLeft: 'auto'
  },
  heading: {
    fontWeight: '300',
    margin: 0
  },
  text: {
    fontSize: '11px',
    textTransform: 'uppercase',
    paddingLeft: '2px',
    fontWeight: '600'
  },
  icon: {
    width: '12px',
    lineHeight: '14px',
    marginTop: 'auto'
  },
  change: {
    fontSize: '11px',
    marginLeft: '15px',
    display: 'inline-flex',
    textAlign: 'right'
  },
  percent: {
    width: '40px'
  }
};

function getArrowIcon(change) {
  if (change !== 'N/A') {
    if (parseFloat(change) > 0) {
      return <FontIcon style={styles.icon} className='material-icons'>arrow_drop_up</FontIcon>;
    }
    else if (parseFloat(change) < 0) {
      return <FontIcon style={styles.icon} className='material-icons'>arrow_drop_down</FontIcon>;
    }
    else {
      return <FontIcon style={{...styles.icon, visibility: 'hidden'}} className='material-icons'>
        arrow_drop_down
      </FontIcon>;
    }
  }
  else {
    return <span style={styles.icon}>-</span>;
  }
}

class AssetDetail extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    chartOptions: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      chartOpen: false
    };
  }

  getValue(data) {
    return (data && data.rows && data.rows.length === 1)
      ? {
        value: data.rows[0][0][0],
        change: data.rows[0][0][2]
      }
      : {value: 0, change: 0};
  }

  getChangeElement(change) {
    // change = Math.round(change * 100) / 100;
    change = parseFloat(change).toFixed(2);
    return (
      <span style={styles.change}>
        <span style={styles.percent}>{Math.abs(change)} %</span>
        {getArrowIcon(change)}
      </span>
    );
  }

  getElement(report, index) {
    let value = '', change = null;

    if (report.value !== undefined && report.value !== null) {
      value = report.value.value;
      change = report.value.change;
    }

    if (report.title) {
      const listItemStyle = report.subTitle ? {display: 'block'} : {};
      return (
        <li style={{...styles.item, ...listItemStyle, paddingTop: '30px'}} key={`assetDetail${index}`}>
          <h3 style={styles.title}>{report.title}</h3>
          {
            report.subTitle
            ? <div style={styles.subTitle}>{report.subTitle}</div>
            : (
              <div style={{marginLeft: 'auto'}}>
                <span style={{...styles.value, ...styles.titleValue}}>{value}</span>
                {
                  typeof change === 'number'
                  ? this.getChangeElement(change)
                  : null
                }
              </div>
            )
          }
        </li>
      );
    }
    else {
      return (
        <li style={styles.item} key={`assetDetail${index}`}>
          <h3 style={styles.heading}>{report.heading}</h3>
          <div style={{marginLeft: 'auto'}}>
            <span style={styles.value}>{value}</span>
            {
              typeof change === 'number'
              ? this.getChangeElement(change)
              : null
            }
          </div>
        </li>
      );
    }
  }

  getReports(reports) {
    const details = [];
    let value = this.getValue(reports.taf_asset_session_count_time_shifted);
    details.push({
      title: 'sessions',
      value
    });

    value = this.getValue(reports.taf_asset_internal_resource_count_time_shifted);
    details.push({
      title: 'assets accessed',
      value
    });

    details.push({
      title: 'Incoming Bandwidth',
      value: null
    });

    value = this.getValue(reports.taf_asset_total_incoming_bandwidth_external_time_shifted);
    value.value = formatBytes(value.value, 2, {numberStyle: styles.value, textStyle: styles.text});
    details.push({
      heading: 'External',
      value
    });

    value = this.getValue(reports.taf_asset_total_incoming_bandwidth_internal_time_shifted);
    value.value = formatBytes(value.value, 2, {numberStyle: styles.value, textStyle: styles.text});
    details.push({
      heading: 'Internal',
      value
    });

    details.push({
      title: 'Outgoing Bandwidth',
      value: null
    });

    value = this.getValue(reports.taf_asset_total_outgoing_bandwidth_external_time_shifted);
    value.value = formatBytes(value.value, 2, {numberStyle: styles.value, textStyle: styles.text});
    details.push({
      heading: 'External',
      value
    });

    value = this.getValue(reports.taf_asset_total_outgoing_bandwidth_internal_time_shifted);
    value.value = formatBytes(value.value, 2, {numberStyle: styles.value, textStyle: styles.text});
    details.push({
      heading: 'Internal',
      value
    });

    details.push({
      title: 'Destination Countries',
      subTitle: '(number of connections)',
      value: null
    });

    reports.taf_asset_top_dest_countries.rows.forEach(([country, count]) => {
      details.push({
        heading: getCountryNameByCountryCode[country],
        value: {value: count.toLocaleString()}
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
        value: {value: count.toLocaleString()}
      });
    });

    return details.map((report, index) => this.getElement(report, index));
  }

  toggleRadarChart() {
    return () => {
      if (this.state.chartOpen) {
        this.setState({chartOpen: false});
      }
      else {
        this.setState({chartOpen: true});
      }
    };
  }

  getRadarChart() {
    const {data: {assetDetail}, chartOptions} = this.props,
      {risk: {score}} = assetDetail;

    chartOptions.paletteColors = (score >= 60 && score <= 100) ? Colors.coral : Colors.mustard;

    const radarChartProps = {
      chartOptions,
      'attributes': {
        'chartWidth': '100%',
        'chartHeight': '240',
        'style': styles.chart,
        id: 'score-justification'
      },
      data: assetDetail.risk.scoreDetails
    };

    return <RadarChart {...radarChartProps} />;
  }

  render() {
    let {data} = this.props;
    if (!data) return null;

    const {assetDetail, assetReports} = data;

    let chartWrapStyle = {
        height: 0,
        opacity: 0,
        marginTop: 0,
        transition: 'height .3s, opacity .3s, margin .3s'
      },
      listStyle = styles.list,
      iconStyle = {...styles.icon, ...styles.scoreIcon, transition: 'transform .3s'};

    if (this.state.chartOpen) {
      chartWrapStyle = Object.assign({}, chartWrapStyle, {height: '220px', opacity: 1, marginTop: '15px'});
      listStyle = Object.assign({}, styles.list);
      iconStyle = Object.assign({}, iconStyle, {transform: 'rotate(180deg)'});
    }

    return (
      <div style={styles.card}>
        <AssetWidget data={assetDetail} style={{padding: 0}} headingStyle={styles.assetWidget} />

        <div style={styles.scoreDetails} onClick={this.toggleRadarChart()}>
          <ScoreWidget scoreValue={assetDetail.risk.score} style={styles.rankScore} />
          <div style={styles.scoreDesc}>
            <h3 style={{...styles.title, ...styles.scoreTitle}}>Score</h3>
            <FontIcon style={iconStyle} className='material-icons'>
              arrow_drop_down
            </FontIcon>
          </div>
        </div>

        <div style={chartWrapStyle}>
          {this.getRadarChart()}
        </div>

        <ul style={listStyle}>
          {this.getReports(assetReports)}
        </ul>
      </div>
    );
  }
}

export default AssetDetail;
