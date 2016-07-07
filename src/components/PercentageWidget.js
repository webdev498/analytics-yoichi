import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';
import {isUndefined} from 'utils/utils';

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

    let percentage = props.percentage;

    let firstDigit = parseInt(percentage.charAt(0)),
      secondDigit = parseInt(percentage.charAt(1));

    if (parseInt(iconIndex) <= firstDigit) {
      style.overlayDiv = Object.assign(style.overlayDiv,
        {
          backgroundColor: Colors.turquoise
        }
      );
    }

    if (parseInt(iconIndex) > firstDigit) {
      style.overlayDiv = Object.assign(style.overlayDiv,
        {
          borderTop: '2px solid ' + Colors.cloud,
          borderLeft: '2px solid ' + Colors.cloud,
          borderRight: '2px solid ' + Colors.cloud,
          backgroundColor: Colors.cloud
        }
      );
      style.icon = Object.assign(style.icon,
        {
          color: Colors.cloud
        }
      );
    }

    if (parseInt(iconIndex) === (parseInt(firstDigit) + 1)) {
      style.overlayDiv = Object.assign(style.overlayDiv,
        {
          borderBottom: (secondDigit + 1) + 'px solid ' + Colors.turquoise
        }
      );
      style.icon = Object.assign(style.icon,
        {
          color: Colors.turquoise
        }
      );
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
