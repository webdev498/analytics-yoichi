import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Reactable from 'reactable';
import $ from 'jquery';
import TableCard, {
  generateIndividualRowData,
  generateRowObject,
  getColumnDataWhenApiReturnsSingleColumn,
  getColumnText,
  getColumnDataWhenApiReturnsMultipleColumns,
  calculateFieldValueForNestedResult,
  generateColumnTextForColumnTypeAsText,
  generateColumnTextForDisplayingDate,
  generateColumnTextForDisplayingCountryFlag
} from 'components/Table';
const {Table} = Reactable;

let ReactableTestUtils = {
  resetTestEnvironment: function() {
    window.renderApp = function(id) {
      ReactDOM.unmountComponentAtNode($('div#threatTable')[0]);
    };
    $('div#threatTable').remove();
  },

  // Expect the row specified to have the specified class
  expectRowClass: function(rowIndex, className) {
    let row = $($('#table tbody.reactable-data tr')[rowIndex]);
    expect(row.attr('class')).to.have.equal(className);
  },

  // Expect the columns of a the data row specified to have the values in the array as their text values
  expectRowText: function(rowIndex, textArray) {
    let row = $($('#table tbody.reactable-data tr')[rowIndex]).find('td');

    expect(row.length).to.equal(textArray.length);

    for (let i = 0; i < row.length; i++) {
      expect($(row[i]).text()).to.have.equal(textArray[i]);
    }
  },

  testNode: function() {
    let testNode = $('<div>').attr('id', 'threatTable');
    $('body').append(testNode);
    testNode.empty();
    return testNode[0];
  }
};

const props = {
  attributes: {id: 'recent-alerts'},
  data: null,
  'tableOptions': {
    'sortable': [
      'RANK SCORE',
      'DATE',
      'DETAILS',
      'SOURCE',
      'DESTINATION'
    ],
    'defaultSort': {
      'column': 'RANK SCORE',
      'direction': 'desc'
    },
    'filterable': [
      'DATE',
      'DETAILS',
      'SOURCE',
      'DESTINATION'
    ],
    'itemsPerPage': 5
  }
};

