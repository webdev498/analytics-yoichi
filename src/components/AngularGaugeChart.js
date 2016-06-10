import React from 'react';

function generateChartDataSource(chartData) {
  const chartDataSource = {
                            "chart":
                            {
                              "lowerLimit":"0","upperLimit":"100","showValue":"1",
                              "valueBelowPivot":"1","valueFontSize":"11","valueFontBold":"1",
                              "gaugeOuterRadius":"33","gaugeInnerRadius":16.5,"showtickvalues":"0",
                              "showTickMarks":"0","tickvaluedistance":"25","showborder":0,
                              "gaugeFillMix":"{dark-30},{light-60},{dark-10}","bgAlpha":"0",
                              "canvasBgAlpha":"0","caption":""
                            },
                            "colorRange":
                            {
                              "color":
                                [
                                  {"minValue":"0","maxValue":"35","code":"#6baa01"},
                                  {"minValue":"35","maxValue":"65","code":"#f8bd19"},
                                  {"minValue":"65","maxValue":"100","code":"#e44a00"}
                                ]
                            },
                            "dials":{"dial":[{"value":chartData,"bgcolor":"333333","bordercolor":"333333"}]},
                            "value":chartData
                          };
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
