import React from 'react';
import TestUtils from 'react-addons-test-utils';
import WorldMap, {
  generateChartDataSource
} from 'components/WorldMap';

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
        'title': 'Outgoing Traffic Heatmap'
      },
      'data': null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
  });

  it('generateChartDataSource should return chart data source object.', function() {
    const rawData = {
        'taf_source_bad_reputation_countries': {
          'total': -1,
          'next': -1,
          'columns': [
            {
              'name': 'source.country',
              'displayName': 'source.country',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'pos_x',
              'displayName': 'pos_x',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'pos_y',
              'displayName': 'pos_y',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'country_name',
              'displayName': 'country_name',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'connections',
              'displayName': 'connections',
              'columnType': 'MEASURE',
              'dataType': 'NUMBER',
              'sortable': true
            },
            {
              'name': 'bandwidth',
              'displayName': 'bandwidth',
              'columnType': 'FORMULA',
              'dataType': 'NUMBER',
              'sortable': true
            }
          ],
          'rows': [

          ]
        },
        'taf_source_countries': {
          'total': -1,
          'next': -1,
          'columns': [
            {
              'name': 'source.country',
              'displayName': 'source.country',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'pos_x',
              'displayName': 'pos_x',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'pos_y',
              'displayName': 'pos_y',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'country_name',
              'displayName': 'country_name',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'connections',
              'displayName': 'connections',
              'columnType': 'MEASURE',
              'dataType': 'NUMBER',
              'sortable': true
            },
            {
              'name': 'bandwidth',
              'displayName': 'bandwidth',
              'columnType': 'FORMULA',
              'dataType': 'NUMBER',
              'sortable': true
            }
          ],
          'rows': [
            [
              'IN',
              '1463.5',
              '557.45',
              'India',
              60,
              939241
            ],
            [
              'CN',
              '1681.14',
              '479.81',
              'China',
              47,
              168624
            ],
            [
              'CA',
              '566.23',
              '428.9',
              'Canada',
              44,
              68622
            ],
            [
              'US',
              '547.14',
              '484.9',
              'United States',
              3,
              0
            ],
            [
              'BR',
              '713.87',
              '796.72',
              'Brazil',
              2,
              0
            ],
            [
              'DE',
              '1070.23',
              '377.36',
              'Germany',
              2,
              0
            ],
            [
              'NL',
              '1034.59',
              '381.81',
              'Netherlands',
              2,
              0
            ],
            [
              'RU',
              '1236.96',
              '357.63',
              'Russia',
              2,
              3738
            ],
            [
              'UA',
              '1184.78',
              '395.81',
              'Ukraine',
              2,
              5576
            ],
            [
              'JP',
              '1827.5',
              '504',
              'Japan',
              1,
              0
            ],
            [
              'ZA',
              '1165.69',
              '871.81',
              'South Africa',
              1,
              0
            ]
          ]
        }
      },
      fieldMapping = [
        {
          'reportId': 'taf_source_bad_reputation_countries',
          'columns': [
            'source.country',
            'pos_x',
            'pos_y',
            'connections'
          ],
          'connection': 'malicious'
        },
        {
          'reportId': 'taf_source_countries',
          'columns': [
            'source.country',
            'pos_x',
            'pos_y',
            'connections'
          ],
          'connection': 'secure'
        }
      ],
      dataSourceObject = {
        'chart': {
          'entityFillHoverColor': '#cbcbd1',
          'nullEntityColor': '#cbcbd1',
          'showLabels': '0',
          'theme': 'zune',
          'showvalue': '0',
          'showLegend': '0',
          'chartLeftMargin': '0',
          'chartRightMargin': '0',
          'chartTopMargin': '0',
          'chartBottomMargin': '0',
          'bgAlpha': '0',
          'canvasTopMargin': '0',
          'canvasBottomMargin': '0'
        },
        'data': [
          {
            'data': [
              {
                'id': '104',
                'countryCode': 'IN',
                'value': '60',
                'color': '#2BD8D0',
                'connection': 'secure'
              },
              {
                'id': '101',
                'countryCode': 'CN',
                'value': '47',
                'color': '#51DFD8',
                'connection': 'secure'
              },
              {
                'id': '05',
                'countryCode': 'CA',
                'value': '44',
                'color': '#71E5DF',
                'connection': 'secure'
              },
              {
                'id': '23',
                'countryCode': 'US',
                'value': '3',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '27',
                'countryCode': 'BR',
                'value': '2',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '142',
                'countryCode': 'DE',
                'value': '2',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '157',
                'countryCode': 'NL',
                'value': '2',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '118',
                'countryCode': 'RU',
                'value': '2',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '169',
                'countryCode': 'UA',
                'value': '2',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '107',
                'countryCode': 'JP',
                'value': '1',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '80',
                'countryCode': 'ZA',
                'value': '1',
                'color': '#DBF8F7',
                'connection': 'secure'
              }
            ]
          }
        ]
      };
    expect(generateChartDataSource(rawData, {}, fieldMapping)).to.deep.equal(dataSourceObject);
  });
});
