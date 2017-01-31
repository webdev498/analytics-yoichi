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

function getParamsAndReportId(props, dataObj) {
  let {data, meta} = props,
    reportId = props.meta.api.pathParams.reportId;

  if (meta.details) {
    reportId = meta.details.reportId;
    data = data[reportId];
  }

  let {columns, interval} = data,
    queryParams = {
      start: interval.from,
      end: interval.to
    };

  console.log(dataObj);

  if (dataObj.queryParams) {
    queryParams = Object.assign({}, queryParams, dataObj.queryParams);
  }
  else {
    const params = [];
    columns.forEach(col => {
      if (col.detailsAvailable) {
        if (dataObj.label) {
          const label = dataObj.label,
            value = (label.split(',')[0]);
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
    data: PropTypes.object,
    details: PropTypes.object,
    detailsState: PropTypes.object
  }

  getData(apiObj) {
    const { props } = this,
      api = apiObj || props.meta.api;

    if (!api) {
      const children = props.children.props.children;

      children.forEach((child) => {
        const {props: childProps} = child;
        props.fetchApiData(childProps.id, childProps.meta.api);
      });

      return;
    }

    props.fetchApiData(props.id, api, props.params, props.options);
  }

  toggleDetailsTable(dataObj) {
    if (!this.state.showDetailsFlag) {
      this.getDetailsData(dataObj);
    }

    this.setState({
      showDetailsFlag: !this.state.showDetailsFlag,
      showComponentIconFlag: !this.state.showComponentIconFlag
    });
  }

  getDetailsTable(props) {
    const {detailsState, details} = this.props;
    return <DetailsTable style={styles.detailsTable} detailsState={detailsState} details={details} />;
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

    let {queryParams, reportId} = getParamsAndReportId(props, dataObj);
    if (!queryParams) return;

    const apiObj = {
      type: 'details',
      path: `${DETAILS_BASE_URL}/{reportId}`,
      pathParams: {
        reportId
      },
      queryParams
    };

    this.getData(apiObj);
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
    if (state.showDetailsFlag) {
      componentStyle = {display: 'none'};
    }

    return (
      <div style={cardStyle} id={props.id}>
        {props.isFetching ? <Loader /> : null}

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
          props.isError && (props.meta.showErrorMessage !== false)
          ? this.getErrorElement()
          : (
            <div style={componentStyle}>
              {React.cloneElement(props.children, {...childProps, ...extraProps})}
            </div>
            )
        }

        <div style={{marginLeft: '-33px', marginRight: '-33px'}}>
          {
            state.showDetailsFlag
            ? this.getDetailsTable(props)
            : null
          }
        </div>
      </div>
    );
  }
}

ParentCard.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {apiData} = state;

  let data = null,
    isFetching = false,
    isError = false,
    errorData = null,
    eventData = null,
    detailsState = null;

  if (apiData.hasIn(['components', ownProps.id])) {
    const propsById = apiData.getIn(['components', ownProps.id]);

    data = propsById.get('data');
    detailsState = propsById.get('details');
    isFetching = propsById.get('isFetching');
    isError = propsById.get('isError');
    errorData = propsById.get('errorData');
    eventData = propsById.get('eventData');
  }

  const duration = apiData.get('duration');

  return {
    data,
    detailsState,
    isFetching,
    isError,
    errorData,
    duration,
    eventData
  };
}

export default connect(mapStateToProps, {
  fetchApiData, updateRoute, removeComponent, broadcastEvent
})(ParentCard);
