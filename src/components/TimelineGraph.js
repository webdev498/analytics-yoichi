import React from 'react';
import {Colors} from 'theme/colors';
import moment from 'moment';
import {
  formatBytes,
  formatMicroseconds,
  formatDateInLocalTimeZone,
  getEventTypeString
} from 'utils/utils';

// const rows = data.rows;
// let rows = [];
let baseHeight = 500,
  timelineBarHeight = '2', // 2',
  timelineBarWidth = '50'; // '50';

let style = {
  'selectedArea': {
    'marginTop': '5px',
    'height': '0px',
    'width': '50px',
    'position': 'absolute',
    'marginLeft': '5px',
    'background': Colors.smoke
  }
};

function getDetails(row) {
  if (row.type.toLowerCase() === 'conn') {
    const {data} = row;
    let details = '';
    details += '<div>';
    details += '<span>Service: ' + data.conn.service + '</span><br />';
    details += '<span>State: ' + data.conn.state + '</span><br />';
    details += '<span>Requested Bytes: ' + formatBytes(data.conn.reqBytes, 2) + '</span><br />';
    details += '<span>Response Bytes: ' + formatBytes(data.conn.respBytes, 2) + '</span><br />';
    details += '<span>Duration: ' + formatMicroseconds(data.conn.duration) + '</span>';
    details += '</div>';
    return details;
  }
  else {
    return null;
  }
}

function getTimelineColor(eventType) {
  let color = '';
  switch (eventType) {
    case 'conn':
      color = Colors.defaultTimelineGraphPaletteColors[0];
      break;
    case 'ip':
      color = Colors.defaultTimelineGraphPaletteColors[1];
      break;
    case 'ssh':
      color = Colors.defaultTimelineGraphPaletteColors[2];
      break;
    case 'dns':
      color = Colors.turquoise;
      break;
    case 'ssl':
      color = Colors.cloud;
      break;
    case 'file':
      color = Colors.garnet;
      break;
    case 'http':
      color = 'red';
      break;
  }
  return color;
}

function getPos(el) {
  let lx = 0, ly = 0;
  for (lx = 0, ly = 0;
     el != null;
     lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx, y: ly};
}

class TimelineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'style': {
        'selectedArea': {
          'marginTop': '0px',
          'height': '0px',
          'width': '50px',
          'position': 'absolute',
          'marginLeft': '5px',
          'background': Colors.smoke
        }
      },
      'selectedMin': '',
      'selectedMax': ''
    };

    this.updateSelectedArea = this.updateSelectedArea.bind(this);
    this.displayEvents = this.displayEvents.bind(this);
    this.displayEventBar = this.displayEventBar.bind(this);
  }

  updateSelectedArea() {
    return (event) => {
      let sliderValue = $('#slider-range').slider('value'),
        selectedRange = [
          sliderValue - 6,
          sliderValue + 6
        ];

      this.setState({
        'style': {
          'selectedArea': {
            'marginTop': ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8) + 'px',
            'height': (baseHeight * (selectedRange[1] - selectedRange[0]) / 100) + 'px',
            'width': timelineBarWidth + 'px',
            'position': 'absolute',
            'marginLeft': '5px',
            'background': Colors.smoke,
            'zIndex': 1000,
            'opacity': 0.7
          }
        },
        'selectedMin': ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8),
        'selectedMax': ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8) +
          (baseHeight * (selectedRange[1] - selectedRange[0]) / 100)
      });
    };
  }

  componentDidMount() {
    // $('#slider-range').slider({
    //   orientation: 'vertical',
    //   range: 'min',
    //   min: 0,
    //   max: 100,
    //   slide: this.updateSelectedArea()
    // });
  }

  displayEventBar() {
    // return (a) => {
      // const {props} = this;

      // if(!props.data) {
      //   return;
      // }

      // rows = props.data.rows;

      // console.log(JSON.stringify(rows));

      // let prevTimestamp = 0,
      //   prevMarginTop = 0;

      // rows.map(function(event, index) {
      //   let dateString = event[0].date;
      //   console.log(dateString);
      //   let localTime = moment.utc(dateString).format('YYYY-MM-DD HH:mm:ss'),
      //     d = new Date(localTime),
      //     dateInUTCFormat = moment.utc(d.toUTCString()).format('YYYY-MM-DD HH:mm:ss');

      //   dateInUTCFormat = dateInUTCFormat.replace(/-/g, '/');
      //   let convertedDate = new Date(Date.parse((dateInUTCFormat).toString()));
      //   let currentTimestamp = convertedDate.getTime();

      //   let barId = 'bar' + index;

      //   let style = {
      //     height: timelineBarHeight + 'px',
      //     width: timelineBarWidth + 'px',
      //     fontSize: '11px',
      //     backgroundColor: Colors.timelineBarColors[1], // getTimelineColor((event[0].type).toLowerCase()),
      //     marginTop: (index === 0) ? 0 : ((prevTimestamp - currentTimestamp) === prevMarginTop
      //       ? 2 : ((prevTimestamp - currentTimestamp) / 100))
      //   };

      //   prevMarginTop = (prevTimestamp - currentTimestamp);
      //   prevTimestamp = currentTimestamp;
      //   //{dateString}{event[0].type}

      //   return (
      //     <div id={barId} style={style}>1111111</div>
      //   );
      // })
    // };
  }

  displayEvents(selectedMin, selectedMax) {
    // return (a) => {
    const {props} = this;

    if (!props.data) {
      return;
    }

    const rows = props.data.rows;
    // return (eventReturn) => {
    let eventDetails = '';

    rows.map(function(event, index) {
      let dateString = event[0].date,
        newLine = '<br />';

      let stylenew = {
        height: '20px',
        width: '200px',
        marginLeft: '150px'
      };
      // let barId = 'bar' + index,
      //   topPositions = getPos(document.getElementById(barId));

      // if (topPositions.y !== undefined) {
      //   let top = topPositions.y - 215;
      //   if (selectedMin !== '' && selectedMax !== '') {
      //     if (selectedMin <= top && selectedMax >= top) {
      //       if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
      //         document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[0];
      //       }
      //     }
      //     else {
      //       if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
      //         document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[1];
      //       }
      //       dateString = '';
      //     }
      //   }
      //   else {
      //     if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
      //       document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[1];
      //     }
      //     dateString = '';
      //   }
      // }
      if (dateString !== '') {
        newLine = (index === 0) ? '' : '<br />';
        let dateTime = formatDateInLocalTimeZone(dateString);
        let details = getDetails(event[0]);

        eventDetails += '<div style="display:flex;">';
        eventDetails += '<div style="width: 120px;"><span style="font-size: 9pt; font-weight: 600;">' + dateTime.date;
        eventDetails += '<br/>' + dateTime.time + '</span></div>';
        eventDetails += '<div style="height:170px;width:20px;font-size: 10pt;background-color:#fcc875;box-shadow: 2px 2px 0 #cccccc;writing-mode:tb;padding-top: 7px;">' + getEventTypeString(event[0].type) + '</div>';
        eventDetails += '<div style="box-shadow: 2px 2px 0 #cccccc;float:left;padding: 10px;height:170px;width:500px;background-color:white;border: 1px solid #cbcbd1;font-size: 14px;margin-bottom:20px;">';
        eventDetails += '<div style="font-size:13pt;color:#444C63;font-weight:semibold;">' + event[0].id + ' ' + event[0].type + '</div>';
        eventDetails += '<div style="font-size:13pt;color:#444C63;font-weight:lighter;">' + details + '</div>';
        // eventDetails += '<br/>Protocol: ' + event[0].protocol.service;
        // eventDetails += '<br/>udpOrTcp: ' + event[0].protocol.udpOrTcp + '</div>';
        eventDetails += '</div>';
        eventDetails += '</div>';

        // eventDetails += newLine + '<span style="font-size: 14px; font-weight: 600;">' + dateTime.date;
        // eventDetails += '<br/>' + dateTime.time + '</span>';
      }
    });
    return (
      <div dangerouslySetInnerHTML={{__html: eventDetails}}></div>
    );
    // };
  }

  render() {
    let prevTimestamp = 0,
      prevMarginTop = 0;

    return (
      <div>{/*{this.displayEventBar()}*/}
        {/*<div id='slider-range' style={{height: baseHeight + 'px', position: 'absolute'}}></div>
        <div id='selectedArea' style={this.state.style.selectedArea}></div>
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
                marginTop: (index === 0) ? 0 : 2
              };

              prevMarginTop = (prevTimestamp - currentTimestamp);
              prevTimestamp = currentTimestamp;
              //{dateString}{event[0].type}

              return (
                <div id={barId} style={style}></div>
              );
            })
          }
        </div>*/}
        <div style={{'marginLeft': '150px', 'position': 'absolute'}}>
          {this.displayEvents(this.state.selectedMin, this.state.selectedMax)}
        </div>
      </div>
    );
  }
}

export default TimelineGraph;
