import React from 'react';
import Card from 'material-ui/Card/Card';
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
            ? <span className={'flag-icon flag-icon-' + source.country.toLowerCase()} />
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
            ? <span className={'flag-icon flag-icon-' + dest.country.toLowerCase()} />
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
    this.getDetails = this.getDetails.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  getDetails(data) {
    if (!data) {
      return;
    }

    return (
      Object.keys(data).map(function(key, index) {
        let fontWeight = (index === 0) ? '600' : 'lighter',
          anomalyType = (data.Type === 'Anomaly' && key === 'Type');

        if (key !== 'Date' && key !== 'id' && !anomalyType) {
          if (whatIsIt(data[key]) === 'String') {
            return (
              <li style={{...styles.listItem, fontWeight}} key={`desc${index}`}>
                {(data.Type !== 'Anomaly') ? key + ':' : ''} {data[key]}
              </li>
            );
          }
          if (key === 'sourceDest' && whatIsIt(data[key]) === 'Object') {
            let sourceDest = data[key];
            return (
              <li style={{...styles.listItem, fontWeight}} key={`desc${index}`}>
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
    const {props} = this;

    return () => {
      switch (props.data.Type) {
        case 'Rank Alert':
          const url = `/alert/${props.data.id}/${props.data.Date}`;
          props.updateRoute(url);
          break;
        case 'Anomaly':
          // here code will come for anomaly card click.
          break;
        default:
          break;
      }
    };
  }

  render() {
    const {props} = this;
    let cardType = (props.data.Type === 'Alert' || props.data.Type === 'Rank Alert')
      ? 'alert' : 'other';
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
        backgroundColor: Colors.white,
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
