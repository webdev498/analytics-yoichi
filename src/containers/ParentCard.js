import React from 'react';
import { connect } from 'react-redux'

import Cookies from 'cookies-js';
import Card from 'material-ui/lib/card/card';
import FontIcon from 'material-ui/lib/font-icon';

import {fetchApiData} from 'actions/ParentCard.actions';

class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  componentDidMount() {
    const { store } = this.context;
    const { props } = this;

    const api = props.meta.api;
    this.unsubscribe = store.subscribe(() => {});

    if(api) {
      props.fetchApiData(props.id, api);
    }
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
            {React.cloneElement(props.children, { data: props.data })}
          </div>
        </Card>
      )
    }

    return React.cloneElement(props.children, { data: props.data })
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