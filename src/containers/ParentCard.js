import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon';
import Loader from '../components/Loader';

import {fetchApiData} from 'actions/ParentCard';
import {Colors} from 'theme/colors';

const styles = {
  wrap: {
    position: 'relative',
    borderTop: '6px solid ' + Colors.smoke,
    borderRadius: 0,
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 2px'
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
    color: '#CBCBD1',
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
    color: '#CBCBD1',
    cursor: 'pointer',
    fontSize: '21px',
    height: '14px',
    margin: 'auto',
    position: 'absolute',
    right: '12px',
    top: '0',
    fontWeight: 600
  },
  clearIcon: {
    color: '#fff',
    cursor: 'pointer',
    fontSize: '21px',
    height: '35px',
    margin: 'auto',
    position: 'absolute',
    top: '0',
    background: '#CBCBD1',
    lineHeight: '35px',
    width: '45px',
    textAlign: 'center',
    fontWeight: 600
  }
};

class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: ''};
  }

  static propTypes = {
    meta: PropTypes.object.isRequired
  }

  getData() {
    const { props } = this;
    const {api} = props.meta;

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

  getElement() {
    const {props} = this;
    return (
      <div> {React.cloneElement(props.children, {...props})} </div>
    );
  }

  refreshData() {
    return () => {
      this.getData();
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

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
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }

  render() {
    const {props} = this;
    // console.log(props);

    if (props.meta.showHeader) {
      const childProps = Object.assign({}, props, {search: this.state.search}),
        cardStyle = {...styles.wrap, ...props.attributes.style, padding: '33px'};

      return (
        <Card style={cardStyle}>
          {props.isFetching ? <Loader /> : null}

          <header style={styles.header}>
            <div>
              <span style={styles.title}>{props.meta.title}</span>
            </div>

            {
              props.meta.showSearch
              ? <div style={styles.inputWrap}>
                <FontIcon className='material-icons'
                  style={styles.clearIcon}
                  onClick={this.clearSearchText()}>
                  close
                </FontIcon>
                <input
                  id='searchText'
                  type='text'
                  className='searchText'
                  onChange={this.updateSearch()}
                  ref={(ref) => this.myTextInput = ref} />
                <FontIcon className='material-icons'
                  style={styles.searchIcon}
                  onClick={() => this.focusSearchText()}>
                  search
                </FontIcon>
              </div>
              : null
            }

            <div style={styles.iconWrap}>
              <FontIcon className='material-icons'
                style={styles.refreshIcon}
                onClick={this.refreshData()}>
                replay
              </FontIcon>
            </div>
          </header>
          <div> {React.cloneElement(props.children, {...childProps})} </div>
        </Card>
      );
    }
    else {
      return (
        <Card style={{...styles.wrap, ...props.attributes.style}}>
          {props.isFetching ? <Loader /> : null}
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
    isFetching = true,
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
  fetchApiData
})(ParentCard);
