import React from 'react';
import {Colors} from 'theme/colors';

class ScoreWidget extends React.Component {
  render() {
    const {props} = this;
    const style = {
      color: Colors.white,
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      fontSize: '24px',
      fontFamily: 'Open Sans, sans-serif'
    };
    return (
      <div style={style} className='scoreWidget'>
        {props.scoreValue}
      </div>
    );
  }
}

export default ScoreWidget;
