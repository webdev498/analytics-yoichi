import React from 'react';
import ReactDOM from 'react-dom';
// import chai from 'chai';
import Reactable from 'reactable';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

// var ReactTestUtils = React.addons.TestUtils;
// var expect = chai.expect;

var ReactableTestUtils = {
  resetTestEnvironment: function() {
    window.renderApp = function(id) {
      ReactDOM.unmountComponentAtNode($('div#test-node')[0]);
    };
    $('div#test-node').remove();
  },

  // Expect the row specified to have the specified class
  expectRowClass: function(rowIndex, className) {
    var row = $($('#table tbody.reactable-data tr')[rowIndex]);
    expect(row.attr('class')).to.have.equal(className);
  },

  // Expect the columns of a the data row specified to have the values in the array as their text values
  expectRowText: function(rowIndex, textArray) {
    var row = $($('#table tbody.reactable-data tr')[rowIndex]).find('td');

    expect(row.length).to.equal(textArray.length);

    for (var i = 0; i < row.length; i++) {
      expect($(row[i]).text()).to.have.equal(textArray[i]);
    }
  },

  testNode: function() {
    var testNode = $('<div>').attr('id', 'test-node');
    $('body').append(testNode);
    testNode.empty();
    return testNode[0];
  }
};

describe('Reactable', function() {
  describe('with null children', function() {
    before(function() {
      window.renderApp = function(id) {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            {null}
            {null}
            {null}
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      };
    });

    after(ReactableTestUtils.resetTestEnvironment);

    it('renders the table', function() {
      expect($('table#table.table')).to.exist;
    });
  });

  describe('directly passing a data array', function() {
    before(function() {
      ReactDOM.render(
        <Reactable.Table className='table' id='table' data={[
          {Name: 'Griffin Smith', Age: '18'},
          {Age: '23', Name: 'Lee Salminen'},
          {Age: '28', Position: 'Developer'},
          {Name: 'Leonor Hyatt', Position: null}
        ]} />,
        ReactableTestUtils.testNode()
      );
    });

    after(ReactableTestUtils.resetTestEnvironment);

    it('renders the table', function() {
      expect($('table#table.table')).to.exist;
    });

    it('renders the column headers in the table', function() {
      var headers = [];
      $('thead th').each(function() {
        headers.push($(this).text());
      });

      expect(headers).to.eql(['Name', 'Age', 'Position']);
    });

    it('renders the first row with the correct data', function() {
      ReactableTestUtils.expectRowText(0, ['Griffin Smith', '18', '']);
    });

    it('renders the second row with the correct data', function() {
      ReactableTestUtils.expectRowText(1, ['Lee Salminen', '23', '']);
    });

    it('renders the third row with the correct data', function() {
      ReactableTestUtils.expectRowText(2, ['', '28', 'Developer']);
    });

    it('handles null values', function() {
      ReactableTestUtils.expectRowText(3, ['Leonor Hyatt', '', '']);
    });
  });

  describe('adding <Tr>s to the <Table>', function() {
    before(function() {
      ReactDOM.render(
        <Reactable.Table className='table' id='table'>
          <Reactable.Tr data={{Name: 'Griffin Smith', Age: '18'}} />
          <Reactable.Tr data={{Age: '23', Name: 'Lee Salminen'}} />
          <Reactable.Tr data={{Age: '28', Position: 'Developer'}} />
        </Reactable.Table>,
        ReactableTestUtils.testNode()
      );
    });

    after(ReactableTestUtils.resetTestEnvironment);

    it('renders the table', function() {
      expect($('table#table.table')).to.exist;
    });

    it('renders the column headers in the table', function() {
      var headers = [];
      $('thead th').each(function() {
        headers.push($(this).text());
      });

      expect(headers).to.eql([ 'Name', 'Age', 'Position' ]);
    });

    it('renders the first row with the correct data', function() {
      ReactableTestUtils.expectRowText(0, ['Griffin Smith', '18', '']);
    });

    it('renders the second row with the correct data', function() {
      ReactableTestUtils.expectRowText(1, ['Lee Salminen', '23', '']);
    });

    it('renders the third row with the correct data', function() {
      ReactableTestUtils.expectRowText(2, ['', '28', 'Developer']);
    });
  });

  describe('adding <Td>s to the <Tr>s', function() {
    context('with only one <Td>', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            <Reactable.Tr>
              <Reactable.Td column='Name'>Griffin Smith</Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Name'>Lee Salminen</Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Name'>Ian Zhang</Reactable.Td>
            </Reactable.Tr>
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the table', function() {
        expect($('table#table.table')).to.exist;
      });

      it('renders the column headers in the table', function() {
        var headers = [];
        $('thead th').each(function() {
          headers.push($(this).text());
        });

        expect(headers).to.eql(['Name']);
      });

      it('renders the first row with the correct data', function() {
        ReactableTestUtils.expectRowText(0, ['Griffin Smith']);
      });

      it('renders the second row with the correct data', function() {
        ReactableTestUtils.expectRowText(1, ['Lee Salminen']);
      });

      it('renders the third row with the correct data', function() {
        ReactableTestUtils.expectRowText(2, ['Ian Zhang']);
      });
    });

    context('with multiple <Td>s', function() {
      context('with plain text', function() {
        before(function() {
          ReactDOM.render(
            <Reactable.Table className='table' id='table'>
              <Reactable.Tr>
                <Reactable.Td column='Name'>Griffin Smith</Reactable.Td>
                <Reactable.Td column='Age'>18</Reactable.Td>
              </Reactable.Tr>
              <Reactable.Tr>
                <Reactable.Td column='Name'>Lee Salminen</Reactable.Td>
                <Reactable.Td column='Age'>23</Reactable.Td>
              </Reactable.Tr>
              <Reactable.Tr>
                <Reactable.Td column='Position'>Developer</Reactable.Td>
                <Reactable.Td column='Age'>28</Reactable.Td>
              </Reactable.Tr>
            </Reactable.Table>,
            ReactableTestUtils.testNode()
          );
        });

        after(ReactableTestUtils.resetTestEnvironment);

        it('renders the table', function() {
          expect($('table#table.table')).to.exist;
        });

        it('renders the column headers in the table', function() {
          var headers = [];
          $('thead th').each(function() {
            headers.push($(this).text());
          });

          expect(headers).to.eql([ 'Name', 'Age', 'Position' ]);
        });

        it('renders the first row with the correct data', function() {
          ReactableTestUtils.expectRowText(0, ['Griffin Smith', '18', '']);
        });

        it('renders the second row with the correct data', function() {
          ReactableTestUtils.expectRowText(1, ['Lee Salminen', '23', '']);
        });

        it('renders the third row with the correct data', function() {
          ReactableTestUtils.expectRowText(2, ['', '28', 'Developer']);
        });
      });
    });

    context('with React.DOM nodes inside', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            <Reactable.Tr>
              <Reactable.Td column='Name'><b>Griffin Smith</b></Reactable.Td>
              <Reactable.Td column='Age'><em>18</em></Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Name'><b>Lee Salminen</b></Reactable.Td>
              <Reactable.Td column='Age'><em>23</em></Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Position'><b>Developer</b></Reactable.Td>
              <Reactable.Td column='Age'><em>28</em></Reactable.Td>
            </Reactable.Tr>
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the table', function() {
        expect($('table#table.table')).to.exist;
      });

      it('renders the column headers in the table', function() {
        var headers = [];
        $('thead th').each(function() {
          headers.push($(this).text());
        });

        expect(headers).to.eql([ 'Name', 'Age', 'Position' ]);
      });

      it('renders the first row with the correct data', function() {
        ReactableTestUtils.expectRowText(0, ['Griffin Smith', '18', '']);
      });

      it('renders the second row with the correct data', function() {
        ReactableTestUtils.expectRowText(1, ['Lee Salminen', '23', '']);
      });

      it('renders the third row with the correct data', function() {
        ReactableTestUtils.expectRowText(2, ['', '28', 'Developer']);
      });
    });

    context('with null <Td>s', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            <Reactable.Tr>
              <Reactable.Td column='Name'><b>Griffin Smith</b></Reactable.Td>
              {null}
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Name'><b>Lee Salminen</b></Reactable.Td>
              <Reactable.Td column='Age'><em>23</em></Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Position'><b>Developer</b></Reactable.Td>
              <Reactable.Td column='Age'><em>28</em></Reactable.Td>
            </Reactable.Tr>
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the table', function() {
        expect($('table#table.table')).to.exist;
      });

      it('renders the column headers in the table', function() {
        var headers = [];
        $('thead th').each(function() {
          headers.push($(this).text());
        });

        expect(headers).to.eql([ 'Name', 'Age', 'Position' ]);
      });

      it('renders the first row with the correct data', function() {
        ReactableTestUtils.expectRowText(0, ['Griffin Smith', '', '']);
      });

      it('renders the second row with the correct data', function() {
        ReactableTestUtils.expectRowText(1, ['Lee Salminen', '23', '']);
      });

      it('renders the third row with the correct data', function() {
        ReactableTestUtils.expectRowText(2, ['', '28', 'Developer']);
      });
    });

    context('with null <Tr>s', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            <Reactable.Tr>
              <Reactable.Td column='Name'><b>Griffin Smith</b></Reactable.Td>
              <Reactable.Td column='Age'><em>18</em></Reactable.Td>
            </Reactable.Tr>
            {null}
            <Reactable.Tr>
              <Reactable.Td column='Position'><b>Developer</b></Reactable.Td>
              <Reactable.Td column='Age'><em>28</em></Reactable.Td>
            </Reactable.Tr>
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the table', function() {
        expect($('table#table.table')).to.exist;
      });

      it('renders the column headers in the table', function() {
        var headers = [];
        $('thead th').each(function() {
          headers.push($(this).text());
        });

        expect(headers).to.eql([ 'Name', 'Age', 'Position' ]);
      });

      it('renders the first row with the correct data', function() {
        ReactableTestUtils.expectRowText(0, ['Griffin Smith', '18', '']);
      });

      it('renders the second row with the correct data', function() {
        ReactableTestUtils.expectRowText(1, ['', '28', 'Developer']);
      });
    });
  });

  describe('Adding a <Tfoot>', function() {
    before(function() {
      ReactDOM.render(
        <Reactable.Table className='table' id='table' sortable={['Name']} filterable={['Name', 'Age']}
          filterClassName='new-class' >
          <Reactable.Tr className='rowClass1' data={{Name: 'Griffin Smith', Age: '18'}} />
          <Reactable.Tr className='rowClass2' data={{Age: '23', Name: 'Lee Salminen'}} />
          <Reactable.Tr className='rowClass3' data={{Age: '28', Position: 'Developer'}} />

          <Reactable.Tfoot id='tfoot'>
            <tr><td id='tfoot-stuff'>Test</td></tr>
          </Reactable.Tfoot>
        </Reactable.Table>,
        ReactableTestUtils.testNode()
      );
    });

    after(ReactableTestUtils.resetTestEnvironment);

    it('renders the table', function() {
      expect($('#table')).to.exist;
    });

    it('renders the regular data rows', function() {
      ReactableTestUtils.expectRowText(0, ['Griffin Smith', '18', '']);
      ReactableTestUtils.expectRowText(1, ['Lee Salminen', '23', '']);
      ReactableTestUtils.expectRowText(2, ['', '28', 'Developer']);
    });

    it('renders the tfoot', function() {
      expect($('#tfoot')).to.exist;
    });

    it('renders the children of the tfoot', function() {
      expect($('#tfoot-stuff')).to.exist;
    });
  });

  describe('passing through HTML props', function() {
    describe('adding <Tr>s with className to the <Table>', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            <Reactable.Tr className='rowClass1' data={{Name: 'Griffin Smith', Age: '18'}} />
            <Reactable.Tr className='rowClass2' data={{Age: '23', Name: 'Lee Salminen'}} />
            <Reactable.Tr className='rowClass3' data={{Age: '28', Position: 'Developer'}} />
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the table', function() {
        expect($('table#table.table')).to.exist;
      });

      it('renders the column headers in the table', function() {
        var headers = [];
        $('thead th').each(function() {
          headers.push($(this).text());
        });

        expect(headers).to.eql([ 'Name', 'Age', 'Position' ]);
      });

      it('renders the first row with the correct class name', function() {
        ReactableTestUtils.expectRowClass(0, 'rowClass1');
      });

      it('renders the second row with the correct class name', function() {
        ReactableTestUtils.expectRowClass(1, 'rowClass2');
      });

      it('renders the third row with the correct class name', function() {
        ReactableTestUtils.expectRowClass(2, 'rowClass3');
      });
    });

    describe('adding <Td>s with classNames to the <Table>', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            <Reactable.Tr>
              <Reactable.Td column='Name' className='name-1'>Griffin Smith</Reactable.Td>
              <Reactable.Td column='Age'>18</Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Name' className='name-2'>Lee Salminen</Reactable.Td>
              <Reactable.Td column='Age'>23</Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Position' className='position'>Developer</Reactable.Td>
              <Reactable.Td column='Age'>28</Reactable.Td>
            </Reactable.Tr>
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the first column with the correct class name', function() {
        expect($('td.name-1').text()).to.have.equal('Griffin Smith');
      });

      it('renders the second column with the correct class name', function() {
        expect($('td.name-2').text()).to.have.equal('Lee Salminen');
      });

      it('renders the third column with the correct class name', function() {
        expect($('td.position').text()).to.have.equal('Developer');
      });
    });
  });

  describe('adding <Td> with style to the <Table>', function() {
    before(function() {
      var tdStyle = {width: '100px'};
      ReactDOM.render(
        <Reactable.Table className='table' id='table'>
          <Reactable.Tr>
            <Reactable.Td column='Name' className='name-1' style={tdStyle}>Griffin Smith</Reactable.Td>
            <Reactable.Td column='Age'>18</Reactable.Td>
          </Reactable.Tr>
        </Reactable.Table>,
        ReactableTestUtils.testNode()
      );
    });

    after(ReactableTestUtils.resetTestEnvironment);

    it('renders the first column with the width', function() {
      expect($('td.name-1').attr('style')).to.have.match(/width/);
    });
  });

  describe('specifying an array of columns', function() {
    describe('as strings', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {Name: 'Griffin Smith', Age: '18', HideThis: 'one'},
            {Age: '23', Name: 'Lee Salminen', HideThis: 'two'},
            {Age: '28', Position: 'Developer'}
          ]} columns={['Name', 'Age']} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('omits columns not in the list', function() {
        var columns = $('tr.reactable-column-header th');
        expect(columns.length).to.equal(2);
        expect($(columns[0]).text()).to.have.equal('Name');
        expect($(columns[1]).text()).to.have.equal('Age');
      });

      it('adds class name for each column base on its label', function() {
        var columns = $('tr.reactable-column-header th');
        expect($(columns[0]).attr('class')).to.have.equal('reactable-th-name');
        expect($(columns[1]).attr('class')).to.have.equal('reactable-th-age');
      });
    });

    describe('as objects', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {name: 'Griffin Smith', age: '18', HideThis: 'one'},
            {age: '23', name: 'Lee Salminen', HideThis: 'two'},
            {age: '28', Position: 'Developer'}
          ]} columns={[
            { key: 'name', label: 'Name' },
            { key: 'age', label: 'Age' }
          ]} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('omits columns not in the list', function() {
        var columns = $('tr.reactable-column-header th');
        expect(columns.length).to.equal(2);
      });

      it('allows changing the labels of the columns', function() {
        var columns = $('tr.reactable-column-header th');
        expect($(columns[0]).text()).to.have.equal('Name');
        expect($(columns[1]).text()).to.have.equal('Age');
      });

      it('adds class name for each column base on its key', function() {
        var columns = $('tr.reactable-column-header th');
        expect($(columns[0]).attr('class')).to.have.equal('reactable-th-name');
        expect($(columns[1]).attr('class')).to.have.equal('reactable-th-age');
      });
    });
  });

  describe('specifying columns using a <Thead>', function() {
    describe('and an element for the column title', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table id='table' data={[
          {Name: Reactable.unsafe('<span id="griffins-name">Griffin Smith</span>'), Age: '18'},
          {Age: '28', Position: Reactable.unsafe('<span id="who-knows-job">Developer</span>')},
          {Age: '23', Name: Reactable.unsafe('<span id="lees-name">Lee Salminen</span>')}
          ]}>
            <Reactable.Thead>
              <Reactable.Th column='Name' id='my-name'>
                <strong>name</strong>
              </Reactable.Th>
            </Reactable.Thead>
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders only the columns in the Thead', function() {
        expect($('#table tbody tr:first td').length).to.be.above(0);
        expect($('#table thead tr:first th').length).to.be.above(0);
      });

      it('renders the contents of the Th', function() {
        expect($('#table>thead>tr>th>strong').length).to.be.above(0);
      });

      it('passes through the properties of the Th', function() {
        expect($('#table>thead>tr>th').attr('id')).to.have.equal('my-name');
      });
    });

    describe('and a string for the column title', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table id='table' data={[
          {Name: Reactable.unsafe('<span id="griffins-name">Griffin Smith</span>'), Age: '18'},
          {Age: '28', Position: Reactable.unsafe('<span id="who-knows-job">Developer</span>')},
          {Age: '23', Name: Reactable.unsafe('<span id="lees-name">Lee Salminen</span>')}
          ]}>
            <Reactable.Thead>
              <Reactable.Th column='Name' id='my-name'>
                name
              </Reactable.Th>
            </Reactable.Thead>
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders only the columns in the Thead', function() {
        expect($('#table tbody tr:first td').length).to.be.above(0);
        expect($('#table thead tr:first th').length).to.be.above(0);
      });

      it('renders the contents of the Th', function() {
        expect($('#table>thead>tr>th').length).to.be.above(0);
      });

      it('passes through the properties of the Th', function() {
        expect($('#table>thead>tr>th').attr('id')).to.have.equal('my-name');
      });
    });
  });

  describe('table headers', function() {
    describe('with hideTableHeader prop on <Table>', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
          {Name: 'Griffin Smith', Age: '18'},
          {Age: '23', Name: 'Lee Salminen'},
          {Age: '28', Position: 'Developer'},
          {Name: 'Leonor Hyatt', Position: null}
          ]} hideTableHeader />,
            ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the table', function() {
        expect($('table#table.table').length).to.be.above(0);
      });

      it('renders the first row with the correct data', function() {
        ReactableTestUtils.expectRowText(0, ['Griffin Smith', '18', '']);
      });

      it('renders the second row with the correct data', function() {
        ReactableTestUtils.expectRowText(1, ['Lee Salminen', '23', '']);
      });

      it('renders the third row with the correct data', function() {
        ReactableTestUtils.expectRowText(2, ['', '28', 'Developer']);
      });

      it('does not show a <Thead>', function() {
        expect($('#table thead').length).to.be.above(0);
      });
    });
  });
});
