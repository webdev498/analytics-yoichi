import {
  generateChartDataSource
} from 'components/ParetoChart';

describe('ParetoChart Component: ', function() {
  it('generateChartDataSource should return chart data source object.', function() {
    const rawData = {
        'total': -1,
        'next': -1,
        'columns': [
          {
            'name': 'data.rank_alert.category',
            'displayName': 'Category',
            'columnType': 'DIMENSION',
            'dataType': 'TEXT',
            'sortable': true
          },
          {
            'name': 'date',
            'displayName': 'count of alerts',
            'columnType': 'MEASURE',
            'dataType': 'NUMBER',
            'sortable': true
          }
        ],
        'rows': [
          [
            'suspicious-login',
            11
          ],
          [
            'bad-reputation-traffic',
            6
          ],
          [
            'potential-apt',
            2
          ],
          [
            'non-standard-server',
            1
          ]
        ]
      },
      chartOptions = {
        'xAxisname': 'ALERT TYPES',
        'baseFontColor': '#6B7282',
        'pYAxisname': 'ALERT COUNT',
        'baseFont': 'Open Sans, sans-serif'
      },
      fieldMapping = [
        {
          'reportId': 'taf_threat_trend',
          'columns': [
            'data.rank_alert.category'
          ],
          'axis': 'x'
        },
        {
          'reportId': 'taf_threat_trend',
          'columns': [
            'date'
          ],
          'axis': 'y'
        }
      ],
      dataSourceObject = {
        'chart': {
          'labelFontSize': '11',
          'showAxisLines': '1',
          'showLabels': '1',
          'showPercentInTooltip': '1',
          'showValues': '1',
          'showYAxisValues': '1',
          'theme': 'zune',
          'xAxisNameFontSize': '13',
          'yAxisNameFontSize': '13',
          'xAxisNamePadding': '20',
          'yAxisNamePadding': '20',
          'lineColor': '#F69275',
          'showXAxisLine': '0',
          'showYAxisLine': '0',
          'divLineIsDashed': '0',
          'showsYAxisLine': '0',
          'divLineAlpha': '20',
          'chartLeftMargin': '0',
          'chartRightMargin': '0',
          'chartBottomMargin': '0',
          'numDivLines': '6',
          'baseFont': 'Open Sans, sans-serif',
          'baseFontColor': '#6B7282',
          'paletteColors': '#2bd8d0,#51DFD8,#71E5DF,#97ECE8,#BAF2F0,#DBF8F7',
          'xAxisname': 'ALERT TYPES',
          'pYAxisname': 'ALERT COUNT'
        },
        'data': [
          {
            'label': 'suspicious-login',
            'value': 11,
            'color': '2BD8D0'
          },
          {
            'label': 'bad-reputation-traffic',
            'value': 6,
            'color': '6CD3B4'
          },
          {
            'label': 'potential-apt',
            'value': 2,
            'color': 'B6CD94'
          },
          {
            'label': 'non-standard-server',
            'value': 1,
            'color': 'FCC875'
          }
        ]
      };
    expect(generateChartDataSource(rawData, chartOptions, fieldMapping)).to.deep.equal(dataSourceObject);
  });
});
