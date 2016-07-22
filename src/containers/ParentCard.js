import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon';
import Loader from '../components/Loader';

import {fetchApiData, removeComponent} from 'actions/ParentCard';
import {Colors} from 'theme/colors';
import {updateRoute} from 'actions/core';

const styles = {
  wrap: {
    position: 'relative',
    borderTop: '6px solid ' + Colors.smoke,
    borderRadius: 0,
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
    paddingBottom: '60px'
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '21px',
    fontWeight: 300
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
    updateRoute: PropTypes.func.isRequired
  }

  getData() {
    const { props } = this;
    const {api} = props.meta;

    if (!api) {
      console.log(props);
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

    props.fetchApiData(props.id, api);
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

  getElement() {
    const {props} = this;
    return React.cloneElement(props.children, {...props, updateRoute: this.props.updateRoute});
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

  render() {
    const {props} = this;

    if (props.meta.showHeader) {
      const childProps = Object.assign({}, props, {search: this.state.search}),
        cardStyle = {...styles.wrap, ...props.attributes.style, padding: '33px'};

      return (
        <Card style={cardStyle} id={props.id}>
          {props.isFetching ? <Loader /> : null}

          <header style={styles.header}>
            <div>
              <span style={styles.title}>{props.meta.title}</span>
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
                  onClick={this.clearSearchText()}
                ></div>
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

            <div style={styles.iconWrap}>
              <FontIcon className='material-icons'
                style={styles.refreshIcon}
                onClick={this.refreshData}>
                replay
              </FontIcon>
            </div>
          </header>
          <div> {React.cloneElement(props.children, {...childProps, updateRoute: this.props.updateRoute})} </div>
        </Card>
      );
    }
    else {
      return (
        <Card style={{...styles.childwrap, ...props.attributes.style}}>
          {props.isFetching ? <Loader style={props.attributes.loaderStyle} /> : null}
          {this.getElement()}
        </Card>
      );
    }
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
    errorData = null;

  if (apiData.hasIn(['components', ownProps.id])) {
    const propsById = apiData.getIn(['components', ownProps.id]);

    data = propsById.get('data');
    isFetching = propsById.get('isFetching');
    isError = propsById.get('isError');
    errorData = propsById.get('errorData');
  }

  const duration = apiData.get('duration');

  return {
    data,
    isFetching,
    isError,
    errorData,
    duration
  };
}

export default connect(mapStateToProps, {
  fetchApiData, updateRoute, removeComponent
})(ParentCard);
