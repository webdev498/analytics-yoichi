import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HorizontalBarChart, {
  generateDataArray,
  generateDataSource
} from 'components/HorizontalBarChart';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<HorizontalBarChart {...props} />);
}

describe('HorizontalBarChart Component: ', function() {
  it('Should render as <div>', function() {
    const props = {
      'attributes': {'id': 'TopConnectionsByProtocol'},
      'meta': {
        'title': 'Top Connections By Protocol'
      },
      'data': null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
  });

  it('generateDataArray should return data array.', function() {
    const columnIndexArray = [3, 5],
      rowsArray = [
        [
          'CA',
          '566.23',
          '428.9',
          'Canada',
          1514,
          25903874
        ],
        [
          'IN',
          '1463.5',
          '557.45',
          'India',
          1508,
          49280803
        ],
        [
          'JP',
          '1827.5',
          '504',
          'Japan',
          881,
          2641441
        ],
        [
          'CN',
          '1681.14',
          '479.81',
          'China',
          553,
          1731585
        ],
        [
          'US',
          '547.14',
          '484.9',
          'United States',
          142,
          1462333
        ],
        [
          'NL',
          '1034.59',
          '381.81',
          'Netherlands',
          64,
          128597
        ],
        [
          'UA',
          '1184.78',
          '395.81',
          'Ukraine',
          37,
          90209
        ],
        [
          'RU',
          '1236.96',
          '357.63',
          'Russia',
          33,
          84352
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
          'GB',
          '1000.23',
          '389.9',
          'United Kingdom',
          6,
          0
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
          'TR',
          'N/A',
          'N/A',
          'Turkey',
          4,
          0
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
          'DE',
          '1070.23',
          '377.36',
          'Germany',
          3,
          570
        ],
        [
          'CL',
          '584.05',
          '929.09',
          'Chile',
          2,
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
          'MN',
          '1620.05',
          '418.72',
          'Mongolia',
          1,
          43
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
      ],
      orgDataset = [
        {
          'label': 'China',
          'value': 93296,
          'connection': 'malicious',
          'toolText': 'China, 93296'
        },
        {
          'label': 'Brazil',
          'value': 79960,
          'connection': 'malicious',
          'toolText': 'Brazil, 79960'
        },
        {
          'label': 'Netherlands',
          'value': 2296,
          'connection': 'malicious',
          'toolText': 'Netherlands, 2296'
        },
        {
          'label': 'United States',
          'value': 2563,
          'connection': 'malicious',
          'toolText': 'United States, 2563'
        },
        {
          'label': 'Japan',
          'value': 239,
          'connection': 'malicious',
          'toolText': 'Japan, 239'
        },
        {
          'label': 'Turkey',
          'value': 0,
          'connection': 'malicious',
          'toolText': 'Turkey, 0'
        },
        {
          'label': 'Switzerland',
          'value': 0,
          'connection': 'malicious',
          'toolText': 'Switzerland, 0'
        },
        {
          'label': 'Sweden',
          'value': 0,
          'connection': 'malicious',
          'toolText': 'Sweden, 0'
        }
      ],
      displayTopFive = true,
      connection = 'secure',
      dataArray = {
        'dataset': [
          {
            'label': 'Canada',
            'value': 25903874,
            'connection': 'secure',
            'toolText': 'Canada, 25903874'
          },
          {
            'label': 'India',
            'value': 49280803,
            'connection': 'secure',
            'toolText': 'India, 49280803'
          },
          {
            'label': 'Ukraine',
            'value': 90209,
            'connection': 'secure',
            'toolText': 'Ukraine, 90209'
          },
          {
            'label': 'Russia',
            'value': 84352,
            'connection': 'secure',
            'toolText': 'Russia, 84352'
          },
          {
            'label': 'France',
            'value': 39407,
            'connection': 'secure',
            'toolText': 'France, 39407'
          },
          {
            'label': 'United Kingdom',
            'value': 0,
            'connection': 'secure',
            'toolText': 'United Kingdom, 0'
          },
          {
            'label': 'Kyrgyzstan',
            'value': 6320,
            'connection': 'secure',
            'toolText': 'Kyrgyzstan, 6320'
          },
          {
            'label': 'Vietnam',
            'value': 3916,
            'connection': 'secure',
            'toolText': 'Vietnam, 3916'
          },
          {
            'label': 'Germany',
            'value': 570,
            'connection': 'secure',
            'toolText': 'Germany, 570'
          },
          {
            'label': 'Chile',
            'value': 0,
            'connection': 'secure',
            'toolText': 'Chile, 0'
          },
          {
            'label': 'Indonesia',
            'value': 3078,
            'connection': 'secure',
            'toolText': 'Indonesia, 3078'
          },
          {
            'label': 'Czech Republic',
            'value': 188,
            'connection': 'secure',
            'toolText': 'Czech Republic, 188'
          },
          {
            'label': 'Iraq',
            'value': 188,
            'connection': 'secure',
            'toolText': 'Iraq, 188'
          },
          {
            'label': 'Latvia',
            'value': 0,
            'connection': 'secure',
            'toolText': 'Latvia, 0'
          },
          {
            'label': 'Mongolia',
            'value': 43,
            'connection': 'secure',
            'toolText': 'Mongolia, 43'
          },
          {
            'label': 'Singapore',
            'value': 0,
            'connection': 'secure',
            'toolText': 'Singapore, 0'
          },
          {
            'label': 'South Africa',
            'value': 0,
            'connection': 'secure',
            'toolText': 'South Africa, 0'
          }
        ],
        'annotationItems': [

        ],
        'secureConnectionsValues': [
          25903874,
          49280803,
          90209,
          84352,
          39407,
          6320,
          3916,
          570,
          3078,
          188,
          188,
          43
        ],
        'maliciousConnectionsValues': [

        ]
      };
    expect(
      generateDataArray(columnIndexArray, rowsArray, displayTopFive, orgDataset, connection)
    ).to.deep.equal(dataArray);
  });

  it('generateDataSource should return chart datasource object.', function() {
    const rawData = {
        'taf_connections_by_protocol': {
          'total': -1,
          'next': -1,
          'columns': [
            {
              'name': 'protocol.service',
              'displayName': 'protocol',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'date',
              'displayName': 'connections using this protocol',
              'columnType': 'MEASURE',
              'dataType': 'NUMBER',
              'sortable': true
            }
          ],
          'rows': [
            [
              'http',
              8537
            ],
            [
              'Elasticsearch',
              2843
            ],
            [
              'Kafka or H2 (DBMS) Database Server',
              494
            ],
            [
              'Hadoop NameNode or 360Works SuperContainer ',
              433
            ],
            [
              'ssl',
              198
            ],
            [
              'dns',
              118
            ],
            [
              'ssh',
              45
            ],
            [
              'Network Time Protocol (NTP)',
              36
            ],
            [
              'dhcp',
              15
            ],
            [
              'Syslog or Remote Shell, used to execute non-interactive commands on a remote system (Remote Shell, rsh, remsh)',
              14
            ]
          ]
        }
      },
      chartOptions = {'showValues': '0', 'showLabels': '1', 'singleLineCharacters': '27'},
      chartData = {
        'showTrendLines': false,
        'fieldMapping': [
          {
            'reportId': 'taf_connections_by_protocol',
            'columns': [
              'protocol.service',
              'date'
            ]
          }
        ],
        'multipleReportIds': false
      },
      dataSourceObject = {
        'chart': {
          'paletteColors': '#2bd8d0,#3ad7c9,#46d6c4,#57d5bd,#67d3b6,#79d2ae,#8ad1a7,#9acfa0,#a8ce9a,#b2cd96',
          'bgColor': '#ffffff',
          'showBorder': '0',
          'showCanvasBorder': '0',
          'usePlotGradientColor': '0',
          'placeValuesInside': '1',
          'valueFontColor': '#444c63',
          'showAxisLines': '1',
          'axisLineAlpha': '15',
          'alignCaptionWithCanvas': '0',
          'showAlternateVGridColor': '0',
          'captionFontSize': '14',
          'subcaptionFontSize': '14',
          'subcaptionFontBold': '0',
          'showLabels': '1',
          'divLineAlpha': '50',
          'divLineColor': '#e5e5ea',
          'divLineThickness': '1',
          'plotBorderAlpha': '0',
          'chartRightMargin': '150',
          'animation': '0',
          'toolTipColor': '#ffffff',
          'toolTipBorderThickness': '0',
          'toolTipBgColor': '#000000',
          'toolTipBgAlpha': '80',
          'toolTipBorderRadius': '2',
          'toolTipPadding': '5',
          'showYAxisValues': '0',
          'showValues': '0',
          'xAxisNameFontSize': '14',
          'yAxisNameFontSize': '14',
          'labelFontSize': '11',
          'chartLeftMargin': '0',
          'numDivLines': '4',
          'baseFont': 'Open Sans, sans-serif',
          'baseFontColor': '#6b7282',
          'singleLineCharacters': '27'
        },
        'annotations': {
          'groups': [
            {
              'items': [
                {
                  'id': 'datasetlabel0',
                  'type': 'text',
                  'text': '8.54k ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.0.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel1',
                  'type': 'text',
                  'text': '2.84k ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.1.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel2',
                  'type': 'text',
                  'text': '494 ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.2.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel3',
                  'type': 'text',
                  'text': '433 ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.3.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel4',
                  'type': 'text',
                  'text': '198 ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.4.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel5',
                  'type': 'text',
                  'text': '118 ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.5.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel6',
                  'type': 'text',
                  'text': '45 ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.6.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel7',
                  'type': 'text',
                  'text': '36 ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.7.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel8',
                  'type': 'text',
                  'text': '15 ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.8.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                },
                {
                  'id': 'datasetlabel9',
                  'type': 'text',
                  'text': '14 ',
                  'align': 'left',
                  'x': '$chartEndX - 146',
                  'y': '$dataset.0.set.9.CenterY',
                  'fontSize': '11',
                  'color': '#6b7282',
                  'font': 'Open Sans, sans-serif'
                }
              ]
            }
          ]
        },
        'data': [
          {
            'label': 'http',
            'value': 8537,
            'connection': '',
            'toolText': 'http, 8537'
          },
          {
            'label': 'Elasticsearch',
            'value': 2843,
            'connection': '',
            'toolText': 'Elasticsearch, 2843'
          },
          {
            'label': 'Kafka or H2 (DBMS) Database{br} Server',
            'value': 494,
            'connection': '',
            'toolText': 'Kafka or H2 (DBMS) Database Server, 494'
          },
          {
            'label': 'Hadoop NameNode or 360Works{br} SuperContainer ',
            'value': 433,
            'connection': '',
            'toolText': 'Hadoop NameNode or 360Works SuperContainer , 433'
          },
          {
            'label': 'ssl',
            'value': 198,
            'connection': '',
            'toolText': 'ssl, 198'
          },
          {
            'label': 'dns',
            'value': 118,
            'connection': '',
            'toolText': 'dns, 118'
          },
          {
            'label': 'ssh',
            'value': 45,
            'connection': '',
            'toolText': 'ssh, 45'
          },
          {
            'label': 'Network Time Protocol (NTP)',
            'value': 36,
            'connection': '',
            'toolText': 'Network Time Protocol (NTP), 36'
          },
          {
            'label': 'dhcp',
            'value': 15,
            'connection': '',
            'toolText': 'dhcp, 15'
          },
          {
            'label': 'Syslog or Remote Shell, use{br}d to execute non-interactiv{br}e commands on a remote syst{br}em (Remote Shell, rsh, rems{br}h)',
            'value': 14,
            'connection': '',
            'toolText': 'Syslog or Remote Shell, used to execute non-interactive commands on a remote system (Remote Shell, rsh, remsh), 14'
          }
        ]
      };
    expect(generateDataSource(rawData, chartOptions, chartData)).to.deep.equal(dataSourceObject);
  });
});
