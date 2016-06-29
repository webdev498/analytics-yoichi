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
          <div className='duration'>{timeValue.timeArray[0]}</div><br />
          <div className='durationLabel'>Hour</div>
        </div>
        <div className='durationSeparator'>:</div>
        <div>
          <div className='duration'>{timeValue.timeArray[1]}</div><br />
          <div className='durationLabel'>Min</div>
        </div>
        <div className='durationSeparator'>:</div>
        <div>
          <div className='duration'>{timeValue.timeArray[2]}</div><br />
          <div className='durationLabel'>Sec</div>
        </div>
      </div>
    );
  }
}

export default DurationWidget;
