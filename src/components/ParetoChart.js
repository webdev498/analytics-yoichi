import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import {
  getIndexFromColumnName,
  isUndefined
} from 'utils/utils';
import {
  generateQueryParams,
  generateClickThroughUrl,
  generatePathParams
} from 'utils/kibanaUtils';

export function generateDataSource(data, chartOptions, fieldMapping, updateChartOptions) {
  const graphBars = [];

  let x, y;

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
        value: yValue
      };

    graphBars.push(barObject);
  }

  if (updateChartOptions &&
    updateChartOptions.displayLabelAs &&
    updateChartOptions.displayLabelAs.slanted &&
    updateChartOptions.displayLabelAs.afterCount < rows.length) {
    chartOptions.labelDisplay = 'rotate';
  }
  else {
    chartOptions.labelDisplay = 'wrap';
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
      'lineColor': Colors.coral,
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
      'baseFontColor': Colors.pebble,
      'paletteColors': Colors.defaultGraphPalette,
      'decimals': '2',
      'slantLabels': '1'
    }, chartOptions),
    data: graphBars
  };
};

function getDataPlotClickUrl(props, dataObj) {
  if (!props.kibana) {
    return;
  }

  let parameters = {
      data: props.data,
      duration: props.duration,
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

    if (props.data.rows && props.data.rows.length === 0) {
      return;
    }

    const {data, chartOptions, updateChartOptions, chartData} = props,
      fieldMapping = chartData.fieldMapping,
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
        dataSource: generateDataSource(data, chartOptions, fieldMapping, updateChartOptions),
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
