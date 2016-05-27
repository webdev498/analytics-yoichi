import React from 'react';
import { connect } from 'react-redux'

import Cookies from 'cookies-js';
import Card from 'material-ui/lib/card/card';
import FontIcon from 'material-ui/lib/font-icon';
import Loader from 'react-loader';

import {fetchApiData} from 'actions/ParentCard.actions';

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
      chartOptions: {}
    };
  }

  componentDidMount() {
    const { store } = this.context;
    const { props } = this;

    const {api, query} = props.meta;
    this.unsubscribe = store.subscribe(() => {});

    if (props.name === 'Table') {
      this.setState({
        columns: props.columns,
        attributes: props.attributes
      })
    }

    if (props.parent === 'Compound') {
      this.setState({
        sectionTitle: props.meta.title,
        apiFieldMapping: props.apiFieldMapping,
        legend: props.meta.legend,
        chartOptions: props.meta.chartOptions
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

    return React.cloneElement(props.children, {
            data: props.data,
            multiData: props.multiData,
            apiFieldMapping: props.apiFieldMapping,
            sectionTitle: props.meta.title,
            legend: props.meta.legend,
            chartOptions: props.meta.chartOptions
          });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {props} = this;

    if(props.meta.showHeader) {
      return (
        <Card style={{...props.attributes.style}}>
          <header style={{padding: '10px 15px', height: '56px',
                          display: 'flex', alignItems: 'center', backgroundColor: '#cdcdcd'}}>
            <div>
              <span style={{textTransform: 'capitalize', fontSize: '18px'}}>{props.meta.title}</span>
            </div>

            <div style={{marginLeft: 'auto'}}>
              <FontIcon className='material-icons' style={{marginRight: '10px', fontSize: '20px'}}>refresh</FontIcon>
              <FontIcon className='material-icons' style={{fontSize: '20px'}}>clear</FontIcon>
            </div>
          </header>

          <div>
          {
            props.meta.apis ?
              (
                React.cloneElement(props.children, {
                  data: props.data,
                  multiData: this.state.multiData ,
                  apiFieldMapping: props.apiFieldMapping,
                  columns: props.columns,
                  attributes: props.attributes
                })
              ) :
              (
                React.cloneElement(props.children, {
                  data: props.data,
                  apiFieldMapping: props.apiFieldMapping,
                  attributes: props.attributes,
                  columns: props.columns
                })
              )
          }
          </div>
        </Card>
      )
    }
    else {
      return this.getElement()
    }
  }
}

ParentCard.contextTypes = {
  store: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const {apiData} = state;

  let data;
  if(apiData.hasIn(['components', ownProps.id])) {
    data = apiData.getIn(['components', ownProps.id])
                  .get('data');
  }
  else {
    data = null;
  }

  return {
    data: data
  };
}

export default connect(mapStateToProps, {
  fetchApiData
})(ParentCard);
