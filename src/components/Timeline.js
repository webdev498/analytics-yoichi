import React, {PropTypes} from 'react';
import PaginationWidget from 'components/PaginationWidget';
import TimelineCard from '../components/TimelineCard';
import Loader from '../components/Loader';
import {
  formatDateInLocalTimeZone,
  isUndefined
} from 'utils/utils';
import {fetchData} from 'utils/timelineUtils';

let timeWindow = '1h',
  style = {
    card: {
      width: '675px'
    }
  };

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

    this.state = {
      'selectedMin': 0,
      'selectedMax': 55,
      'totalCount': 0,
      'totalPage': 0,
      'currentPage': 1,
      'filter': '',
      'rows': [],
      'nextPageStart': 0,
      'isFetching': false
    };

    this.displayData = this.displayData.bind(this);
    this.getRows = this.getRows.bind(this);
    this.displayEvents = this.displayEvents.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  displayData(id, data) {
    const {props} = this;

    return (
      <TimelineCard id={id} data={data} updateRoute={props.updateRoute} />
    );
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
      state.nextPageStart = props.data.next;
      state.rows = props.data.rows;
      timeWindow = props.duration;

      if (state.filter === '' && props.data.options !== undefined &&
        props.data.options.customParams !== undefined) {
        state.filter = props.data.options.customParams.filter;
      }

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

    return (
      <div style={style.card}>
        {
          rows.map(function(event, index) {
            let dateString = event[0].date,
              barId = 'bar' + index;

            if (dateString !== '') {
              let dateTime = formatDateInLocalTimeZone(dateString);
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
    const {state, props} = this,
      {params, attributes} = props;
    if (!isUndefined(pageNumber)) {
      let parameters = {},
        pageSize = props.attributes.noOfEventsPerPage;
      if (type === 'traffic') {
        parameters = {
          pageNumber: (pageNumber - 1) * pageSize,
          type: attributes.type,
          duration: timeWindow,
          alertDate: params.date,
          filter: state.filter,
          pageSize: pageSize
        };
      }

      if (type === 'alert') {
        parameters = {
          pageNumber: (pageNumber - 1) * pageSize,
          pageSize: pageSize,
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
  }

  render() {
    const {state, props} = this,
      {attributes} = props;
    return (
      <div>
        {this.getRows()}
        {state.isFetching ? <Loader /> : null}
        {
          (state.rows.length > 0)
            ? <div>
              <div>
                {this.displayEvents(state.selectedMin, state.selectedMax)}
              </div>
              <div style={{padding: '15px'}} />
              <PaginationWidget size={state.totalPage}
                currentPage={state.currentPage}
                maxNumbersOnLeftRight={attributes.maxNumbersOnLeftRightPagination}
                fetchData={this.fetchData}
                type={attributes.type} />
            </div>
          : null
        }
      </div>
    );
  }
}

export default Timeline;
