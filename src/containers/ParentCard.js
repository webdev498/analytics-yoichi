import React from 'react';
import { connect } from 'react-redux'

import Cookies from 'cookies-js';
import Card from 'material-ui/Card/Card';
import FontIcon from 'material-ui/FontIcon';

import Loader from '../components/Loader.component';

import {fetchApiData} from 'actions/ParentCard.actions';

const styles = {
  wrap: {
    position: 'relative',
  },
  header: {
    padding: '10px 15px',
    height: '56px',
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
    marginRight: '10px',
    fontSize: '20px'
  },
  crossIcon: {
    fontSize: '20px'
  }
}

class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loaded: false,
      columns: null,
      attributes: null,
      multiData: null,
      apiFieldMapping: [],
      sectionTitle: null,
      legend: [],
      chartOptions: {},
      parent: null,
      props:{}
    };
  }

  componentDidMount() {
    const { store } = this.context;
    const { props } = this;

    const {api, query} = props.meta;
    this.unsubscribe = store.subscribe(() => {});

    if (props.name === 'Table') {
      this.setState({
        props: props
      })
    }

    if (props.parent === 'Compound') {
      this.setState({
        sectionTitle: props.meta.title,
        apiFieldMapping: props.apiFieldMapping,
        legend: props.meta.legend,
        chartOptions: props.meta.chartOptions,
        attributes: props.attributes,
        parent: props.parent,
        props: props
      })
    }

    if(api) {
      props.fetchApiData(props.id, api, query);
    }

    const apis = props.meta.apis;
    if (apis !== undefined) {
      const accessToken = Cookies.get("access_token");
      const tokenType = Cookies.get("token_type");

      let multiDataArray = [];
      for (let i=0; i < apis.length; i++) {
        fetch(apis[i]['api'], {
          method: 'GET',
          headers: {
            'Authorization': `${tokenType} ${accessToken}`
          }
        })
        .then(response => response.json())
        .then(json => {
          multiDataArray.push(json);
          this.setState({
            multiData: multiDataArray,
            loaded: true
          });
        })
      }
    }
  }

  getElement() {
    const {props, state} = this;

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
            multiData: props.multiData,
            apiFieldMapping: props.apiFieldMapping,
            sectionTitle: props.meta.title,
            legend: props.meta.legend,
            chartOptions: props.meta.chartOptions,
            series: state.series,
            attributes: state.attributes,
            columns: state.columns,
            parent: state.parent,
            props: state.props
          });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {props} = this;

    if(props.meta.showHeader) {
      return (
        <Card style={{...styles.wrap, ...props.attributes.style}}>
          {/*props.isFetching ? <Loader /> : null*/}

          <header style={styles.header}>
            <div>
              <span style={styles.title}>{props.meta.title}</span>
            </div>

            <div style={styles.iconWrap}>
              <FontIcon className='material-icons'
                        style={styles.refreshIcon}>
                        refresh
              </FontIcon>
              <FontIcon className='material-icons'
                        style={styles.crossIcon}>
                        clear
              </FontIcon>
            </div>
          </header>

          <div>
          {
            props.meta.apis ?
              (
                React.cloneElement(props.children, {
                  data: props.data,
                  multiData: this.state.multiData ,
                  apiFieldMapping: props.apiFieldMapping
                })
              ) :
              (
                React.cloneElement(props.children, {
                  multiData: props.data,
                  apiFieldMapping: props.apiFieldMapping,
                  props: this.state.props
                })
              )
          }
          </div>
        </Card>
      )
    }
    else {
      return (
        <Card style={{...styles.wrap, ...props.attributes.style}}>
          {/*props.isFetching ? <Loader /> : null*/}
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

  return {
    data,
    isFetching,
    isError,
    errorData
  };
}

export default connect(mapStateToProps, {
  fetchApiData
})(ParentCard);
