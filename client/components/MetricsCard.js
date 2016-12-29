import React from 'react';
import {Colors} from 'theme/colors';
import {getArrowIcon} from 'utils/graphUtils';

import {generateClickThroughUrl} from 'utils/kibanaUtils';

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
    fontWeight: 'normal',
    margin: 0,
    marginBottom: '13px'
  },
  details: {
    paddingTop: '5px',
    fontSize: '13px',
    marginLeft: 'auto',
    cursor: 'pointer',
    color: Colors.grape,
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
    fontSize: '16px'
  }
};

function getCount(data) {
  data = data.data;
  return (data && data.rows && data.rows[0]) ? data.rows[0][0][0].toLocaleString() : 0;
}

function getPercent(data) {
  return (data && data.rows && data.rows[0] && data.rows[0][0][2] !== 'N/A')
           ? Math.abs(Math.round(data.rows[0][0][2])) + '%'
           : '';
}

function getIcon(data) {
  if (data && data.rows && data.rows[0] && data.rows[0][0][2] !== 'N/A') {
    const percent = Math.round(data.rows[0][0][2]);
    return getArrowIcon(percent, styles.icon);
  }
  else {
    return '-';
  }
}

class MetricsCard extends React.Component {
  handleClick() {
    const {props} = this,
      {kibana, clickData} = props,
      dataObj = {};

    if (kibana) {
      if (props.kibana.queryParams) {
        dataObj.datasetName = 'high';
      }

      let parameters = {
        data: props.data,
        duration: props.duration,
        dataObj,
        queryParamsArray: props.kibana.queryParams,
        pathParams: props.kibana.pathParams
      };

      return () => {
        this.context.clickThrough(generateClickThroughUrl(parameters));
      };
    }

    if (clickData) {
      return () => {
        if (props.history.isActive(clickData.page)) {
          props.broadcastEvent(clickData.tableId, {data: clickData.filterText, type: 'updateSearch'});
        }
        else {
          window.sessionStorage.broadcastEvent = clickData;
          props.history.push(clickData.page);
        }
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data &&
      nextProps.clickData &&
      nextProps.history.isActive(nextProps.clickData.page) &&
      window.sessionStorage.broadcastEvent
    ) {
      setTimeout(function() {
        delete window.sessionStorage.broadcastEvent;
        const {clickData} = nextProps;
        nextProps.broadcastEvent(clickData.tableId, {data: clickData.filterText, type: 'updateSearch'});
      }, 500);
    }
  }

  render() {
    const { props } = this;

    return (
      <div style={styles.card}>
        <h3 style={styles.text}>{props.title}</h3>

        <div style={styles.wrapStyle}>
          <div style={{...styles.countStyle, ...props.attributes.countStyle}}>
            {getCount(props)}
          </div>
          <div style={styles.percentageWrap}>
            <span style={styles.percentage}>
              {getPercent(props.data)}
            </span>
            {getIcon(props.data)}
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
