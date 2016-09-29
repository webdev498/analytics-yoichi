import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import PaginationWidget from 'components/PaginationWidget';
// import TimelineBar from '../components/TimelineBar';
import TrafficEvents from '../components/TrafficEvents';
import Alerts from '../components/Alerts';
import Loader from '../components/Loader';
import {formatDateInLocalTimeZone} from 'utils/utils';

import {
  fetchData,
  getPosition
} from 'utils/timelineUtils';

let timeWindow = '1h',
  sliderRange = 4,
  topMarginLag = 980;

function getDateOfSelectedEvents(barId, dateString, selectedMin, selectedMax, displayCount) {
  let topPositions = getPosition(document.getElementById(barId));
  if (topPositions.y !== undefined) {
    let top = topPositions.y - topMarginLag;
    // console.log(barId, selectedMin, selectedMax, topPositions.y, top);
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
    params: PropTypes.object.isRequired,
    data: PropTypes.object
  }

  constructor(props) {
    super(props);

    const {params, attributes} = props;

    this.state = {
      'id': props.id,
      'type': attributes.type,
      'selectedAreaStyle': {
        'marginTop': '0px',
        'height': '65px',
        'width': '50px',
        'position': 'absolute',
        'marginLeft': '5px',
        'background': Colors.smoke,
        'zIndex': 1000,
        'opacity': 0.7
      },
      'selectedMin': 0,
      'selectedMax': 55,
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
      'isFetching': false,
      'timelineBarLoaded': false
    };

    this.pageChanged = this.pageChanged.bind(this);
    this.prevPageChanged = this.prevPageChanged.bind(this);
    this.nextPageChanged = this.nextPageChanged.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setSelectedSliderValues = this.setSelectedSliderValues.bind(this);
    this.displayData = this.displayData.bind(this);
    this.getRows = this.getRows.bind(this);
    this.timelineBarLoaded = this.timelineBarLoaded.bind(this);
    // this.setTopMarginLag = this.setTopMarginLag.bind(this);
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

  getRows() {
    const {props} = this;
    if (this.state.rows.length === 0 || timeWindow !== props.duration) {
      if (!props.data) {
        return;
      }

      this.state.totalCount = props.data.total;
      this.state.totalPage = Math.ceil(props.data.total / props.attributes.noOfEventsPerPage);
      this.state.currentPage = 1;
      this.state.pageSize = props.attributes.noOfEventsPerPage;
      this.state.nextPageStart = props.data.next;
      this.state.rows = props.data.rows;
      timeWindow = props.duration;

      if (this.state.rows.length === 0) {
        return (
          <div>No additional results were found.</div>
        );
      }
    }
    topMarginLag = props.attributes.topMarginLag;
  }

  displayEvents(selectedMin, selectedMax) {
    // if (!this.state.timelineBarLoaded) {
    //   return;
    // }
    const rows = this.state.rows,
      // displaySelectedRows = this.state.displaySelectedRows,
      that = this;

    let displayCount = 0,
      mainDivStyle = {
        width: '675px',
        // overflow: 'hidden'
      };
      // scrollbarStyle = displaySelectedRows ? '' : 'scrollbarStyle';

    // if (!displaySelectedRows) {
    //   mainDivStyle = Object.assign(mainDivStyle, {
    //     overflowX: 'hidden',
    //     overflowY: 'auto'
    //   });
    // } className={scrollbarStyle}

    return (
      <div style={mainDivStyle}>
        {
          rows.map(function(event, index) {
            let dateString = event[0].date,
              newLine = '<br />',
              dateTime = {
                date: '',
                time: ''
              },
              barId = 'bar' + index;

            // if (displaySelectedRows) {
            //   dateString = getDateOfSelectedEvents(barId, dateString, selectedMin, selectedMax, displayCount);
            // }

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

  fetchData(that, pageNumber, type) {
    // return (event) => {
      that.setState({
        'isFetching': true
      });

      let parameters = {};

      if (type === 'traffic') {
        parameters = {
          pageNumber: (pageNumber - 1) * that.state.pageSize,
          timelineType: that.state.timelineType,
          duration: timeWindow,
          alertDate: that.state.alertDate,
          filter: that.props.data.options.customParams.filter,
          pageSize: that.state.pageSize
        };
      }

      if (type === 'alert') {
        parameters = {
          pageNumber: (pageNumber - 1) * that.state.pageSize,
          pageSize: that.state.pageSize,
          duration: timeWindow,
          reportId: 'taf_alert_by_asset' // kept this hardcoded for now.
          // Later, I will have to use fetchApiData function from props object
        };
      }

      const fetchedData = fetchData(parameters, type);

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
            // 'nextPageStart': (pageNumber > 1) ? (that.state.nextPageStart + that.state.pageSize)
            //   : that.state.nextPageStart,
            'nextPageStart': json.next,
            'selectedMin': 0,
            'selectedMax': 55
          });
        }
      );
    // };
  }

  pageChanged() {
    const that = this;
    return (pageNumber, e) => {
      e.preventDefault();
      // let api = {};
      // if (that.state.type === 'traffic') {
        // api = {
        //   'path': '/api/alert/traffic',
        //   'queryParams': {
        //     'window': timeWindow,
        //     'count': this.state.pageSize,
        //     'from': (pageNumber === 1) ? (this.state.nextPageStart + this.state.pageSize) : this.state.nextPageStart,
        //     // 'filter': this.props.data.options.customParams.filter !== undefined
        //     //   ? this.props.data.options.customParams.filter
        //     //   : '',
        //     'filter': '((source.ip = 10.3.162.105 AND (type = conn AND destination.port > 1024 AND destination.internal != true)) OR (source.ip = 10.3.162.105 AND (type = http AND data.http.host % "www.download.windowsupdate.com" AND data.http.userAgent % "Microsoft-CryptoAPI")))',
        //     'date': this.state.alertDate
        //   },
        //   'pathParams': {}
        // };
      // }

      // if (that.state.type === 'alert') {
      //   api = {
      //     'path': '/api/analytics/reporting/execute/{reportId}',
      //     'queryParams': {
      //       'window': timeWindow
      //     },
      //     'pathParams': {
      //       'reportId': 'taf_alert_by_asset'
      //     }
      //   };
      // }
      // that.props.fetchApiData(that.props.id, api, that.props.params);
      this.fetchData(that, pageNumber, that.state.type);
    };
  }

  prevPageChanged() {
    const that = this;
    return (pageNumber, e) => {
      e.preventDefault();
      if ((parseInt(pageNumber) - 1) > 0) {
        this.fetchData(that, pageNumber - 1, that.state.type);
      }
    };
  }

  nextPageChanged() {
    const that = this;
    return (pageNumber, pageSize, e) => {
      e.preventDefault();
      if ((parseInt(pageNumber) + 1) <= pageSize) {
        this.fetchData(that, pageNumber + 1, that.state.type);
      }
    };
  }

  timelineBarLoaded(isLoaded) {
    if (isLoaded) {
      this.state.timelineBarLoaded = isLoaded;
    }
  }

  // setTopMarginLag() {
  //   const {props} = this;
  //   if (document.getElementById(props.id) !== null) {
  //     let offsetTop = document.getElementById(props.id).offsetTop;
  //     console.log('offsetTop', offsetTop, props.id);
  //   }
  // }

  render() {
    return (
      <div>{this.getRows()}
        {this.state.isFetching ? <Loader /> : null}
        {
          (this.state.rows.length > 0)
            ? <div>
              {/*<TimelineBar id={this.state.id}
                data={this.state.rows}
                setSelectedSliderValues={this.setSelectedSliderValues}
                duration={timeWindow}
                timelineBarLoaded={this.timelineBarLoaded}
                isLoaded={this.state.timelineBarLoaded}
                selectedAreaStyle={this.state.selectedAreaStyle} />*/}

              <div>
                { /*  style={{'marginLeft': '150px', 'position': 'absolute'}}
                // This is needed after we display Slider navigation*/ }
                {this.displayEvents(this.state.selectedMin, this.state.selectedMax)}
              </div>
              <div style={{padding: '15px'}}></div>

              <PaginationWidget Size={this.state.totalPage}
                onPageChanged={this.pageChanged()}
                onPrevPageChanged={this.prevPageChanged()}
                onNextPageChanged={this.nextPageChanged()}
                currentPage={this.state.currentPage}
                maxNumbersOnLeftRight={this.state.maxNumbersOnLeftRight} />
            </div>
          : null
        }
        {/*{this.setTopMarginLag()}*/}
      </div>
    );
  }
}

export default Timeline;
