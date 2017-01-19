import React, {PropTypes} from 'react';
import {Colors} from '../../commons/colors';

const styles = {
  wrap: {
    backgroundColor: Colors.white,
    width: '100%'
  }
};

export default class DetailsTable extends React.Component {
  render() {
    const style = Object.assign({}, styles.wrap, this.props.style);
    return (
      <div style={style}>Details Table</div>
    );
  }
}
