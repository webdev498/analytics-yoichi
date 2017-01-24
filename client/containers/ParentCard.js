import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Loader from 'components/Loader';
import DetailsTable from 'components/DetailsTable';
import ParentCardHeader from './ParentCardHeader';

import {fetchApiData, removeComponent, broadcastEvent} from 'actions/parentCard';
import {Colors} from '../../commons/colors';
import {autoScrollTo} from 'utils/utils';
import {updateRoute} from 'actions/core';

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

export class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      showDetailsFlag: false
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
    details: PropTypes.object
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

  toggleDetailsTable() {
    if (!this.state.showDetailsFlag) {
      this.getDetailsData();
    }

    this.setState({showDetailsFlag: !this.state.showDetailsFlag});
  }

  getDetailsTable() {
    const {details} = this.props;
    return <DetailsTable style={styles.detailsTable} details={details} />;
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

  getDetailsData() {
    const {props: {data, meta}} = this;
    if (!data || !meta.api) return;

    // create api object for getDetailsTableData,
    // fetch data.
    // add a way to include this in immutable maps.
    const {interval} = data;
    const apiObj = {
      type: 'details',
      path: '/api/analytics/reporting/details/{reportId}',
      pathParams: {
        reportId: meta.api.pathParams.reportId
      },
      queryParams: {
        start: interval.from,
        end: interval.to
      }
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
            search={this.state.search}
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

        <div>
          {
            state.showDetailsFlag
            ? this.getDetailsTable()
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
    details = null;

  if (apiData.hasIn(['components', ownProps.id])) {
    const propsById = apiData.getIn(['components', ownProps.id]);

    data = propsById.get('data');
    details = propsById.get('details');
    isFetching = propsById.get('isFetching');
    isError = propsById.get('isError');
    errorData = propsById.get('errorData');
    eventData = propsById.get('eventData');
  }

  const duration = apiData.get('duration');

  return {
    data,
    details,
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
