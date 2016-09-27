import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import PaginationWidget from 'components/PaginationWidget';
import TimelineBar from '../components/TimelineBar';
import TrafficEvents from '../components/TrafficEvents';
import Alerts from '../components/Alerts';
import {formatDateInLocalTimeZone} from 'utils/utils';

import {
  fetchData,
  getPosition
} from 'utils/timelineUtils';

let timeWindow = '1h',
  sliderRange = 4;

const topMarginLag = 200;

function getDateOfSelectedEvents(barId, dateString, selectedMin, selectedMax, displayCount) {
  let topPositions = getPosition(document.getElementById(barId));
  if (topPositions.y !== undefined) {
    let top = topPositions.y - topMarginLag;
    // console.log(selectedMin, selectedMax, topPositions.y, top);
    if (selectedMin !== '' && selectedMax !== '') {
      if (selectedMin <= top && selectedMax >= top) {
        if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null &&
          displayCount < sliderRange) {
          document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[0];
          displayCount++;
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
  }
  return dateString;
}

class Timeline extends React.Component {
  static propTypes = {
    attributes: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const {params, attributes} = props;

    this.state = {
      'id': props.id,
      'type': attributes.type,
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
      'selectedMin': 0,
      'selectedMax': 50,
      'timelineType': attributes.type,
      'alertDate': params.date,
      // 'filter': props.meta.api.queryParams.filter,
      'totalCount': 0,
      'totalPage': 0,
      'currentPage': 1,
      'pageSize': props.attributes.noOfEventsPerPage,
      'maxNumbersOnLeftRight': props.attributes.maxNumbersOnLeftRightPagination,
      'displaySelectedRows': props.attributes.displaySelectedRows,
      'rows': [],
      'nextPageStart': 0,
      'isFetching': false
    };

    this.pageChanged = this.pageChanged.bind(this);
    this.prevPageChanged = this.prevPageChanged.bind(this);
    this.nextPageChanged = this.nextPageChanged.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setSelectedSliderValues = this.setSelectedSliderValues.bind(this);
    this.displayData = this.displayData.bind(this);
  }

  setSelectedSliderValues(selectedMin, selectedMax) {
    if (selectedMin !== undefined && selectedMax !== undefined) {
      this.setState({
        'selectedMin': selectedMin,
        'selectedMax': selectedMax
      });
    }
  }

  displayData(id, data) {
    if (this.state.type === 'traffic') {
      return (
        <TrafficEvents id={id} data={data} />
      );
    }
    if (this.state.type === 'alert') {
      return (
        <Alerts id={id} data={data} />
      );
    }
  }

  displayEvents(selectedMin, selectedMax) {
    const {props} = this;
    if (this.state.rows.length === 0 || timeWindow !== props.duration) {
      if (!props.data) {
        return;
      }

      this.state.totalCount = props.data.total;
      this.state.totalPage = parseInt(props.data.total / props.attributes.noOfEventsPerPage);
      this.state.currentPage = 1;
      this.state.pageSize = props.attributes.noOfEventsPerPage;
      this.state.nextPageStart = props.data.next;
      this.state.rows = props.data.rows;
      timeWindow = props.duration;

      if (this.state.rows.length === 0) {
        return (
          <div style={{marginLeft: '-150px'}}>No additional results were found.</div>
        );
      }
    }

    const rows = this.state.rows,
      displaySelectedRows = this.state.displaySelectedRows,
      that = this;

    let displayCount = 0,
      mainDivStyle = {
        width: '675px',
        height: '940px',
        overflow: 'hidden'
      },
      scrollbarStyle = displaySelectedRows ? '' : 'scrollbarStyle';

    if (!displaySelectedRows) {
      mainDivStyle = Object.assign(mainDivStyle, {
        overflowX: 'hidden',
        overflowY: 'auto'
      });
    }

    return (
      <div style={mainDivStyle} className={scrollbarStyle}>
        {
          rows.map(function(event, index) {
            let dateString = event[0].date,
              newLine = '<br />',
              dateTime = {
                date: '',
                time: ''
              },
              barId = 'bar' + index;

            if (displaySelectedRows) {
              dateString = getDateOfSelectedEvents(barId, dateString, selectedMin, selectedMax, displayCount);
            }

            if (dateString !== '') {
              newLine = (index === 0) ? '' : '<br />';
              dateTime = formatDateInLocalTimeZone(dateString);
              return (
                <div style={{display: 'flex'}}>
                  <div style={{width: '120px'}}>
                    <span style={{fontSize: '9pt', fontWeight: '600'}}>{dateTime.date}
                      <br />{dateTime.time}</span>
                  </div>

                  {that.displayData(barId, event[0])}
                </div>
              );
            }
          })
        }
      </div>
    );
  }

  fetchData(that, pageNumber) {
    that.setState({
      'isFetching': true
    });

    const parameters = {
      pageNumber: pageNumber,
      timelineType: this.state.timelineType,
      duration: timeWindow,
      alertDate: this.state.alertDate,
      filter: this.state.filter,
      pageSize: this.state.pageSize,
      nextPageStart: this.state.nextPageStart
    };

    const fetchedData = fetchData(parameters);

    if (!fetchedData) {
      that.setState({
        isFetching: false
      });
      return;
    }
    fetchedData.then(
      function(json) {
        that.setState({
          'isFetching': false,
          'currentPage': pageNumber,
          'rows': json.rows,
          'nextPageStart': json.next,
          'selectedMin': 0,
          'selectedMax': 50
        });
      }
    );
  }

  pageChanged() {
    const that = this;
    return (pageNumber, e) => {
      e.preventDefault();
      this.fetchData(that, pageNumber);
    };
  }

  prevPageChanged() {
    const that = this;
    return (pageNumber, e) => {
      e.preventDefault();
      if ((parseInt(pageNumber) - 1) > 0) {
        this.fetchData(that, pageNumber - 1);
      }
    };
  }

  nextPageChanged() {
    const that = this;
    return (pageNumber, pageSize, e) => {
      e.preventDefault();
      if ((parseInt(pageNumber) + 1) <= pageSize) {
        this.fetchData(that, pageNumber + 1);
      }
    };
  }

  render() {
    return (
      <div>
        <div style={{'marginLeft': '150px', 'position': 'absolute'}}>
          {this.displayEvents(this.state.selectedMin, this.state.selectedMax)}
        </div>

        <PaginationWidget Size={this.state.totalPage}
          onPageChanged={this.pageChanged()}
          onPrevPageChanged={this.prevPageChanged()}
          onNextPageChanged={this.nextPageChanged()}
          currentPage={this.state.currentPage}
          maxNumbersOnLeftRight={this.state.maxNumbersOnLeftRight} />

        <TimelineBar id={this.state.id}
          data={this.state.rows}
          setSelectedSliderValues={this.setSelectedSliderValues}
          duration={timeWindow} />
      </div>
    );
  }
}

export default Timeline;
