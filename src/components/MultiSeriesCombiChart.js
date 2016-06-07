import React from 'react';
import moment from 'moment';
import {calculateDateDisplayFormat, calculateDateDisplayFormatForHistogram} from 'utils/dateUtils';

function generateChartDataSource(rawData, props) {
  const timeWindow = props.duration,
        chartOptions = props.chartOptions,
        chartData = props.chartData.fieldMapping,
        combinedResult = props.chartData.combinedResult,
        lookup = {},
        dataset = [];
  const categories = [{
    category: []
  }];
  let seriesCount = 0,
      dateDisplayFormat = calculateDateDisplayFormat(timeWindow),
      xColumnIndex = '';

  if (combinedResult) {
    dateDisplayFormat = calculateDateDisplayFormatForHistogram(timeWindow);
  }

  for (let i = 0; i < chartData.length; i++) {
    let currentChartData = chartData[i];
    let currentDataRows = [];
    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].rows !== undefined) {
      currentDataRows = rawData[currentChartData.reportId].rows;
    }
    let yColumnIndex = '',
        yColumnSeriesIndex = '';

    //Check for x-axis chart data
    if (currentChartData.axis !== undefined && currentChartData.axis === 'x') {
      //Calculate column index from API response
      let columnsArray = [];
      if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].columns !== undefined) {
        columnsArray = rawData[currentChartData.reportId].columns;
      }

      for (let c = 0; c < columnsArray.length; c++) {
        if (currentChartData.columns[0] === columnsArray[c].name) {
          xColumnIndex = c;
          break;
        }
      }

      //Get column data for x-axis
      if (xColumnIndex !== '') {
        for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
          let localTime = moment.utc(currentDataRows[d][xColumnIndex]).toDate();
          localTime = moment(localTime).format('D MMM YYYY HH:mm');

          let localTimeNew = moment.utc(currentDataRows[d][xColumnIndex]).toDate();
          localTimeNew = moment(localTimeNew).format(dateDisplayFormat);

          if (!(localTime in lookup)) {
            lookup[localTime] = 1;
            const obj1 = {
              label: localTimeNew,
              toolText: localTime
            };

            categories[0].category.push(obj1);
          }
        }
      }
    }

    //Check for y-axis chart data (i.e. multiple series)
    if (currentChartData.axis !== undefined && currentChartData.axis === 'y') {
      //Calculate column index from API response
      let columnsArray = [];
      if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].columns !== undefined) {
        columnsArray = rawData[currentChartData.reportId].columns;
      }
      for (let c = 0; c < columnsArray.length; c++) {
        if (currentChartData.columns[0] !== undefined && currentChartData.columns[0] === columnsArray[c].name) {
          if (!combinedResult) {
            yColumnSeriesIndex = c;
          } else {
            yColumnIndex = c;
          }
        }
        if (currentChartData.columns[1] !== undefined && currentChartData.columns[1] === columnsArray[c].name) {
          yColumnIndex = c;
        }
      }
      if (currentChartData.seriesOptions !== undefined) {
        let newRawData = [],
            newRawDataRow = [],
            seriesValuesIndex = 0,
            seriesNameArray = [],
            lookup = {};

        for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
          let seriesName = currentDataRows[d][yColumnSeriesIndex],
              currentXAxisName = currentDataRows[d][xColumnIndex],
              previousXAxisName = '';

          if (currentXAxisName !== '') {
            if (currentXAxisName !== previousXAxisName || d === 0) {
              if (d !== 0) {
                newRawData.push(newRawDataRow);
              }
              newRawDataRow = [];
              newRawDataRow[0] = currentXAxisName;
              newRawDataRow[1] = [0,0,0];
              seriesValuesIndex = 0;
            }
            if (seriesName !== '') {
              newRawDataRow[1][seriesValuesIndex] = currentDataRows[d][yColumnIndex];
              seriesValuesIndex += 1;

              if (!(seriesName in lookup)) {
                lookup[seriesName] = 1;
                const obj1 = {
                  seriesname: seriesName
                };
                seriesNameArray.push(obj1);
              }
            }
            previousXAxisName = currentXAxisName;
          }
        }

        for (let seriesCount = 0, rowsLen = seriesNameArray.length; seriesCount < rowsLen; seriesCount++) {
          const seriesOptions = currentChartData.seriesOptions,
                tempObj = {};
          tempObj.seriesname = seriesNameArray[seriesCount].seriesname;
          tempObj.data = [];

          for (let s in seriesOptions) {
            if (s !== 'anchorBorderColor' || s !== 'anchorbgcolor') {
              tempObj[s] = seriesOptions[s];
            }
          }
          if (seriesOptions.anchorBorderColor !== undefined) {
            tempObj.anchorBorderColor = seriesOptions.anchorBorderColor[seriesCount];
          }
          if (seriesOptions.anchorbgcolor !== undefined) {
            tempObj.anchorbgcolor = seriesOptions.anchorbgcolor[seriesCount];
          }

          //Get column data for y-axis
          tempObj.data = generateDataArray(tempObj, 1, newRawData, seriesCount);
          dataset.push(tempObj);
        }
      }
      if (currentChartData.seriesname !== undefined) {
        const tempObj = {};
        tempObj.seriesname = currentChartData.seriesname;
        tempObj.renderas = currentChartData.renderas;
        tempObj.data = [];

        //Get column data for y-axis
        if (yColumnIndex !== '') {
          tempObj.data = generateDataArray(tempObj, yColumnIndex, currentDataRows, seriesCount);
          seriesCount += 1;
        }
        dataset.push(tempObj);
      }
    }
  }

  const dataSourceObject = {
    chart: {
      "showvalues": "0",
      "decimals": "3",
      "sFormatNumberScale": "1",
      "setadaptiveymin": "1",
      "setadaptivesymin": "1",
      "showborder": "0",
      "theme": "zune",
      "numDivLines":"2",
      "divLineThickness":"0",
      "divLineAlpha":"0",
      "showAxisLines":"1",
      "showYAxisValues":"1",
      "labelDisplay":"wrap",
      "rotateLabels":"1",
      "xAxisName":"Time",
      "scrollHeight":"4",
      "xAxisNameFontSize":"14",
      "yAxisNameFontSize":"14",
      "slantLabels":"1",
      "labelFontSize": "13"
    }
  };

  let finalChartOptions = Object.assign(dataSourceObject.chart, chartOptions);
  dataSourceObject.chart = finalChartOptions;

  if (categories.length > 0){
    dataSourceObject.categories = categories;
  }

  if (dataset.length > 0){
    dataSourceObject.dataset = dataset;
  }

  return dataSourceObject;
}

