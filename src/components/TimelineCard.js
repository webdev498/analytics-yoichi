import React, {PropTypes} from 'react';
import Card from 'material-ui/Card/Card';
import {Colors} from 'theme/colors';
import {whatIsIt, getColor} from 'utils/utils';

let styles = {
  alert: {},
  listItem: {
    fontSize: '13px',
    color: Colors.grape
  }
};

function getSource(source) {
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
  return null;
}

function getDestinaton(dest) {
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

    this.getDetails = this.getDetails.bind(this);
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
            i: i,
            key: key,
            index: index,
            data: data,
            fontWeight: fontWeight,
            displayFlex: displayFlex
          };
          return this.displayDetails(params);
        }
      })
    );
  }

  displayDetails(params) {
    let {key, index, data} = params;

    return (
      <li style={{...styles.listItem}} key={`desc${index}`}>
        {
          whatIsIt(data[key]) === 'String' && key !== 'session'
          ? this.getStringDetails(params)
          : (key === 'sourceDest' && whatIsIt(data[key]) === 'Object')
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
        {sourceDest.source ? getSource(source) : null}
        {sourceDest.dest ? getDestinaton(dest) : null}
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
        case 'Anomaly':
          if (props.selectedCardId !== props.data.id) {
            details = {
              selectedCardId: props.data.id,
              eventDate: props.data.Date
            };
          }
          props.getContextualMenuApiObj(details);
          break;
        case 'Session':
          if (props.selectedCardId !== props.data.id) {
            details = {
              selectedCardId: props.data.id,
              eventDate: props.data.Date,
              user: props.data.User ? props.data.User : '',
              machine: props.data.Machine ? props.data.Machine : ''
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
              (value.includes('exfiltration'))
              ? <img src='/img/anomaly/exfiltration.png' />
                : (value.includes('snoop'))
                  ? <img src='/img/anomaly/snoop.png' />
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

  render() {
    const {props} = this,
      {data} = props;
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
            width: '350px',
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
        <ul className='no-list-style'>{this.getDetails(props.data)}</ul>
      </Card>
    );
  }
}

export default TimelineCard;
