import {
  generateChartDataSource
} from 'components/Area2DAsSparkLineChart';

describe('Area2DAsSparkLineChart Component: ', function() {
  it('generateChartDataSource should return data source object which is required for FusionCharts.', function() {
    const inputArray = {
        'columnType': 'chart',
        'columnName': 'CONNECTIONS',
        'columnStyle': {
          'width': '30%'
        },
        'chartValue': {
          '2016-07-19T18:00:00.000': [
            0
          ],
          '2016-07-20T01:00:00.000': [
            0
          ],
          '2016-07-20T00:00:00.000': [
            0
          ],
          '2016-07-19T10:00:00.000': [
            0
          ],
          '2016-07-19T17:00:00.000': [
            0
          ],
          '2016-07-19T12:00:00.000': [
            136
          ],
          '2016-07-19T19:00:00.000': [
            0
          ],
          '2016-07-20T02:00:00.000': [
            0
          ],
          '2016-07-19T11:00:00.000': [
            0
          ],
          '2016-07-19T07:00:00.000': [
            0
          ],
          '2016-07-19T14:00:00.000': [
            0
          ],
          '2016-07-19T21:00:00.000': [
            0
          ],
          '2016-07-20T04:00:00.000': [
            0
          ],
          '2016-07-19T20:00:00.000': [
            0
          ],
          '2016-07-20T03:00:00.000': [
            0
          ],
          '2016-07-19T06:00:00.000': [
            0
          ],
          '2016-07-19T13:00:00.000': [
            0
          ],
          '2016-07-19T09:00:00.000': [
            0
          ],
          '2016-07-19T16:00:00.000': [
            0
          ],
          '2016-07-19T23:00:00.000': [
            0
          ],
          '2016-07-20T06:00:00.000': [
            0
          ],
          '2016-07-19T22:00:00.000': [
            0
          ],
          '2016-07-20T05:00:00.000': [
            0
          ],
          '2016-07-19T08:00:00.000': [
            0
          ],
          '2016-07-19T15:00:00.000': [
            0
          ]
        },
        'chartId': 'connection0',
        'chartType': 'area2d',
        'chartWidth': '100%',
        'chartHeight': '75'
      },
      duration = '1h',
      dataSourceObject = {
        'chart': {
          'paletteColors': '#BFEFEE',
          'showBorder': '0',
          'showCanvasBorder': '0',
          'usePlotGradientColor': '0',
          'showXAxisLine': '1',
          'axisLineAlpha': '25',
          'divLineAlpha': '0',
          'showValues': '0',
          'showYAxisValues': '0',
          'showAlternateHGridColor': '0',
          'showPlotBorder': '1',
          'plotBorderColor': '#59DED9',
          'plotBorderThickness': '1',
          'anchorradius': '0',
          'bgAlpha': '0',
          'canvasBgAlpha': '0',
          'chartTopMargin': '0',
          'chartBottomMargin': '0',
          'chartLeftMargin': '0',
          'chartRightMargin': '0',
          'minimizetendency': '1'
        },
        'dataset': [
          {
            'data': [
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': 136
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              },
              {
                'label': '',
                'value': '0'
              }
            ]
          }
        ]
      };
    expect(generateChartDataSource(inputArray, duration)).to.deep.equal(dataSourceObject);
  });
});
