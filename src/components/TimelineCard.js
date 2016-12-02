import React, {PropTypes} from 'react';
import Card from 'material-ui/Card/Card';
import {Colors} from 'theme/colors';
import {whatIsIt, getColor} from 'utils/utils';
import {getCountryNameByCountryCode} from 'utils/countryUtils';
import MultiSeriesCombiChart from 'components/MultiSeriesCombiChart';

let styles = {
  alert: {},
  listItem: {
    fontSize: '13px',
    color: Colors.grape
  },
  title: {
    'fontSize': '13px',
    'fontWeight': 600,
    'margin': 0,
    'paddingBottom': '10px'
  }
};

function getSourceDestination(data) {
  if (data.ip) {
    let country = data.country ? getCountryNameByCountryCode[data.country.toUpperCase()] : '';
    return (
      <span>
        <span> {data.ip} </span>
        {
          data.country
          ? <span className={'flag-icon flag-icon-' + data.country.toLowerCase()} rel='tooltip'
            title={country} />
          : null
        }
        {
          data.port > 0
          ? <span> on Port {data.port}</span>
          : null
        }
      </span>
    );
  }
  return null;
}

function getAnomalyArrow(selected) {
  let arrowName = selected ? 'right-arrow-dark' : 'right-arrow-light',
    arrowPath = '/img/' + arrowName + '.png';
  return (
    <div style={{marginLeft: 'auto'}}>
      <img src={arrowPath} />
    </div>
  );
}

