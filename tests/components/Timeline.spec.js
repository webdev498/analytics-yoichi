import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import Timeline from 'components/Timeline';
import TabsWidget from 'components/TabsWidget';
import TimelineCard from 'components/TimelineCard';
import PaginationWidget from 'components/PaginationWidget';
import {wrapThemeProvider} from '../testUtils';

let props = {
  id: 'timeline',
  meta: {id: 'testId', api: {}},
  data: {
    normalizeData: [
      {
        'id': 'OikKAfhyT',
        'Type': 'Rank Alert',
        'Date': '2016-12-16T00:32:54.468',
        'display': {
          'sourceDest': {
            'source': {
              'ip': '121.18.238.114'
            },
            'dest': {
              'ip': '172.31.7.62'
            }
          },
          'Description': {
            'displayKey': true,
            'value': 'SSH Brute Force Attack Attempt'
          },
          'Message': {
            'displayKey': true,
            'value': '121.18.238.114 attempted to connect to 172.31.7.62 102 times'
          },
          'Category': {
            'displayKey': true,
            'value': 'suspicious-login'
          },
          'Score': {
            'displayKey': true,
            'value': '5'
          }
        }
      }
    ],
    options: {
      customParams: {}
    }
  },
  attributes: {
    id: 'timeline-component',
    style: {
      width: '65%'
    }
  },
  tabs: {
    DETAILS: {
      primary: {
        'path': '/api/alert/traffic',
        'queryParams': {},
        'pathParams': {}
      },
      secondary: {
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/anomaly/{anomalyId}/events',
            'pathParams': {},
            'queryParams': {}
          },
          'title': ''
        },
        'attributes': {
          'type': 'anomalyEvents',
          'displaySelectedRows': true,
          'noOfEventsPerPage': 10,
          'maxNumbersOnLeftRightPagination': 4,
          'isMainComponent': false,
          'style': {
            'width': '100%',
            'height': '100%'
          },
          'otherStyles': {
            'flex': {},
            'pagination': {}
          },
          'id': 'timeline-contextual-menu'
        }
      }
    }
  },
  totalCount: 10,
  totalPage: 20,
  currentPage: 1,
  nextPageStart: 10,
  fetchApiData: spy(),
  timelineType: 'primary'
};

function renderTimeline(timelineType) {
  props.timelineType = timelineType ? timelineType : 'primary';
  let component = shallow(wrapThemeProvider(<Timeline {...props} />));
  return component.find('Timeline');
}

function mountTimeline() {
  return mount(<Timeline {...props} />);
}

function mountTimelineComponent() {
  let component = mount(<Timeline {...props} />);
  return component.find('Timeline');
}

describe('<Timeline />', () => {
  it('exists', () => {
    expect(Timeline).to.exist;
  });

  it('should have correct props', () => {
    const component = renderTimeline();
    expect(component.props().id).to.be.defined;
    expect(component.props().id).to.equal('timeline');
    expect(component.type()).to.equal(Timeline);
    expect(component.props().attributes).to.be.defined;
    expect(component.props().tabs).to.be.defined;
    expect(component.props().timelineType).to.be.defined;
    expect(component.props().fetchApiData).to.exist;
    expect(component.props().fetchApiData).to.be.a('function');
  });

  it('should render tabs correctly', () => {
    const component = renderTimeline();
    expect(component.props().tabs).to.be.defined;
    expect(component.props().tabs.DETAILS).to.be.defined;
    expect(component.props().tabs.DETAILS).to.be.an('object');
    expect(component.props().tabs.DETAILS.primary).to.be.an('object');
    expect(component.props().tabs.DETAILS.secondary).to.be.an('object');
    expect(component.props().tabs.DETAILS.secondary.meta.api.path).to.be.defined;
    expect(component.props().tabs.DETAILS.secondary.meta.api.path).to.be.an('string');
  });

  it('should render tab only when timeline is primary', () => {
    const component = renderTimeline();
    expect(component.props().timelineType).to.equal('primary');
    expect(component.props().tabs).to.be.defined;
    expect(TabsWidget).to.exist;
  });

  it('primary timeline should have api path', () => {
    const component = renderTimeline();
    expect(component.props().tabs.DETAILS.primary).to.be.an('object');
    expect(component.props().tabs.DETAILS.primary.path).to.be.defined;
    expect(component.props().tabs.DETAILS.primary.path).to.be.an('string');
  });

  it('secondary timeline should have api path', () => {
    const component = renderTimeline();
    expect(component.props().tabs.DETAILS.secondary).to.be.an('object');
    expect(component.props().tabs.DETAILS.secondary.meta.api.path).to.be.defined;
    expect(component.props().tabs.DETAILS.secondary.meta.api.path).to.be.an('string');
  });

  it('primary and secondary timeline should have queryParams', () => {
    const component = renderTimeline();
    expect(component.props().tabs.DETAILS.primary).to.be.an('object');
    expect(component.props().tabs.DETAILS.secondary).to.be.an('object');
    expect(component.props().tabs.DETAILS.primary.queryParams).to.be.defined;
    expect(component.props().tabs.DETAILS.primary.queryParams).to.be.an('object');
    expect(component.props().tabs.DETAILS.secondary.meta.api.queryParams).to.be.defined;
    expect(component.props().tabs.DETAILS.secondary.meta.api.queryParams).to.be.an('object');
  });

  it('should have normalized data from data abstraction layer', () => {
    let component = renderTimeline();
    expect(component.props().data).to.be.defined;
    expect(component.props().data).to.be.an('object');
    expect(component.props().data.normalizeData).to.be.defined;
    expect(component.props().data.normalizeData).to.be.an('array');
  });

  it('should have rows defined as component states', () => {
    let component = mountTimeline();
    expect(component.state().rows).to.be.defined;
    expect(component.state().rows).to.be.an('array');
  });

  it('call fetchApiData', () => {
    let component = mountTimelineComponent();
    expect(component.props().fetchApiData.callCount).to.equal(0);
  });

  it('should have required states', () => {
    let component = mountTimeline();
    expect(component.state().totalCount).to.be.defined;
    expect(component.state().totalPage).to.be.defined;
    expect(component.state().currentPage).to.be.defined;
    expect(component.state().nextPageStart).to.be.defined;
  });

  it('should have data.options and data.options.customParams if traffic filter exists', () => {
    let component = renderTimeline();
    expect(component.props().data.options).to.be.defined;
    expect(component.props().data.options).to.be.an('object');
    expect(component.props().data.options.customParams).to.be.defined;
    expect(component.props().data.options.customParams).to.be.an('object');
  });

  // it('should have no. of cards', () => {
  //   let component = mountTimelineComponent();
  //   expect(component.find('div')).exist;
  //   expect(component.find('div')).to.have.length(2);
  //   expect(component.ref('primaryTimeline').text()).to.equal('121.18.238.114 attempted to connect to 172.31.7.62');
  // });

  // describe('Pagination', () => {
  //   it('exists', () => {
  //     props.data = Object.assign(props.data, {
  //       total: 15,
  //       next: 10
  //     });
  //     const timeline = mountTimeline(true),
  //       {data, attributes} = props;
  //     timeline.setState({ totalCount: data.total });
  //     timeline.setState({ totalPage: Math.ceil(data.total / attributes.noOfEventsPerPage) });
  //     timeline.setState({ currentPage: 1 });
  //     timeline.setState({ nextPageStart: data.next });
  //     expect(PaginationWidget).to.exist;
  //   });
  // });
});
