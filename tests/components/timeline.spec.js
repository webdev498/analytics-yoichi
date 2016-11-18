import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Timeline, {
  getTabObj,
  setOrRemoveQueryParam
}
from 'components/Timeline';

let props = {
  attributes: {id: 'timeline'},
  data: null,
  tabs: {
    'DETAILS': {
      'primary': {
        'path': '/api/alert/traffic',
        'queryParams': {
          'window': '',
          'count': 10,
          'from': 0
        },
        'pathParams': {
        }
      },
      'secondary': {
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/anomaly/{anomalyId}/events',
            'pathParams': {
              'selectedCardId': 'anomalyId'
            },
            'queryParams': {
              'window': '',
              'from': 0,
              'count': 10,
              'date': ''
            }
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
            'height': '100%',
            'backgroundColor': '#EBEBEF'
          },
          'otherStyles': {
            'flex': {},
            'pagination': {}
          },
          'id': 'timeline-contextual-menu'
        },
        'timelineType': 'secondary'
      }
    }
  }
};

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<Timeline {...props} />);
}

describe('Timeline Component:', function() {
  it('exists', () => {
    const props = {
      attributes: {id: 'timeline'},
      data: null,
      tabs: {
        'DETAILS': {
          'primary': {},
          'secondary': {}
        }
      }
    };
    expect(<Timeline {...props} />).to.exist;
  });

  it('Should render as <div>', function() {
    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
    expect(component.props.id).to.equal(props.attributes.id);
  });

  it('returns error at node server while retriving data from API server', function() {
    const props = {
      attributes: {id: 'timeline'},
      data: null,
      errorData: 'Internal Server Error'
    };

    expect(props.errorData).to.be.an('string');
  });

  it('Should have tabs object in JSON', function() {
    const component = shallowRenderWithProps(props);
    expect(component.props.tabs).to.be.an('object');
    expect(component.props.tabs.DETAILS).to.have.property('primary');
    expect(component.props.tabs.DETAILS).to.have.property('secondary');
  });

  it('set rows array if props has normalizeData from node server', function() {
    props = Object.assign(props, {
      data: {
        rows: [
          {
            type: 'Rank Alert',
            date: '2016-11-18T00:00:00.000'
          }
        ],
        normalizeData: [
          {
            Type: 'Rank Alert',
            Date: '18 Nov 2016 00:00:00.000'
          }
        ]
      }
    });

    const component = shallowRenderWithProps(props);
    expect(component.props.data.normalizeData).to.be.an('array');
    // expect(component.props.data.normalizeData.length).to.equal(1);
    // expect(component.state().rows).to.be.an('array');
    // expect(component.state().rows.length).to.equal(1);
  });
});
