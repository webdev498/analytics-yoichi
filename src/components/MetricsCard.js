import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';

import {
  generateQueryParams,
  generateClickThroughUrl,
  generatePathParams
} from 'utils/kibanaUtils';

const styles = {
  card: {
    padding: '33px 33px 20px 33px'
  },
  wrapStyle: {
    display: 'flex'
  },
  countStyle: {
    fontSize: '35px',
    lineHeight: '35px'
  },
  text: {
    fontSize: '21px',
    lineHeight: '21px',
    fontWeight: 300,
    margin: 0,
    marginBottom: '13px'
  },
  details: {
    paddingTop: '5px',
    fontSize: '13px',
    marginLeft: 'auto',
    cursor: 'pointer',
    color: Colors.smoke,
    textAlign: 'right'
  },
  percentageWrap: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: '13px'
  },
  percentage: {
    fontSize: '13px'
  },
  icon: {
    lineHeight: '10px'
  }
};

function getCount(data) {
  data = data.data;
  return (data && data.rows && data.rows[0]) ? data.rows[0][0][0] : 0;
}

function getPercent(data) {
  return (data && data.rows && data.rows[0] && data.rows[0][0][2] !== 'N/A')
          ? Math.abs(Math.round(data.rows[0][0][2]), 2) + '%'
          : '';
}

function getArrowIcon(data) {
  if (data && data.rows && data.rows[0] && data.rows[0][0][2] !== 'N/A') {
    const percent = Math.round(data.rows[0][0][2]);
    if (percent > 0) {
      return <FontIcon style={styles.icon} className='material-icons'>arrow_drop_up</FontIcon>;
    }
    else if (percent === 0) {
      // return <FontIcon style={styles.icon} className='material-icons'>trending_flat</FontIcon>;
      return null;
    }
    else {
      return <FontIcon style={styles.icon} className='material-icons'>arrow_drop_down</FontIcon>;
    }
  }
  else {
    return '-';
  }
}

class MetricsCard extends React.Component {
  handleClick() {
    const {props} = this,
      {kibana} = props,
      dataObj = {};

    if (!kibana) return;

    if (props.kibana.tableId && props.kibana.filterText) {
      return () => {
        // setFilterText(kibana.tableId, kibana.filterText);
      };
    }
    else {
      if (props.kibana.queryParams) {
        dataObj.datasetName = 'high';
      }

      let parameters = {
          props,
          dataObj,
          queryParamsArray: props.kibana.queryParams
        },
        queryParams = generateQueryParams(parameters),
        pathParams = generatePathParams(props.kibana.pathParams);

      return () => {
        this.context.clickThrough(generateClickThroughUrl(pathParams, queryParams));
      };
    }
  }

  render() {
    const { props } = this;

    return (
      <div style={styles.card}>
        <h3 style={styles.text}>{props.title}</h3>

        <div style={styles.wrapStyle}>
          <div style={{...styles.countStyle, ...props.countStyle}}>
            {getCount(props)}
          </div>
          <div style={styles.percentageWrap}>
            <span style={styles.percentage}>
              {getPercent(props.data)}
            </span>
            {getArrowIcon(props.data)}
          </div>
        </div>

        <div style={styles.details}
          onClick={this.handleClick()}>
          View details
        </div>
      </div>
    );
  }
}

MetricsCard.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default MetricsCard;
