import React, {PropTypes} from 'react';
import moment from 'moment';
import {calculateDateDisplayFormat, calculateDateDisplayFormatForHistogram} from 'utils/dateUtils';
import {generateRawData, isUndefined, getTimePairFromWindow} from 'utils/utils';
import {baseUrl, lowScoreRange, mediumScoreRange, highScoreRange} from 'config';

function getXindex(currentChartDataColumn, columns) {
  let x = '';
  for (let c = 0; c < columns.length; c++) {
    if (currentChartDataColumn === columns[c].name) {
      x = c;
      break;
    }
  }
  return x;
}

function getYindex(currentChartData, columns, combinedResult) {
  let y = '',
    seriesIndex = '';
  for (let c = 0; c < columns.length; c++) {
    if (!isUndefined(currentChartData.columns[0]) && currentChartData.columns[0] === columns[c].name) {
      if (!combinedResult) {
        seriesIndex = c;
      }
      else {
        y = c;
      }
    }
    if (!isUndefined(currentChartData.columns[1]) && currentChartData.columns[1] === columns[c].name) {
      y = c;
    }
  }
  return {
    y: y,
    seriesIndex: seriesIndex
  };
}

function generateCategoryArray(rows, index, dateDisplayFormat) {
  let category = [],
    lookup = {};
  for (let d = 0, rowsLen = rows.length; d < rowsLen; d++) {
    let localTime = moment.utc(rows[d][index]).toDate();
    localTime = moment(localTime).format('D MMM YYYY HH:mm');

    let localTimeNew = moment.utc(rows[d][index]).toDate();
    localTimeNew = moment(localTimeNew).format(dateDisplayFormat);

    if (!(localTime in lookup)) {
      lookup[localTime] = 1;
      const obj1 = {
        label: localTimeNew,
        toolText: localTime
      };

      category.push(obj1);
    }
  }
  return category;
}

