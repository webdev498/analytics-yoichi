import React from 'react';

import Card from 'material-ui/lib/card/card';

function getData(data) {
  const graphBars = [];
  const chartColors = ["D93609","0505F5","ACF50F","FCFC0D","05E9F5","003300","FF66FF","999999","009999","66CDAA"];

  let colorIndex = -1,
      numberOfColors = chartColors.length;

  for (let i = 0; i < data.rows.length; i++) {
    const barObject = {};
    if (data.rows[i][0] == "") {
      barObject.label = "Other";
    }
    else{
      barObject.label = data.rows[i][0];
    }

    barObject.value = data.rows[i][1];
    colorIndex = colorIndex + 1;

    if (chartColors[colorIndex] === undefined) {
      colorIndex = 0;
    }

    barObject.color = chartColors[colorIndex];
    graphBars.push(barObject);
  }

  const dataSourceObject = {
    chart: {
      labelFontSize: "10",
      pYAxisname: "Connections",
      showAxisLines: "1",
      showLabels: "1",
      showPercentInTooltip: "1",
      showValues: "1",
      showYAxisValues: "1",
      theme: "zune",
      xAxisNameFontSize: "14",
      xAxisname: "Alert Types",
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
      dataSource: getData(props.data)
  });
      fusioncharts.render();
  });
}

const ParetoChart = (props) => (
  <div id={props.id}>{renderChart(props)}</div>
)

export default ParetoChart;