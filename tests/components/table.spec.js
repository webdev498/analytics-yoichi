import React from 'react';
import TestUtils from 'react-addons-test-utils';
import tableCard, {
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

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<tableCard {...props} />);
}

describe('Table Component: ', function() {
  it('Should render as <div>', function() {
    const props = {
      attributes: {id: 'recent-alerts'},
      data: null
    };

    const component = shallowRenderWithProps(props);
    console.log(component);

    expect(component.type).to.equal('div');
    expect(component.props.id).to.equal(props.attributes.id);
    // expect('test').to.equal('test');
  });

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
          'origin': 'live',
          'correlationIds': [
          ],
          'id':
            'OikKAfhyT2lrS0FmaERiR2wyWlZsWFNVNHRUa3hLVlRKS1JGRTVVa1l1Y21GdWF5NXNiMk5oYlBrQ2xpdmVTd2luZXZlbnQucGFzc3RoZWhhc2j5',
          'type': 'rank_alert'
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
          'origin': 'live',
          'correlationIds': [
          ],
          'id':
            'OikKAfhyT2lrS0FmaERiR2wyWlZsWFNVNHRUa3hLVlRKS1JGRTVVa1l1Y21GdWF5NXNiMk5oYlBrQ2xpdmVTd2luZXZlbnQucGFzc3RoZWhhc2j5',
          'type': 'rank_alert'
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
});
