import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon';
import Loader from '../components/Loader';

import {fetchApiData, removeComponent, broadcastEvent} from 'actions/ParentCard';
import {Colors} from 'theme/colors';
import {updateRoute} from 'actions/core';

const styles = {
  wrap: {
    position: 'relative',
    borderRadius: 0,
    padding: '33px',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 2px'
  },
  childwrap: {
    position: 'relative',
    borderRadius: 0,
    boxShadow: Colors.white + ' 0px 0px 0px',
    border: '0px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '50px'
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '21px',
    fontWeight: 300,
    whiteSpace: 'nowrap'
  },
  iconWrap: {
    marginLeft: 'auto',
    textAlign: 'right'
  },
  refreshIcon: {
    cursor: 'pointer',
    fontSize: '20px',
    color: Colors.smoke,
    fontWeight: 600
  },
  backIcon: {
    color: Colors.grape
  },
  crossIcon: {
    fontSize: '20px'
  },
  inputWrap: {
    marginLeft: '20px',
    width: '85%',
    textAlign: 'right',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle'
  },
  searchIcon: {
    bottom: '5px',
    color: Colors.pebble,
    cursor: 'pointer',
    fontSize: '21px',
    height: '14px',
    margin: 'auto',
    position: 'absolute',
    right: '12px',
    top: 0,
    fontWeight: 500
  },
  clearIcon: {
    color: Colors.white,
    cursor: 'initial',
    fontSize: '21px',
    height: '35px',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    background: Colors.smoke,
    lineHeight: '35px',
    width: '45px',
    textAlign: 'center',
    fontWeight: 600
  },
  clearDiv: {
    color: 'transparent',
    cursor: 'initial',
    fontSize: '21px',
    height: '35px',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    background: 'transparent',
    lineHeight: '35px',
    width: '45px',
    textAlign: 'center',
    fontWeight: 600,
    display: 'inline'
  },
  error: {
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'center'
  }
};

class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      clearIconStyle: {
        color: 'transparent',
        background: 'transparent'
      },
      searchTextStyle: {
        paddingLeft: '12px'
      }
    };

    this.getData = this.getData.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  static propTypes = {
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

    // TODO find a non hacky way to do this.
    if (props.type === 'AlertDetails') {
      api.queryParams.date = props.params.date;
      api.pathParams = Object.assign({}, api.pathParams, props.params);
    }

    props.fetchApiData(props.id, api, props.params);
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

      const updatedApi = Object.assign({}, api, {queryParams: queryParams});
      fetchApiData(id, updatedApi, params, {customParams});
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

    if (eventData) {
      const {type, data} = eventData;

      if (type === 'updateSearch') {
        this.myTextInput.value = data;
        this.setState({
          search: data,
          clearIconStyle: {
            color: Colors.white,
            background: Colors.smoke
          },
          searchTextStyle: {
            paddingLeft: '53px'
          }
        });
      }
    }
  }

  refreshData() {
    this.getData();
  };

  updateSearch() {
    return (event) => {
      this.setState({
        search: event.target.value
      });
    };
  }

  clearSearchText() {
    return (event) => {
      if (this.myTextInput !== null) {
        this.myTextInput.value = '';
      }
      this.setState({
        search: event.target.value
      });
    };
  }

  focusSearchText() {
    return (event) => {
      if (this.myTextInput !== null) {
        this.myTextInput.focus();
      }
    };
  }

  displayClearIcon(display) {
    return (event) => {
      if (display) {
        this.setState({
          clearIconStyle: {
            color: Colors.white,
            background: Colors.smoke
          },
          searchTextStyle: {
            paddingLeft: '53px'
          }
        });
      }
      else {
        this.setState({
          clearIconStyle: {
            color: 'transparent',
            background: 'transparent'
          },
          searchTextStyle: {
            paddingLeft: '12px'
          }
        });
      }
    };
  }

  goBack() {
    return () => {
      this.props.history.goBack();
    };
  }

  getHeader() {
    const {props} = this;

    const headerStyle = props.attributes.header || {};

    return <header style={{...styles.header, ...headerStyle.style}}>
      <div>
        <span style={{...styles.title, ...headerStyle.title}}>
          {props.meta.title}
        </span>
      </div>

      {
        props.meta.showSearch
        ? <div style={styles.inputWrap}>
          <FontIcon className='material-icons'
            style={{...styles.clearIcon, ...this.state.clearIconStyle}}
            ref={(ref) => this.clearIcon = ref}>
            close
          </FontIcon>

          <div style={{...styles.clearDiv}}
            onClick={this.clearSearchText()} />

          <input
            id='searchText'
            type='text'
            className='searchText'
            onChange={this.updateSearch()}
            onFocus={this.displayClearIcon(true)}
            onBlur={this.displayClearIcon(false)}
            ref={(ref) => this.myTextInput = ref} />

          <FontIcon className='material-icons'
            style={styles.searchIcon}
            onClick={this.focusSearchText()}>
            search
          </FontIcon>
        </div>
        : null
      }

      {
        props.meta.showRefresh === false
        ? null
        : (
          <div style={styles.iconWrap} id='refreshData'>
            <FontIcon className='material-icons'
              style={styles.refreshIcon}
              onClick={this.refreshData}>
              replay
            </FontIcon>
          </div>
        )
      }

      {
        props.meta.showBackButton === true
        ? (
          <div style={styles.iconWrap} id='refreshData'>
            <FontIcon className='material-icons'
              style={{...styles.refreshIcon, ...styles.backIcon}}
              onClick={this.goBack()}>
              arrow_back
            </FontIcon>
          </div>
        )
        : null
      }
    </header>;
  }

  getErrorElement() {
    const {props} = this;
    let statusText;

    // try {
    //   statusText = props.errorData.response.statusText;
    // }
    // catch (ex) {
    //   console.log(ex, props.errorData);
    //   statusText = 'Some error occured';
    // }

    return (
      <div style={styles.error}>
        {statusText}
      </div>
    );
  }

  handleMalwareClick() {

  }

  render() {
    const {props} = this;

    const childProps = Object.assign({}, props, {search: this.state.search});
    let cardStyle = {...styles.wrap, ...props.attributes.style};

    if (!props.meta.showHeader) {
      cardStyle = {...styles.childwrap, ...props.attributes.style};
    }

    return (
      <Card style={cardStyle} id={props.id}>
        {props.isFetching ? <Loader /> : null}

        {
          props.meta.showHeader
          ? this.getHeader()
          : null
        }

        <div>
          {
            props.isError
            ? this.getErrorElement()
            : React.cloneElement(props.children, {...childProps, updateRoute: this.props.updateRoute})
          }
        </div>
      </Card>
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
