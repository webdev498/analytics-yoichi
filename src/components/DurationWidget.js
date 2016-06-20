import React from 'react';
import {msToTime} from 'utils/utils';

let timeValue = [];

const convertTime = (props) => {
  timeValue = msToTime(props.timeValue);
};

const DurationWidget = (props) => (
  <div style={{display: 'flex', flexWrap: 'wrap'}}>
    {convertTime(props)}
    <div>
      <div className='duration'>{timeValue[0]}</div><br />
      <div className='durationLabel'>Hour</div>
    </div>
    <div className='durationSeparator'>:</div>
    <div>
      <div className='duration'>{timeValue[1]}</div><br />
      <div className='durationLabel'>Min</div>
    </div>
    <div className='durationSeparator'>:</div>
    <div>
      <div className='duration'>{timeValue[2]}</div><br />
      <div className='durationLabel'>Sec</div>
    </div>
  </div>
);

export default DurationWidget;