class TimelineCard extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {data} = props;

    this.cardType = data.session ? 'Session' : data.Type;
    this.isLinkCard = (this.cardType === 'Anomaly' || this.cardType === 'Rank Alert' || this.cardType === 'Session');

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  getDetails(data) {
    if (!data) {
      return;
    }

    let i = 0; // I need to use "i" instead of "index",
    // Becasue we are not displaying all attributes in this same list.
    // See below where I am incrementing "i". But "index" is always getting increament.

    return (
      Object.keys(data).map((key, index) => {
        let isAnomaly = (this.cardType === 'Anomaly' && key === 'Type'),
          fontWeight = (i === 0 && key !== 'Type') ? '600' : 'lighter',
          displayFlex = this.cardType === 'Anomaly' ? {display: 'flex'} : {};
        if (key !== 'Date' && key !== 'id' && !isAnomaly) {
          i++;
          let params = {
            i,
            key,
            index,
            data,
            fontWeight,
            displayFlex
          };
          return this.displayDetails(params);
        }
      })
    );
  }

  displayDetails(params) {
    let {key, index, data} = params;

    const updatedData = Object.assign({}, data);
    if (data.Type === 'Rank Alert') {
      delete updatedData.Type;
    }

    if (key.includes('Param')) {
      return null;
    }

    return (
      <li style={{...styles.listItem}} key={`desc${index}`}>
        {
          whatIsIt(updatedData[key]) === 'String' && key !== 'session'
          ? this.getStringDetails(params)
          : (key === 'sourceDest' && whatIsIt(updatedData[key]) === 'Object')
            ? this.getObjectDetails(params)
            : null
        }
      </li>
    );
  }

  getStringDetails(params) {
    const {props} = this;
    let {i, key, data, fontWeight, displayFlex} = params;
    return (
      <div style={{fontWeight, ...displayFlex}}>
        {this.displayAnomalyIcon(data, key, i)}
        <div style={{
          paddingLeft: this.cardType === 'Anomaly' ? i === 1 ? '10px' : '40px' : '0px'
        }}>
          {(this.cardType !== 'Anomaly') ? key + ':' : ''} {data[key]}
        </div>
        {
          this.cardType !== 'Anomaly'
          ? null
          : i !== 1
            ? null
            : props.selectedCardId !== '' && props.selectedCardId === props.data.id
              ? getAnomalyArrow(true)
              : getAnomalyArrow(false)
        }
      </div>
    );
  }

  getObjectDetails(params) {
    let {key, data, fontWeight, displayFlex} = params,
      sourceDest = data[key],
      source = sourceDest.source ? sourceDest.source : {},
      dest = sourceDest.dest ? sourceDest.dest : {};
    return (
      <div style={{fontWeight, ...displayFlex}}>
        {sourceDest.source ? getSourceDestination(source) : null}
        {sourceDest.dest ? getSourceDestination(dest) : null}
      </div>
    );
  }

  handleCardClick() {
    const {props} = this;
    let details = {
      selectedCardId: '',
      eventDate: ''
    };

    return () => {
      switch (this.cardType) {
        case 'Rank Alert':
          const url = `/alert/${props.data.id}/${props.data.Date}`;
          props.updateRoute(url);
          break;
        case 'Anomaly': {
          if (props.selectedCardId !== props.data.id) {
            details = {
              selectedCardId: props.data.id,
              eventDate: props.data.Date
            };
          }
          props.getContextualMenuApiObj(details);
          break;
        }
        case 'Session':
          if (props.selectedCardId !== props.data.id) {
            details = {
              selectedCardId: props.data.id,
              eventDate: props.data.Date,
              user: props.data.User ? props.data.User : '',
              machine: props.data.Machine ? props.data.Machine : '',
              start: props.data.Date ? props.data.Date : '',
              end: props.data.endParam ? props.data.endParam : ''
            };
          }
          props.getContextualMenuApiObj(details);
          break;
        default:
          break;
      }
    };
  }

  displayAnomalyIcon(data, key, index) {
    if (this.cardType === 'Anomaly') {
      if (index === 1) {
        let value = data[key].toLowerCase();
        return (
          <div>
            {
              (value.includes('snoop'))
              ? <img src='/img/anomaly/snoop.png' />
              : (value.includes('exfiltration') || value.includes('exfiltrate'))
                ? <img src='/img/anomaly/exfiltration.png' />
                : (value.includes('command and control'))
                  ? <img src='/img/anomaly/command-control.png' />
                  : null
            }
          </div>
        );
      }
      else {
        return (<div />);
      }
    }

    return null;
  }

  getAnomalyChart() {
    const {props} = this,
      {id, attributes, chart, data} = props,
      chartData = data.chart,
      chartProps = {
        attributes: {
          id,
          ...attributes.chart
        },
        processedData: true
      },
      uiConfig = chartData.uiConfig;

    chartData.chart = chart.chartOptions;
    chartData.chart.divlineThickness = 1;
    chartData.chart.xAxisName = uiConfig.xAxisLabel;
    chartData.chart.yAxisName = uiConfig.yAxisLabel;
    chartData.chart.canvasBgColor = 'transparent';
    chartData.chart.bgColor = 'transparent';

    chartProps.data = JSON.parse(JSON.stringify(chartData));
    delete chartProps.data.uiConfig;

    return (
      <div>
        <h2 style={styles.title}>{uiConfig.title}</h2>
        <MultiSeriesCombiChart {...chartProps} />
      </div>
    );
  }

  render() {
    const {props, props: {data}} = this;

    this.cardType = data.session ? 'Session' : data.Type;
    this.isLinkCard = (this.cardType === 'Anomaly' || this.cardType === 'Rank Alert' || this.cardType === 'Session');

    let isAlert = (this.cardType === 'Alert' || this.cardType === 'Rank Alert') ? 'alert' : 'other';

    switch (isAlert) {
      case 'alert':
        styles.alert = {
          borderLeft: '5px solid ' + getColor(data.Score, data.Severity),
          paddingLeft: '18px'
        };
        break;
      default:
        styles.alert = {
          paddingLeft: '22px'
        };
        break;
    }

    return (
      <Card
        style={
          Object.assign({
            boxShadow: '0px',
            paddingTop: '22px',
            paddingBottom: '22px',
            paddingLeft: '18px',
            paddingRight: '18px',
            height: 'auto',
            width: props.data.chart ? '800px' : '350px',
            fontSize: '14px',
            cursor: this.isLinkCard ? 'pointer' : 'auto',
            overflowWrap: 'break-word',
            backgroundColor: (
              (props.selectedCardId !== '' && props.selectedCardId === props.data.id))
              ? Colors.cloud : Colors.white,
            marginBottom: '20px'}, styles.alert)
        }
        onClick={this.handleCardClick()}
        key={props.id}>
          <div style={{display: 'flex'}}>
            {
              props.data.chart
              ? this.getAnomalyChart(props.data.chart)
              : null
            }
            <ul className='no-list-style'
              style={props.data.chart ? {paddingLeft: '20px'} : {}}>
              {this.getDetails(props.data)}
            </ul>
          </div>
      </Card>
    );
  }
}

export default TimelineCard;
