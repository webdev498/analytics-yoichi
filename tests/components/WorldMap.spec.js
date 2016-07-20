import {
  generateChartDataSource
} from 'components/WorldMap';

describe('WorldMap Component: ', function() {
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
            [
              'CN',
              '1681.14',
              '479.81',
              'China',
              52,
              108581
            ],
            [
              'NL',
              '1034.59',
              '381.81',
              'Netherlands',
              30,
              4592
            ],
            [
              'US',
              '547.14',
              '484.9',
              'United States',
              21,
              2672
            ],
            [
              'BR',
              '713.87',
              '796.72',
              'Brazil',
              20,
              79960
            ],
            [
              'BD',
              '1533.5',
              '581.63',
              'Bangladesh',
              9,
              36122
            ],
            [
              'JP',
              '1827.5',
              '504',
              'Japan',
              6,
              0
            ],
            [
              'TR',
              'N/A',
              'N/A',
              'Turkey',
              3,
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
              'CH',
              '1049.87',
              '426.36',
              'Switzerland',
              1,
              0
            ],
            [
              'SE',
              '1105.87',
              '319.45',
              'Sweden',
              1,
              0
            ]
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
              'CA',
              '566.23',
              '428.9',
              'Canada',
              1560,
              30090099
            ],
            [
              'IN',
              '1463.5',
              '557.45',
              'India',
              1325,
              46647208
            ],
            [
              'CN',
              '1681.14',
              '479.81',
              'China',
              464,
              1414832
            ],
            [
              'US',
              '547.14',
              '484.9',
              'United States',
              138,
              941905
            ],
            [
              'NL',
              '1034.59',
              '381.81',
              'Netherlands',
              58,
              69670
            ],
            [
              'RU',
              '1236.96',
              '357.63',
              'Russia',
              33,
              80870
            ],
            [
              'UA',
              '1184.78',
              '395.81',
              'Ukraine',
              30,
              74431
            ],
            [
              'BR',
              '713.87',
              '796.72',
              'Brazil',
              23,
              80150
            ],
            [
              'SE',
              '1105.87',
              '319.45',
              'Sweden',
              22,
              2071210
            ],
            [
              'FR',
              '1012.96',
              '407.27',
              'France',
              14,
              39407
            ],
            [
              'BD',
              '1533.5',
              '581.63',
              'Bangladesh',
              9,
              36122
            ],
            [
              'JP',
              '1827.5',
              '504',
              'Japan',
              8,
              0
            ],
            [
              'GB',
              '1000.23',
              '389.9',
              'United Kingdom',
              7,
              0
            ],
            [
              'DE',
              '1070.23',
              '377.36',
              'Germany',
              5,
              570
            ],
            [
              'KG',
              '1444.41',
              '459.45',
              'Kyrgyzstan',
              4,
              6320
            ],
            [
              'VN',
              '1623.87',
              '594.36',
              'Vietnam',
              4,
              3916
            ],
            [
              'TR',
              'N/A',
              'N/A',
              'Turkey',
              3,
              0
            ],
            [
              'ID',
              '1677.32',
              '725.45',
              'Indonesia',
              2,
              3078
            ],
            [
              'MN',
              '1620.05',
              '418.72',
              'Mongolia',
              2,
              43
            ],
            [
              'CH',
              '1049.87',
              '426.36',
              'Switzerland',
              1,
              0
            ],
            [
              'CZ',
              '1081.69',
              '402.18',
              'Czech Republic',
              1,
              188
            ],
            [
              'IQ',
              '1257.32',
              '520.45',
              'Iraq',
              1,
              188
            ],
            [
              'LV',
              '1151.69',
              '344.9',
              'Latvia',
              1,
              0
            ],
            [
              'SG',
              '1618.78',
              '720.36',
              'Singapore',
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
      chartOptions = {},
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
                'id': '101',
                'countryCode': 'CN',
                'value': '52',
                'color': '#F69275',
                'connection': 'malicious'
              },
              {
                'id': '157',
                'countryCode': 'NL',
                'value': '30',
                'color': '#F9B6A2',
                'connection': 'malicious'
              },
              {
                'id': '23',
                'countryCode': 'US',
                'value': '21',
                'color': '#F8CABB',
                'connection': 'malicious'
              },
              {
                'id': '27',
                'countryCode': 'BR',
                'value': '20',
                'color': '#F8CABB',
                'connection': 'malicious'
              },
              {
                'id': '96',
                'countryCode': 'BD',
                'value': '9',
                'color': '#FEEDE8',
                'connection': 'malicious'
              },
              {
                'id': '107',
                'countryCode': 'JP',
                'value': '6',
                'color': '#FEEDE8',
                'connection': 'malicious'
              },
              {
                'id': '142',
                'countryCode': 'DE',
                'value': '2',
                'color': '#FEEDE8',
                'connection': 'malicious'
              },
              {
                'id': '168',
                'countryCode': 'CH',
                'value': '1',
                'color': '#FEEDE8',
                'connection': 'malicious'
              },
              {
                'id': '167',
                'countryCode': 'SE',
                'value': '1',
                'color': '#FEEDE8',
                'connection': 'malicious'
              },
              {
                'id': '05',
                'countryCode': 'CA',
                'value': '1560',
                'color': '#2BD8D0',
                'connection': 'secure'
              },
              {
                'id': '104',
                'countryCode': 'IN',
                'value': '1325',
                'color': '#2BD8D0',
                'connection': 'secure'
              },
              {
                'id': '101',
                'countryCode': 'CN',
                'value': '464',
                'color': '#BAF2F0',
                'connection': 'secure'
              },
              {
                'id': '23',
                'countryCode': 'US',
                'value': '138',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '157',
                'countryCode': 'NL',
                'value': '58',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '118',
                'countryCode': 'RU',
                'value': '33',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '169',
                'countryCode': 'UA',
                'value': '30',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '27',
                'countryCode': 'BR',
                'value': '23',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '167',
                'countryCode': 'SE',
                'value': '22',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '141',
                'countryCode': 'FR',
                'value': '14',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '96',
                'countryCode': 'BD',
                'value': '9',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '107',
                'countryCode': 'JP',
                'value': '8',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'countryCode': 'GB',
                'value': '7',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '142',
                'countryCode': 'DE',
                'value': '5',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '111',
                'countryCode': 'KG',
                'value': '4',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '125',
                'countryCode': 'VN',
                'value': '4',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '105',
                'countryCode': 'ID',
                'value': '2',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '114',
                'countryCode': 'MN',
                'value': '2',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '168',
                'countryCode': 'CH',
                'value': '1',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '137',
                'countryCode': 'CZ',
                'value': '1',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'countryCode': 'IQ',
                'value': '1',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '148',
                'countryCode': 'LV',
                'value': '1',
                'color': '#DBF8F7',
                'connection': 'secure'
              },
              {
                'id': '119',
                'countryCode': 'SG',
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
    expect(generateChartDataSource(rawData, chartOptions, fieldMapping)).to.deep.equal(dataSourceObject);
  });
});