//Function to generate data array for chart data source
function generateDataArray(tempObj, yColumnIndex, currentDataRows, seriesCount) {
  for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
    let rowObj = {};
    if (currentDataRows[d][yColumnIndex][seriesCount] !== "NaN") {
      rowObj.value = currentDataRows[d][yColumnIndex][seriesCount];
    } else {
      rowObj.value = '0';
    }
    tempObj.data.push(rowObj);
  }
  return tempObj.data;
}

const renderChart = (props) => {
  if (!props.duration) {
    return;
  }

  if (!props.data) {
    return;
  }

  const data = props.data,
        chartData = props.chartData.fieldMapping;

  let rawData = {};

  for (let i = 0; i < chartData.length; i++) {
    let currentChartData = chartData[i];
    if (data === null && data[currentChartData.reportId] === undefined){
      return;
    } else {
      if (!rawData.hasOwnProperty(currentChartData.reportId)) {
        if (data[currentChartData.reportId] !== undefined) {
          rawData[currentChartData.reportId] = data[currentChartData.reportId];
        } else {
          rawData[currentChartData.reportId] = data;
        }
      }
    }
  }

  FusionCharts.ready(function(){
    const fusioncharts = new FusionCharts({
      type: 'mscombi2d',
      renderAt: props.attributes.id,
      width: '100%',
      height: '400',
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: generateChartDataSource(rawData, props)
    });

    fusioncharts.render();
  });
}

const MultiSeriesCombiChart = (props) => (
  <div style={props.attributes.chartBorder}>
    <div style={props.attributes.chartCaption}>{props.meta.title}</div>
    <div id={props.attributes.id}>{renderChart(props)}</div>
  </div>
)

export default MultiSeriesCombiChart;
