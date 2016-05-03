import React from 'react';

import Card from 'material-ui/lib/card/card';

const styles = {
  cardStyle: {
    width: '24%',
    padding: '10px'
  },
  iconStyle: {
    fill: 'rgb(255, 255, 255)',
    height: '50px',
    width: '50px'
  },
  detailsStyle: {
    paddingTop: '10px',
    fontSize: '12px',
    fontWeight: 500
  },
  wrapStyle: {
    display: 'flex',
    'align-items': 'flex-start'
  },
  countStyle: {
    fontSize: '24px'
  },
  textStyle: {
    fontSize: '18px',
    fontWeight: 300
  }
}

function getText (data) {
  console.log(data ? data.columns[0].displayName : '');
  return data ? data.columns[0].displayName : '';
}

function getCount (data) {
  console.log(data ? data.columns[0].displayName : '');
  return data ? data.columns[0].displayName : '';
}

const MetricsCard = (props) => (
  <Card style={{...styles.cardStyle, ...props.style}}>
    <div style={styles.wrapStyle}>
      <div>
        {props.children}
      </div>
      <div style={{marginLeft: 'auto', textAlign: 'right'}}>
        <div style={styles.countStyle}>24</div>
        <div style={styles.textStyle}>High Priority Alerts</div>
      </div>
    </div>

    <div style={styles.detailsStyle}>View Details</div>
  </Card>
)

export default MetricsCard;