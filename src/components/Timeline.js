import React, {PropTypes} from 'react';

import PaginationWidget from 'components/PaginationWidget';
import TimelineCard from 'components/TimelineCard';
import ParentCard from 'containers/ParentCard';
import TabsWidget from 'components/TabsWidget';

import {Colors} from 'theme/colors';
import { formatDateInLocalTimeZone, isUndefined, getPosition } from 'utils/utils';
import { TIMELINE_CARD, CONTEXTUAL_MENU_CARD } from 'Constants';

const styles = {
  dateSpan: {
    fontSize: '12px',
    color: Colors.grape
  }
};

function getTabObj(tabs, timelineType, currentTab) {
  let tabObj = {};
  for (let tab in tabs) {
    if (tab === currentTab) {
      tabObj = tabs[tab][timelineType];
    }
  }
  return tabObj;
}

function setOrRemoveQueryParam(queryParams, name, value) {
  if (queryParams[name] === '') {
    if (!isUndefined(value)) {
      queryParams[name] = value;
    }
    else {
      delete queryParams[name];
    }
  }
  else {
    delete queryParams[name];
  }
  return queryParams;
}

class Timeline extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    meta: PropTypes.object,
    id: PropTypes.string,
    params: PropTypes.object,
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

    this.decreaseHeightBy = 120;
    this.decreasePositionBy = 250;
    this.currentTabId = 0;
    this.currentTab = 'DETAILS';
    this.apiObj = {};

    this.contextualMenuApiParams = {
      meta: {},
      attributes: {}
    };

    const {attributes} = props;
    this.card = (!isUndefined(attributes.isMainComponent) && !attributes.isMainComponent)
    ? CONTEXTUAL_MENU_CARD : TIMELINE_CARD;

    this.fetchData = this.fetchData.bind(this);
    this.getContextualMenuApiObj = this.getContextualMenuApiObj.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
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

  displayDate(dateString, card) {
    let dateTime = formatDateInLocalTimeZone(dateString),
      paddingLeft = (card === TIMELINE_CARD) ? '0px' : '10px';

    return (
      <div style={{ width: '85px', paddingLeft }}>
        <span style={styles.dateSpan}>
          {dateTime.date}<br />{dateTime.time}
        </span>
      </div>
    );
  }

  displayCard() {
    const rows = this.state.rows,
      {props, state} = this,
      {attributes, chart} = props;

    return (
      <div style={this.style.card}
        ref={this.card === CONTEXTUAL_MENU_CARD ? 'secondaryTimeline' : 'primaryTimeline'}
        id={this.card === CONTEXTUAL_MENU_CARD ? 'secondary-timeline' : 'primary-timeline'}>
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
                <div style={{ display: 'flex', ...backgroundColor, ...padding }} key={cardId}>
                  {this.card === TIMELINE_CARD ? this.displayDate(dateString, this.card) : null}
                  <TimelineCard
                    id={cardId}
                    data={event}
                    updateRoute={props.updateRoute}
                    getContextualMenuApiObj={this.getContextualMenuApiObj}
                    selectedCardId={state.selectedCardId}
                    card={this.card}
                    attributes={attributes}
                    chart={chart} />
                  {this.card === CONTEXTUAL_MENU_CARD ? this.displayDate(dateString, this.card) : null}
                </div>
              );
            }
          })
        }
        <PaginationWidget size={state.totalPage}
          currentPage={state.currentPage}
          maxNumbersOnLeftRight={attributes.maxNumbersOnLeftRightPagination}
          fetchData={this.fetchData}
          type={attributes.type}
          style={attributes.otherStyles.pagination ? attributes.otherStyles.pagination : {}} />
      </div>
    );
  }

  fetchData(pageNumber, type) {
    const {props} = this,
      {params} = props;

    let api = Object.assign({}, props.meta.api, this.getApiObj(pageNumber, type)),
      options = props.options ? props.options : {};

    props.fetchApiData(props.id, api, params, options);
    this.pagination = {
      isPaginated: true,
      pageNumber: pageNumber
    };

    // here, I was trying to set height on each pagination button clicks
    // since the height of contextual menu is keeps on changing when user paginated between different pages.
    // setTimeout(() => {
    //   this.setPrimaryTimelineHeight();
    // }, 2000);
  }

  getApiObj(pageNumber, type) {
    const {props} = this,
      {attributes, meta, tabs, timelineType, alertType, trafficFilter} = props;

    let queryParams = Object.assign({},
      meta.api && meta.api.queryParams,
      {
        window: '',
        count: attributes.noOfEventsPerPage,
        from: (pageNumber - 1) * attributes.noOfEventsPerPage
      }),
      apiObj = {},
      tabObj = getTabObj(tabs, timelineType, this.currentTab);

    if (timelineType === 'secondary') {
      let apiObj = {};
      if (alertType) {
        apiObj = tabObj[alertType];
      }
      else {
        apiObj = tabObj;
      }

      if (apiObj.meta.api && apiObj.meta.api.pathParams && apiObj.meta.api.pathParams.selectedCardId) {
        apiObj.meta.api.pathParams[apiObj.meta.api.pathParams.selectedCardId] = props.id;
      }
    }
    else {
      if (alertType) {
        apiObj = tabObj[alertType].meta.api;
        if (trafficFilter) {
          apiObj.queryParams.filter = trafficFilter;
        }
      }
      else {
        apiObj.path = tabObj.path;
        apiObj.pathParams = (meta.api && meta.api.pathParams && meta.api.pathParams.reportId)
          ? {
            reportId: this.currentTabId === 0 ? meta.api.pathParams.reportId : tabObj.pathParams.reportId
          }
          : {};
      }
    }

    if (this.currentTabId === 1 && props.params && props.params.type) {
      queryParams[props.params.type] = props.params.assetId;
    }

    apiObj.queryParams = queryParams;

    return apiObj;
  }

  getContextualMenuApiObj(details) {
    const {props} = this,
      {tabs, alertType} = props;

    let {selectedCardId, eventDate, user, machine, start, end} = details;
    if (!isUndefined(selectedCardId)) {
      this.setState({
        selectedCardId: selectedCardId
      });

      if (selectedCardId !== '') {
        let apiObj = {};
        if (alertType) {
          let tabObj = getTabObj(tabs, 'secondary', this.currentTab);
          apiObj = tabObj[alertType];
        }
        else {
          apiObj = getTabObj(tabs, 'secondary', this.currentTab);
        }

        if (apiObj.meta.api && apiObj.meta.api.pathParams && apiObj.meta.api.pathParams.selectedCardId) {
          apiObj.meta.api.pathParams[apiObj.meta.api.pathParams.selectedCardId] = selectedCardId;
        }
        let queryParams = Object.assign({},
          apiObj.meta.api && apiObj.meta.api.queryParams,
          {
            window: '',
            date: '',
            user: '',
            machine: '',
            start: '',
            end: ''
          });

        queryParams = setOrRemoveQueryParam(queryParams, 'date', eventDate);
        queryParams = setOrRemoveQueryParam(queryParams, 'user', user);
        queryParams = setOrRemoveQueryParam(queryParams, 'machine', machine);
        queryParams = setOrRemoveQueryParam(queryParams, 'start', start);
        queryParams = setOrRemoveQueryParam(queryParams, 'end', end);

        apiObj.meta.api.queryParams = queryParams;

        apiObj.type = 'secondary';
        this.contextualMenuApiParams = apiObj;
      }
    }
  }

  displayContextualMenuCards() {
    const {state, props} = this,
      position = getPosition(document.getElementById('primary-timeline'));
    window.scrollTo(0, position.y - this.decreasePositionBy);
    return (
      <div>
        <div style={{
          width: '450px',
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%'
        }}>
          <ParentCard
            key={state.selectedCardId}
            id={state.selectedCardId}
            meta={this.contextualMenuApiParams.meta}
            params={props.params}
            attributes={this.contextualMenuApiParams.attributes}
            tabs={props.tabs}
            timelineType='secondary'
            alertType={props.alertType}>
            <Timeline />
          </ParentCard>
        </div>
      </div>
    );
  }

  collaseContextualMenu() {
    return () => {
      let details = {
        selectedCardId: '',
        eventDate: '',
        user: '',
        machine: ''
      };
      this.getContextualMenuApiObj(details);
    };
  }

  setPrimaryTimelineHeight() {
    if (this.card === 'TIMELINE_CARD') {
      // For now, I am keeping this commented code.
      // As discussed with Ojassvi, we need to find out some other good solution for this.
      // this.refs.primaryTimeline.style.height =
      //   (this.refs.secondaryTimeline.offsetHeight - this.decreaseHeightBy) + 'px';

      // For now, I am using 'document' object here.
      if (document.getElementById('secondary-timeline') &&
        document.getElementById('secondary-timeline').offsetHeight) {
        if (document.getElementById('secondary-timeline').offsetHeight >
          document.getElementById('primary-timeline').offsetHeight) {
          this.refs.primaryTimeline.style.height =
            (document.getElementById('secondary-timeline').offsetHeight - this.decreaseHeightBy) + 'px';
        }
      }
    }
  }

  onTabChange(tabId) {
    this.currentTabId = tabId.props.index;
    this.currentTab = tabId.props.label;
    if (this.currentTabId === 0) {
      this.fetchData(1, 'alert');
    }
    if (this.currentTabId === 1) {
      this.fetchData(1, 'sessions');
    }
  }

  render() {
    const {state, props} = this,
      {attributes, tabs, errorData, timelineType, meta} = props;

    if (errorData) {
      state.rows = [];
    }

    this.style.card = this.card === TIMELINE_CARD && state.selectedCardId !== '' ? this.style.card : {};
    this.apiObj = meta.api;

    let tabNames = [];
    if (tabs) {
      for (let tab in tabs) {
        tabNames.push(tab);
      }
    }

    return (
      <div id={props.attributes.id}>
        {
          tabs && tabNames.length > 1 && timelineType === 'primary'
          ? <TabsWidget
            tabs={tabNames}
            style={{paddingLeft: '85px', paddingBottom: '17px'}}
            onTabChange={this.onTabChange} />
          : null
        }
        {
          ((props.data &&
          !isUndefined(state.rows) &&
          state.rows.length === 0 &&
          this.card === TIMELINE_CARD) || props.errorData)
          ? <div style={{paddingLeft: '85px'}}>No additional results were found.</div>
          : null
        }
        {
          (state.rows && state.rows.length > 0)
            ? <div style={
                attributes.otherStyles.flex && state.selectedCardId !== ''
                ? attributes.otherStyles.flex : {}
              }>
              {this.displayCard()}
              {
                state.selectedCardId !== ''
                ? <div>
                  {this.displayContextualMenuCards()}
                  <div id='collapse-contextual-menu' style={{
                    bottom: 0,
                    position: 'absolute',
                    right: '460px'
                  }}>
                    <img id='right-arrow' src='/img/rightArrow.png' onClick={this.collaseContextualMenu()} />
                  </div>
                  <div style={{color: 'transparent'}}>
                    {
                      setTimeout(() => {
                        this.setPrimaryTimelineHeight();
                      }, 2000)
                    }
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
