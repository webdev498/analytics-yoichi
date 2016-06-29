import React from 'react';

class ScoreWidget extends React.Component {
  render() {
    const {props} = this;
    const style = {
      color: 'white',
      borderRadius: '50px',
      width: '60px',
      height: '60px',
      textAlign: 'center',
      padding: '7px',
      fontSize: '24pt',
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
