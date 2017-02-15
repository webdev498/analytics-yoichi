import React from 'react';
import {Colors} from '../../../commons/colors';
import {getColor} from '../../../commons/utils/utils';
import { DEFAULT_FONT } from 'Constants';

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
        fontFamily: DEFAULT_FONT
      };

    let color = getColor(scoreValue);
    style.backgroundColor = color;

    if (props.inverse) {
      style.borderRadius = 0;
      style.backgroundColor = 'transparent';
      style.color = color;
    }

    return (
      <div style={{...style, ...props.style}}>
        {scoreValue}
      </div>
    );
  }
}

export default ScoreWidget;
