import React from 'react';
import {Colors} from 'theme/colors';

class ScoreWidget extends React.Component {
  render() {
    const {props} = this,
      scoreValue = parseInt(props.scoreValue),
      style = {
        color: Colors.white,
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'Open Sans, sans-serif' // ,
        // background: (scoreValue >= 60 && scoreValue <= 100) ? linear-gradient('to right', '#f69275','#f79c81','#f8a58d','#f8ae99') :
          // linear-gradient('to right','#fcc875','#fccd80','#fcd18b','#fdd698')
      };
    return (
      <div style={style} className='scoreWidget'>
        {props.scoreValue}
      </div>
    );
  }
}

export default ScoreWidget;
