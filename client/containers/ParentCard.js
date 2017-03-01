import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Loader from 'components/Loader';
import DetailsTable from 'components/details';
import ParentCardHeader from './ParentCardHeader';

import {fetchApiData, removeComponent, broadcastEvent, fetchNextSetOfData} from 'actions/parentCard';
import {Colors} from '../../commons/colors';
import {autoScrollTo, debounce} from 'utils/utils';
import {updateRoute} from 'actions/core';

import {DETAILS_BASE_URL} from 'Constants';

const styles = {
  wrap: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 0,
    padding: '30px',
    boxShadow: `0 1px 2px ${Colors.shadow}`
  },
  childwrap: {
    backgroundColor: 'white',
    position: 'relative',
    borderRadius: 0,
    boxShadow: Colors.white + ' 0px 0px 0px',
    border: '0px'
  },
  error: {
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'center'
  },
  detailsTable: {}
};

function getParamsAndReportId(props, dataObj, durationUpdated) {
  let {data, meta, details} = props,
    reportId = meta.api.pathParams.reportId;

  if (details && details.meta && details.meta.reportId) {
    reportId = details.meta.reportId;
    data = data[reportId];
  }

  let {columns, interval} = data,
    queryParams = {
      start: interval.from,
      end: interval.to,
      count: 100
    };

  // if duration has been updated, then don't send the start and end params as they override the window param.
  if (durationUpdated) {
    delete queryParams.start;
    delete queryParams.end;
    queryParams.window = '';
  }

  if (dataObj && dataObj.queryParams) {
    queryParams = Object.assign({}, queryParams, dataObj.queryParams);
  }
  else {
    let params = [];
    columns.forEach((col, index) => {
      if (col.detailsAvailable) {
        params = params.concat(generateParameters(index, col, dataObj));
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

function generateParameters(index, col, dataObj) {
  let params = [],
    value = '';
  if (dataObj && dataObj[col.name]) {
    value = dataObj[col.name].value;
    params.push({value, field: col.name});
  }
  return params;
}

export class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      showDetailsFlag: false,
      showComponentIconFlag: false
    };

    this.detailsApiObj = {};
    this.getData = this.getData.bind(this);
    this.toggleDetailsTable = this.toggleDetailsTable.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    updateRoute: PropTypes.func.isRequired,
    fetchNextSetOfData: PropTypes.func.isRequired,
    history: PropTypes.object,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    details: PropTypes.object,
    detailsData: PropTypes.object,
    attributes: PropTypes.object,
    duration: PropTypes.string.isRequired
  }

  getData(dataObj) {
    const {props} = this,
      {params, options, id} = props,
      isDetails = this.state.showDetailsFlag;

    if (isDetails) {
      if (!dataObj) {
        dataObj = this.dataObj;
      }
      else {
        // save dataObj to be used when the details are refreshed
        // to maintain of api object.
        this.dataObj = dataObj;
      }
    }

    const api = isDetails ? this.getDetailsData(dataObj) : props.meta.api;
    if (isDetails && api.queryParams && api.queryParams.filter) {
      delete api.queryParams.filter;
    }
    this.detailsApiObj = {id, api, params, options, isDetails};
    props.fetchApiData({id, api, params, options, isDetails});
  }

  toggleDetailsTable(dataObj) {
    if (this.props.meta.showDetails === false) return;  // don't show details, if meta showDetails set to false

    const isDetails = this.state.showDetailsFlag;

    this.setState({
      showDetailsFlag: !isDetails,
      showComponentIconFlag: !this.state.showComponentIconFlag
    },
    () => {
      if (!isDetails) {
        this.getData(dataObj);
      }
    });
  }

  getDetailsData(dataObj) {
    const {props, props: {data, meta}} = this;
    if (!data || !meta.api) return;

    let {queryParams, reportId} = getParamsAndReportId(props, dataObj, this.durationUpdated);

    if (!queryParams) return;

    const apiObj = {
      path: `${DETAILS_BASE_URL}/{reportId}`,
      pathParams: {
        reportId
      },
      queryParams
    };

    return apiObj;
  }

  getDetailsTable() {
    const {detailsData, details, fetchNextSetOfData, updateRoute} = this.props;
    return <DetailsTable
      style={styles.detailsTable}
      detailsData={detailsData}
      details={details}
      search={this.state.search}
      apiObj={this.detailsApiObj}
      fetchNextSetOfData={fetchNextSetOfData}
      updateRoute={updateRoute} />;
  }

  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => {});

    if (this.props.meta.api) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
    const {props} = this;
    props.removeComponent(props.id);
  }

  getQueryData(str, data) {
    const keys = str.split('.');

    try {
      keys.forEach(key => {
        data = data[key];
      });

      return data;
    }
    catch (ex) {
      return null;
    }
  }

  runEvent(eventData, nextProps) {
    const {type, data} = eventData;
    if (type === 'updateSearch') {
      this.setState({
        search: data
      });

      autoScrollTo(nextProps.attributes.id, 80);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {eventData} = nextProps;

    if (nextProps.duration !== this.props.duration) {
      this.durationUpdated = true;
    }

    if (nextProps.data && window.sessionStorage.broadcastEvent) {
      const {id, data} = JSON.parse(window.sessionStorage.broadcastEvent);
      if (id !== this.props.id) return;
      // timeout is to allow the data to be rendered first.
      setTimeout(() => {
        delete window.sessionStorage.broadcastEvent;
        this.runEvent(data, nextProps);
      }, 600);
    }

    if (eventData) {
      this.runEvent(eventData, nextProps);
    }
  }

  getErrorElement() {
    const {props} = this;
    let statusText;

    try {
      const err = props.errorData;
      if (err) {
        if (err.response) {
          statusText = err.response.statusText;
        }
        else {
          statusText = err;
        }
      }
    }
    catch (ex) {
      console.log(ex, props.errorData);
      statusText = 'Some error occured';
    }

    return (
      <div style={styles.error}>
        {statusText}
      </div>
    );
  }

  executeSearch() {
    const {props, state} = this;
    let apiObj = Object.assign({}, this.detailsApiObj);

    if (apiObj.isDetails === true) {
      if (state.search !== '') {
        apiObj.api.queryParams = Object.assign({}, apiObj.api.queryParams, {
          filter: '__any ~ "' + state.search + '"'
        });
      }
      else {
        if (apiObj.api.queryParams.filter) {
          delete apiObj.api.queryParams.filter;
        }
      }
      apiObj.api.queryParams.from = 0;
      props.fetchApiData(apiObj);
      // this.setState({showDetailsFlag: true});
    }
  }

  // executeSearchDebounced(event) {
  //   this.setState({
  //     search: event.target.value
  //   }, function() {
  //     this.executeSearch.bind(this);
  //   });
  // }

  updateSearch(event) {
    console.log('updateSearch');
    this.setState({
      search: event.target.value
    }, function() {
      let debounceCall = debounce(this.executeSearch.bind(this), 500);
      debounceCall();
    });
    // let debounceCall = debounce(function(event) {
    //   this.executeSearchDebounced.bind(this, event);
    // }, 500);
    // debounceCall();
  }

  render() {
    const {props, state} = this;

    const childProps = Object.assign({}, props, {search: this.state.search});
    let cardStyle = {...styles.wrap, ...props.attributes.style};

    if (!props.meta.showHeader) {
      cardStyle = {...styles.childwrap, ...props.attributes.style};
    }

    let tempCardStyle = cardStyle;

    if (props.meta.hideComponent && (!props.data)) {
      tempCardStyle = {display: 'none'};
    }

    cardStyle = tempCardStyle;

    const extraProps = {
      updateRoute: this.props.updateRoute,
      showDetailsTable: this.toggleDetailsTable
    };

    let componentStyle = {};
    const isDetails = state.showDetailsFlag;
    if (isDetails) {
      componentStyle = {display: 'none'};
    }

    const isComponentError = props.isError && (props.meta.showErrorMessage !== false) && !isDetails,
      isDetailsError = props.detailsIsError && isDetails;

    return (
      <div style={cardStyle} id={props.id}>
        {
          props.isFetching || props.detailsIsFetching
          ? <Loader />
          : null
        }

        {
          props.meta.showHeader
          ? <ParentCardHeader
            {...props}
            showComponentIconFlag={state.showComponentIconFlag}
            search={state.search}
            getData={this.getData}
            updateSearch={this.updateSearch}
            toggleDetailsTable={this.toggleDetailsTable}
            history={this.props.history}
            hideDetails={props.hideDetails} />
          : null
        }

        {
          isComponentError
          ? this.getErrorElement()
          : (
            <div style={componentStyle}>
              {React.cloneElement(props.children, {...childProps, ...extraProps})}
            </div>
            )
        }

        {
          isDetails
          ? isDetailsError
            ? this.getErrorElement()
            : <div style={{marginLeft: '-30px', marginRight: '-30px'}}>
              { this.getDetailsTable()}
            </div>
          : null
        }
      </div>
    );
  }
}

ParentCard.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {apiData, details} = state;

  let data = null,
    isFetching = false,
    isError = false,
    errorData = null,
    eventData = null,
    detailsIsFetching: false,
    detailsIsError: false,
    detailsData: null,
    detailsErrorData: null;

  if (apiData.has(ownProps.id)) {
    const propsById = apiData.get(ownProps.id);

    if (ownProps.fullDetailsView) {
      detailsData = propsById.get('data');
    }
    else {
      data = propsById.get('data');
    }
    isFetching = propsById.get('isFetching');
    isError = propsById.get('isError');
    errorData = propsById.get('errorData');
    eventData = propsById.get('eventData');
  }

  if (details.has(ownProps.id)) {
    const detailsById = details.get(ownProps.id);
    detailsIsFetching = detailsById.get('isFetching');
    detailsIsError = detailsById.get('isError');
    detailsData = detailsById.get('data');
    detailsErrorData = detailsById.get('errorData');
  }

  const duration = state.duration;

  return {
    data,
    isFetching,
    isError,
    errorData,
    duration,
    eventData,
    detailsIsFetching,
    detailsIsError,
    detailsData,
    detailsErrorData
  };
}

export default connect(mapStateToProps, {
  fetchApiData, updateRoute, removeComponent, broadcastEvent, fetchNextSetOfData
})(ParentCard);
