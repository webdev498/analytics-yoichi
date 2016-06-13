import React from 'react';
import {generateRawData, getIndexFromColumnName} from 'utils/utils';

function generateChartDataSource(rawData, props) {
  const {data, chartOptions, chartData} = props,
        fieldMapping = chartData.fieldMapping,
        graphBars = [],
        chartColors = ["D93609","0505F5","ACF50F","FCFC0D","05E9F5","003300","FF66FF","999999","009999","66CDAA"],
        apiData = data.rows;

  let colorIndex = 0,
      numberOfColors = chartColors.length,
      xColumnIndex = '',
      yColumnIndex = '',
      currentDataRows = [];

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
        columnsArray = [];

    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].rows !== undefined) {
      currentDataRows = rawData[currentChartData.reportId].rows;
    }

    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].columns !== undefined) {
      columnsArray = rawData[currentChartData.reportId].columns;
    }

    //Check for x-axis chart data
    if (currentChartData.axis !== undefined && currentChartData.axis === 'x') {
      //Calculate column index from API response
      xColumnIndex = getIndexFromColumnName(currentChartData.columns, columnsArray);
    }

    //Check for y-axis chart data
    if (currentChartData.axis !== undefined && currentChartData.axis === 'y') {
      //Calculate column index from API response
      yColumnIndex = getIndexFromColumnName(currentChartData.columns, columnsArray);
    }
  }

  for (let i = 0; i < currentDataRows.length; i++) {
    const xValue = currentDataRows[i][xColumnIndex],
          yValue = currentDataRows[i][yColumnIndex],
          barObject = {
            label: xValue ? xValue : "Other",
            value: yValue,
            color: chartColors[(colorIndex++) % numberOfColors]
          };
    graphBars.push(barObject);
  }

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

  const data = props.data,
        fieldMapping = props.chartData.fieldMapping;
  let rawData = {};

  rawData = generateRawData(fieldMapping, data);

  FusionCharts.ready(function(){
    const fusioncharts = new FusionCharts({
      type: 'pareto2d',
      renderAt: props.attributes.id,
      width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
      height: props.attributes.chartHeight ? props.attributes.chartHeight : '400',
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: generateChartDataSource(rawData, props)
    });

    fusioncharts.render();
  });
}

const ParetoChart = (props) => (
  <div id={props.attributes.id}>{renderChart(props)}</div>
)

export default ParetoChart;
