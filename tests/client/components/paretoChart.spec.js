import React from 'react';
import TestUtils from 'react-addons-test-utils';

import ParetoChart, { generateDataSource }
from 'components/charts/ParetoChart';

const rawData = {
    'total': -1,
    'next': -1,
    'columns': [
      {
        'name': 'data.rank_alert.category', 'displayName': 'Category',
        'columnType': 'DIMENSION', 'dataType': 'TEXT', 'sortable': true
      },
      {
        'name': 'date', 'displayName': 'count of alerts', 'columnType': 'MEASURE',
        'dataType': 'NUMBER', 'sortable': true
      }
    ],
    'rows': [
      ['suspicious-login', 7],
      ['bad-reputation-traffic', 2],
      ['potential-apt', 2],
      ['non-standard-server', 1]
    ]
  },
  fieldMapping = [
    {'axis': 'x', 'reportId': 'taf_threat_trend', 'columns': ['data.rank_alert.category']},
    {'axis': 'y', 'reportId': 'taf_threat_trend', 'columns': ['date']}
  ];

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<ParetoChart {...props} />);
}

describe('ParetoChart Component:', function() {
  it('Should render as <div>', function() {
    const props = {
      attributes: {id: 'pareto-chart'},
      data: null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
    expect(component.props.id).to.equal(props.attributes.id);
  });

  // it('generateDataSource should return chart data source object.', function() {
  //   const chartOptions = {'pYAxisname': 'ALERT COUNT', 'xAxisname': 'ALERT TYPES'},
  //     dataSourceObject = {
  //       'chart': {
  //         'labelFontSize': '11', 'showAxisLines': '1', 'showLabels': '1', 'showPercentInTooltip': '1',
  //         'showValues': '1', 'showYAxisValues': '1', 'theme': 'zune', 'xAxisNameFontSize': '13',
  //         'yAxisNameFontSize': '13', 'xAxisNamePadding': '20', 'yAxisNamePadding': '20', 'lineColor': '#F69275',
  //         'showXAxisLine': '0', 'showYAxisLine': '0', 'divLineIsDashed': '0', 'showsYAxisLine': '0',
  //         'divLineAlpha': '20', 'chartLeftMargin': '0', 'chartRightMargin': '0', 'chartBottomMargin': '0',
  //         'numDivLines': '6', 'baseFont': 'Open Sans, sans-serif', 'baseFontColor': '#6b7282',
  //         'paletteColors': '#2bd8d0,#3ad7c9,#46d6c4,#57d5bd,#67d3b6,#79d2ae,#8ad1a7,#9acfa0,#a8ce9a,#b2cd96',
  //         'decimals': '0', 'pYAxisname': 'ALERT COUNT', 'xAxisname': 'ALERT TYPES'
  //       },
  //       'data': [
  //         {'label': 'suspicious-login', 'value': 7, 'color': '2BD8D0'},
  //         {'label': 'bad-reputation-traffic', 'value': 2, 'color': '6CD3B4'},
  //         {'label': 'potential-apt', 'value': 2, 'color': 'B6CD94'},
  //         {'label': 'non-standard-server', 'value': 1, 'color': 'FCC875'}
  //       ]
  //     };

  //   expect(generateDataSource(rawData, chartOptions, fieldMapping)).to.deep.equal(dataSourceObject);
  // });
});
