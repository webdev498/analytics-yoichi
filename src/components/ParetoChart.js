import React from 'react';

import Card from 'material-ui/lib/card/card';

function generateChartDataSource(props) {
  var data = props.data;

  var apiFieldMapping = props.apiFieldMapping;
  const graphBars = [];
  const chartColors = ["D93609","0505F5","ACF50F","FCFC0D","05E9F5","003300","FF66FF","999999","009999","66CDAA"];

  let colorIndex = -1,
      numberOfColors = chartColors.length;

  var xAxisName = '';
  var yAxisName = '';

  for (let a=0; a < apiFieldMapping.length; a++) {
    var apiFieldMappingIndividual = apiFieldMapping[a];
    var apiData = data.rows;
    var xfieldValueArray = apiFieldMappingIndividual.xAxis.fieldValue;
    var yfieldValueArray = apiFieldMappingIndividual.yAxis.fieldValue;

    xAxisName = apiFieldMappingIndividual.xAxis.fieldName;
    yAxisName = apiFieldMappingIndividual.yAxis.fieldName;

    for (let i = 0; i < apiData.length; i++) {
      var xValue = '';
      var yValue = '';
      for(let v=0; v<xfieldValueArray.length; v++) {
        if (v == 0) {
          xValue = apiData[i][xfieldValueArray[v]];
        }
        else {
          xValue = xValue[xfieldValueArray[v]];
        }
      }
      for(let v=0; v<yfieldValueArray.length; v++) {
        if (v == 0) {
          yValue = apiData[i][yfieldValueArray[v]];
        }
        else {
          yValue = xValue[yfieldValueArray[v]];
        }
      }

      const barObject = {};
      if (xValue == "") {
        barObject.label = "Other";
      }
      else{
        barObject.label = xValue;
      }

      barObject.value = yValue;
      colorIndex = colorIndex + 1;

      if (chartColors[colorIndex] === undefined) {
        colorIndex = 0;
      }

      barObject.color = chartColors[colorIndex];
      graphBars.push(barObject);
    }
  }

  const dataSourceObject = {
    chart: {
      labelFontSize: "10",
      pYAxisname: yAxisName,
      showAxisLines: "1",
      showLabels: "1",
      showPercentInTooltip: "1",
      showValues: "1",
      showYAxisValues: "1",
      theme: "zune",
      xAxisNameFontSize: "14",
      xAxisname: xAxisName,
      yAxisNameFontSize: "14",
      caption: "",
      baseFont: "Roboto, sans-serif"
    },
    data: graphBars
  };

  return dataSourceObject;
};

const renderChart = (props) => {
  if(!props.data) {
    return;
  }

  FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'pareto2d',
      renderAt: props.id,
      width: '100%',
      height: '400',
      dataFormat: 'json',
      dataSource: generateChartDataSource(props)
  });
      fusioncharts.render();
  });
}

const ParetoChart = (props) => (
  <div id={props.id}>{renderChart(props)}</div>
)

export default ParetoChart;