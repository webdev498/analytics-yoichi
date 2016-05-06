import React from 'react';
//import FusionCharts from 'fusioncharts';
//import ReactFusioncharts from 'react-fusioncharts.min';

const renderChart = (id, chartDataSource, width, height, chartType) => {
  FusionCharts.ready(function(){
      var fusioncharts = new FusionCharts({
      type: chartType,
      renderAt: id,
      width: width,
      height: height,
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: chartDataSource
  }
  );
      fusioncharts.render();
  });
}

const ThreatAnalyticsGraph = (props) => (
  <div id={props.id}>{renderChart(props.id, props.chartDataSource, props.width, props.height, props.chartType)}</div>
)

export default ThreatAnalyticsGraph;
