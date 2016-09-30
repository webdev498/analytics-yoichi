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
      'isFetching': false
    };
  }

  displayData(id, data) {
    const {state, props} = this;

    if (state.type === 'traffic') {
      return (
        <TrafficEvents id={id} data={data} updateRoute={props.updateRoute} />
      );
    }
    if (state.type === 'alert') {
      return (
        <Alerts id={id} data={data} key={id} updateRoute={props.updateRoute} />
      );
    }
  }

  getRows() {
    const {props, state} = this;
    if (state.rows.length === 0 || timeWindow !== props.duration) {
      if (!props.data) {
        return;
      }

      state.totalCount = props.data.total;
      state.totalPage = Math.ceil(props.data.total / props.attributes.noOfEventsPerPage);
      state.currentPage = 1;
      state.pageSize = props.attributes.noOfEventsPerPage;
      state.nextPageStart = props.data.next;
      state.rows = props.data.rows;
      timeWindow = props.duration;

      if (state.rows.length === 0) {
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

  fetchData(pageNumber, type) {
    const {state, props} = this;

    let parameters = {};
    if (type === 'traffic') {
      parameters = {
        pageNumber: (pageNumber - 1) * state.pageSize,
        timelineType: state.timelineType,
        duration: timeWindow,
        alertDate: state.alertDate,
        filter: props.data.options.customParams.filter,
        pageSize: state.pageSize
      };
    }

    if (type === 'alert') {
      parameters = {
        pageNumber: (pageNumber - 1) * state.pageSize,
        pageSize: state.pageSize,
        duration: timeWindow,
        reportId: 'taf_alert_by_asset' // kept this hardcoded for now.
        // Later, I will have to use fetchApiData function from props object
      };
    }

    const fetchedData = fetchData(parameters, type, props.data.options);

    this.setState({
      'isFetching': true
    });

    fetchedData.then(json => {
      this.setState({
        'isFetching': false,
        'currentPage': pageNumber,
        'rows': json.rows,
        'nextPageStart': json.next,
        'selectedMin': 0,
        'selectedMax': 55
      });
    });
  }

  pageChanged() {
    return (pageNumber) => {
      this.fetchData(pageNumber, this.state.type);
    };
  }

  prevPageChanged() {
    return (pageNumber) => {
      if ((parseInt(pageNumber) - 1) > 0) {
        this.fetchData(pageNumber - 1, this.state.type);
      }
    };
  }

  nextPageChanged() {
    return (pageNumber, pageSize) => {
      if ((parseInt(pageNumber) + 1) <= pageSize) {
        this.fetchData(pageNumber + 1, this.state.type);
      }
    };
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
