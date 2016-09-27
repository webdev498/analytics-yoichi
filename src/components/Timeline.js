import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import PaginationWidget from 'components/PaginationWidget';
import Loader from '../components/Loader';
import TimelineBar from '../components/TimelineBar';
import Card from 'material-ui/Card/Card';
import {
  formatDateInLocalTimeZone,
  getEventTypeString
} from 'utils/utils';
import {
  fetchData,
  getSourceDestination,
  getDetails,
  getPosition
} from 'utils/timelineUtils';

let timeWindow = '1h',
  sliderRange = 4;

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
      'selectedMin': 0,
      'selectedMax': 50,
      'timelineType': props.meta.api.pathParams.type,
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

    this.displayEvents = this.displayEvents.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.prevPageChanged = this.prevPageChanged.bind(this);
    this.nextPageChanged = this.nextPageChanged.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setSelectedSliderValues = this.setSelectedSliderValues.bind(this);
  }

  setSelectedSliderValues(selectedMin, selectedMax) {
    if (selectedMin !== undefined && selectedMax !== undefined) {
      this.setState({
        'selectedMin': selectedMin,
        'selectedMax': selectedMax
      });
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

    const rows = this.state.rows;
    let displayCount = 0;

    return (
      <div style={{
        width: '675px',
        overflowX: 'hidden',
        overflowY: 'hidden',
        height: '940px'
      }}>
        {
          rows.map(function(event, index) {
            let dateString = event[0].date,
              newLine = '<br />',
              dateTime = {
                date: '',
                time: ''
              },
              barId = 'bar' + index,
              topPositions = getPosition(document.getElementById(barId));

            if (topPositions.y !== undefined) {
              let top = topPositions.y - 200;
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
            if (dateString !== '') {
              newLine = (index === 0) ? '' : '<br />';
              dateTime = formatDateInLocalTimeZone(dateString);
              return (
                <div style={{display: 'flex'}}>
                  <div style={{width: '120px'}}>
                    <span style={{fontSize: '9pt', fontWeight: '600'}}>{dateTime.date}
                      <br />{dateTime.time}</span>
                  </div>

                  <Card style={{
                    boxShadow: '1px 1px 0 #cccccc',
                    padding: '10px',
                    height: '215px',
                    width: '500px',
                    backgroundColor: Colors.white,
                    border: '1px solid #cbcbd1',
                    fontSize: '14px',
                    marginBottom: '20px'}}>
                    <div style={{fontSize: '13pt', Color: Colors.grape, fontWeight: '600'}}>
                      {getSourceDestination(event[0])}
                    </div>
                    <div style={{fontSize: '13pt', color: Colors.grape, fontWeight: 'lighter'}}>
                      Type: {getEventTypeString(event[0].type)}
                    </div>
                    <div style={{fontSize: '13pt', color: Colors.grape, fontWeight: 'lighter'}}>
                      {getDetails(event[0])}
                    </div>
                  </Card>
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
          'nextPageStart': json.next
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
        {this.state.isFetching ? <Loader style={{}} /> : null}
        <div style={{'marginLeft': '150px', 'position': 'absolute'}}>
          {this.displayEvents(this.state.selectedMin, this.state.selectedMax)}
        </div>
        <PaginationWidget Size={this.state.totalPage}
          onPageChanged={this.pageChanged()}
          onPrevPageChanged={this.prevPageChanged()}
          onNextPageChanged={this.nextPageChanged()}
          currentPage={this.state.currentPage} />
        <TimelineBar data={this.state.rows} setSelectedSliderValues={this.setSelectedSliderValues} />
      </div>
    );
  }
}

export default TimelineGraph;
