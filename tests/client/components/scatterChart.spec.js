import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ScatterChart from 'components/charts/ScatterChart';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<ScatterChart {...props} />);
}

describe('ScatterChart Component: ', function() {
  it('Should render as <div>', function() {
    const props = {
      'attributes': {'id': 'UserAgentLength'},
      'meta': {
        'title': 'User Agent Details'
      },
      'data': null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
    expect(component.props.id).to.equal(props.attributes.id);
  });
});
