import React from 'react';
import TestUtils from 'react-addons-test-utils';

import ParetoChart from 'components/charts/ParetoChart';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<ParetoChart {...props} />);
}

describe('ParetoChart Component:', function() {
  it('Should render as <div>', function() {
    const props = {
      attributes: {id: 'pareto-chart'},
      data: null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
    expect(component.props.id).to.equal(props.attributes.id);
  });
});
