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
  detailsTable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};

export class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailsFlag: false
    };

    this.getData = this.getData.bind(this);
    this.toggleDetailsTable = this.toggleDetailsTable.bind(this);
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    updateRoute: PropTypes.func.isRequired,
    history: PropTypes.object
  }

  getData() {
    const { props } = this,
      {api} = props.meta;

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
    this.setState({showDetailsFlag: !this.state.showDetailsFlag});
  }

  getDetailsTable() {
    return <DetailsTable style={styles.detailsTable} />;
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

  callApi(apiObj, props) {
    const {id, api} = apiObj;
    const {params, fetchApiData, data} = props;

    if (api.method === 'POST') {
      let body = data;

      const bodyPath = api.body.replace('$customParam', ''),
        keys = bodyPath.split('.');

      keys.forEach(key => {
        body = body[key];
      });

      // for the post request if the body is empty, then don't make request.
      if (!body) return;
      fetchApiData(id, api, params, {body});
    }
    else {
      const {queryParams} = Object.assign({}, api);
      const queryKeys = Object.keys(queryParams);

      let customParams = null;
      queryKeys.forEach(key => {
        let query = queryParams[key];
        if (typeof query === 'string' && query.includes('$customParam')) {
          queryParams[key] = this.getQueryData(query.replace('$customParam', ''), data);
          // this is to pass custom params such as filter to be passed
          // to the component that is consuming this api.
          customParams = {
            [key]: queryParams[key]
          };
        }
      });

      const updatedApi = Object.assign({}, api, {queryParams});
      fetchApiData(id, updatedApi, params, {customParams});
    }
  }

  runEvent(eventData, nextProps) {
    const {type, data} = eventData;
    if (type === 'updateSearch') {
      this.myTextInput.value = data;
      this.setState({
        search: data,
        clearIconStyle: {
          color: Colors.white,
          background: Colors.grape
        },
        searchTextStyle: {
          paddingLeft: '53px'
        }
      });

      autoScrollTo(nextProps.attributes.id, 80);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {data, eventData} = nextProps;
    let {meta: {fetchDataFor}} = nextProps;
    if (data && fetchDataFor) {
      if (!Array.isArray(fetchDataFor)) {
        fetchDataFor = [fetchDataFor];
      }

      fetchDataFor.forEach(apiObj => {
        this.callApi(apiObj, nextProps);
      });
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

  goBack() {
    return () => {
      this.props.history.goBack();
    };
  }

  getHeader() {
    const {props} = this,
      headerProps = Object.assign({}, props);

    return (
      <ParentCardHeader
        {...headerProps}
        getData={this.getData}
        goBack={this.goBack} />
    );
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
          ? this.getHeader()
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
    eventData = null;

  if (apiData.hasIn(['components', ownProps.id])) {
    const propsById = apiData.getIn(['components', ownProps.id]);

    data = propsById.get('data');
    isFetching = propsById.get('isFetching');
    isError = propsById.get('isError');
    errorData = propsById.get('errorData');
    eventData = propsById.get('eventData');
  }

  const duration = apiData.get('duration');

  return {
    data,
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
