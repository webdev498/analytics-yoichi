// var React = require('react');
// var createComponent = require('react-unit');

// describe('Angular-gauge chart component', () => {
//   it('should echo the value', () => {
//     var component = createComponent(<MyComponent value="hello, world!" />);

//     var input = component.findByQuery('input')[0];

//     expect(input.props.value).toBe('hello, world!');
//   });

//   // it('should trigger events', () => {
//   //   var changedValue;
//   //   function onChange(e) { changedValue = e.target.value; }

//   //   var component = createComponent(<MyComponent onChange={onChange} />);
//   //   var input = component.findByQuery('input')[0];

//   //   input.onChange({target:{value: 'hi, everyone!'}});

//   //   expect(changedValue).toBe('hi, everyone!');
//   // });
// });

// describe('Table component tests', function() {
//   this.timeout(500);

//   it('should display message', function() {

//   });
// });

// let React = require('react');
// let TestUtils = require('react/lib/ReactTestUtils');
// // let expect = require('expect');
// let ParetoChart = require('components/ParetoChart');

// describe('ParetoChart component tests', function() {
//   it('renders without problems', function() {
//     // let table = TestUtils.renderIntoDocument(<Table />);
//     // expect(table).toExist();

//     let ParetoChart = TestUtils.renderIntoDocument(
//       <ParetoChart />
//     );

//     let div = TestUtils.findRenderedDOMComponentWithTag(
//       ParetoChart, 'div'
//     );

//     expect(div.getDOMNode().textContent).toEqual('This is a Pareto Chart');
//   });
// });


// describe('a suite of tests', function() {
//   this.timeout(500);

//   it('should take less than 500ms', function(done) {
//     setTimeout(done, 300);
//   });

//   it('should take less than 500ms as well', function(done) {
//     setTimeout(done, 250);
//   });
// });