describe('Table Component: ', function() {
  it('Should component exists', function() {
    let component = shallow(<TableCard {...props} />);
    expect(component).to.exist;
  });

  it('Should render as <div>', function() {
    let component = shallow(<TableCard {...props} />);
    expect(component.type()).to.equal('div');
  });

  it('Should render as <table>', function() {
    let component = shallow(<TableCard {...props} />);
    let tableTag = component.childAt(0);
    expect(tableTag.type()).to.equal(Table);
  });

  // it('Should shows only 5 rows per page for itemsPerPage as 5', () => {});

  // it('Should call generateDataSource once', () => {});

  // it('Should call generateIndividualRowData specific number of times', () => {});

  it('generateIndividualRowData should return individual row data.', function() {
    const rowColumnDetails = {
      'currentColumnType': 'chart',
      'currentColumnDataArray': [
        {
          'fieldName': 'data.rank_alert.score'
        }
      ],
      'columnsArray': [
        {
          'name': 'json',
          'displayName': 'json',
          'columnType': 'ATTRIBUTE',
          'dataType': 'OBJECT',
          'sortable': true
        }
      ],
      'currentDataRows': [
        {
          'date': '2016-06-24T07:32: 05.280',
          'data': {
            'rank_alert': {
              'score': 65,
              'triggered': '2016-06-20T07:34: 05.214',
              'partition': 'OikKAfhDbGl2ZVlXSU4tTkxKVTJKRFE5UkYucmFuay5sb2NhbPk',
              'created': '2016-06-20T07:34: 05.214',
              'interesting': [
                {
                  'id': 'OikKAfhGbWFjaGluZVlXSU4tTkxKVTJKRFE5UkYucmFuay5sb2NhbPk',
                  'type': 'machine',
                  'value': 'WIN-NLJU2JDQ9RF.rank.local'
                }
              ],
              'scoreDetails': [
                {
                  'contribution': 65,
                  'lastSeen': '2016-06-24T07:32: 05.299',
                  'firstSeen': '2016-06-20T07:34: 05.229',
                  'message': 'Potential Pass-the-hash activity detected on host',
                  'uuid': '287404132'
                }
              ],
              'name': 'winevent.passthehash',
              'description': 'Potential Pass-the-hash activity detected on host',
              'modified': '2016-06-24T07:32: 05.280',
              'justification': [
              ],
              'message':
                'Suspicious activity indicative of a pass-the-hash attack detected on host WIN-NLJU2JDQ9RF.rank.local',
              'category': 'suspicious-login'
            }
          },
          'origin': 'live'
        }
      ],
      'columnText': '',
      'chartValue': '',
      'timeValue': '',
      'currentColumnIndex': 0
    };
    expect(generateIndividualRowData(rowColumnDetails)).to.deep.equal(
      {'chartValue': 65, 'columnText': '', 'timeValue': ''});
  });

  it('generateRowObject should return row object.', function() {
    const rowDetails = {
        'currentColumnType': 'chart',
        'currentTableData': {
          'type': 'chart',
          'columnNameToDisplay': 'Rank Score',
          'attributes': {
            'id': 'recentAlert',
            'chartType': 'angulargauge',
            'chartWidth': '70',
            'chartHeight': '60'
          },
          'chartOptions': {
          },
          'colorRangeOptions': {
          },
          'dialOptions': {
          },
          'data': [
            {
              'fieldName': 'data.rank_alert.score'
            }
          ],
          'style': {
            'width': '10%'
          }
        },
        'chartValue': 65,
        'columnText': '',
        'rowNumber': 0,
        'timeValue': ''
      },
      mainObject = {'columns': []};
    expect(generateRowObject(rowDetails, mainObject)).to.deep.equal({
      'columns': [
        {
          'columnType': 'chart',
          'columnName': 'Rank Score',
          'columnStyle': {
            'width': '10%'
          },
          'chartValue': 65,
          'chartId': 'recentAlert0',
          'chartType': 'angulargauge',
          'chartWidth': '70',
          'chartHeight': '60'
        }
      ]
    });
  });

  it('getColumnDataWhenApiReturnsSingleColumn should return column data when API returns single column.', function() {
    const columnDetails = {
      'currentColumnType': 'chart',
      'currentColumnDataArray': {
        'fieldName': 'data.rank_alert.score'
      },
      'currentDataRows': [
        {
          'date': '2016-06-24T07:16:43.078',
          'data': {
            'rank_alert': {
              'score': 65,
              'triggered': '2016-06-20T07:34: 05.214',
              'partition': 'OikKAfhDbGl2ZVlXSU4tTkxKVTJKRFE5UkYucmFuay5sb2NhbPk',
              'created': '2016-06-20T07:34: 05.214',
              'interesting': [
                {
                  'id': 'OikKAfhGbWFjaGluZVlXSU4tTkxKVTJKRFE5UkYucmFuay5sb2NhbPk',
                  'type': 'machine',
                  'value': 'WIN-NLJU2JDQ9RF.rank.local'
                }
              ],
              'scoreDetails': [
                {
                  'contribution': 65,
                  'lastSeen': '2016-06-24T07:16:43.095',
                  'firstSeen': '2016-06-20T07:34: 05.229',
                  'message': 'Potential Pass-the-hash activity detected on host',
                  'uuid': '287404132'
                }
              ],
              'name': 'winevent.passthehash',
              'description': 'Potential Pass-the-hash activity detected on host',
              'modified': '2016-06-24T07:16:43.078',
              'justification': [
              ],
              'message':
                'Suspicious activity indicative of a pass-the-hash attack detected on host WIN-NLJU2JDQ9RF.rank.local',
              'category': 'suspicious-login'
            }
          },
          'origin': 'live'
        }
      ],
      'columnText': '',
      'chartValue': '',
      'timeValue': ''
    };
    expect(getColumnDataWhenApiReturnsSingleColumn(columnDetails)).to.deep.equal(
      {'columnText': '', 'chartValue': 65, 'timeValue': ''});
  });

  it('getColumnText should return column text.', function() {
    const columnDetails = {
      'currentColumnType': 'chart',
      'fieldName': 'data.rank_alert.score',
      'fieldValue': 65,
      'columnText': '',
      'chartValue': '',
      'timeValue': ''
    };
    expect(getColumnText(columnDetails)).to.deep.equal({'columnText': '', 'chartValue': 65, 'timeValue': ''});
  });

  it('getColumnDataWhenApiReturnsMultipleColumns should return column data when API returns multiple column.',
    function() {
      const columnDetails = {
        'currentColumnType': 'text',
        'currentColumnDataArray': {
          'fieldName': 'destination.asn',
          'displayName': 'ASN'
        },
        'currentDataRows': [
          '2016-07-20T06:26:10.126',
          604616898,
          'Kafka or H2 (DBMS) Database Server',
          '172.31.9.170',
          33788,
          'demo.ranksoftwareinc.com',
          [
            'root'
          ],
          null,
          null,
          null,
          '172.31.9.171',
          9092,
          'rank-slave1',
          [
            'root'
          ],
          null,
          null,
          null,
          137829593,
          26485,
          [
            'CNTOKPNKVKNTMx1PPTUUx1NTOKPNKVKNTNx1VMVO'
          ]
        ],
        'columnText': '<span class="heading">IP: </span><span>172.31.9.171</span>:9092',
        'chartValue': '',
        'timeValue': '',
        'columnIndex': 16,
        'columnIndexLayoutJSON': 4
      };
      expect(getColumnDataWhenApiReturnsMultipleColumns(columnDetails)).to.deep.equal(
        {
          'columnText': '<span class="heading">IP: </span><span>172.31.9.171</span>:9092',
          'chartValue': '',
          'timeValue': ''
        });
    }
  );

  it('calculateFieldValueForNestedResult should return field value for nested result.', function() {
    const columnDetails = {
      'currentDataRows': {
        'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)': {
          '2016-06-24T07:35: 00.000': [
            0
          ],
          '2016-06-24T07:30: 00.000': [
            0
          ],
          '2016-06-24T08: 05: 00.000': [
            0
          ],
          '2016-06-24T07:10: 00.000': [
            0
          ],
          '2016-06-24T07:45: 00.000': [
            0
          ],
          '2016-06-24T07: 05: 00.000': [
            0
          ],
          '2016-06-24T07:40: 00.000': [
            0
          ],
          '2016-06-24T07:20: 00.000': [
            0
          ],
          '2016-06-24T07:55: 00.000': [
            0
          ],
          '2016-06-24T07:15: 00.000': [
            1
          ],
          '2016-06-24T07:50: 00.000': [
            0
          ],
          '2016-06-24T07:25: 00.000': [
            0
          ],
          '2016-06-24T08: 00: 00.000': [
            0
          ]
        }
      },
      'fieldValue': '',
      'columnIndexLayoutJSON': 0,
      'emptyValueMessage': '{empty user agent}'
    };
    expect(calculateFieldValueForNestedResult(columnDetails)).to.deep.equal(
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)');
  });

  it('generateColumnTextForColumnTypeAsText should return column text if column type is text.', function() {
    const columnDetails = {
      'currentColumnType': 'text',
      'fieldName': 'destination.asn',
      'displayName': 'ASN',
      'fieldValue': null,
      'columnText': '<span class="heading">IP: </span><span>172.31.9.172</span>:9092',
      'chartValue': '',
      'timeValue': ''
    };
    expect(generateColumnTextForColumnTypeAsText(columnDetails)).to.deep.equal(
      '<span class="heading">IP: </span><span>172.31.9.172</span>:9092'
    );
  });

  it('generateColumnTextForDisplayingDate should return formatted date.', function() {
    const value = '2016-07-20T07:08:16.802';
    expect(generateColumnTextForDisplayingDate(value)).to.deep.equal(
      '<span style="font-size: 14px; font-weight: 600;">20 Jul 2016</span><br/>12:38:16.802'
    );
  });

  it('generateColumnTextForDisplayingCountryFlag should return html for displaying country flag.', function() {
    const value = 'CA';
    expect(generateColumnTextForDisplayingCountryFlag(value)).to.deep.equal(
      ' <span class="flag-icon flag-icon-ca"></span>');
  });

  describe('pagination', function() {
    describe('specifying pageButtonLimit', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {'Date': '03 Aug 2016 19:55:15.869', 'Details': 'Potential Pass-the-hash activity detected on host'},
            {'Details': 'Potential Pass-the-hash activity detected on host', 'Source': 'IP 36.66.195.182'},
            {'Date': '03 Aug 2016 19:55:15.869', 'Details': 'Potential Pass-the-hash activity detected on host'},
            {'Details': 'Potential Pass-the-hash activity detected on host', 'Source': 'IP 36.66.195.182'},
            {'Date': '03 Aug 2016 19:55:15.869', 'Details': 'Potential Pass-the-hash activity detected on host'},
            {'Details': 'Potential Pass-the-hash activity detected on host', 'Source': 'IP 36.66.195.182'},
            {'Date': '03 Aug 2016 19:55:15.869', 'Details': 'Potential Pass-the-hash activity detected on host'},
            {'Details': 'Potential Pass-the-hash activity detected on host', 'Source': 'IP 36.66.195.182'},
            {'Date': '03 Aug 2016 19:55:15.869', 'Details': 'Potential Pass-the-hash activity detected on host'},
            {'Details': 'Potential Pass-the-hash activity detected on host', 'Source': 'IP 36.66.195.182'},
            {'Date': '03 Aug 2016 19:55:15.869', 'Details': 'Potential Pass-the-hash activity detected on host'},
            {'Details': 'Potential Pass-the-hash activity detected on host', 'Source': 'IP 36.66.195.182'}
          ]} itemsPerPage={5} pageButtonLimit={5} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('shows no more page buttons than the pageButtonLimit', function() {
        let pageButtons = $('#table tbody.reactable-pagination a.reactable-page-button');
        expect(pageButtons.length).to.equal(3);
      });
    });

    describe('specifying itemsPerPage', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {'Name': 'Griffin Smith', 'Age': '18'},
            {'Age': '23', 'Name': 'Lee Salminen'},
            {'Age': '28', 'Position': 'Developer'},
            {'Name': 'Griffin Smith', 'Age': '18'},
            {'Age': '23', 'Name': 'Test Person'},
            {'Name': 'Ian Zhang', 'Age': '28', 'Position': 'Developer'},
            {'Name': 'Griffin Smith', 'Age': '18', 'Position': 'Software Developer'},
            {'Age': '23', 'Name': 'Lee Salminen'},
            {'Age': '28', 'Position': 'Developer'}
          ]} itemsPerPage={4} previousPageLabel={'<<'} nextPageLabel={'>>'} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('provides buttons for each page', function() {
        let pageButtons = $('#table tbody.reactable-pagination a.reactable-page-button');
        expect(pageButtons.length).to.equal(3);
        expect($(pageButtons[0]).text()).to.have.equal('1');
        expect($(pageButtons[1]).text()).to.have.equal('2');
        expect($(pageButtons[2]).text()).to.have.equal('3');
      });

      it('displays only the first n rows', function() {
        expect($('#table tbody.reactable-data tr').length).to.equal(4);
      });

      it('specifies a class on the currently active page', function() {
        let activePage = $('#table tbody.reactable-pagination a.reactable-page-button.reactable-current-page');
        expect(activePage.length).to.equal(1);
        expect(activePage.text()).to.have.equal('1');
      });

      it('does not show previous button', function() {
        let previousButton = $('#table tbody.reactable-pagination a.reactable-previous-page');
        expect(previousButton.length).to.equal(0);
      });

      it('shows next button', function() {
        let nextButton = $('#table tbody.reactable-pagination a.reactable-next-page');
        expect(nextButton.length).to.equal(1);
        expect(nextButton[0].text).to.equal('>>');
      });

      describe('clicking page buttons', function() {
        beforeEach(function() {
          let page2 = $('#table tbody.reactable-pagination a.reactable-page-button')[1];
          TestUtils.Simulate.click(page2);
        });

        it('loads the next n rows', function() {
          let rows = $('#table tbody.reactable-data tr');
          expect($($(rows[0]).find('td')[0]).text()).to.have.equal('Test Person');
          expect($($(rows[1]).find('td')[0]).text()).to.have.equal('Ian Zhang');
          expect($($(rows[2]).find('td')[0]).text()).to.have.equal('Griffin Smith');
          expect($($(rows[3]).find('td')[0]).text()).to.have.equal('Lee Salminen');
        });

        it('puts an active class on the new active page', function() {
          let activePage = $('#table tbody.reactable-pagination a.reactable-page-button.reactable-current-page');
          expect(activePage.length).to.equal(1);
          expect(activePage.text()).to.have.equal('2');
        });

        it('can go back to the original page', function() {
          let page1 = $('#table tbody.reactable-pagination a.reactable-page-button')[0];
          TestUtils.Simulate.click(page1);

          let rows = $('#table tbody.reactable-data tr');
          expect($($(rows[0]).find('td')[0]).text()).to.have.equal('Griffin Smith');
          expect($($(rows[1]).find('td')[0]).text()).to.have.equal('Lee Salminen');
          expect($($(rows[2]).find('td')[0]).text()).to.have.equal('');
          expect($($(rows[3]).find('td')[0]).text()).to.have.equal('Griffin Smith');
        });

        it('shows previous button', function() {
          let previousButton = $('#table tbody.reactable-pagination a.reactable-previous-page');
          expect(previousButton.length).to.equal(1);
          expect(previousButton[0].text).to.equal('<<');
        });
      });
    });

    describe('specifying more itemsPerPage than items', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {'Name': 'Griffin Smith', 'Age': '18'},
            {'Age': '23', 'Name': 'Lee Salminen'},
            {'Age': '28', 'Position': 'Developer'},
            {'Name': 'Griffin Smith', 'Age': '18'},
            {'Age': '23', 'Name': 'Test Person'},
            {'Name': 'Ian Zhang', 'Age': '28', 'Position': 'Developer'},
            {'Name': 'Griffin Smith', 'Age': '18', 'Position': 'Software Developer'},
            {'Age': '23', 'Name': 'Lee Salminen'},
            {'Age': '28', 'Position': 'Developer'}
          ]} itemsPerPage={20} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders all rows', function() {
        expect($('#table tbody.reactable-data tr').length).to.equal(9);
      });

      it('provides buttons for 1 page', function() {
        let pageButtons = $('#table tbody.reactable-pagination a.reactable-page-button');
        expect(pageButtons.length).to.equal(1);
        expect($(pageButtons[0]).text()).to.have.equal('1');
      });

      it('does not show previous and next buttons', function() {
        let previousButton = $('#table tbody.reactable-pagination a.reactable-previous-page');
        let nextButton = $('#table tbody.reactable-pagination a.reactable-next-page');
        expect(previousButton.length + nextButton.length).to.equal(0);
      });
    });

    describe('not specifying itemsPerPage', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {'Name': 'Griffin Smith', 'Age': '18'},
            {'Age': '23', 'Name': 'Lee Salminen'},
            {'Age': '28', 'Position': 'Developer'},
            {'Name': 'Griffin Smith', 'Age': '18'},
            {'Age': '23', 'Name': 'Test Person'},
            {'Name': 'Ian Zhang', 'Age': '28', 'Position': 'Developer'},
            {'Name': 'Griffin Smith', 'Age': '18', 'Position': 'Software Developer'},
            {'Age': '23', 'Name': 'Lee Salminen'},
            {'Age': '28', 'Position': 'Developer'},
          ]} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders all rows', function() {
        expect($('#table tbody.reactable-data tr').length).to.equal(9);
      });
    });

    describe('specifying 0 itemsPerPage', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {'Name': 'Griffin Smith', 'Age': '18'},
            {'Age': '23', 'Name': 'Lee Salminen'},
            {'Age': '28', 'Position': 'Developer'},
            {'Name': 'Griffin Smith', 'Age': '18'},
            {'Age': '23', 'Name': 'Test Person'},
            {'Name': 'Ian Zhang', 'Age': '28', 'Position': 'Developer'},
            {'Name': 'Griffin Smith', 'Age': '18', 'Position': 'Software Developer'},
            {'Age': '23', 'Name': 'Lee Salminen'},
            {'Age': '28', 'Position': 'Developer'}
          ]} itemsPerPage={0} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders all rows', function() {
        expect($('#table tbody.reactable-data tr').length).to.equal(9);
      });
    });

    describe('updating the currentPage via a prop passed to the table', function() {
      before(function() {
        let ParentComponent = React.createClass({
          getInitialState: function() {
            return {currentPage: 4};
          },

          render() {
            return (
              <Reactable.Table className='table' id='table' data={[
                  {'Name': 'Griffin Smith', 'Age': '18'},
                  {'Age': '23', 'Name': 'Lee Salminen'},
                  {'Age': '28', 'Position': 'Developer'},
                  {'Name': 'Griffin Smith', 'Age': '18'},
                  {'Age': '23', 'Name': 'Test Person'},
                  {'Name': 'Ian Zhang', 'Age': '28', 'Position': 'Developer'},
                  {'Name': 'Griffin Smith', 'Age': '18', 'Position': 'Software Developer'},
                  {'Age': '23', 'Name': 'Lee Salminen'},
                  {'Age': '28', 'Position': 'Developer'}
              ]} itemsPerPage={2} currentPage={this.state.currentPage} />
            );
          }
        });
        this.component = ReactDOM.render(React.createElement(ParentComponent), ReactableTestUtils.testNode());
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('allows setting the default currentPage', function() {
        let activePage = $('#table tbody.reactable-pagination ' +
            'a.reactable-page-button.reactable-current-page');
        expect(activePage.length).to.equal(1);
        expect(activePage.text()).to.have.equal('5');
      });

      it('allows updating currentPage using props', function() {
        this.component.setState({currentPage: 2});
        let activePage = $('#table tbody.reactable-pagination ' +
            'a.reactable-page-button.reactable-current-page');
        expect(activePage.length).to.equal(1);
        expect(activePage.text()).to.have.equal('3');
      });
    });
  });

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
      let headers = [];
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
      let headers = [];
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
        let headers = [];
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
          let headers = [];
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
        let headers = [];
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
        let headers = [];
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
        let headers = [];
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

  describe('unsafe() strings', function() {
    context('in the <Table> directly', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {Name: Reactable.unsafe('<span id="griffins-name">Griffin Smith</span>'), Age: '18'},
            {Age: '28', Position: Reactable.unsafe('<span id="who-knows-job">Developer</span>')},
            {Age: '23', Name: Reactable.unsafe('<span id="lees-name">Lee Salminen</span>')}
          ]} sortable={['Name']} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the HTML in the table cells', function() {
        let griffins_name = $('span#griffins-name');
        expect(griffins_name.length).to.equal(1);
        expect(griffins_name.text()).to.have.equal('Griffin Smith');

        let lees_name = $('span#lees-name');
        expect(lees_name.length).to.equal(1);
        expect(lees_name.text()).to.have.equal('Lee Salminen');

        let who_knows_job = $('span#who-knows-job');
        expect(who_knows_job.length).to.equal(1);
        expect(who_knows_job.text()).to.have.equal('Developer');
      });

      it('still allows sorting', function() {
        let nameHeader = $('#table thead tr.reactable-column-header th')[0];
        TestUtils.Simulate.click(nameHeader);

        ReactableTestUtils.expectRowText(0, ['28', 'Developer', '']);
        ReactableTestUtils.expectRowText(1, ['18', '', 'Griffin Smith']);
        ReactableTestUtils.expectRowText(2, ['23', '', 'Lee Salminen']);
      });
    });

    context('in column labels', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table' data={[
            {Name: 'Griffin Smith', Age: '18'},
            {Age: '23', Name: 'Lee Salminen'},
            {Age: '28', Position: 'Developer'}
          ]} columns={[
            {key: 'Name', label: Reactable.unsafe('<strong>Name</strong>')},
            {key: 'Age', label: Reactable.unsafe('<em>Age</em>')},
            {key: 'Position', label: Reactable.unsafe('<small>Position</small>')}
          ]} />,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the HTML in the column headers', function() {
        let headers = [];
        $('thead th').each(function() {
          headers.push($(this).html());
        });

        expect(headers).to.eql([
          '<strong>Name</strong>',
          '<em>Age</em>',
          '<small>Position</small>'
        ]);
      });
    });

    context('in the <Tr>s', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            <Reactable.Tr data={{Name: Reactable.unsafe('<span id="griffins-name">Griffin Smith</span>'), Age: '18'}} />
            <Reactable.Tr data={{Age: '23', Name: Reactable.unsafe('<span id="lees-name">Lee Salminen</span>')}} />
            <Reactable.Tr data={{Age: '28', Position: Reactable.unsafe('<span id="who-knows-job">Developer</span>')}} />
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the HTML in the table cells', function() {
        let griffins_name = $('span#griffins-name');
        expect(griffins_name.length).to.equal(1);
        expect(griffins_name.text()).to.have.equal('Griffin Smith');

        let lees_name = $('span#lees-name');
        expect(lees_name.length).to.equal(1);
        expect(lees_name.text()).to.have.equal('Lee Salminen');

        let who_knows_job = $('span#who-knows-job');
        expect(who_knows_job.length).to.equal(1);
        expect(who_knows_job.text()).to.have.equal('Developer');
      });
    });

    context('in the <Td>s', function() {
      before(function() {
        ReactDOM.render(
          <Reactable.Table className='table' id='table'>
            <Reactable.Tr>
              <Reactable.Td column='Name'>{Reactable.unsafe('<span id="griffins-name">Griffin Smith</span>')}</Reactable.Td>
              <Reactable.Td column='Age'>18</Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Name'>{Reactable.unsafe('<span id="lees-name">Lee Salminen</span>')}</Reactable.Td>
              <Reactable.Td column='Age'>23</Reactable.Td>
            </Reactable.Tr>
            <Reactable.Tr>
              <Reactable.Td column='Position'>{Reactable.unsafe('<span id="who-knows-job">Developer</span>')}</Reactable.Td>
              <Reactable.Td column='Age'>28</Reactable.Td>
            </Reactable.Tr>
          </Reactable.Table>,
          ReactableTestUtils.testNode()
        );
      });

      after(ReactableTestUtils.resetTestEnvironment);

      it('renders the HTML in the table cells', function() {
        let griffins_name = $('span#griffins-name');
        expect(griffins_name.length).to.equal(1);
        expect(griffins_name.text()).to.have.equal('Griffin Smith');

        let lees_name = $('span#lees-name');
        expect(lees_name.length).to.equal(1);
        expect(lees_name.text()).to.have.equal('Lee Salminen');

        let who_knows_job = $('span#who-knows-job');
        expect(who_knows_job.length).to.equal(1);
        expect(who_knows_job.text()).to.have.equal('Developer');
      });
    });
  });
});
