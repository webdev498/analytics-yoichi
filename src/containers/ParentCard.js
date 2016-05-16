import React from 'react';

import Cookies from 'cookies-js';
import Card from 'material-ui/lib/card/card';
import FontIcon from 'material-ui/lib/font-icon';
import Loader from 'react-loader';

export default class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null,firstData: null,secondData: null,loaded: false };
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

    const apis = this.props.meta.apis;
    if (apis != undefined) {
      const api1 = apis[0];
      const api2 = apis[1];
      //for (let i=0; i < apis.length; i++) {
        if(api1) {
          fetch(api1, {
            method: 'GET',
            headers: {
              'Authorization': `${tokenType} ${accessToken}`
            }
          })
          .then(response => response.json())
          .then(json => {
            this.setState({
              firstData: json,
              loaded: true
            })

          })
        }
        if(api2) {
          fetch(api2, {
            method: 'GET',
            headers: {
              'Authorization': `${tokenType} ${accessToken}`
            }
          })
          .then(response => response.json())
          .then(json => {
            this.setState({
              secondData: json,
              loaded: true
            })

          })
        }
      //}
    }
  }

  render() {
        if(this.props.meta.showHeader) {
      return (

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
              {React.cloneElement(this.props.children, { data: this.state.data , multiData: [this.state.firstData, this.state.secondData] })}
            </div>

          </Card>

      )
    }
    else {
      return React.cloneElement(this.props.children, { data: this.state.data })
    }
  }
}
