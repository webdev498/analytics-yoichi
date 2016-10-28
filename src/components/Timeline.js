import React, {PropTypes} from 'react';
import PaginationWidget from 'components/PaginationWidget';
import TimelineCard from 'components/TimelineCard';
import ParentCard from 'containers/ParentCard';
import {Colors} from 'theme/colors';
import {
  formatDateInLocalTimeZone,
  isUndefined
} from 'utils/utils';
import {
  TIMELINE_CARD,
  CONTEXTUAL_MENU_CARD
} from 'Constants';

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
      'selectedCardId': ''
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

    this.contextualMenuApiParams = {
      meta: {},
      attributes: {}
    };

    const {attributes} = props;
    this.card = (!isUndefined(attributes.isMainComponent) && !attributes.isMainComponent)
    ? CONTEXTUAL_MENU_CARD : TIMELINE_CARD;

    this.fetchData = this.fetchData.bind(this);
    this.getContextualMenuApiObj = this.getContextualMenuApiObj.bind(this);
  }

  componentDidMount() {
    const {props} = this;
    if (!props.data) {
      return;
    }
    this.setRows(props);
    this.state.selectedCardId = '';
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

    this.state.selectedCardId = '';
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
      {props, state} = this;

    return (
      <div style={this.style.card}>
        {
          rows.map((event, index) => {
            let dateString = (event.Date) ? event.Date : '',
              cardId = 'card' + index,
              backgroundColor = (this.card === CONTEXTUAL_MENU_CARD) ? {backgroundColor: Colors.contextBG} : {},
              padding = (this.card === CONTEXTUAL_MENU_CARD)
              ? (index === 0 ? {padding: '15px 15px 0px 15px'} : {padding: '0px 15px 0px 15px'})
              : {};

            if (dateString !== '') {
              return (
                <div style={{
                  ...{display: 'flex'},
                  ...backgroundColor,
                  ...padding
                }} key={cardId}>
                  {this.card === TIMELINE_CARD ? this.displayDate(dateString, this.card) : null}
                  <TimelineCard
                    id={cardId}
                    data={event}
                    updateRoute={props.updateRoute}
                    getContextualMenuApiObj={this.getContextualMenuApiObj}
                    selectedCardId={state.selectedCardId}
                    card={this.card} />
                  {this.card === CONTEXTUAL_MENU_CARD ? this.displayDate(dateString, this.card) : null}
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
        paddingLeft: (card === TIMELINE_CARD) ? '0px' : '10px'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 'lighter',
          color: (card === TIMELINE_CARD) ? Colors.grape : Colors.white
        }}>
          {dateTime.date}<br />{dateTime.time}
        </span>
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
      pathParams = (type === 'traffic')
        ? {}
        : (type === 'anomalyEvents')
          ? {
            anomalyId: props.id
          }
          : {
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

  displayContextualMenuCards() {
    const {state, props} = this;
    return (
      <div>
        <div style={{
          width: '450px',
          marginTop: '-111px',
          marginLeft: '-19px'
        }}>
          <ParentCard
            id={state.selectedCardId}
            meta={this.contextualMenuApiParams.meta}
            params={props.params}
            attributes={this.contextualMenuApiParams.attributes}>
            <Timeline />
          </ParentCard>
        </div>
      </div>
    );
  }

  getContextualMenuApiObj(selectedCardId) {
    if (!isUndefined(selectedCardId)) {
      this.setState({
        selectedCardId: selectedCardId
      });
      if (selectedCardId !== '') {
        this.contextualMenuApiParams = {
          meta: {
            showHeader: false,
            api: {
              path: '/api/anomaly/{anomalyId}/events',
              pathParams: {
                anomalyId: selectedCardId
              },
              queryParams: {
                window: '',
                from: 0,
                count: 3
              }
            },
            title: ''
          },
          attributes: {
            type: 'anomalyEvents',
            displaySelectedRows: true,
            noOfEventsPerPage: 3,
            maxNumbersOnLeftRightPagination: 4,
            isMainComponent: false,
            style: {
              width: '100%',
              height: '100%',
              backgroundColor: Colors.contextBG
            },
            otherStyles: {
              flex: {},
              pagination: {}
            },
            id: 'timeline-anomaly-events'
          }
        };
      }
    }
  }

  collaseContextualMenu() {
    return () => {
      this.getContextualMenuApiObj('');
    };
  }

  render() {
    const {state, props} = this,
      {attributes} = props;

    this.style.card = this.card === TIMELINE_CARD && state.selectedCardId !== '' ? this.style.card : {};

    return (
      <div>
        {
          (props.data &&
          !isUndefined(state.rows) &&
          state.rows.length === 0 &&
          this.card === TIMELINE_CARD)
          ? <div>No additional results were found.</div>
          : null
        }
        {
          (state.rows.length > 0)
            ? <div style={
                attributes.otherStyles.flex && state.selectedCardId !== ''
                ? attributes.otherStyles.flex : {}
              }>
              {this.displayCard()}

              <PaginationWidget size={state.totalPage}
                currentPage={state.currentPage}
                maxNumbersOnLeftRight={attributes.maxNumbersOnLeftRightPagination}
                fetchData={this.fetchData}
                type={attributes.type}
                style={attributes.otherStyles.pagination ? attributes.otherStyles.pagination : {}} />
              {
                state.selectedCardId !== ''
                ? <div>
                  {this.displayContextualMenuCards()}
                  <div id='collapse-contextual-menu' style={{
                    bottom: '35px',
                    position: 'absolute',
                    right: '460px'
                  }}>
                    <img id='right-arrow' src='/img/rightArrow.png' onClick={this.collaseContextualMenu()} />
                  </div>
                </div>
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
