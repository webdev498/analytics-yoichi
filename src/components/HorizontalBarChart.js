import React from 'react';
import {generateRawData, getColumnIndexArrayFromColumnName, getIndexFromColumnName, getIndexFromObjectName} from 'utils/utils';

function generateDataArray(columnIndexArray, rowsArray) {
  let dataset = [];
  if (columnIndexArray.length !== 0) {
    for (let d = 0, rowsLen = rowsArray.length; d < rowsLen; d++) {
      let obj1 = {};
      obj1.label = rowsArray[d][columnIndexArray[0]];
      if (obj1.label.length > 15) {
        obj1.label = obj1.label.substring(0, 15) + " (...)";
      }
      obj1.value = rowsArray[d][columnIndexArray[1]];
      obj1.toolText = rowsArray[d][columnIndexArray[0]] + ", " + rowsArray[d][columnIndexArray[1]];
      dataset.push(obj1);
    }
  }
  return dataset;
}

function generateChartDataSource(rawData, props) {
  const chartOptions = props.chartOptions,
        {fieldMapping, multipleReportIds, displayTopFive, showTrendLines, trendLines} = props.chartData,
        dataSourceObject = {
          chart: {
            "bgColor": "#ffffff",
            "showborder": "0",
            "borderThickness":"0",
            "showCanvasBorder": "0",
            "usePlotGradientColor": "0",
            "plotBorderAlpha": "10",
            "placeValuesInside": "1",
            "valueFontColor": "#111111",
            "showAxisLines": "0",
            "axisLineAlpha": "25",
            "numDivLines":"0",
            "divLineAlpha": "10",
            "alignCaptionWithCanvas": "0",
            "showAlternateVGridColor": "0",
            "captionFontSize": "14",
            "subcaptionFontSize": "12",
            "subcaptionFontBold": "0",
            "toolTipColor": "#ffffff",
            "toolTipBorderThickness": "0",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "80",
            "toolTipBorderRadius": "2",
            "toolTipPadding": "5",
            "showYAxisValues":"0",
            'showValues':'1',
            "paletteColors": "#ACF50F,#D93609,#FCFC0D, #05E9F5,#0505F5",
            "xAxisNameFontSize":"14",
            "yAxisNameFontSize":"14",
            "labelFontSize": "13"
          }
        };

  let countValue = 0,
      totalValue = 0,
      top10TotalValue = 0,
      top10CountValue = 0,
      averageValue = '',
      dataset = [],
      columnsArray = [];

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
        currentDataRows = [],
        columnIndexArray = [];

    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].rows !== undefined) {
      currentDataRows = rawData[currentChartData.reportId].rows;
    }

    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].columns !== undefined) {
      columnsArray = rawData[currentChartData.reportId].columns;
    }

    top10CountValue = 0;
    top10TotalValue = 0;
    averageValue = '';

    //Calculate column index from API response
    if (multipleReportIds) {
      for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
        if (currentChartData.reportId === 'taf_asset_count_time_shifted') {
          let fieldValue = '',
            fieldName = currentChartData.columns[0],
            fieldValueArray = [],
            inputArray = {
                  fieldName: fieldName,
                  fieldValueArray: fieldValueArray,
                  fieldValue: fieldValue,
                  dataArray: currentDataRows[d]
                };

          countValue = getIndexFromObjectName(inputArray);
        }

        if (currentChartData.reportId === 'taf_total_usage') {
          let columnIndex = '';
          columnIndex = getIndexFromColumnName(currentChartData.columns, columnsArray);
          totalValue = currentDataRows[d][columnIndex];
        }

        if (currentChartData.reportId === 'taf_top_talkers_connections' ||
          currentChartData.reportId === 'taf_top_talkers_bandwidth') {
          let fieldValue = '',
              columnIndex = '';
          columnIndex = getIndexFromColumnName(currentChartData.columns, columnsArray);
          fieldValue = currentDataRows[d][columnIndex];
          let value = Math.round(((fieldValue * 100) / totalValue), 2);
          if (value > 0) {
            top10CountValue = top10CountValue + 1;
            top10TotalValue = top10TotalValue + parseInt(fieldValue);
          }
        }
      }

      const reportId = props.chartData.reportId;
      currentDataRows = rawData[reportId].rows;
      let average = top10TotalValue / parseInt(countValue),
          newRawData = [];
      averageValue = Math.round(((average * 100) / totalValue), 2);

      for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
        let obj = [];
        obj[0] = currentDataRows[d][0];
        let value = Math.round(((currentDataRows[d][1] * 100) / totalValue), 2);
        obj[1] = value;
        if (value > 0) {
          newRawData.push(obj);
        }
      }
      columnIndexArray = [0,1];
      dataset = generateDataArray(columnIndexArray, newRawData);
    } else {
      columnIndexArray = getColumnIndexArrayFromColumnName(currentChartData.columns, columnsArray);
      dataset = generateDataArray(columnIndexArray, currentDataRows);

      if (displayTopFive) {
        dataset.sort(function(a, b) {
          return b.value - a.value;
        });
        dataset = dataset.slice(0, 5);
      }
    }
  }

  let finalChartOptions = Object.assign(dataSourceObject.chart, chartOptions);
  dataSourceObject.chart = finalChartOptions;

  if (dataset.length > 0) dataSourceObject.data = dataset;

  if (showTrendLines && averageValue !== undefined && averageValue !== '') {
    dataSourceObject.trendlines = trendLines;
    dataSourceObject.trendlines[0].line[0].startvalue = averageValue;
    dataSourceObject.trendlines[0].line[0].displayvalue = averageValue + (chartOptions.numberSuffix ? chartOptions.numberSuffix : "");
  }

  return dataSourceObject;
}

const renderChart = (props) => {
  if (!props.data) {
    return;
  }

  const data = props.data,
        fieldMapping = props.chartData.fieldMapping;

  let rawData = {};
  rawData = generateRawData(fieldMapping, data);

  FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'bar2d',
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

const HorizontalBarChart = (props) => (
  <div style={props.attributes.chartBorder}>
    <div style={props.attributes.chartCaption}>{props.meta.title}</div>
    <div id={props.attributes.id}>{renderChart(props)}</div>
  </div>
)

export default HorizontalBarChart;
