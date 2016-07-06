import React from 'react';
import FontIcon from 'material-ui/FontIcon';

class PercentageWidget extends React.Component {
  displayIcon(iconIndex) {
    const {props} = this;
    const style = {
      'overlayDiv': {
        height: '14px',
        width: '22px',
        position: 'absolute',
        zIndex: '10',
        backgroundColor: '#E5E5EA',
        marginTop: '2px',
        marginLeft: '1px',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        borderLeft: '2px solid #2BD8D0',
        borderTop: '2px solid #2BD8D0',
        borderRight: '2px solid #2BD8D0'
      },
      'icon': {
        color: '#2BD8D0'
      }
    };

    let percentage = (props.percentage).toString();

    if (parseInt(iconIndex) <= percentage[0]) {
      style.overlayDiv = Object.assign(style.overlayDiv,
        {
          backgroundColor: '#2BD8D0'
        }
      );
    }

    if (parseInt(iconIndex) > percentage[0]) {
      style.overlayDiv = Object.assign(style.overlayDiv,
        {
          borderTop: '2px solid #E5E5EA',
          borderLeft: '2px solid #E5E5EA',
          borderRight: '2px solid #E5E5EA',
          backgroundColor: '#E5E5EA'
        }
      );
      style.icon = Object.assign(style.icon,
        {
          color: '#E5E5EA'
        }
      );
    }

    if (parseInt(iconIndex) === (parseInt(percentage[0]) + 1)) {
      style.overlayDiv = Object.assign(style.overlayDiv,
        {
          borderBottom: (parseInt(percentage[1]) + 1) + 'px solid #2BD8D0'
        }
      );
      style.icon = Object.assign(style.icon,
        {
          color: '#2BD8D0'
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
