import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

export function simulateEvent(wrappedTarget, eventType) {
  if (wrappedTarget.node) {
    // wrappedTarget was obtained using enzyme's mount()
    const domNode = ReactDOM.findDOMNode(wrappedTarget.node);
    TestUtils.Simulate[eventType](domNode);
  }
  else {
    // wrappedTarget was obtained using enzyme's shallow()
    wrappedTarget.simulate(eventType);
  }
}
