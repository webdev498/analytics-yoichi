import React from 'react';
import {translateTimeWindow} from 'utils/utils';

function generateChartDataSource(chartData, duration) {
  let dataSourceObject = {},
      dataSet = [],
      dataObject = [],
      dataSeries = {};

  for (let key in chartData) {
    var dataPoint = {};
    dataPoint.label = "";
    if (chartData[key][0] !== 0 && chartData[key][0] !== '') {
      dataPoint.value = chartData[key][0];
    }
    dataObject.push(dataPoint);
  }

  dataSeries.data = dataObject;
  dataSet.push(dataSeries);

  dataSourceObject.chart = {
    "paletteColors": "#D9E6FD",
    "showBorder": "0",
    "showCanvasBorder": "0",
    "usePlotGradientColor": "0",
    "showXAxisLine": "1",
    "axisLineAlpha": "25",
    "divLineAlpha": "0",
    "showValues": "0",
    "showYAxisValues":"0",
    "showAlternateHGridColor": "0",
    "showPlotBorder":"1",
    "plotBorderColor":"#4183FD",
    "plotBorderThickness":"2",
    "bgAlpha":"0",
    "canvasBgAlpha": "0",
    "xAxisNameFontColor": "#B4B4B4",
    "xAxisNameFontSize": "11px",
    "xAxisNameFontBold": "0",
    "chartTopMargin": "0",
    "chartBottomMargin":"5"
  };
  dataSourceObject.chart.xAxisName = "Past " + translateTimeWindow(duration);

  if (dataSet.length > 0)
    dataSourceObject["dataset"] = dataSet;

  return dataSourceObject;
}

const renderChart = (props) => {
  const chartProperties = props.chartProperties;

  FusionCharts.ready(function(){
      var fusioncharts = new FusionCharts({
      type: chartProperties.chartType,
      renderAt: chartProperties.chartId,
      width: chartProperties.chartWidth,
      height: chartProperties.chartHeight,
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: generateChartDataSource(chartProperties.chartValue, props.duration)
   }
  );
      fusioncharts.render();
  });
}

const Area2DAsSparkLineChart = (props) => (
  <div id={props.chartProperties.chartId}>{renderChart(props)}</div>
)

export default Area2DAsSparkLineChart;
