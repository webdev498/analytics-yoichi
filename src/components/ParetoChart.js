import React, {PropTypes} from 'react';
import {
  getIndexFromColumnName,
  isUndefined
} from 'utils/utils';
import {
  generateQueryParams,
  generateClickThroughUrl,
  generatePathParams
} from 'utils/kibanaUtils';
import {CHART_COLORS} from 'Constants';

function generateChartDataSource(data, props) {
  const {chartOptions, chartData} = props,
    fieldMapping = chartData.fieldMapping,
    graphBars = [],
    chartColors = CHART_COLORS;

  let colorIndex = 0,
    numberOfColors = chartColors.length,
    x, y;

  const {rows, columns} = data;

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i];

    // Check for x-axis chart data
    if (currentChartData.axis === 'x') {
      // Calculate column index from API response
      x = getIndexFromColumnName(currentChartData.columns, columns);
    }

    // Check for y-axis chart data
    if (currentChartData.axis === 'y') {
      // Calculate column index from API response
      y = getIndexFromColumnName(currentChartData.columns, columns);
    }
  }

  for (let i = 0; i < rows.length; i++) {
    const xValue = rows[i][x],
      yValue = rows[i][y],
      barObject = {
        label: xValue || 'Other',
        value: yValue,
        color: chartColors[(colorIndex++) % numberOfColors]
      };

    graphBars.push(barObject);
  }

  return {
    chart: Object.assign({
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
      'lineColor': '#f69275',
      'showXAxisLine': '1',
      'showYAxisLine': '0',
      'divLineIsDashed': '1',
      'showsYAxisLine': '0'
    }, chartOptions),
    data: graphBars
  };
};

function getDataPlotClickUrl(props, dataObj) {
  if (!props.kibana) {
    return;
  }

  let parameters = {
      props: props,
      dataObj: dataObj,
      queryParamsArray: props.kibana.queryParams
    },
    queryParams = generateQueryParams(parameters),
    pathParams = generatePathParams(props.kibana.pathParams);

  return generateClickThroughUrl(pathParams, queryParams);
}

class ParetoChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object
  }

  renderChart(props) {
    if (!props.data) {
      return;
    }

    const data = props.data,
      {clickThrough} = this.context;

    FusionCharts.ready(function() {
      const mapProps = props.attributes;

      const fusioncharts = new FusionCharts({
        type: 'pareto2d',
        renderAt: mapProps.id,
        width: mapProps.chartWidth ? mapProps.chartWidth : '100%',
        height: mapProps.chartHeight ? mapProps.chartHeight : '400',
        dataFormat: 'json',
        containerBackgroundOpacity: '0',
        dataSource: generateChartDataSource(data, props),
        events: {
          dataplotClick: function(eventObj, dataObj) {
            const url = getDataPlotClickUrl(props, dataObj);
            if (url !== '' && !isUndefined(url)) {
              clickThrough(url);
            }
          }
        }
      });
      fusioncharts.render();
    });
  }

  render() {
    const {props} = this;
    return (
      <div id={props.attributes.id}>{this.renderChart(props)}</div>
    );
  }
}

ParetoChart.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default ParetoChart;
