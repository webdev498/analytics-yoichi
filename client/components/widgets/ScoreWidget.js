import React from 'react';
import {Colors} from '../../../commons/colors';
import {getColor} from '../../../commons/utils/utils';
import { DEFAULT_FONT } from 'Constants';

const styles = {
  wrap: {
    color: Colors.white,
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    lineHeight: '50px',
    textAlign: 'center',
    fontSize: '24px',
    fontFamily: DEFAULT_FONT,
    border: '3px solid',
    boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)'
  },
  inverse: {
    borderRadius: 0,
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    fontSize: '24px',
    fontFamily: DEFAULT_FONT
  }
};

class ScoreWidget extends React.Component {
  render() {
    const {props} = this,
      scoreValue = parseInt(props.scoreValue),
      color = getColor(scoreValue);

    let style;
    if (props.inverse) {
      style = {...styles.inverse, color};
    }
    else {
      style = {...styles.wrap, backgroundColor: color};
    }

    return (
      <div style={{...style, ...props.style}}>
        {scoreValue}
      </div>
    );
  }
}

export default ScoreWidget;
