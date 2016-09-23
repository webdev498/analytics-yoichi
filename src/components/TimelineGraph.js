import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import moment from 'moment';
import PaginationWidget from 'components/PaginationWidget';
import Loader from '../components/Loader';
import {
  formatBytes,
  formatMicroseconds,
  formatDateInLocalTimeZone,
  getEventTypeString
} from 'utils/utils';
import {baseUrl} from 'config';
import Cookies from 'cookies-js';

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

const styles = {
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  source: {
    fontSize: '15px'
  }
};

function getSource(source) {
  let details = '';
  if (source.ip) {
    details += '<span>';
    details += '<span>' + source.ip + ' </span>';
    if (source.country) {
      details += '<span class="flag-icon flag-icon-' + source.country.toLowerCase() + '"> </span>';
    }
    if (source.port) {
      details += '<span> on Port ' + source.port + '</span>';
    }
    details += '</span>';
  }

  return details;
}

function getDestinaton(dest) {
  let details = '';
  if (dest.ip) {
    details += '<span>';
    details += '<span> connected to ' + dest.ip + ' </span>';
    if (dest.country) {
      details += '<span class={"flag-icon flag-icon-' + dest.country.toLowerCase() + '"> </span>';
    }
    if (dest.port) {
      details += '<span> on Port ' + dest.port + '</span>';
    }
    details += '</span>';
  }

  return details;
}

function getSourceDestination(row) {
  let details = '';
  const {source, destination} = row;
  details += '<div style={styles.source}>';
  details += '<span>' + getSource(source) + '</span>';
  details += '<span>' + getDestinaton(destination) + '</span>';
  details += '</div>';
  return details;
}

