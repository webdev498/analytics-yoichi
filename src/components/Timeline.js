import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import PaginationWidget from 'components/PaginationWidget';
import TrafficEvents from '../components/TrafficEvents';
import Alerts from '../components/Alerts';
import Loader from '../components/Loader';
import {formatDateInLocalTimeZone} from 'utils/utils';
import {fetchData} from 'utils/timelineUtils';

let timeWindow = '1h';

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
        <Alerts id={id} data={data} key={id} />
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
  }

  displayEvents(selectedMin, selectedMax) {
    const rows = this.state.rows,
      that = this;

    let mainDivStyle = {
      width: '675px'
    };

    return (
      <div style={mainDivStyle}>
        {
          rows.map(function(event, index) {
            let dateString = event[0].date,
              dateTime = {
                date: '',
                time: ''
              },
              barId = 'bar' + index;

            if (dateString !== '') {
              dateTime = formatDateInLocalTimeZone(dateString);
              return (
                <div style={{display: 'flex'}} key={barId}>
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
          'nextPageStart': json.next,
          'selectedMin': 0,
          'selectedMax': 55
        });
      }
    );
  }

  pageChanged() {
    const that = this;
    return (pageNumber) => {
      this.fetchData(that, pageNumber, that.state.type);
    };
  }

  prevPageChanged() {
    const that = this;
    return (pageNumber) => {
      if ((parseInt(pageNumber) - 1) > 0) {
        this.fetchData(that, pageNumber - 1, that.state.type);
      }
    };
  }

  nextPageChanged() {
    const that = this;
    return (pageNumber, pageSize) => {
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

  render() {
    return (
      <div>{this.getRows()}
        {this.state.isFetching ? <Loader /> : null}
        {
          (this.state.rows.length > 0)
            ? <div>
              <div>
                {this.displayEvents(this.state.selectedMin, this.state.selectedMax)}
              </div>
              <div style={{padding: '15px'}} />

              <PaginationWidget Size={this.state.totalPage}
                onPageChanged={this.pageChanged()}
                onPrevPageChanged={this.prevPageChanged()}
                onNextPageChanged={this.nextPageChanged()}
                currentPage={this.state.currentPage}
                maxNumbersOnLeftRight={this.state.maxNumbersOnLeftRight} />
            </div>
          : null
        }
      </div>
    );
  }
}

export default Timeline;
