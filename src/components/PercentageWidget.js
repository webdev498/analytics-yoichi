import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';

function setOverlayDivBackground(style, color) {
  style.overlayDiv = Object.assign(style.overlayDiv,
    {
      backgroundColor: color
    }
  );
}

function setOverlayDivBorder(style, borderSide, borderWidth, color) {
  let border = {};
  border['border' + borderSide] = borderWidth + ' solid ' + color;
  style.overlayDiv = Object.assign(style.overlayDiv, border);
}

function setIconColor(style, color) {
  style.icon = Object.assign(style.icon,
    {
      color: color
    }
  );
}

class PercentageWidget extends React.Component {
  displayIcon(iconIndex) {
    const {props} = this;
    if (!props) {
      return;
    }
    if (!props.percentage) {
      return;
    }

    const style = {
      'overlayDiv': {
        height: '14px',
        width: '23px',
        position: 'absolute',
        zIndex: '10',
        backgroundColor: Colors.cloud,
        marginTop: '2px',
        marginLeft: '1px',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        borderLeft: '2px solid ' + Colors.turquoise,
        borderTop: '2px solid ' + Colors.turquoise,
        borderRight: '2px solid ' + Colors.turquoise
      },
      'icon': {
        color: Colors.turquoise
      }
    };

    let percentage = props.percentage,
      percentageValue = parseInt(percentage);
    iconIndex = parseInt(iconIndex);

    if (percentageValue >= 100) {
      setOverlayDivBackground(style, Colors.turquoise);
    }

    if (percentageValue === 0) {
      setOverlayDivBackground(style, Colors.cloud);
      setOverlayDivBorder(style, 'Top', '2px', Colors.cloud);
      setOverlayDivBorder(style, 'Left', '2px', Colors.cloud);
      setOverlayDivBorder(style, 'Right', '2px', Colors.cloud);
      setIconColor(style, Colors.cloud);
    }
    else {
      if (percentage.length === 1) {
        if (iconIndex > 1) {
          setOverlayDivBackground(style, Colors.cloud);
          setOverlayDivBorder(style, 'Top', '2px', Colors.cloud);
          setOverlayDivBorder(style, 'Left', '2px', Colors.cloud);
          setOverlayDivBorder(style, 'Right', '2px', Colors.cloud);
          setIconColor(style, Colors.cloud);
        }
        if (iconIndex === 1) {
          setOverlayDivBorder(style, 'Top', '2px', Colors.cloud);
          setOverlayDivBorder(style, 'Left', '2px', Colors.cloud);
          setOverlayDivBorder(style, 'Right', '2px', Colors.cloud);
          setOverlayDivBorder(style, 'Bottom', (percentageValue + 1) + 'px', Colors.turquoise);
          setIconColor(style, Colors.turquoise);
        }
      }
    }

    if (percentage.length === 2) {
      let firstDigit = parseInt(percentage.charAt(0)),
        secondDigit = parseInt(percentage.charAt(1));

      if (iconIndex <= firstDigit) {
        setOverlayDivBackground(style, Colors.turquoise);
      }

      if (iconIndex > firstDigit) {
        setOverlayDivBackground(style, Colors.cloud);
        setOverlayDivBorder(style, 'Top', '2px', Colors.cloud);
        setOverlayDivBorder(style, 'Left', '2px', Colors.cloud);
        setOverlayDivBorder(style, 'Right', '2px', Colors.cloud);
        setIconColor(style, Colors.cloud);
      }

      if ((percentageValue % 10) !== 0 && iconIndex === (firstDigit + 1)) {
        setOverlayDivBorder(style, 'Bottom', (secondDigit + 1) + 'px', Colors.turquoise);
        setIconColor(style, Colors.turquoise);
      }
    }

    return (
      <div style={{marginBottom: '1px'}}>
        <div style={style.overlayDiv}></div>
        <FontIcon className='material-icons'
          style={style.icon}>
          {props.iconName}
        </FontIcon>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.displayIcon('10')}
        {this.displayIcon('9')}
        {this.displayIcon('8')}
        {this.displayIcon('7')}
        {this.displayIcon('6')}
        {this.displayIcon('5')}
        {this.displayIcon('4')}
        {this.displayIcon('3')}
        {this.displayIcon('2')}
        {this.displayIcon('1')}
      </div>
    );
  }
}

export default PercentageWidget;
