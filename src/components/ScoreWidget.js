import React from 'react';

class ScoreWidget extends React.Component {
  render() {
    const {props} = this;
    const style = {
      color: 'white',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      fontSize: '24px',
      fontFamily: 'Open Sans'
    };
    return (
      <div style={style} className='scoreWidget'>
        {props.scoreValue}
      </div>
    );
  }
}

export default ScoreWidget;
