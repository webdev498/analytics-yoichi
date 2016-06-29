import React from 'react';

class ScoreWidget extends React.Component {
  render() {
    const {props} = this;
    const style = {
      color: 'white',
      borderRadius: '50px',
      width: '50px',
      height: '50px',
      textAlign: 'center',
      padding: '6px',
      fontSize: '20pt',
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
