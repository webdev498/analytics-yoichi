import React from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon';

import Loader from '../components/Loader.component';

import {fetchApiData} from 'actions/ParentCard';

const styles = {
  wrap: {
    position: 'relative',
  },
  header: {
    padding: '10px 15px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#cdcdcd'
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '18px'
  },
  iconWrap: {
    marginLeft: 'auto'
  },
  refreshIcon: {
    cursor: 'pointer',
    fontSize: '20px'
  },
  crossIcon: {
    fontSize: '20px'
  }
}

class ParentCard extends React.Component {
  constructor(props) {
    super(props);
  }

  getData() {
    const { props } = this;
    const {api, query} = props.meta;

    props.fetchApiData(props.id, api, query);
  }

  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => {});

    if(this.props.meta.api) {
      this.getData();
    }
  }

  getElement() {
    const {props} = this;

    const {
      isFetching,
      isError,
      errorData
    } = props;

    return React.cloneElement(props.children, {
            isFetching,
            isError,
            errorData,
            data: props.data,
            duration: props.duration
          });
  }

  refreshData() {
    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {props} = this;

    if (!props) {
      return;
    }
    if (!props.meta) {
      return;
    }

    if(props.meta.showHeader) {
      return (
        <Card style={{...styles.wrap, ...props.attributes.style}}>
          {props.isFetching ? <Loader /> : null}

          <header style={styles.header}>
            <div>
              <span style={styles.title}>{props.meta.title}</span>
            </div>

            <div style={styles.iconWrap}>
              <FontIcon className='material-icons'
                        style={styles.refreshIcon}
                        onClick={this.refreshData.bind(this)}>
                        refresh
              </FontIcon>
            </div>
          </header>
          <div> {React.cloneElement(props.children, {...props})} </div>
        </Card>
      )
    }
    else {
      return (
        <Card style={{...styles.wrap, ...props.attributes.style}}>
          {props.isFetching ? <Loader /> : null}
          {this.getElement()}
        </Card>
      )
    }
  }
}

ParentCard.contextTypes = {
  store: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const {apiData} = state;

  let data = null,
      isFetching = true,
      isError = false,
      errorData = null;

  if(apiData.hasIn(['components', ownProps.id])) {
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