import React from 'react';
import TestUtils from 'react-addons-test-utils';
import WorldMap from 'components/maps/WorldMap';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<WorldMap {...props} />);
}

describe('WorldMap Component: ', function() {
  it('Should render as <div>', function() {
    const props = {
      'attributes': {'id': 'OutgoingTrafficWorldMap'},
      'meta': {
        'title': 'Outgoing Traffic Threat Map'
      },
      'data': null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
  });
});
