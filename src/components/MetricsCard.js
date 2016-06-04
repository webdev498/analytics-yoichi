import React from 'react';

import FontIcon from 'material-ui/FontIcon';

const styles = {
  iconStyle: {
    fontSize: '50px',
    color: 'white'
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
  },
  detailsStyle: {
    paddingTop: '10px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center'
  },
  percentageStyle: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  }
}

function getText (data) {
  return data ? data.columns[0].displayName : '';
}

function getCount (data) {
  data = data.data;
  return (data && data.rows && data.rows[0]) ? data.rows[0][0][0] : 0;
}

function getPercent (data) {
  return (data && data.rows && data.rows[0] && data.rows[0][0][2] !== "N/A")
          ? Math.abs(Math.round(data.rows[0][0][2]), 2) + "%"
          : "";
}

function getIconElm(props) {
  const elm = props.children[0];
  return React.cloneElement(elm, {style: {...styles.iconStyle}});
}

function getArrowIcon(data) {
  if(data && data.rows && data.rows[0] && data.rows[0][0][2] !== "N/A") {
    const percent = Math.round(data.rows[0][0][2]);
    if(percent > 0) {
      return <FontIcon className='material-icons'>arrow_drop_up</FontIcon>
    }
    else if(percent === 0) {
      return <FontIcon className='material-icons'>trending_flat</FontIcon>
    }
    else {
      return <FontIcon className='material-icons'>arrow_drop_down</FontIcon>
    }
  }
  else {
    return "-";
  }
}

const MetricsCard = (props) => (
  <div style={{...styles.cardStyle}}>
    <div style={styles.wrapStyle}>
      <div>
        {getIconElm(props)}
      </div>
      <div style={{marginLeft: 'auto', textAlign: 'right'}}>
        <div style={styles.countStyle}>{getCount(props)}</div>
        <div style={styles.textStyle}>{props.title}</div>
      </div>
    </div>

    <div style={styles.detailsStyle}>
      <span>View Details</span>
      <div style={styles.percentageStyle}>
        <span>{getPercent(props.data)}</span>
        {getArrowIcon(props.data)}
      </div>
    </div>
  </div>
)

export default MetricsCard;