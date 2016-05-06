import React from 'react';

import Cookies from 'cookies-js';

export default class ParentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  componentDidMount() {
    const accessToken = Cookies.get("access_token");
    const tokenType = Cookies.get("token_type");

    if(this.props.api) {
      fetch(this.props.api, {
        method: 'GET',
        headers: {
          'Authorization': `${tokenType} ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        })
      })
    }
  }

  render() {

    return React.cloneElement(this.props.children, { data: this.state.data })
  }
}
