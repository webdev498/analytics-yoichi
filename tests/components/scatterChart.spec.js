import {
  generateChartDataSource
} from 'components/ScatterChart';

describe('ScatterChart Component: ', function() {
  it('generateChartDataSource should return chart data source object.', function() {
    const rawData = {
        'taf_user_agent_unique': {
          'total': -1,
          'next': -1,
          'columns': [
            {
              'name': 'data.http.__info.userAgentLen',
              'displayName': 'data.http.__info.userAgentLen',
              'columnType': 'DIMENSION',
              'dataType': 'NUMBER',
              'sortable': true
            },
            {
              'name': 'date',
              'displayName': 'date',
              'columnType': 'MEASURE',
              'dataType': 'NUMBER',
              'sortable': true
            }
          ],
          'rows': [
            [
              0,
              205453
            ],
            [
              151,
              190
            ],
            [
              30,
              158
            ],
            [
              34,
              147
            ],
            [
              158,
              136
            ],
            [
              110,
              18
            ],
            [
              41,
              3
            ],
            [
              23,
              2
            ],
            [
              111,
              2
            ],
            [
              119,
              2
            ],
            [
              7,
              1
            ],
            [
              11,
              1
            ],
            [
              14,
              1
            ],
            [
              17,
              1
            ],
            [
              21,
              1
            ],
            [
              48,
              1
            ],
            [
              71,
              1
            ]
          ]
        }
      },
      chartOptions = {
        'yAxisName': 'CONNECTION COUNT',
        'xAxisName': 'USER AGENT LENGTH'
      },
      fieldMapping = [
        {
          'seriesname': 'User Agent Length',
          'reportId': 'taf_user_agent_unique',
          'columns': [
            'data.http.__info.userAgentLen',
            'date'
          ]
        }
      ],
      dataSourceObject = {
        'chart': {
          'showvalues': '0',
          'theme': 'zune',
          'showAxisLines': '1',
          'showYAxisValues': '1',
          'labelDisplay': 'wrap',
          'rotateLabels': '0',
          'showlegend': '0',
          'bgAlpha': '0',
          'canvasBgAlpha': '0',
          'labelFontSize': '10',
          'baseFont': 'Open Sans, sans-serif',
          'baseFontColor': '#6b7282',
          'xAxisNameFontSize': '13',
          'yAxisNameFontSize': '13',
          'xAxisNamePadding': '20',
          'yAxisNamePadding': '20',
          'lineColor': '#F69275',
          'divLineIsDashed': '0',
          'showsYAxisLine': '0',
          'divLineAlpha': '20',
          'chartLeftMargin': '0',
          'chartRightMargin': '0',
          'chartBottomMargin': '0',
          'numVDivLines': '10',
          'canvasBgColor': '#EBFBFB,#ffffff',
          'canvasbgAlpha': '100',
          'canvasBgRatio': '30,70',
          'canvasBgAngle': '280',
          'yAxisName': 'CONNECTION COUNT',
          'xAxisName': 'USER AGENT LENGTH'
        },
        'dataset': [
          {
            'drawline': '0',
            'anchorsides': '0',
            'anchorradius': '4',
            'color': '#2bd8d0',
            'anchorbgcolor': '#2bd8d0',
            'anchorbordercolor': '#2bd8d0',
            'seriesname': 'User Agent Length',
            'reportId': 'taf_user_agent_unique',
            'columns': [
              'data.http.__info.userAgentLen',
              'date'
            ],
            'data': [
              {
                'x': 0,
                'y': 205453,
                'toolText': 'USER AGENT LENGTH: 0 CONNECTION COUNT: 205453'
              },
              {
                'x': 151,
                'y': 190,
                'toolText': 'USER AGENT LENGTH: 151 CONNECTION COUNT: 190'
              },
              {
                'x': 30,
                'y': 158,
                'toolText': 'USER AGENT LENGTH: 30 CONNECTION COUNT: 158'
              },
              {
                'x': 34,
                'y': 147,
                'toolText': 'USER AGENT LENGTH: 34 CONNECTION COUNT: 147'
              },
              {
                'x': 158,
                'y': 136,
                'toolText': 'USER AGENT LENGTH: 158 CONNECTION COUNT: 136'
              },
              {
                'x': 110,
                'y': 18,
                'toolText': 'USER AGENT LENGTH: 110 CONNECTION COUNT: 18'
              },
              {
                'x': 41,
                'y': 3,
                'toolText': 'USER AGENT LENGTH: 41 CONNECTION COUNT: 3'
              },
              {
                'x': 23,
                'y': 2,
                'toolText': 'USER AGENT LENGTH: 23 CONNECTION COUNT: 2'
              },
              {
                'x': 111,
                'y': 2,
                'toolText': 'USER AGENT LENGTH: 111 CONNECTION COUNT: 2'
              },
              {
                'x': 119,
                'y': 2,
                'toolText': 'USER AGENT LENGTH: 119 CONNECTION COUNT: 2'
              },
              {
                'x': 7,
                'y': 1,
                'toolText': 'USER AGENT LENGTH: 7 CONNECTION COUNT: 1'
              },
              {
                'x': 11,
                'y': 1,
                'toolText': 'USER AGENT LENGTH: 11 CONNECTION COUNT: 1'
              },
              {
                'x': 14,
                'y': 1,
                'toolText': 'USER AGENT LENGTH: 14 CONNECTION COUNT: 1'
              },
              {
                'x': 17,
                'y': 1,
                'toolText': 'USER AGENT LENGTH: 17 CONNECTION COUNT: 1'
              },
              {
                'x': 21,
                'y': 1,
                'toolText': 'USER AGENT LENGTH: 21 CONNECTION COUNT: 1'
              },
              {
                'x': 48,
                'y': 1,
                'toolText': 'USER AGENT LENGTH: 48 CONNECTION COUNT: 1'
              },
              {
                'x': 71,
                'y': 1,
                'toolText': 'USER AGENT LENGTH: 71 CONNECTION COUNT: 1'
              }
            ]
          }
        ]
      };
    expect(generateChartDataSource(rawData, chartOptions, fieldMapping)).to.deep.equal(dataSourceObject);
  });
});
