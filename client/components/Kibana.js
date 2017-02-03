import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import {Colors} from '../../commons/colors';
import FontIcon from 'material-ui/FontIcon';
import {fetchApiData, removeComponent} from 'actions/parentCard';
import {DETAILS_BASE_URL} from 'Constants';
import DetailsTable from 'components/details';
import Loader from 'components/Loader';

const styles = {
  wrap: {
    position: 'relative',
    height: '100%',
    border: 0,
    margin: '33px'
  },
  header: {
    backgroundColor: Colors.turquoise,
    height: '73px',
    display: 'flex',
    padding: '0 33px'
  },
  iconWrap: {
    marginLeft: 'auto',
    textAlign: 'right',
    display: 'inline-flex',
    alignItems: 'center'
  },
  icon: {
    color: Colors.grape,
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 600,
    marginLeft: '10px'
  },
  exitWrap: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '33px'
  },
  backIcon: {
    marginLeft: 0,
    marginRight: '15px'
  }
};

function getParamsAndReportId(props, dataObj) {
  let {data, meta, details} = props,
    reportId = meta.api.pathParams.reportId;

  if (details && details.meta) {
    reportId = details.meta.reportId;
    data = data[reportId];
  }

  let {columns, interval} = data,
    queryParams = {
      start: interval.from,
      end: interval.to,
      count: 100
    };

  if (dataObj && dataObj.queryParams) {
    queryParams = Object.assign({}, queryParams, dataObj.queryParams);
  }
  else {
    const params = [];
    columns.forEach(col => {
      if (col.detailsAvailable) {
        if (dataObj.shortLabel) { // TODO define this in layout json.
          const value = dataObj.shortLabel;
          params.push({value, field: col.name});
        }
        else if (dataObj.toolText) {
          const toolText = dataObj.toolText,
            value = (toolText.split(',')[0]).toLowerCase();
          params.push({value, field: col.name});
        }
      }
    });

    if (params.length === 1) {
      queryParams.detailsValue = params[0].value;
      queryParams.detailsField = params[0].field;
    }
    else if (params.length > 1) {
      params.forEach((p, i) => {
        queryParams[`detailsValue${i + 1}`] = p.value;
        queryParams[`detailsField${i + 1}`] = p.field;
      });
    }
  }

  return {queryParams, reportId};
}

class Kibana extends React.Component {
  static propTypes = {
    meta: PropTypes.object,
    detailsData: PropTypes.object,
    data: PropTypes.object,
    params: PropTypes.object.isRequired,
    options: PropTypes.object,
    id: PropTypes.string.isRequired,
    hideKibana: PropTypes.func
  }

  getErrorElement() {
    const {props} = this;
    let statusText;

    try {
      statusText = props.detailsErrorData.response.statusText;
    }
    catch (ex) {
      console.log(ex, props.detailsErrorData);
      statusText = 'Some error occured';
    }

    return (
      <div style={styles.error}>
        {statusText}
      </div>
    );
  }

  getDetailsData() {
    const {props, props: {data, meta, params, options, id}} = this;
    if (!data || !meta.api) return;

    let {queryParams, reportId} = getParamsAndReportId(props);

    const apiObj = {
      path: `${DETAILS_BASE_URL}/{reportId}`,
      pathParams: {
        reportId
      },
      queryParams
    };

    props.fetchApiData({id, api: apiObj, params, options, isDetails: true});
  }

  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => {});
    if (this.props.meta.api) {
      this.getDetailsData();
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
    const {props} = this;
    props.removeComponent(props.id);
  }

  render() {
    const {props, props: {detailsData}} = this,
      details = {itemsPerPage: 20};

    return (
      <div style={styles.wrap}>
        <header style={styles.header}>
          <div style={styles.exitWrap} onClick={props.hideKibana}>
            <FontIcon className='material-icons'
              style={{...styles.icon, ...styles.backIcon}}>
                arrow_back
            </FontIcon>
            <span>Exit</span>
          </div>

          <h2>Title</h2>

          <div style={styles.iconWrap}>
            <FontIcon className='material-icons'
              style={styles.icon}
              onClick={this.getData}>
              replay
            </FontIcon>
          </div>
        </header>

        <div>
          {
            props.detailsIsFetching
            ? <Loader />
            : null
          }

          {
            props.isDetailsError
            ? this.getErrorElement()
            : <DetailsTable style={styles.detailsTable} detailsData={detailsData} details={details} />
          }
        </div>
      </div>
    );
  }
}

Kibana.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {details} = state;

  let detailsIsFetching: false,
    detailsIsError: false,
    detailsData: null,
    detailsErrorData: null;

  if (details.has(ownProps.id)) {
    const detailsById = details.get(ownProps.id);
    detailsIsFetching = detailsById.get('isFetching');
    detailsIsError = detailsById.get('isError');
    detailsData = detailsById.get('data');
    detailsErrorData = detailsById.get('errorData');
  }

  return {
    detailsIsFetching,
    detailsIsError,
    detailsData,
    detailsErrorData
  };
}

export default connect(mapStateToProps, {
  fetchApiData, removeComponent
})(Kibana);