function getConn(row) {
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

function getSSH(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Direction: ' + data.ssh.direction + '</span><br />';
  details += '<span>Client: ' + data.ssh.client + '</span><br />';
  details += '<span>Server: ' + data.ssh.server + '</span><br />';
  details += '<span>Successful: ' + data.ssh.success + '</span>';
  details += '</div>';
  return details;
}

function getDNS(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>DNS Response: ' + data.dns.answers[0] + '</span>';
  details += '</div>';
  return details;
}

function getHTTP(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>User Agent: ' + data.http.userAgent + '</span><br />';
  details += '<span>Referrer: ' + data.http.referrer + '</span>';
  details += '</div>';
  return details;
}

function getSSL(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Server: ' + data.ssl.serverName + '</span><br />';
  details += '<span>SSL Version: ' + data.ssl.versio + '</span><br />';
  details += '<span>Issuer: ' + data.ssl.issue + '</span>';
  details += '</div>';
  return details;
}

function getFile(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Source: ' + data.files.txHosts[0] + '</span><br />';
  details += '<span>Destination: ' + data.files.rxHosts[0] + '</span><br />';
  details += '<span>File Hash: ' + data.files.sha256 + '</span>';
  details += '</div>';
  return details;
}

function getReport(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>File Name: ' + data.report.file.fileName + '</span><br />';
  details += '<span>sha256: ' + data.report.file.sha256 + '</span><br />';
  details += '<span>Status: ' + data.report.status + '</span><br />';
  details += '<span>Score: ' + data.report.score + '</span><br />';
  details += '<span>MIME Type: ' + data.report.file.mimeType + '</span>';
  details += '</div>';
  return details;
}

function getAlert(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Severity: ' + data.alert.severity + '</span><br />';
  details += '<span>Signature: ' + data.alert.signature + '</span><br />';
  details += '<span>Protocol: ' + data.alert.proto + '</span><br />';
  details += '<span>Category: ' + data.alert.category + '</span>';
  details += '</div>';
  return details;
}

function getOther(data) {
  const keys = Object.keys(data);

  function getDetails(value) {
    const keys = Object.keys(value);
    return keys.map((key) => {
      return (<li>{key}: {value[key]} &nbsp;&nbsp;</li>);
    });
  }

  return (
    <ul style={styles.list}>
      {
        keys.map((key) => {
          const value = data[key];
          if (Object.keys(value) > 1) {
            return getDetails(value);
          }
          else {
            return (<li>{key}: {value} &nbsp;&nbsp;</li>);
          }
        })
      }
    </ul>
  );
}

function getDetails(row) {
  switch (row.type.toLowerCase()) {
    case 'conn':
      return getConn(row);
    case 'ssh':
      return getSSH(row);
    case 'dns':
      return getDNS(row);
    case 'http':
      return getHTTP(row);
    case 'ssl':
      return getSSL(row);
    case 'file':
      return getFile(row);
    case 'report':
      return getReport(row);
    case 'alert':
      return getAlert(row);
    default:
      return getOther(row.data[row.type]);
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

function fetchData(pageNumber) {
  const accessToken = Cookies.get('access_token'),
    tokenType = Cookies.get('token_type'),
    apiUrl = baseUrl + '/api/alert/' + this.state.timelineType + '?window=' + this.state.duration +
    '&date=' + this.state.alertDate + '&filter=' + this.state.filter + '&count=' + this.state.pageSize +
    '&from=' + pageNumber,
    customHeaders = {
      'Accept': 'application/json'
    },
    defaultHeaders = Object.assign({
      'Authorization': `${tokenType} ${accessToken}`
    }, customHeaders);

  return fetch(apiUrl, {
    method: 'GET',
    headers: defaultHeaders
  })
  .then(response => response.json()
  )
  .catch(error => {
    this.setState({
      isFetching: false
    });
    return Promise.reject(Error(error.message));
  });
}

class TimelineGraph extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    meta: PropTypes.object
  }

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
      'selectedMax': '',
      'timelineType': props.meta.api.pathParams.type,
      'duration': props.duration,
      'alertDate': props.meta.api.queryParams.date,
      'filter': props.meta.api.queryParams.filter,
      'totalCount': 0,
      'totalPage': 0,
      'currentPage': 1,
      'pageSize': props.attributes.noOfEventsPerPage,
      'rows': [],
      'nextPageStart': 0,
      'isFetching': false
    };

    this.updateSelectedArea = this.updateSelectedArea.bind(this);
    this.displayEvents = this.displayEvents.bind(this);
    this.displayEventBar = this.displayEventBar.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.prevPageChanged = this.prevPageChanged.bind(this);
    this.nextPageChanged = this.nextPageChanged.bind(this);
    this.fetchData = this.fetchData.bind(this);
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
    if (this.state.rows.length === 0) {
      const {props} = this;

      if (!props.data) {
        return;
      }

      this.state.totalCount = props.data.total;
      this.state.totalPage = (props.data.total / props.attributes.noOfEventsPerPage);
      this.state.currentPage = 1;
      this.state.pageSize = props.attributes.noOfEventsPerPage;
      this.state.nextPageStart = props.data.next;
      this.state.rows = props.data.rows;
      this.state.duration = props.duration;
    }

    const rows = this.state.rows;
    let eventDetails = '';

    rows.map(function(event, index) {
      let dateString = event[0].date,
        newLine = '<br />';

      let stylenew = {
        height: '20px',
        width: '200px',
        marginLeft: '150px'
      };
      /* let barId = 'bar' + index,
        topPositions = getPos(document.getElementById(barId));

      if (topPositions.y !== undefined) {
        let top = topPositions.y - 215;
        if (selectedMin !== '' && selectedMax !== '') {
          if (selectedMin <= top && selectedMax >= top) {
            if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
              document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[0];
            }
          }
          else {
            if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
              document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[1];
            }
            dateString = '';
          }
        }
        else {
          if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
            document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[1];
          }
          dateString = '';
        }
      }*/
      if (dateString !== '') {
        newLine = (index === 0) ? '' : '<br />';
        let dateTime = formatDateInLocalTimeZone(dateString);
        let details = getDetails(event[0]);

        eventDetails += '<div style="display:flex;">';
        eventDetails += '<div style="width: 120px;"><span style="font-size: 9pt; font-weight: 600;">' + dateTime.date;
        eventDetails += '<br/>' + dateTime.time + '</span></div>';
        eventDetails += '<div style="height:190px;width:20px;font-size: 10pt;background-color:#fcc875;box-shadow: 2px 2px 0 #cccccc;writing-mode:tb;padding-top: 7px;">' + getEventTypeString(event[0].type) + '</div>';
        eventDetails += '<div style="box-shadow: 2px 2px 0 #cccccc;float:left;padding: 10px;height:190px;width:500px;background-color:white;border: 1px solid #cbcbd1;font-size: 14px;margin-bottom:20px;">';
        eventDetails += '<div style="font-size:13pt;color:#444C63;font-weight:semibold;">' + getSourceDestination(event[0]) + '</div>';
        eventDetails += '<div style="font-size:13pt;color:#444C63;font-weight:lighter;">' + details + '</div>';
        eventDetails += '</div>';
        eventDetails += '</div>';
      }
    });
    return (
      <div dangerouslySetInnerHTML={{__html: eventDetails}}></div>
    );
  }

  fetchData(pageNumber) {
    const accessToken = Cookies.get('access_token'),
      tokenType = Cookies.get('token_type'),
      apiUrl = baseUrl + '/api/alert/' + this.state.timelineType + '?window=' + this.state.duration +
      '&date=' + this.state.alertDate + '&filter=' + this.state.filter + '&count=' + this.state.pageSize +
      '&from=' + this.state.nextPageStart,
      customHeaders = {
        'Accept': 'application/json'
      },
      defaultHeaders = Object.assign({
        'Authorization': `${tokenType} ${accessToken}`
      }, customHeaders);

    return fetch(apiUrl, {
      method: 'GET',
      headers: defaultHeaders
    })
    .then(response => response.json()
    )
    .catch(error => {
      this.setState({
        isFetching: false
      });
      return Promise.reject(Error(error.message));
    });
  }

  pageChanged() {
    const that = this;
    return (pageNumber, e) => {
      e.preventDefault();
      that.setState({
        'isFetching': true
      });

      const fetchedData = that.fetchData(pageNumber);

      if (!fetchedData) {
        that.setState({
          isFetching: false
        });
        return;
      }
      fetchedData.then(
        function(json) {
          console.log(json);
          that.setState({
            'isFetching': false,
            'currentPage': pageNumber,
            'rows': json.rows,
            'nextPageStart': json.next
          });
        }
      );
    };
  }

  prevPageChanged(pageNumber, e) {
    e.preventDefault();
    console.log('prev:', (parseInt(pageNumber) - 1));
    if ((parseInt(pageNumber) - 1) > 0) {
      this.setState({
        'currentPage': pageNumber - 1
      });
      // this.populateData(pageNumber);
      fetchData(pageNumber);
    }
  }

  nextPageChanged(pageNumber, pageSize, e) {
    e.preventDefault();
    if ((parseInt(pageNumber) + 1) <= pageSize) {
      this.setState({
        'currentPage': pageNumber + 1
      });
      fetchData(pageNumber);
      // this.populateData(pageNumber);
    }
  }

  render() {
    // let prevTimestamp = 0,
    //   prevMarginTop = 0;

    return (
      <div>
        {this.state.isFetching ? <Loader style={{}} /> : null}
        {/*{this.displayEventBar()}*/}
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
        <PaginationWidget Size={this.state.totalPage}
          onPageChanged={this.pageChanged()}
          onPrevPageChanged={this.prevPageChanged}
          onNextPageChanged={this.nextPageChanged}
          currentPage={this.state.currentPage} />
      </div>
    );
  }
}

export default TimelineGraph;
