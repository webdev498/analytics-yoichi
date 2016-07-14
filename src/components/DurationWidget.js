import React, {PropTypes} from 'react';
import {msToTime} from 'utils/utils';

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
    let timeValue = this.convertTime();
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <div>
          <div className='duration' style={{backgroundColor: '#9BE9E7'}}>{timeValue.timeArray[0]}</div><br />
          <div className='durationLabel'>hh</div>
        </div>
        <div className='durationSeparator'>:</div>
        <div>
          <div className='duration' style={{backgroundColor: '#B9EEED'}}>{timeValue.timeArray[1]}</div><br />
          <div className='durationLabel' style={{paddingLeft: '3px'}}>mm</div>
        </div>
        <div className='durationSeparator'>:</div>
        <div>
          <div className='duration' style={{backgroundColor: '#D9F2F3'}}>{timeValue.timeArray[2]}</div><br />
          <div className='durationLabel' style={{paddingLeft: '10px'}}>ss</div>
        </div>
      </div>
    );
  }
}

export default DurationWidget;