function generateDataAndSeriesArrayForDynamicSeriesNames(rows, x, y, seriesIndex) {
  let newRawData = [],
    newRawDataRow = [],
    seriesValuesIndex = 0,
    seriesNameArray = [],
    lookup = {};
  for (let d = 0, rowsLen = rows.length; d < rowsLen; d++) {
    let seriesName = rows[d][seriesIndex],
      currentXAxisName = rows[d][x],
      previousXAxisName = '';

    if (currentXAxisName !== '') {
      if (currentXAxisName !== previousXAxisName || d === 0) {
        if (d !== 0) {
          newRawData.push(newRawDataRow);
        }
        newRawDataRow = [];
        newRawDataRow[0] = currentXAxisName;
        newRawDataRow[1] = [0, 0, 0];
        seriesValuesIndex = 0;
      }
      if (seriesName !== '') {
        newRawDataRow[1][seriesValuesIndex] = rows[d][y];
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
  return {
    newRawData: newRawData,
    seriesNameArray: seriesNameArray
  };
}

function generateChartDataSetForDynamicSeries(currentChartData, seriesNameArray, newRawData) {
  let dataset = [];
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
    if (!isUndefined(seriesOptions.anchorBorderColor)) {
      tempObj.anchorBorderColor = seriesOptions.anchorBorderColor[seriesCount];
    }
    if (!isUndefined(seriesOptions.anchorbgcolor)) {
      tempObj.anchorbgcolor = seriesOptions.anchorbgcolor[seriesCount];
    }

    // Get column data for y-axis
    tempObj.data = generateDataArray(tempObj, 1, newRawData, seriesCount);
    dataset.push(tempObj);
  }
  return dataset;
}

function generateChartDataSetForFixedSeries(dataset, currentChartData, rows, y, seriesCount) {
  const tempObj = {};

  tempObj.seriesname = currentChartData.seriesname;
  tempObj.renderas = currentChartData.renderas;
  tempObj.data = [];

  // Get column data for y-axis
  if (y !== '') {
    tempObj.data = generateDataArray(tempObj, y, rows, seriesCount);
    seriesCount += 1;
  }
  dataset.push(tempObj);

  return dataset;
}

// Function to generate data array for chart data source
function generateDataArray(tempObj, y, rows, seriesCount) {
  for (let d = 0, rowsLen = rows.length; d < rowsLen; d++) {
    let rowObj = {};
    if (rows[d][y][seriesCount] !== 'NaN') {
      rowObj.value = rows[d][y][seriesCount];
    }
    else {
      rowObj.value = '0';
    }
    tempObj.data.push(rowObj);
  }
  return tempObj.data;
}

function generateChartDataSource(rawData, props) {
  const {duration, chartOptions, chartData} = props,
    fieldMapping = chartData.fieldMapping,
    combinedResult = chartData.combinedResult,
    categories = [{
      category: []
    }];

  let seriesCount = 0,
    dataset = [],
    timeWindow = duration,
    dateDisplayFormat = calculateDateDisplayFormat(timeWindow),
    x = '';

  if (combinedResult) {
    dateDisplayFormat = calculateDateDisplayFormatForHistogram(timeWindow);
  }

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
      {rows, columns} = rawData[currentChartData.reportId],
      y = '',
      seriesIndex = '';

    // Check for x-axis chart data
    if (!isUndefined(currentChartData.axis) && currentChartData.axis === 'x') {
      x = getXindex(currentChartData.columns[0], columns);
      if (x !== '') {
        categories[0].category = generateCategoryArray(rows, x, dateDisplayFormat);
      }
    }

    // Check for y-axis chart data (i.e. multiple series)
    if (!isUndefined(currentChartData.axis) && currentChartData.axis === 'y') {
      let yIndex = getYindex(currentChartData, columns, combinedResult);
      y = yIndex.y;
      seriesIndex = yIndex.seriesIndex;

      if (!isUndefined(currentChartData.seriesOptions)) {
        let dynamicArray = generateDataAndSeriesArrayForDynamicSeriesNames(rows, x, y, seriesIndex),
          newRawData = dynamicArray.newRawData,
          seriesNameArray = dynamicArray.seriesNameArray;

        dataset = generateChartDataSetForDynamicSeries(currentChartData, seriesNameArray, newRawData);
      }
      if (!isUndefined(currentChartData.seriesname)) {
        dataset = generateChartDataSetForFixedSeries(dataset, currentChartData, rows, y, seriesCount);
      }
    }
  }

  const dataSourceObject = {
    chart: Object.assign({
      'showvalues': '0',
      'decimals': '3',
      'sFormatNumberScale': '1',
      'setadaptiveymin': '1',
      'setadaptivesymin': '1',
      'showborder': '0',
      'theme': 'zune',
      'numDivLines': '2',
      'divLineThickness': '0',
      'divLineAlpha': '0',
      'showAxisLines': '1',
      'showYAxisValues': '1',
      'labelDisplay': 'wrap',
      'rotateLabels': '1',
      'xAxisName': 'Time',
      'scrollHeight': '4',
      'xAxisNameFontSize': '14',
      'yAxisNameFontSize': '14',
      'slantLabels': '1',
      'labelFontSize': '13'
    }, chartOptions)
  };

  if (categories.length > 0) {
    dataSourceObject.categories = categories;
  }

  if (dataset.length > 0) {
    dataSourceObject.dataset = dataset;
  }

  return dataSourceObject;
}

function getDataPlotClickUrl(props, dataObj) {
  if (!props.kibana) {
    return;
  }

  let toolText = dataObj['toolText'],
    dateStringArray = toolText.split(','),
    dateString = dateStringArray[1];

  dateString = dateString.trim();

  let pair = getTimePairFromWindow(props.duration, dateString),
    dateTime1 = pair.fromDate,
    dateTime2 = pair.toDate,
    otherParameters = '';

  if ((dataObj.datasetName).toLowerCase() === 'low') {
    otherParameters = 'lowScore=' + lowScoreRange[0] + '&highScore=' + lowScoreRange[1];
  }
  else if ((dataObj.datasetName).toLowerCase() === 'medium') {
    otherParameters = 'lowScore=' + mediumScoreRange[0] + '&highScore=' + mediumScoreRange[1];
  }
  else if ((dataObj.datasetName).toLowerCase() === 'high') {
    otherParameters = 'lowScore=' + highScoreRange[0] + '&highScore=' + highScoreRange[1];
  }

  const url = baseUrl + '/kibana/query/' + props.kibana.pathParams.queryId + '?' + otherParameters + '&from=' +
    dateTime1 + '&to=' + dateTime2;
  console.log(url);
}

const renderChart = (props) => {
  if (!props.duration) {
    return;
  }

  if (!props.data) {
    return;
  }

  const data = props.data,
    fieldMapping = props.chartData.fieldMapping;

  let rawData = {};
  rawData = generateRawData(fieldMapping, data);

  FusionCharts.ready(function() {
    const fusioncharts = new FusionCharts ({
      type: 'mscombi2d',
      renderAt: props.attributes.id,
      width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
      height: props.attributes.chartHeight ? props.attributes.chartHeight : '400',
      dataFormat: 'json',
      containerBackgroundOpacity: '0',
      dataSource: generateChartDataSource(rawData, props),
      events: {
        dataplotClick: function(eventObj, dataObj) {
          getDataPlotClickUrl(props, dataObj);
        }
      }
    });

    fusioncharts.render();
  });
};

class MultiSeriesCombiChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    meta: PropTypes.object
  }

  render() {
    const {props} = this;
    return (
      <div style={props.attributes.chartBorder}>
        <div style={props.attributes.chartCaption}>{props.meta.title}</div>
        <div id={props.attributes.id}>{renderChart(props)}</div>
      </div>
    );
  }
}

export default MultiSeriesCombiChart;
