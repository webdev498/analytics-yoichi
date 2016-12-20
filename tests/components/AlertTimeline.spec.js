import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import AlertTimeline from 'components/AlertTimeline';
import {wrapThemeProvider} from '../testUtils';

let props = {
  id: 'alertTimeline',
  data: {},
  attributes: {
    'type': 'traffic',
    'displaySelectedRows': true,
    'noOfEventsPerPage': 10,
    'maxNumbersOnLeftRightPagination': 4,
    'style': {
      'width': '100%',
      'backgroundColor': '#F7F7F9'
    },
    'otherStyles': {
      'flex': {
        'display': 'flex'
      },
      'pagination': {
        'bottom': 0,
        'position': 'absolute'
      }
    },
    'id': 'timeline-component'
  }
};

function renderAlertTimeline() {
  let component = shallow(wrapThemeProvider(<AlertTimeline {...props} />));
  return component.find('AlertTimeline');
}

function mountAlertTimeline() {
  return mount(<AlertTimeline {...props} />);
}

function mountAlertTimelineComponent() {
  let component = mount(<AlertTimeline {...props} />);
  return component.find('AlertTimeline');
}

describe('<AlertTimeline />', () => {
  it('exists', () => {
    expect(AlertTimeline).to.exist;
  });

  it('should have correct props', () => {
    const component = renderAlertTimeline();
    expect(component.props().id).to.be.defined;
    // expect(component.props().id).to.equal('alertTimeline');
    // expect(component.type()).to.equal(AlertTimeline);
    // expect(component.props().data).to.be.defined;
  });

  // it('check the instance', () => {
  //   const wrapper = mount(<TimelineCard />);
  //   const inst = wrapper.instance();
  //   expect(inst).to.be.instanceOf(TimelineCard);
  // });
});
