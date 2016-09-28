import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import moment from 'moment';

let baseHeight = 900,
  timelineBarHeight = '10',
  timelineBarWidth = '50',
  sliderValue = 95,
  sliderRange = 4,
  rows = [];

const halfOfTheSliderHeight = 12.8;

class TimelineBar extends React.Component {
  static propTypes = {
    setSelectedSliderValues: PropTypes.func,
    timelineBarLoaded: PropTypes.func,
    id: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      'selectedAreaStyle': {
        'marginTop': '0px',
        'height': '65px',
        'width': timelineBarWidth + 'px',
        'position': 'absolute',
        'marginLeft': '5px',
        'background': Colors.smoke,
        'zIndex': 1000,
        'opacity': 0.7,
        'display': 'block'
      },
      'sliderId': 'slider-' + props.id,
      'selectedAreaId': 'selected-area-' + props.id,
      'timelineId': props.id
    };

    this.updateSelectedArea = this.updateSelectedArea.bind(this);
    this.displayEventBar = this.displayEventBar.bind(this);
  }

  updateSelectedArea() {
    return (event) => {
      let sliderValue = $('#' + this.state.sliderId).slider('value'),
        selectedRange = [
          sliderValue - sliderRange,
          sliderValue + sliderRange
        ];

      this.setState({
        'selectedAreaStyle': {
          'marginTop': ((baseHeight * (100 - selectedRange[1]) / 100) - halfOfTheSliderHeight) + 'px',
          'height': (baseHeight * (selectedRange[1] - selectedRange[0]) / 100) + 'px',
          'width': timelineBarWidth + 'px',
          'position': 'absolute',
          'marginLeft': '5px',
          'background': Colors.smoke,
          'zIndex': 1000,
          'opacity': 0.7,
          'display': 'block'
        }
      });

      let selectedMin = ((baseHeight * (100 - selectedRange[1]) / 100) - halfOfTheSliderHeight),
        selectedMax = ((baseHeight * (100 - selectedRange[1]) / 100) - halfOfTheSliderHeight) +
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
      $('#' + this.state.sliderId).slider({
        orientation: 'vertical',
        range: 'min',
        min: 0,
        max: 100,
        slide: this.updateSelectedArea(),
        value: sliderValue
      });

      if (!props.isLoaded) {
        this.props.timelineBarLoaded(true);
      }
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('test');
  //   this.state.selectedAreaStyle = nextProps.selectedAreaStyle;
  // }

  render() {
    let prevTimestamp = 0,
      prevMarginTop = 0;

    return (
      <div>
        <div id={this.state.sliderId} style={{height: baseHeight + 'px', position: 'absolute'}}></div>
        {this.displayEventBar()}
        <div id={this.state.selectedAreaId} style={this.state.selectedAreaStyle}></div>
        <div id={this.state.timelineId} style={{
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
                <div id={barId} key={barId} style={style}></div>
                // {dateString}{event[0].type}
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TimelineBar;
