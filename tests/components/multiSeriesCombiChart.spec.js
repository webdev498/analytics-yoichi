import React from 'react';
import TestUtils from 'react-addons-test-utils';
import MultiSeriesCombiChart, {
  getXindex,
  getYindex,
  generateCategoryArray,
  generateDataAndSeriesArrayForDynamicSeriesNames,
  generateChartDataSetForDynamicSeries,
  generateChartDataSetForFixedSeries,
  generateDataArray
} from 'components/MultiSeriesCombiChart';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<MultiSeriesCombiChart {...props} />);
}

describe('MultiSeriesCombiChart Component: ', function() {
  it('Should render as <div>', function() {
    const props = {
      'attributes': {'id': 'AlertPriorityChart'},
      'meta': {
        'title': 'Alert priority'
      },
      'data': null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
  });

  it('getXindex should return x index.', function() {
    const chartDataColumn = 'date',
      columns = [
        {
          'name': 'date',
          'displayName': 'date',
          'columnType': 'DIMENSION',
          'dataType': 'DATE',
          'sortable': true
        },
        {
          'name': 'data.rank_alert.score',
          'displayName': 'data.rank_alert.score',
          'columnType': 'DIMENSION',
          'dataType': 'TEXT',
          'sortable': true,
          'ranges': [
            {
              'alias': 'low',
              'min': 1,
              'max': 35
            },
            {
              'alias': 'medium',
              'min': 35,
              'max': 65
            },
            {
              'alias': 'high',
              'min': 65
            }
          ]
        },
        {
          'name': 'count',
          'displayName': 'count',
          'columnType': 'MEASURE',
          'dataType': 'NUMBER',
          'sortable': true
        }
      ],
      x = 0;
    expect(getXindex(chartDataColumn, columns)).to.deep.equal(x);
  });

  it('getYindex should return y index.', function() {
    const chartData = {
        'reportId': 'taf_alert_priority_time',
        'columns': [
          'data.rank_alert.score',
          'count'
        ],
        'seriesOptions': {
          'drawanchors': '1',
          'lineThickness': '0',
          'anchorradius': '5',
          'renderas': 'Line',
          'anchorbgcolor': [
            '#90d0a4',
            '#fcc875',
            '#f69275'
          ],
          'anchorBorderColor': [
            '#90d0a4',
            '#fcc875',
            '#f69275'
          ],
          'anchorsides': [
            '0',
            '0',
            '0'
          ]
        },
        'axis': 'y'
      },
      columns = [
        {
          'name': 'date',
          'displayName': 'date',
          'columnType': 'DIMENSION',
          'dataType': 'DATE',
          'sortable': true
        },
        {
          'name': 'data.rank_alert.score',
          'displayName': 'data.rank_alert.score',
          'columnType': 'DIMENSION',
          'dataType': 'TEXT',
          'sortable': true,
          'ranges': [
            {
              'alias': 'low',
              'min': 1,
              'max': 35
            },
            {
              'alias': 'medium',
              'min': 35,
              'max': 65
            },
            {
              'alias': 'high',
              'min': 65
            }
          ]
        },
        {
          'name': 'count',
          'displayName': 'count',
          'columnType': 'MEASURE',
          'dataType': 'NUMBER',
          'sortable': true
        }
      ],
      combinedResult = false,
      y = {'y': 2, 'y2': '', 'seriesIndex': 1};
    expect(getYindex(chartData, columns, combinedResult)).to.deep.equal(y);
  });

  it('generateCategoryArray should return category array.', function() {
    const rows = [
      [
        '2016-07-20T06:50:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T06:50:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T06:50:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T06:55:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T06:55:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T06:55:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:00:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:00:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:00:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:05:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:05:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:05:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:10:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:10:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:10:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:15:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:15:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:15:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:20:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:20:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:20:00.000',
        'high',
        1
      ],
      [
        '2016-07-20T07:25:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:25:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:25:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:30:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:30:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:30:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:35:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:35:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:35:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:40:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:40:00.000',
        'medium',
        0
      ],
      [
        '2016-07-20T07:40:00.000',
        'high',
        0
      ],
      [
        '2016-07-20T07:45:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:45:00.000',
        'medium',
        2
      ],
      [
        '2016-07-20T07:45:00.000',
        'high',
        3
      ],
      [
        '2016-07-20T07:50:00.000',
        'low',
        0
      ],
      [
        '2016-07-20T07:50:00.000',
        'medium',
        2
      ],
      [
        '2016-07-20T07:50:00.000',
        'high',
        0
      ]],
      index = 0,
      dateDisplayFormat = 'HH:mm',
      category = [
        {
          'label': '12:20',
          'toolText': '20 Jul 2016 12:20'
        },
        {
          'label': '12:25',
          'toolText': '20 Jul 2016 12:25'
        },
        {
          'label': '12:30',
          'toolText': '20 Jul 2016 12:30'
        },
        {
          'label': '12:35',
          'toolText': '20 Jul 2016 12:35'
        },
        {
          'label': '12:40',
          'toolText': '20 Jul 2016 12:40'
        },
        {
          'label': '12:45',
          'toolText': '20 Jul 2016 12:45'
        },
        {
          'label': '12:50',
          'toolText': '20 Jul 2016 12:50'
        },
        {
          'label': '12:55',
          'toolText': '20 Jul 2016 12:55'
        },
        {
          'label': '13:00',
          'toolText': '20 Jul 2016 13:00'
        },
        {
          'label': '13:05',
          'toolText': '20 Jul 2016 13:05'
        },
        {
          'label': '13:10',
          'toolText': '20 Jul 2016 13:10'
        },
        {
          'label': '13:15',
          'toolText': '20 Jul 2016 13:15'
        },
        {
          'label': '13:20',
          'toolText': '20 Jul 2016 13:20'
        }
      ];
    expect(generateCategoryArray(rows, index, dateDisplayFormat)).to.deep.equal(category);
  });

  it('generateDataAndSeriesArrayForDynamicSeriesNames should return data and series array for dynamic series names.',
    function() {
      const rows = [
        [
          '2016-07-20T07: 00: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07: 00: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07: 00: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07: 05: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07: 05: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07: 05: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07: 10: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07: 10: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07: 10: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07: 15: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07: 15: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07: 15: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07:20: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07:20: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07:20: 00.000',
          'high',
          1
        ],
        [
          '2016-07-20T07:25: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07:25: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07:25: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07:30: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07:30: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07:30: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07:35: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07:35: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07:35: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07:40: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07:40: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07:40: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07:45: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07:45: 00.000',
          'medium',
          1
        ],
        [
          '2016-07-20T07:45: 00.000',
          'high',
          2
        ],
        [
          '2016-07-20T07:50: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07:50: 00.000',
          'medium',
          1
        ],
        [
          '2016-07-20T07:50: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T07:55: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T07:55: 00.000',
          'medium',
          0
        ],
        [
          '2016-07-20T07:55: 00.000',
          'high',
          0
        ],
        [
          '2016-07-20T08: 00: 00.000',
          'low',
          0
        ],
        [
          '2016-07-20T08: 00: 00.000',
          'medium',
          3
        ],
        [
          '2016-07-20T08: 00: 00.000',
          'high',
          1
        ]
        ],
        x = 0,
        y = 2,
        seriesIndex = 1,
        resultArray = {
          'newRawData': [
            [
              '2016-07-20T07: 00: 00.000',
              [
                0,
                0,
                0
              ]
            ],
            [
              '2016-07-20T07: 05: 00.000',
              [
                0,
                0,
                0
              ]
            ],
            [
              '2016-07-20T07: 10: 00.000',
              [
                0,
                0,
                0
              ]
            ],
            [
              '2016-07-20T07: 15: 00.000',
              [
                0,
                0,
                0
              ]
            ],
            [
              '2016-07-20T07:20: 00.000',
              [
                0,
                0,
                1
              ]
            ],
            [
              '2016-07-20T07:25: 00.000',
              [
                0,
                0,
                0
              ]
            ],
            [
              '2016-07-20T07:30: 00.000',
              [
                0,
                0,
                0
              ]
            ],
            [
              '2016-07-20T07:35: 00.000',
              [
                0,
                0,
                0
              ]
            ],
            [
              '2016-07-20T07:40: 00.000',
              [
                0,
                0,
                0
              ]
            ],
            [
              '2016-07-20T07:45: 00.000',
              [
                0,
                1,
                2
              ]
            ],
            [
              '2016-07-20T07:50: 00.000',
              [
                0,
                1,
                0
              ]
            ],
            [
              '2016-07-20T07:55: 00.000',
              [
                0,
                0,
                0
              ]
            ]
          ],
          'seriesNameArray': [
            {
              'seriesname': 'low'
            },
            {
              'seriesname': 'medium'
            },
            {
              'seriesname': 'high'
            }
          ]
        };
      expect(generateDataAndSeriesArrayForDynamicSeriesNames(rows, x, y, seriesIndex)).to.deep.equal(resultArray);
    }
  );

  it('generateChartDataSetForDynamicSeries should return chart data source for dynamic series.', function() {
    const chartData = {
        'reportId': 'taf_alert_priority_time',
        'columns': [
          'data.rank_alert.score',
          'count'
        ],
        'seriesOptions': {
          'drawanchors': '1',
          'lineThickness': '0',
          'anchorradius': '5',
          'renderas': 'Line',
          'anchorbgcolor': [
            '#90d0a4',
            '#fcc875',
            '#f69275'
          ],
          'anchorBorderColor': [
            '#90d0a4',
            '#fcc875',
            '#f69275'
          ],
          'anchorsides': [
            '0',
            '0',
            '0'
          ]
        },
        'axis': 'y'
      },
      seriesNameArray = [
        {
          'seriesname': 'low'
        },
        {
          'seriesname': 'medium'
        },
        {
          'seriesname': 'high'
        }
      ],
      newRawData = [
        [
          '2016-07-20T07: 05: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T07: 10: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T07: 15: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T07:20: 00.000',
          [
            0,
            0,
            1
          ]
        ],
        [
          '2016-07-20T07:25: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T07:30: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T07:35: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T07:40: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T07:45: 00.000',
          [
            0,
            1,
            2
          ]
        ],
        [
          '2016-07-20T07:50: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T07:55: 00.000',
          [
            0,
            0,
            0
          ]
        ],
        [
          '2016-07-20T08: 00: 00.000',
          [
            0,
            4,
            1
          ]
        ]
      ],
      dataset = [
        {
          'seriesname': 'low',
          'data': [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {}
          ],
          'drawanchors': '1',
          'lineThickness': '0',
          'anchorradius': '5',
          'renderas': 'Line',
          'anchorbgcolor': '#90d0a4',
          'anchorBorderColor': '#90d0a4',
          'anchorsides': '0'
        },
        {
          'seriesname': 'medium',
          'data': [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {
              'value': 1
            },
            {},
            {},
            {
              'value': 4
            }
          ],
          'drawanchors': '1',
          'lineThickness': '0',
          'anchorradius': '5',
          'renderas': 'Line',
          'anchorbgcolor': '#fcc875',
          'anchorBorderColor': '#fcc875',
          'anchorsides': '0'
        },
        {
          'seriesname': 'high',
          'data': [
            {},
            {},
            {},
            {
              'value': 1
            },
            {},
            {},
            {},
            {},
            {
              'value': 2
            },
            {},
            {},
            {
              'value': 1
            }
          ],
          'drawanchors': '1',
          'lineThickness': '0',
          'anchorradius': '5',
          'renderas': 'Line',
          'anchorbgcolor': '#f69275',
          'anchorBorderColor': '#f69275',
          'anchorsides': '0'
        }
      ];
    expect(generateChartDataSetForDynamicSeries(chartData, seriesNameArray, newRawData)).to.deep.equal(dataset);
  });

  it('generateChartDataSetForFixedSeries should return chart data set for fixed series.', function() {
    const dataset = [
        {
          'seriesname': 'Historical Incoming Bandwidth',
          'renderas': 'Area',
          'data': [
            {
              'value': 0
            },
            {
              'value': 0
            }
          ]
        }
      ],
      chartData = {
        'axis': 'y',
        'seriesname': 'Current Incoming Bandwidth',
        'renderas': 'Line',
        'reportId': 'taf_stats_histogram',
        'columns': [
          'bytes_in[0]'
        ]
      },
      rows = [
        [
          '2016-07-22T10: 00: 00.000',
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ]
        ],
        [
          '2016-07-22T11: 00: 00.000',
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ]
        ]
      ],
      y = 2,
      y2 = '0',
      resultDataset = [
        {
          'seriesname': 'Historical Incoming Bandwidth',
          'renderas': 'Area',
          'data': [
            {
              'value': 0
            },
            {
              'value': 0
            }
          ]
        },
        {
          'seriesname': 'Current Incoming Bandwidth',
          'renderas': 'Line',
          'data': [
            {
              'value': 0
            },
            {
              'value': 0
            }
          ]
        }
      ];
    expect(generateChartDataSetForFixedSeries(dataset, chartData, rows, y, y2)).to.deep.equal(resultDataset);
  });

  it('generateDataArray should return data array.', function() {
    const tempObj = {'seriesname': 'Current Incoming Bandwidth', 'renderas': 'Line', 'data': []},
      y = 2,
      rows = [
        [
          '2016-07-21T11: 00: 00.000',
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ]
        ],
        [
          '2016-07-21T12: 00: 00.000',
          [
            14433,
            9927.432913397099
          ],
          [
            1580367491,
            1616463783.9151192
          ],
          [
            1577870664,
            1455285744.9127922
          ],
          [
            3158238155,
            3071748192.4738755
          ]
        ],
        [
          '2016-07-21T13: 00: 00.000',
          [
            13210,
            49019.27401458192
          ],
          [
            1612582378,
            4827838693.985234
          ],
          [
            1602585779,
            4820411712.407314
          ],
          [
            3215168157,
            9648249382.823082
          ]
        ],
        [
          '2016-07-21T14: 00: 00.000',
          [
            12982,
            7371.589606952719
          ],
          [
            1563825728,
            1362989720.4266224
          ],
          [
            1563846268,
            1366091155.555746
          ],
          [
            3127671996,
            2729080197.29199
          ]
        ],
        [
          '2016-07-21T15: 00: 00.000',
          [
            13158,
            9346.019099060306
          ],
          [
            1593886500,
            2291175293.516416
          ],
          [
            1596535763,
            2292372627.558908
          ],
          [
            3190422263,
            4583547831.500264
          ]
        ],
        [
          '2016-07-21T16: 00: 00.000',
          [
            13125,
            7236.745147739648
          ],
          [
            1570575730,
            63107012356.49661
          ],
          [
            1570104719,
            62909923711.98963
          ],
          [
            3140680449,
            126016935881.1738
          ]
        ],
        [
          '2016-07-21T17: 00: 00.000',
          [
            12979,
            30627.940287423833
          ],
          [
            1563051575,
            23571023391.43375
          ],
          [
            1563098303,
            23528820876.76516
          ],
          [
            3126149878,
            47099839440.217896
          ]
        ],
        [
          '2016-07-21T18: 00: 00.000',
          [
            13107,
            5756.564774238191
          ],
          [
            1592181368,
            2631512074.8017607
          ],
          [
            1592242473,
            2631909818.9339547
          ],
          [
            3184423841,
            5263421372.684339
          ]
        ],
        [
          '2016-07-21T19: 00: 00.000',
          [
            13102,
            2571.487312821123
          ],
          [
            1590767769,
            4242815306.206511
          ],
          [
            1590861822,
            4102999798.1361337
          ],
          [
            3181629591,
            8345405083.324855
          ]
        ],
        [
          '2016-07-21T20: 00: 00.000',
          [
            13024,
            23777.559021060173
          ],
          [
            1571039320,
            24178136796.636314
          ],
          [
            1571077098,
            24142745284.754066
          ],
          [
            3142116418,
            48320881971.502754
          ]
        ],
        [
          '2016-07-21T21: 00: 00.000',
          [
            13091,
            5530.9802250595685
          ],
          [
            1593008402,
            13658897123.861881
          ],
          [
            1593107416,
            13662519484.632486
          ],
          [
            3186115818,
            27321416608.046043
          ]
        ],
        [
          '2016-07-21T22: 00: 00.000',
          [
            13059,
            6527.209427976604
          ],
          [
            1595688603,
            1740345904.7086372
          ],
          [
            1595756138,
            1740435488.469164
          ],
          [
            3191444741,
            3480780867.843402
          ]
        ],
        [
          '2016-07-21T23: 00: 00.000',
          [
            12990,
            3021.330060310084
          ],
          [
            1562172800,
            2053848356.810581
          ],
          [
            1562205574,
            2054112700.4959865
          ],
          [
            3124378374,
            4107961056.94302
          ]
        ],
        [
          '2016-07-22T00: 00: 00.000',
          [
            13098,
            2983.144467951002
          ],
          [
            1561949149,
            2156201871.103133
          ],
          [
            1561995725,
            2156188258.3979306
          ],
          [
            3123944874,
            4312390129.489532
          ]
        ],
        [
          '2016-07-22T01: 00: 00.000',
          [
            13319,
            2985.9694684753
          ],
          [
            1571046030,
            2104545354.2633889
          ],
          [
            1571278687,
            2104492021.6336231
          ],
          [
            3142324717,
            4209037375.273534
          ]
        ],
        [
          '2016-07-22T02: 00: 00.000',
          [
            13493,
            2682.086796383244
          ],
          [
            1567174876,
            2123425727.1516168
          ],
          [
            1567314184,
            2123342575.8111777
          ],
          [
            3134489060,
            4246768297.113006
          ]
        ],
        [
          '2016-07-22T03: 00: 00.000',
          [
            13684,
            2901.181296759419
          ],
          [
            1602427047,
            2040677057.6185052
          ],
          [
            1602636593,
            2040371607.2392843
          ],
          [
            3205063640,
            4081048558.5754504
          ]
        ],
        [
          '2016-07-22T04: 00: 00.000',
          [
            13641,
            2983.5669228849774
          ],
          [
            1600255154,
            2067057408.1742425
          ],
          [
            1600386898,
            2067537671.5529692
          ],
          [
            3200642052,
            4134595079.155621
          ]
        ],
        [
          '2016-07-22T05: 00: 00.000',
          [
            13377,
            3297.290137370383
          ],
          [
            1573336119,
            2187960820.7165923
          ],
          [
            1574240499,
            2188417820.7079663
          ],
          [
            3147576618,
            4376378626.942701
          ]
        ],
        [
          '2016-07-22T06: 00: 00.000',
          [
            13325,
            3145.1526062604125
          ],
          [
            1600377592,
            2110671626.6521616
          ],
          [
            1594788418,
            2110803344.7221541
          ],
          [
            3195166010,
            4221474891.363896
          ]
        ],
        [
          '2016-07-22T07: 00: 00.000',
          [
            13163,
            3092.391455923177
          ],
          [
            1593343342,
            2065546331.858907
          ],
          [
            1594202339,
            2065485295.5291238
          ],
          [
            3187545681,
            4131031615.2305117
          ]
        ],
        [
          '2016-07-22T08: 00: 00.000',
          [
            13321,
            3128.3261765146335
          ],
          [
            1589610081,
            9665271482.04586
          ],
          [
            1589667898,
            9666940340.849155
          ],
          [
            3179277979,
            19332211818.6887
          ]
        ],
        [
          '2016-07-22T09: 00: 00.000',
          [
            13119,
            3355.4770525217423
          ],
          [
            1566003016,
            2186638283.7797747
          ],
          [
            1565984101,
            2188597867.6344767
          ],
          [
            3131987117,
            4375236119.040842
          ]
        ],
        [
          '2016-07-22T10: 00: 00.000',
          [
            13155,
            1954.4386235779657
          ],
          [
            1563326679,
            1011454332.988424
          ],
          [
            1563747216,
            1012101139.1530279
          ],
          [
            3127073895,
            2023555359.7916002
          ]
        ],
        [
          '2016-07-22T11: 00: 00.000',
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ],
          [
            'NaN',
            'NaN'
          ]
        ]
      ],
      y2 = 0,
      tempObjData = [
        {
          'value': 0
        },
        {
          'value': 1580367491
        },
        {
          'value': 1612582378
        },
        {
          'value': 1563825728
        },
        {
          'value': 1593886500
        },
        {
          'value': 1570575730
        },
        {
          'value': 1563051575
        },
        {
          'value': 1592181368
        },
        {
          'value': 1590767769
        },
        {
          'value': 1571039320
        },
        {
          'value': 1593008402
        },
        {
          'value': 1595688603
        },
        {
          'value': 1562172800
        },
        {
          'value': 1561949149
        },
        {
          'value': 1571046030
        },
        {
          'value': 1567174876
        },
        {
          'value': 1602427047
        },
        {
          'value': 1600255154
        },
        {
          'value': 1573336119
        },
        {
          'value': 1600377592
        },
        {
          'value': 1593343342
        },
        {
          'value': 1589610081
        },
        {
          'value': 1566003016
        },
        {
          'value': 1563326679
        },
        {
          'value': 0
        }
      ];
    expect(generateDataArray(tempObj, y, rows, y2, 'fixed')).to.deep.equal(tempObjData);
  });
});
