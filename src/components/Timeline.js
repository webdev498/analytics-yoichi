import React, {PropTypes} from 'react';
import PaginationWidget from 'components/PaginationWidget';
import TimelineCard from '../components/TimelineCard';
import {
  formatDateInLocalTimeZone,
  isUndefined
} from 'utils/utils';

let style = {
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
      'totalCount': 0,
      'totalPage': 0,
      'currentPage': 1,
      'filter': '',
      'rows': [],
      'nextPageStart': 0
    };

    this.pagination = {
      isPaginated: false,
      pageNumber: 1
    };

    this.setRows = this.setRows.bind(this);
    this.displayCard = this.displayCard.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getApiObj = this.getApiObj.bind(this);
  }

  componentDidMount() {
    const {props} = this;
    if (!props.data) {
      return;
    }
    this.setRows(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data) {
      return;
    }
    this.setRows(nextProps);
    this.pagination.isPaginated = false;
  }

  setRows(props) {
    const {state} = this,
      {data, attributes} = props;

    state.totalCount = data.total;
    state.totalPage = Math.ceil(data.total / attributes.noOfEventsPerPage);
    state.currentPage = (this.pagination.isPaginated) ? this.pagination.pageNumber : 1;
    state.nextPageStart = data.next;
    state.rows = data.normalizeData;

    if (state.filter === '' && data.options !== undefined &&
      data.options.customParams !== undefined && data.options.customParams !== null) {
      state.filter = data.options.customParams.filter;
    }
  }

  displayCard() {
    const rows = this.state.rows,
      {props} = this;

    return (
      <div style={style.card}>
        {
          rows.map(function(event, index) {
            let dateString = event.Date,
              barId = 'bar' + index;

            if (dateString !== '') {
              let dateTime = formatDateInLocalTimeZone(dateString);
              return (
                <div style={{display: 'flex'}} key={barId}>
                  <div style={{width: '120px'}}>
                    <span style={{fontSize: '9pt', fontWeight: '600'}}>
                      {dateTime.date}<br />{dateTime.time}
                    </span>
                  </div>
                  <TimelineCard id={barId} data={event} updateRoute={props.updateRoute} />
                </div>
              );
            }
          })
        }
      </div>
    );
  }

  fetchData(pageNumber, type) {
    const {props} = this,
      {params} = props;

    if (!isUndefined(pageNumber)) {
      const api = this.getApiObj(pageNumber, type);
      props.fetchApiData(props.id, api, params);
      this.pagination = {
        isPaginated: true,
        pageNumber: pageNumber
      };
    }
  }

  getApiObj(pageNumber, type) {
    const {state, props} = this,
      {params, attributes, meta} = props;
    let apiPath = (type === 'traffic') ? '/api/alert/traffic' : '/api/analytics/reporting/execute/{reportId}',
      pathParams = (type === 'traffic') ? {} : {
        reportId: meta.api.pathParams.reportId
      },
      queryParams = {
        window: '',
        count: attributes.noOfEventsPerPage,
        from: (pageNumber - 1) * attributes.noOfEventsPerPage
      };

    if (type === 'traffic') {
      queryParams = Object.assign(queryParams, {
        date: params.date,
        filter: state.filter
      });
    }

    return {
      path: apiPath,
      pathParams: pathParams,
      queryParams: queryParams
    };
  }

  render() {
    const {state, props} = this,
      {attributes} = props;

    return (
      <div>
        {
          (!isUndefined(state.rows) && state.rows.length === 0)
          ? <div>No additional results were found.</div>
          : null
        }
        {
          (state.rows.length > 0)
            ? <div>
              <div>
                {this.displayCard()}
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
