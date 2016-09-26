import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
// import $ from 'jquery';
// import {slider} from 'jquery-ui';
import moment from 'moment';

let baseHeight = 900,
  timelineBarHeight = '10', // 2',
  timelineBarWidth = '50',  // '50';
  sliderValue = 95,
  sliderRange = 4,
  rows = [];

class TimelineGraph extends React.Component {
  static propTypes = {
    setSelectedSliderValues: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      'selectedAreaStyle': {
      }
    };

    this.updateSelectedArea = this.updateSelectedArea.bind(this);
    this.displayEventBar = this.displayEventBar.bind(this);
  }

  updateSelectedArea() {
    return (event) => {
      let sliderValue = $('#slider-range').slider('value'),
        selectedRange = [
          sliderValue - sliderRange,
          sliderValue + sliderRange
        ];

      this.setState({
        'selectedAreaStyle': {
          'marginTop': ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8) + 'px',
          'height': (baseHeight * (selectedRange[1] - selectedRange[0]) / 100) + 'px',
          'width': timelineBarWidth + 'px',
          'position': 'absolute',
          'marginLeft': '5px',
          'background': Colors.smoke,
          'zIndex': 1000,
          'opacity': 0.7
        }
      });

      let selectedMin = ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8),
        selectedMax = ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8) +
          (baseHeight * (selectedRange[1] - selectedRange[0]) / 100);

      this.props.setSelectedSliderValues(selectedMin, selectedMax);
    };
  }

  displayEventBar() {
    const {props} = this;

    if (!props.data) {
      return;
    }

    rows = props.data;

    if (rows.length > 0) {
      $('#slider-range').slider({
        orientation: 'vertical',
        range: 'min',
        min: 0,
        max: 100,
        slide: this.updateSelectedArea(),
        value: sliderValue
      });
      // this.state = {
      //   'selectedAreaStyle': {
      //     'marginTop': ((baseHeight * (100 - (sliderValue + sliderRange)) / 100) - 12.8) + 'px',
      //     'height': (baseHeight * ((sliderValue + sliderRange) - (sliderValue - sliderRange)) / 100) + 'px',
      //     'width': timelineBarWidth + 'px',
      //     'position': 'absolute',
      //     'marginLeft': '5px',
      //     'background': Colors.smoke,
      //     'zIndex': 1000,
      //     'opacity': 0.7
      //   }
      // };
      this.updateSelectedArea();
    }
  }

  render() {
    let prevTimestamp = 0,
      prevMarginTop = 0;

    return (
      <div>
        <div id='slider-range' style={{height: baseHeight + 'px', position: 'absolute'}}></div>
        {this.displayEventBar()}
        <div id='selectedArea' style={this.state.selectedAreaStyle}></div>
        <div id='timelineGraph' style={{
          height: baseHeight + 'px', width: '70px', border: '0px solid red',
          marginLeft: '5px', position: 'absolute'}}>
          {
            rows.map(function(event, index) {
              let dateString = event[0].date;

              let localTime = moment.utc(dateString).format('YYYY-MM-DD HH:mm:ss'),
                d = new Date(localTime),
                dateInUTCFormat = moment.utc(d.toUTCString()).format('YYYY-MM-DD HH:mm:ss');

              dateInUTCFormat = dateInUTCFormat.replace(/-/g, '/');
              let convertedDate = new Date(Date.parse((dateInUTCFormat).toString()));
              let currentTimestamp = convertedDate.getTime();

              let barId = 'bar' + index;

              let style = {
                height: timelineBarHeight + 'px',
                width: timelineBarWidth + 'px',
                fontSize: '11px',
                backgroundColor: Colors.timelineBarColors[1], // getTimelineColor((event[0].type).toLowerCase()),
                // marginTop: (index === 0) ? 0 : ((prevTimestamp - currentTimestamp) === prevMarginTop
                //   ? 2 : ((prevTimestamp - currentTimestamp) / 10000))
                marginTop: (index === 0) ? 0 : 7
              };

              prevMarginTop = (prevTimestamp - currentTimestamp);
              prevTimestamp = currentTimestamp;

              return (
                <div id={barId} style={style}></div>
                // {dateString}{event[0].type}
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TimelineGraph;
