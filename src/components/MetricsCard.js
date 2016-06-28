import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';

import {
  generateQueryParams,
  generateClickThroughUrl,
  generatePathParams
} from 'utils/kibanaUtils';

const styles = {
  wrapStyle: {
    display: 'flex'
  },
  countStyle: {
    fontSize: '24px'
  },
  textStyle: {
    fontSize: '21px',
    fontWeight: 400,
    margin: 0
  },
  detailsStyle: {
    paddingTop: '10px',
    fontSize: '14px',
    marginLeft: 'auto',
    cursor: 'pointer',
    color: Colors.smoke
  },
  percentageStyle: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
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
      return <FontIcon className='material-icons'>arrow_drop_up</FontIcon>;
    }
    else if (percent === 0) {
      return <FontIcon className='material-icons'>trending_flat</FontIcon>;
    }
    else {
      return <FontIcon className='material-icons'>arrow_drop_down</FontIcon>;
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
        // console.log(kibana.tableId, kibana.filterText);
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
      <div>
        <h3 style={styles.textStyle}>{props.title}</h3>

        <div style={styles.wrapStyle}>
          <div style={styles.countStyle}>{getCount(props)}</div>
          <div style={styles.percentageStyle}>
            <span>{getPercent(props.data)}</span>
            {getArrowIcon(props.data)}
          </div>
        </div>

        <div style={styles.detailsStyle}
          onClick={this.handleClick()}>
          View Details
        </div>
      </div>
    );
  }
}

MetricsCard.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default MetricsCard;
