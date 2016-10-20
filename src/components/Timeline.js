import React, {PropTypes} from 'react';
import PaginationWidget from 'components/PaginationWidget';
import TimelineCard from '../components/TimelineCard';
import {
  formatDateInLocalTimeZone,
  isUndefined
} from 'utils/utils';

let style = {
  card: {
    paddingBottom: '25px'
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

    const {props} = this;

    // if api object has loadOnce property it implies that the general function
    // for duration update will not be called, component has to manage on its own.
    // therefore we are managing in here only e.g. asset page timeline component.
    let loadOnDurationUpdate = false;
    if (props.meta.api && props.meta.api.loadOnce) {
      loadOnDurationUpdate = true;
    }

    if (loadOnDurationUpdate && nextProps.duration !== props.duration) {
      this.fetchData(1, props.attributes.type);
    }
    else {
      this.setRows(nextProps);
      this.pagination.isPaginated = false;
    }
  }

  setRows(props) {
    const {state} = this,
      {data, attributes} = props;

    state.totalCount = data.total;
    state.totalPage = Math.ceil(data.total / attributes.noOfEventsPerPage);
    state.currentPage = (this.pagination.isPaginated) ? this.pagination.pageNumber : 1;
    state.nextPageStart = data.next;
    state.rows = data.normalizeData;

    if (state.filter === '' && data.options && data.options.customParams) {
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
                    <span style={{fontSize: '12px', fontWeight: '600'}}>
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
      {params} = props,
      api = Object.assign({}, props.meta.api, this.getApiObj(pageNumber, type)),
      options = props.options ? props.options : {};

    props.fetchApiData(props.id, api, params, options);
    this.pagination = {
      isPaginated: true,
      pageNumber: pageNumber
    };
  }

  getApiObj(pageNumber, type) {
    const {state, props} = this,
      {params, attributes, meta} = props;

    let apiPath = (type === 'traffic') ? '/api/alert/traffic' : meta.api.path,
      pathParams = (type === 'traffic') ? {} : {
        reportId: meta.api.pathParams.reportId
      },
      queryParams = Object.assign({},
        props.meta.api && props.meta.api.queryParams,
        {
          window: '',
          count: attributes.noOfEventsPerPage,
          from: (pageNumber - 1) * attributes.noOfEventsPerPage
        });

    const apiObj = {
      path: apiPath,
      pathParams
    };

    if (type === 'traffic') {
      queryParams = Object.assign(queryParams, {
        date: params.date,
        filter: state.filter
      });

      apiObj.loadOnce = true;
    }

    apiObj.queryParams = queryParams;

    return apiObj;
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
              {this.displayCard()}

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
