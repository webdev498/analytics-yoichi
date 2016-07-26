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
        fontFamily: 'Open Sans, sans-serif'
      },
      className = (scoreValue >= 60 && scoreValue <= 100) ? 'scoreWidgetBG1' : 'scoreWidgetBG2';

    return (
      <div style={style} className={className}>
        {props.scoreValue}
      </div>
    );
  }
}

export default ScoreWidget;
