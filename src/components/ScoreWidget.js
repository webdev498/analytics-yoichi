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
      };

    let className = (scoreValue >= 60 && scoreValue <= 100) ? 'sw-high-priority' : 'sw-low-priority';

    if (props.inverse) {
      style.borderRadius = 0;
      style.backgroundColor = 'transparent';
      style.color = (scoreValue >= 60 && scoreValue <= 100) ? Colors.coral : Colors.mustard;
      className = '';
    }

    return (
      <div style={{...style, ...props.style}} className={className}>
        {scoreValue}
      </div>
    );
  }
}

export default ScoreWidget;
