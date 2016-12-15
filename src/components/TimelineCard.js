import React, {PropTypes} from 'react';
import Card from 'material-ui/Card/Card';
import {Colors} from 'theme/colors';
import {getColor} from 'utils/utils';
import {getCountryNameByCountryCode} from 'utils/countryUtils';
import MultiSeriesCombiChart from 'components/MultiSeriesCombiChart';

let styles = {
  alert: {},
  list: {
    width: '100%'
  },
  listItem: {
    fontSize: '13px',
    color: Colors.grape
  },
  title: {
    'fontSize': '13px',
    'fontWeight': 600,
    'margin': 0,
    'paddingBottom': '10px'
  },
  timelineCard: {
    boxShadow: '0px',
    paddingTop: '22px',
    paddingBottom: '22px',
    paddingLeft: '18px',
    paddingRight: '18px',
    height: 'auto',
    fontSize: '14px',
    overflowWrap: 'break-word',
    marginBottom: '20px'
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

function getDetailsArrow(selected) {
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

    this.cardType = '';
    this.clickCards = ['Anomaly', 'Rank Alert', 'Session'];
    this.loadDetailsCards = ['Anomaly', 'Session'];
    this.isClickCard = false;
    this.isLoadDetails = false;
    this.displayFlex = {};

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  getDetails(data) {
    if (!data) {
      return;
    }

    return (
      Object.keys(data.display).map((key, index) => {
        if (key === 'sourceDest') {
          return this.getSourceDestination(data);
        }
        else if (key === 'summary') {
          return (
            <li style={{...styles.listItem}} key='summary'>
              <div style={{alignItems: 'center'}}>
                {
                  data.display.summary.Internal
                  ? this.displayInOutSummary(data.display.summary.Internal, 'Internal')
                  : null
                }
                {
                  data.display.summary.External
                  ? this.displayInOutSummary(data.display.summary.External, 'External')
                  : null
                }
              </div>
            </li>
          );
        }
        return this.displayDetails(key, index, data);
      })
    );
  }

  displayDetails(key, index, data) {
    let {props} = this;

    let fontWeight = (index === 0) ? 'bold' : '',
      currentDetails = data.display[key];

    if (currentDetails.value !== '') {
      return (
        <li style={{...styles.listItem}} key={`desc${index}`}>
          <div style={{fontWeight, ...this.displayFlex}}>
            {data.isIconDisplay ? this.displayIcon(index, currentDetails.value) : null}
            <div style={{ paddingLeft: data.isIconDisplay ? index === 0 ? '10px' : '40px' : '0px' }}>
              {currentDetails.displayKey ? key + ':' : ''} {currentDetails.value}
            </div>
            {
              this.isLoadDetails && index === 0
              ? props.selectedCardId !== '' && props.selectedCardId === props.data.id
                ? getDetailsArrow(true)
                : getDetailsArrow(false)
              : null
            }
          </div>
        </li>
      );
    }
    return null;
  }

  displayInOutSummary(data, type) {
    return (
      <div style={{display: 'flex'}}>
        <div>{type}:</div>
        <div><img src='/img/incoming-bandwidth.png' /></div>
        <div>{data.IncomingBandwidth}</div>
        <div><img src='/img/outgoing-bandwidth.png' /></div>
        <div>{data.OutgoingBandwidth}</div>
        <div><img src='/img/machines.png' /></div>
        <div>{data.Machines}</div>
        <div><img src='/img/connections.png' /></div>
        <div>{data.Connections}</div>
      </div>
    );
  }

  getSourceDestination(data) {
    let {display: {sourceDest}, id} = data,
      source = sourceDest.source ? sourceDest.source : {},
      dest = sourceDest.dest ? sourceDest.dest : {};
    return (
      <li style={{...styles.listItem}} key={'sourceDest' + id}>
        <div style={{fontWeight: '600', ...this.displayFlex}}>
          {sourceDest.source ? getSourceDestination(source) : null}
          {sourceDest.dest ? getSourceDestination(dest) : null}
        </div>
      </li>
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
            let user = '',
              machine = '';
            if (props.data.display.User) {
              user = props.data.display.User.value;
            }
            else if (props.data.User) {
              user = props.data.User;
            }
            if (props.data.display.Machine) {
              machine = props.data.display.Machine.value;
            }
            else if (props.data.Machine) {
              machine = props.data.Machine;
            }
            details = {
              id: props.id,
              selectedCardId: props.data.id,
              eventDate: props.data.Date,
              user: user,
              machine: machine,
              start: props.data.Date ? props.data.Date : '',
              end: props.data.endDate ? props.data.endDate : ''
            };
          }
          props.getContextualMenuApiObj(details);
          break;
        default:
          break;
      }
    };
  }

  displayIcon(index, value) {
    if (index === 0) {
      value = value.toLowerCase();
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

  getAlertBorder(data) {
    let isAlert = (this.cardType === 'Alert' || this.cardType === 'Rank Alert') ? 'alert' : 'other',
      score = data.display.Score ? data.display.Score.value : '',
      severity = data.display.Severity ? data.display.Severity.value : '';

    switch (isAlert) {
      case 'alert':
        styles.alert = {
          borderLeft: '5px solid ' + getColor(score, severity),
          paddingLeft: '18px'
        };
        break;
      default:
        styles.alert = {
          paddingLeft: '22px'
        };
        break;
    }
  }

  getCardType(data) {
    let cardType = '';
    if (data.Type) {
      cardType = data.Type;
    }
    else if (data.display.Type) {
      cardType = data.display.Type;
    }
    return cardType;
  }

  render() {
    const {props, props: {data}} = this;
    this.cardType = this.getCardType(data);
    this.isClickCard = this.clickCards.includes(this.cardType);
    this.isLoadDetails = this.loadDetailsCards.includes(this.cardType);
    this.displayFlex = data.isIconDisplay || this.isLoadDetails ? {display: 'flex'} : {};
    this.getAlertBorder(data);

    if (props.data.chart) {
      styles.list = Object.assign({}, styles.list, {paddingLeft: '20px'});
    }

    return (
      <Card
        style={
          Object.assign({}, styles.timelineCard, {
            width: props.data.chart ? '800px' : '350px', // These widths are not provided by Rose.
            cursor: this.isClickCard ? 'pointer' : 'auto',
            backgroundColor: (
              (props.selectedCardId !== '' && props.selectedCardId === props.data.id))
              ? Colors.cloud : Colors.white}, styles.alert)
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
            style={styles.list}>
            {this.getDetails(props.data)}
          </ul>
        </div>
      </Card>
    );
  }
}

export default TimelineCard;
