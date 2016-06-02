import React from 'react';

function generateChartDataSource(props) {
  const {data, chartOptions, chartData} = props;
  const apiFieldMapping = props.apiFieldMapping;

  const graphBars = [];
  const chartColors = ["D93609","0505F5","ACF50F","FCFC0D","05E9F5","003300","FF66FF","999999","009999","66CDAA"];

  let colorIndex = 0,
      numberOfColors = chartColors.length;

  const apiData = data.rows;

  for (let i = 0; i < apiData.length; i++) {
    // const apiFieldMappingIndividual = apiFieldMapping[i];

    // const xfieldValueArray = apiFieldMappingIndividual.xAxis.fieldValue,
    //       yfieldValueArray = apiFieldMappingIndividual.yAxis.fieldValue;

    // for (let j = 0; j < apiData.length; j++) {
    //   let xValue = '',
    //       yValue = '';

    //   for(let v = 0; v < xfieldValueArray.length; v++) {
    //     if (v === 0) {
    //       xValue = apiData[j][xfieldValueArray[v]];
    //     }
    //     else {
    //       xValue = xValue[xfieldValueArray[v]];
    //     }
    //   }

    //   for(let v = 0; v < yfieldValueArray.length; v++) {
    //     if (v === 0) {
    //       yValue = apiData[j][yfieldValueArray[v]];
    //     }
    //     else {
    //       yValue = xValue[yfieldValueArray[v]];
    //     }
    //   }

      const xValue = apiData[i][0];
      const yValue = apiData[i][1];

      const barObject = {
        label: xValue ? xValue : "Other",
        value: yValue,
        color: chartColors[(colorIndex++) % numberOfColors]
      };

      graphBars.push(barObject);
    // }
  }

  // console.log(graphBars);

  const dataSourceObject = {
    chart: Object.assign({
          labelFontSize: "10",
          showAxisLines: "1",
          showLabels: "1",
          showPercentInTooltip: "1",
          showValues: "1",
          showYAxisValues: "1",
          theme: "zune",
          xAxisNameFontSize: "14",
          yAxisNameFontSize: "14",
          caption: "",
          baseFont: "Roboto, sans-serif"
        }, chartOptions),
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
      containerBackgroundOpacity:'0',
      dataSource: generateChartDataSource(props)
    });

    fusioncharts.render();
  });
}

const ParetoChart = (props) => (
  <div id={props.id}>{renderChart(props)}</div>
)

export default ParetoChart;