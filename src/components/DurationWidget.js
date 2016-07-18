import React, {PropTypes} from 'react';
import {msToTime} from 'utils/utils';
import {Colors} from 'theme/colors';

class DurationWidget extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    tableOptions: PropTypes.object
  }

  convertTime() {
    const {props} = this;
    let timeValue = {};
    timeValue = msToTime(props.timeValue);
    return timeValue;
  }

  render() {
    let timeValue = this.convertTime(),
      style = {
        'hour': {
          backgroundColor: Colors.durationWidgetColor.hour
        },
        'min': {
          backgroundColor: Colors.durationWidgetColor.min
        },
        'sec': {
          backgroundColor: Colors.durationWidgetColor.sec
        }
      };
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <div>
          <div className='duration' style={style.hour}>{timeValue.timeArray[0]}</div><br />
          <div className='durationLabel'>hh</div>
        </div>
        <div className='durationSeparator'>:</div>
        <div>
          <div className='duration' style={style.min}>{timeValue.timeArray[1]}</div><br />
          <div className='durationLabel' style={{paddingLeft: '3px'}}>mm</div>
        </div>
        <div className='durationSeparator'>:</div>
        <div>
          <div className='duration' style={style.sec}>{timeValue.timeArray[2]}</div><br />
          <div className='durationLabel' style={{paddingLeft: '10px'}}>ss</div>
        </div>
      </div>
    );
  }
}

export default DurationWidget;
