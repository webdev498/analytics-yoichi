import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Loader from 'components/Loader';
import DetailsTable from 'components/details';
import ParentCardHeader from './ParentCardHeader';

import {fetchApiData, removeComponent, broadcastEvent} from 'actions/parentCard';
import {Colors} from '../../commons/colors';
import {autoScrollTo} from 'utils/utils';
import {updateRoute} from 'actions/core';

import {DETAILS_BASE_URL} from 'Constants';

const styles = {
  wrap: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 0,
    padding: '33px',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 2px'
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

  // if duration has been updated, then don't send the start and end params as they override the window param.
  if (durationUpdated) {
    delete queryParams.start;
    delete queryParams.end;
    queryParams.window = '';
  }

  if (dataObj.queryParams) {
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
  const params = [];
  if (dataObj.shortLabel) { // TODO define this in layout json.
    const value = dataObj.shortLabel;
    params.push({value, field: col.name});
  }
  else if (dataObj.toolText) { // TODO Discuss with Ojassvi and decide layout structure for this.
    let toolText = dataObj.toolText,
      toolTexts = toolText.split(' |'),
      value = '';
    if (toolTexts.length === 2) {
      value = (toolText.split(' |')[0]);
    }
    else if (toolTexts.length === 3) {
      if (index === 0) {
        value = (toolText.split(' |')[1]);
      }
      else if (index === 1) {
        value = (toolText.split(' |')[0]);
      }
    }
    if (col.name === 'date') {
      value = new Date(value).toISOString();
      value = value.replace('Z', '');
    }
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

    this.getData = this.getData.bind(this);
    this.toggleDetailsTable = this.toggleDetailsTable.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    updateRoute: PropTypes.func.isRequired,
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

  getDetailsTable() {
    const {detailsData, details} = this.props;
    return <DetailsTable
      style={styles.detailsTable}
      detailsData={detailsData}
      details={details}
      search={this.state.search} />;
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
      statusText = props.errorData.response.statusText;
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

  updateSearch(event) {
    this.setState({
      search: event.target.value
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
            history={this.props.history} />
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
          isDetailsError
          ? this.getErrorElement()
          : (
            <div style={{marginLeft: '-33px', marginRight: '-33px'}}>
              {
                state.showDetailsFlag
                ? this.getDetailsTable()
                : null
              }
            </div>
            )
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

    data = propsById.get('data');
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
  fetchApiData, updateRoute, removeComponent, broadcastEvent
})(ParentCard);
