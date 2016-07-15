import React, {PropTypes} from 'react';
import {translateTimeWindow} from 'utils/utils';

function generateChartDataSource(chartProperties, duration) {
  let dataSourceObject = {},
    dataSet = [],
    dataObject = [],
    dataSeries = {},
    {chartValue, chartOptions} = chartProperties;

  for (let key in chartValue) {
    let dataPoint = {
      label: '',
      value: '0'
    };
    if (chartValue[key][0] !== 0 && chartValue[key][0] !== '') {
      dataPoint.value = chartValue[key][0];
    }
    dataObject.push(dataPoint);
  }

  dataSeries.data = dataObject;
  dataSet.push(dataSeries);

  dataSourceObject.chart = Object.assign({
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
    'plotBorderThickness': '2',
    'bgAlpha': '0',
    'canvasBgAlpha': '0',
    'xAxisNameFontColor': '#6B7282',
    'xAxisNameFontSize': '11px',
    'xAxisNameFontBold': '0',
    'chartTopMargin': '0',
    'chartBottomMargin': '0',
    'chartLeftMargin': '0',
    'chartRightMargin': '0',
    'anchorradius': '0',
    'minimizetendency': '1'
  }, chartOptions);
  dataSourceObject.chart.xAxisName = 'Past ' + translateTimeWindow(duration);

  if (dataSet.length > 0) {
    dataSourceObject.dataset = dataSet;
  }

  return dataSourceObject;
}

const renderChart = (props) => {
  const chartProperties = props.chartProperties;

  FusionCharts.ready(function() {
    let fusioncharts = new FusionCharts({
      type: chartProperties.chartType,
      renderAt: chartProperties.chartId,
      width: chartProperties.chartWidth,
      height: chartProperties.chartHeight,
      dataFormat: 'json',
      containerBackgroundOpacity: '0',
      dataSource: generateChartDataSource(chartProperties, props.duration)
    }
  );
    fusioncharts.render();
  });
};

class Area2DAsSparkLineChart extends React.Component {
  static propTypes = {
    chartProperties: PropTypes.object
  }

  render() {
    const {props} = this;
    return (
      <div id={props.chartProperties.chartId}>{renderChart(props)}</div>
    );
  }
}

export default Area2DAsSparkLineChart;
