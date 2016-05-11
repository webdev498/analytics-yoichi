import React from 'react';

import Card from 'material-ui/lib/card/card';

const styles = {
  cardStyle: {
    width: '24%',
    padding: '10px'
  },
  iconStyle: {
    fontSize: '50px',
    color: 'white'
  },
  detailsStyle: {
    paddingTop: '10px',
    fontSize: '12px',
    fontWeight: 500
  },
  wrapStyle: {
    display: 'flex'
  },
  countStyle: {
    fontSize: '24px'
  },
  textStyle: {
    fontSize: '17px',
    fontWeight: 300
  }
}

function getText (data) {
  return data ? data.columns[0].displayName : '';
}

function getCount (data) {
  return data ? data.columns[0].displayName : '';
}

function getIconElm(props) {
  const elm = props.children[0]
  return React.cloneElement(props.children[0], {style: {...styles.iconStyle}});
}

const MetricsCard = (props) => (
  <Card style={{...styles.cardStyle, ...props.style}}>
    <div style={styles.wrapStyle}>
      <div>
        {getIconElm(props)}
      </div>
      <div style={{marginLeft: 'auto', textAlign: 'right'}}>
        <div style={styles.countStyle}>24</div>
        <div style={styles.textStyle}>{props.title}</div>
      </div>
    </div>

    <div style={styles.detailsStyle}>View Details</div>
  </Card>
)

export default MetricsCard;