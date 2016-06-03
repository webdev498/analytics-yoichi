import React from 'react';
//import FusionCharts from 'fusioncharts';
//import ReactFusioncharts from 'react-fusioncharts.min';

const renderChart = (chartProperties) => {
  FusionCharts.ready(function(){
      var fusioncharts = new FusionCharts({
      type: chartProperties.chartType,
      renderAt: chartProperties.chartId,
      width: chartProperties.chartWidth,
      height: chartProperties.chartHeight,
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: chartProperties.chartDataSource
  }
  );
      fusioncharts.render();
  });
}

const ThreatAnalyticsGraph = (props) => (
  <div id={props.chartProperties.chartId}>{renderChart(props.chartProperties)}</div>
)

export default ThreatAnalyticsGraph;
