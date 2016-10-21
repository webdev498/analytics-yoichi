import React from 'react';
import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';
import {
  whatIsIt
} from 'utils/utils';

let styles = {
  alert: {},
  listItem: {
    fontSize: '13px',
    color: Colors.grape
  }
};

function getSource(source) {
  if (source) {
    if (source.ip) {
      return (
        <span>
          <span> {source.ip} </span>
          {
            source.country
            ? <span className={'flag-icon flag-icon-' + source.country.toLowerCase()}></span>
            : null
          }
          {
            source.port > 0
            ? <span> on Port {source.port}</span>
            : null
          }
        </span>
      );
    }
  }
  return null;
}

function getDestinaton(dest) {
  if (dest) {
    if (dest.ip) {
      return (
        <span>
          <span> connected to {dest.ip} </span>
          {
            dest.country
            ? <span className={'flag-icon flag-icon-' + dest.country.toLowerCase()}></span>
            : null
          }
          {
            dest.port > 0
            ? <span> on Port {dest.port}</span>
            : null
          }
        </span>
      );
    }
  }

  return null;
}

class TimelineCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnomalyId: ''
    };
    this.getDetails = this.getDetails.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  displayAnomalyIcon(data, key, index) {
    if (data.Type === 'Anomaly' && index === 1) {
      return (
        <div style={{}}>
          {
            (data[key].indexOf('exfiltration') > -1)
            ? <img src='/img/anomaly/exfiltration.png' />
              : (data[key].indexOf('snoop') > -1)
                ? <img src='/img/anomaly/snoop.png' />
                  : (data[key].indexOf('command and control') > -1)
                      ? <img src='/img/anomaly/command-control.png' />
                      : null
          }
        </div>
      );
    }
    else if (data.Type === 'Anomaly' && index !== 1) {
      return (
        <div style={{}}></div>
      );
    }
    else {
      return null;
    }
  }

  getDetails(data) {
    const {props, state} = this;
    if (!data) {
      return;
    }

    let i = 0; // I need to use "i" instead of "index",
    // Becasue we are not displaying all attributes in this same list only.
    // See below where I am incrementing "i". But "index" is always getting increament.
    const that = this;

    return (
      Object.keys(data).map(function(key, index) {
        let fontWeight = (i === 0) ? '600' : 'lighter',
          anomalyType = (data.Type === 'Anomaly' && key === 'Type'),
          displayFlex = data.Type === 'Anomaly' ? {display: 'flex'} : {};

        if (key !== 'Date' && key !== 'id' && !anomalyType) {
          if (whatIsIt(data[key]) === 'String') {
            i++;
            return (
              <li style={{...styles.listItem, fontWeight, ...displayFlex}}>
                {that.displayAnomalyIcon(data, key, i)}
                <div style={{
                  paddingLeft: data.Type === 'Anomaly' ? i === 1 ? '10px' : '40px' : '0px'
                }}>
                  {(data.Type !== 'Anomaly') ? key + ':' : ''} {data[key]}
                </div>
                {
                  (data.Type === 'Anomaly' &&
                    i === 1 &&
                    state.selectedAnomalyId !== '' &&
                    state.selectedAnomalyId === props.data.id)
                  ? <div style={{marginLeft: 'auto'}}>
                    <img src='/img/anomaly/right-arrow-dark.png' />
                  </div>
                  : (data.Type === 'Anomaly' &&
                    i === 1 &&
                    state.selectedAnomalyId !== props.data.id)
                    ? <div style={{marginLeft: 'auto'}}>
                      <img src='/img/anomaly/right-arrow-light.png' />
                    </div>
                    : null
                }
              </li>
            );
          }
          if (key === 'sourceDest' && whatIsIt(data[key]) === 'Object') {
            i++;
            let sourceDest = data[key];
            return (
              <li style={{...styles.listItem, fontWeight, displayFlex}}>
                {sourceDest.source ? getSource(sourceDest.source) : null}
                {sourceDest.dest ? getDestinaton(sourceDest.dest) : null}
              </li>
            );
          }
        }
      })
    );
  }

  handleCardClick() {
    const {props, state} = this;

    return () => {
      switch (props.data.Type) {
        case 'Rank Alert':
          const url = `/alert/${props.data.id}/${props.data.Date}`;
          props.updateRoute(url);
          break;
        case 'Anomaly':
          if (state.selectedAnomalyId !== '' && state.selectedAnomalyId === props.data.id) {
            props.setAnomalyId('');
            this.setState({
              selectedAnomalyId: ''
            });
          }
          else {
            props.setAnomalyId(props.data.id);
            this.setState({
              selectedAnomalyId: props.data.id
            });
          }
          break;
        default:
          break;
      }
    };
  }

  render() {
    const {props, state} = this;
    let cardType = (props.data.Type === 'Alert' || props.data.Type === 'Rank Alert')
      ? 'alert' : 'other';
    console.log(props);
    switch (cardType) {
      case 'alert':
        let borderColor = Colors.cherry,
          score = props.data.Score,
          severity = props.data.Severity;

        if (score) {
          if (score >= 65) {
            borderColor = Colors.cherry;
          }
          if (score < 65 && score >= 35) {
            borderColor = Colors.coral;
          }
          if (score < 35) {
            borderColor = Colors.mustard;
          }
        }
        if (severity) {
          if (severity.toLowerCase() === 'high') {
            borderColor = Colors.cherry;
          }
          if (severity.toLowerCase() === 'medium') {
            borderColor = Colors.coral;
          }
          if (severity.toLowerCase() === 'low') {
            borderColor = Colors.mustard;
          }
        }

        styles.alert = {
          borderLeft: '5px solid ' + borderColor,
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
      <Card style={Object.assign({
        boxShadow: '0px',
        paddingTop: '22px',
        paddingBottom: '22px',
        paddingLeft: '18px',
        paddingRight: '18px',
        height: 'auto',
        width: '450px',
        backgroundColor: ((state.selectedAnomalyId !== '' && state.selectedAnomalyId === props.data.id) ||
          (props.card === 'anomaly_event_card'))
          ? Colors.cloud : Colors.white,
        fontSize: '14px',
        cursor: 'pointer',
        overflowWrap: 'break-word',
        marginBottom: '20px'}, styles.alert)} key={props.id} onClick={this.handleCardClick()}>
        <ul className='no-list-style'>{this.getDetails(props.data)}</ul>
      </Card>
    );
  }
}

export default TimelineCard;
