import React, {PropTypes} from 'react';

const style = {
  width: '100%',
  height: '100%',
  border: 0
};

class Kibana extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  getUrl() {
    const url = this.props.url;
    console.log(url);
    return url;
  }

  render() {
    return (
      <iframe id='kibana-view'
        style={style}
        src={this.getUrl()} />
    );
  }
}

export default Kibana;
