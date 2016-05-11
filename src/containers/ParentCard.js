import React from 'react';

import Cookies from 'cookies-js';
import Card from 'material-ui/lib/card/card';
import FontIcon from 'material-ui/lib/font-icon';
import Loader from 'react-loader';

export default class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null,loaded: false };
  }

  componentDidMount() {
    const accessToken = Cookies.get("access_token");
    const tokenType = Cookies.get("token_type");

    const api = this.props.meta.api;
    if(api) {
      fetch(api, {
        method: 'GET',
        headers: {
          'Authorization': `${tokenType} ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json,
          loaded: true
        })

      })
    }
  }

  render() {
        if(this.props.meta.showHeader) {
      return (
        <Loader loaded={this.state.loaded} style={{width:'100%'}}>
        <Card style={{...this.props.attributes.style}}>
          <header style={{padding: '10px 15px', height: '56px',
                          display: 'flex', alignItems: 'center', backgroundColor: '#cdcdcd'}}>
            <div>
              <span style={{textTransform: 'capitalize', fontSize: '18px'}}>{this.props.meta.title}</span>
            </div>

            <div style={{marginLeft: 'auto'}}>
              <FontIcon className='material-icons' style={{marginRight: '10px', fontSize: '20px'}}>refresh</FontIcon>
              <FontIcon className='material-icons' style={{fontSize: '20px'}}>clear</FontIcon>
            </div>

          </header>

            <div>
              {React.cloneElement(this.props.children, { data: this.state.data })}
            </div>

        </Card>
        </Loader>
      )
    }
    else {
      return React.cloneElement(this.props.children, { data: this.state.data })
    }
  }
}
