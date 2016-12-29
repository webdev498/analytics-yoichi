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

  render() {
    return (
      <iframe id='kibana-view'
        style={style}
        src={this.props.url} />
    );
  }
}

export default Kibana;
