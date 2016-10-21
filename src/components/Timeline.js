import React, {PropTypes} from 'react';
import PaginationWidget from 'components/PaginationWidget';
import TimelineCard from 'components/TimelineCard';
import ParentCard from 'containers/ParentCard';
import {Colors} from 'theme/colors';
import {
  formatDateInLocalTimeZone,
  isUndefined
} from 'utils/utils';

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
      'nextPageStart': 0,
      'selectedAnomalyId': ''
    };

    this.pagination = {
      isPaginated: false,
      pageNumber: 1
    };

    this.style = {
      card: {
        paddingBottom: '25px'
      }
    };

    this.style.card = ((props.id).indexOf('timeline') > -1) ? this.style.card : {};

    this.anomalyEventsParams = {
      meta: {},
      attributes: {}
    };

    this.displayCard = this.displayCard.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getApiObj = this.getApiObj.bind(this);
    this.setAnomalyId = this.setAnomalyId.bind(this);
  }

  componentDidMount() {
    const {props} = this;
    if (!props.data) {
      return;
    }
    this.setRows(props);
    this.state.selectedAnomalyId = '';
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data) {
      return;
    }
    this.setRows(nextProps);
    this.pagination.isPaginated = false;
    this.state.selectedAnomalyId = '';
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

  setAnomalyId(anomalyId) {
    if (!isUndefined(anomalyId)) {
      this.setState({
        selectedAnomalyId: anomalyId
      });
      if (anomalyId !== '') {
        this.anomalyEventsParams = {
          meta: {
            showHeader: false,
            api: {
              path: '/api/anomaly/{anomalyId}/events',
              pathParams: {
                anomalyId: anomalyId
              },
              queryParams: {
                window: ''
              }
            },
            title: ''
          },
          attributes: {
            type: 'traffic',
            displaySelectedRows: true,
            noOfEventsPerPage: 8,
            maxNumbersOnLeftRightPagination: 4,
            style: {
              width: '100%',
              height: '100%'
            },
            id: 'timeline-anomaly-events'
          }
        };
      }
    }
  }

  displayCard() {
    const rows = this.state.rows,
      {props, state} = this,
      that = this;

    return (
      <div style={this.style.card}>
        {
          rows.map(function(event, index) {
            let dateString = event.Date,
              barId = 'bar' + index,
              card = ((that.props.id).indexOf('timeline') > -1) ? 'timeline_card' : 'anomaly_event_card',
              backgroundColor = (card === 'timeline_card') ? {} : {backgroundColor: Colors.contextBG},
              padding = (card === 'timeline_card') ? {} : {padding: '0px 15px 0px 15px'};

            padding = (card === 'anomaly_event_card' && index === 0) ? {padding: '15px 15px 0px 15px'} : padding;

            if (dateString !== '') {
              return (
                <div style={{...{display: 'flex'}, ...backgroundColor, ...padding}} key={barId}>
                  {card === 'timeline_card' ? that.displayDate(dateString, card) : null}
                  <TimelineCard
                    // ref={(ref) => this.TimelineCard = ref}
                    id={barId}
                    data={event}
                    updateRoute={props.updateRoute}
                    setAnomalyId={that.setAnomalyId}
                    selectedAnomalyId={state.selectedAnomalyId}
                    card={card} />
                  {card === 'anomaly_event_card' ? that.displayDate(dateString, card) : null}
                </div>
              );
            }
          })
        }
      </div>
    );
  }

  displayDate(dateString, card) {
    let dateTime = formatDateInLocalTimeZone(dateString);
    return (
      <div style={{
        width: '85px',
        paddingTop: '22px',
        paddingLeft: (card === 'timeline_card') ? '0px' : '10px'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 'lighter',
          color: (card === 'timeline_card') ? Colors.grape : Colors.white
        }}>
          {dateTime.date}<br />{dateTime.time}
        </span>
      </div>
    );
  }

  fetchData(pageNumber, type) {
    const {props} = this,
      {params} = props;

    const api = this.getApiObj(pageNumber, type),
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

  displayAnomalyEvents() {
    const {state, props} = this;
    return (
      <div>
        <div style={{
          top: '0px',
          right: '0px',
          position: 'absolute',
          width: '350px',
          // height: '92%',
          bottom: '50px',
          overflowY: 'scroll',
          overflowX: 'hidden'
        }} className='scrollbar'>
          <ParentCard
            id={state.selectedAnomalyId}
            meta={this.anomalyEventsParams.meta}
            params={props.params}
            attributes={this.anomalyEventsParams.attributes}>
            <Timeline />
          </ParentCard>
        </div>
        <div id='collapse-anomaly-events' style={{
          width: '350px',
          bottom: '0px',
          position: 'absolute',
          right: '0px',
          height: '58px',
          paddingTop: '12px',
          paddingLeft: '12px',
          backgroundColor: Colors.contextBG
        }}>
          <img id='right-arrow' src='/img/rightArrow.png' onClick={this.collasePanel()} />
        </div>
      </div>
    );
  }

  collasePanel() {
    return () => {
      this.setAnomalyId('');
    };
  }

  render() {
    const {state, props} = this,
      {attributes} = props,
      card = ((props.id).indexOf('timeline') > -1) ? 'timeline_card' : 'anomaly_event_card';

    return (
      <div>
        {
          (!isUndefined(state.rows) && state.rows.length === 0 && card === 'timeline_card')
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
              {
                state.selectedAnomalyId !== ''
                ? this.displayAnomalyEvents()
                : null
              }
            </div>
          : null
        }
      </div>
    );
  }
}

export default Timeline;
