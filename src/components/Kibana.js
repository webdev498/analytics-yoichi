import React, {PropTypes} from 'react';

const style = {
  width: '100%',
  height: '100%',
  border: 0
};

class Kibana extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  getUrl() {
    const data = this.props.data;
    // console.log(data);
    return '/';
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
