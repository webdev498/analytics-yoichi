import React from 'react';
import {generateRawData, getXYIndexFromColumnNames} from 'utils/utils';

function generateChartDataSource(rawData, props) {
  const {duration, chartOptions, chartData} = props,
        fieldMapping = chartData.fieldMapping;

  let dataSourceObject = {},
      dataSet = [],
      xColumnIndex = '',
      yColumnIndex = '';

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
        columnsArray = [],
        currentDataRows = [],
        dataSeries = currentChartData;

    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].rows !== undefined) {
      currentDataRows = rawData[currentChartData.reportId].rows;
    }

    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].columns !== undefined) {
      columnsArray = rawData[currentChartData.reportId].columns;
    }

    let columnIndexes = getXYIndexFromColumnNames(currentChartData.columns, columnsArray);
    xColumnIndex = columnIndexes[0];
    yColumnIndex = columnIndexes[1];

    let dataObject = [];
    for (let d = 0; d < currentDataRows.length; d++) {
      let dataPoint = {};
      dataPoint.x = currentDataRows[d][xColumnIndex];
      dataPoint.y = currentDataRows[d][yColumnIndex];
      dataPoint.toolText = chartOptions.xAxisName + ":" + currentDataRows[d][xColumnIndex] + " " +
      chartOptions.yAxisName + ":" + currentDataRows[d][yColumnIndex];
      dataObject.push(dataPoint);
    }
    dataSeries.data = dataObject;
    dataSet.push(dataSeries);
  }

  dataSourceObject.chart = Object.assign({
    "showvalues": "0",
    "theme": "zune",
    "numDivLines":"2",
    "lineThickness":"5",
    "divLineThickness":"0",
    "divLineAlpha":"0",
    "showAxisLines":"1",
    "showYAxisValues":"1",
    "labelDisplay":"wrap",
    "rotateLabels":"0",
    "showlegend":"0",
    "bgAlpha":"0",
    "canvasBgAlpha":'0',
    "xAxisNameFontSize":"14",
    "yAxisNameFontSize":"14",
    "labelFontSize": "13"
  }, chartOptions);

  if (dataSet.length > 0)
    dataSourceObject.dataset = dataSet;

  return dataSourceObject;
}

const renderChart = (props) => {
  if(!props.data) {
    return;
  }

  const data = props.data,
        fieldMapping = props.chartData.fieldMapping;
  let rawData = {};

  rawData = generateRawData(fieldMapping, data);

  FusionCharts.ready(function(){
      let fusioncharts = new FusionCharts({
      type: 'scatter',
      renderAt: props.attributes.id,
      width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
      height: props.attributes.chartHeight ? props.attributes.chartHeight : '200',
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: generateChartDataSource(rawData, props)
   }
  );
      fusioncharts.render();
  });
}

const ScatterChart = (props) => (
  <div id={props.attributes.id}>{renderChart(props)}</div>
)

export default ScatterChart;
