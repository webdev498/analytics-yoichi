import React from 'react';

function generateChartDataSource(chartData) {
  const chartDataSource = {};

  return chartDataSource;
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
      dataSource: generateChartDataSource(chartProperties.chartValue)
  }
  );
      fusioncharts.render();
  });
}

const AngularGaugeChart = (props) => (
  <div id={props.chartProperties.chartId}>{renderChart(props)}</div>
)

export default AngularGaugeChart;
