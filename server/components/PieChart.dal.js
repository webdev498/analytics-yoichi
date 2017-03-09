import {
  getColumnIndexOrValue,
  generateRawData
} from '../../commons/utils/utils';
import {Colors} from '../../commons/colors';

const fs = require('fs'),
  path = require('path');

function processData() {

}

function getData(rawData, url) {
  let reportId = url.split('?');
  reportId = reportId[0];
  reportId = reportId.split('/');
  reportId = reportId[reportId.length - 1];

  const fileName = `../json/pieChart/${reportId}.json`,
    filePath = path.join(__dirname, fileName),
    json = JSON.parse(fs.readFileSync(filePath, 'utf8')),
    fieldMapping = json.chart.data.fieldMapping,
    options = json.chart.options,
    data = generateRawData(fieldMapping, rawData);

  let highlightedColor1 = Colors.bar,
    highlightedColor2 = Colors.coral,
    nonHighlightedColor = Colors.cloud,
    pieChartAttributes = {},
    countValue = 0,
    totalValue = 0,
    topTotalValue = 0,
    topCountValue = 0;
    // background = '',
    // background2 = '',
    // color = '',
    // color2 = '',
    // transform1 = '',
    // transform2 = '',
    // calculateTransform1 = 0,
    // calculateTransform2 = 0;

  // highlightedColor1 = checkForUndefinedChartOptionObject(chartOptions, 'highlightedColor1', highlightedColor1);
  // highlightedColor2 = checkForUndefinedChartOptionObject(chartOptions, 'highlightedColor2', highlightedColor2);
  // nonHighlightedColor = checkForUndefinedChartOptionObject(chartOptions, 'nonHighlightedColor', nonHighlightedColor);

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
      {rows, columns} = data[currentChartData.reportId];
    topCountValue = 0;
    topTotalValue = 0;

    for (let d = 0, rowsLen = rows.length; d < rowsLen; d++) {
      let index = getColumnIndexOrValue(currentChartData.columns, columns, rows[d]),
        value = getValue(currentChartData.columns[0].type, index, rows[d]);
      if (currentChartData.returnValueIs === 'countValue') {
        countValue = value;
      }
      else if (currentChartData.returnValueIs === 'totalValue') {
        totalValue = value;
      }
      else if (currentChartData.returnValueIs === 'topValue') {
        let total = Math.round(((value * 100) / totalValue), 2);
        if (total > 0) {
          topCountValue++;
          topTotalValue += parseInt(value);
        }
      }
    }
  }

  let inputArray = {
    countValue: countValue,
    topCountValue: topCountValue,
    topTotalValue: topTotalValue,
    totalValue: totalValue.toPrecision()
  };

  pieChartAttributes = generatePieChart(inputArray);
  return {
    pieJson: json,
    pieProps: pieChartAttributes
  };
}

function getValue(columnType, index, data) {
  let value = 0;
  console.log('columnType', columnType);
  if (columnType === 'name') {
    value = data[index];
  }
  else if (columnType === 'index') {
    value = index;
  }
  return value;
}

export function generatePieChart(inputArray) {
  console.log(inputArray);
  let highlightedColor1 = Colors.bar,
    highlightedColor2 = Colors.coral;
  let pieChartAttributes = {}; // This initialization is required
  const doughnutInputArray1 = {
      countValue: inputArray.countValue,
      totalValue: inputArray.topCountValue
    },
    pieChartAttributes1 = calculatePieChartAttributes(doughnutInputArray1, 1),
    doughnutInputArray2 = {
      countValue: inputArray.totalValue,
      totalValue: inputArray.topTotalValue
    },
    pieChartAttributes2 = calculatePieChartAttributes(doughnutInputArray2, 2),
    percentage1 = Math.round((inputArray.topCountValue / parseInt(inputArray.countValue)) * 100, 2),
    percentage2 = Math.round((inputArray.topTotalValue / parseInt(inputArray.totalValue)) * 100, 2),
    displayPercentage1 = isNaN(percentage1) ? '0%' : percentage1.toString() + '%',
    displayPercentage2 = isNaN(percentage2) ? '0%' : percentage2.toString() + '%',
    percentage2Color = {fontWeight: 'bold', color: highlightedColor1},
    percentage1Color = {fontWeight: 'bold', color: highlightedColor2},
    style = {percentageText: {}};

  if (percentage2 === 100 || isNaN(percentage2)) {
    style.percentageText = {
      paddingLeft: '0px'
    };
  }

  pieChartAttributes = {
    chart1Background: pieChartAttributes1.chartBackground,
    chart1SliceOneStyle: pieChartAttributes1.chartSliceOneStyle,
    chart1SliceTwoStyle: pieChartAttributes1.chartSliceTwoStyle,
    chart2Background: pieChartAttributes2.chartBackground,
    chart2SliceOneStyle: pieChartAttributes2.chartSliceOneStyle,
    chart2SliceTwoStyle: pieChartAttributes2.chartSliceTwoStyle,
    percentage1Color: percentage1Color,
    percentage2Color: percentage2Color,
    displayPercentage1: displayPercentage1,
    displayPercentage2: displayPercentage2,
    percentage1: isNaN(percentage1) ? '0' : percentage1.toString(),
    percentageTextStyle: style.percentageText
  };
  return pieChartAttributes;
}

export function calculatePieChartAttributes(inputArray, chartId) {
  let {countValue, totalValue} = inputArray,
    percentage = Math.round((totalValue / parseInt(countValue)) * 100, 2);

  let background = '';
  let background2 = '';
  let color = '';
  let color2 = '';
  let transform1 = '';
  let transform2 = '';
  let calculateTransform1 = 0;
  let calculateTransform2 = 0;
  let highlightedColor1 = 'red', // Colors.bar,
    highlightedColor2 = 'blue', // Colors.coral,
    nonHighlightedColor = Colors.cloud;

  if (percentage === 0) {
    percentage = Math.round((totalValue / parseInt(countValue)) * 100, 4);
  }
  if (percentage > 100) {
    percentage = 100;
  }
  background = nonHighlightedColor;
  color = (chartId === 1) ? highlightedColor2 : highlightedColor1;
  background2 = background;
  color2 = color;
  transform1 = 'rotate(90deg)';
  calculateTransform2 = (percentage / 100 * 360);
  transform2 = 'rotate(' + calculateTransform2 + 'deg)';

  if (percentage < 50) {
    background = color;
    color = background2;
    color2 = background2;
    calculateTransform1 = (percentage / 100 * 360 + 90);
    transform1 = 'rotate(' + calculateTransform1 + 'deg)';
    transform2 = 'rotate(0deg)';
  }

  const chartBackground = {background: background},
    chartSliceOneStyle = {transform: transform1, WebkitTransform: transform1, background: color},
    chartSliceTwoStyle = {transform: transform2, WebkitTransform: transform2, background: color2};

  return {
    chartBackground: chartBackground,
    chartSliceOneStyle: chartSliceOneStyle,
    chartSliceTwoStyle: chartSliceTwoStyle
  };
}

export default async function PieChart(ctx, next) {
  let rawData;
  try {
    rawData = await ctx.tempData.json();
  }
  catch (error) {
    const obj = {
      errorCode: 400,
      errorMessage: 'api error',
      errorDetails: error
    };

    ctx.throw('api response error', 400, obj);
  }

  if (rawData && !rawData.errorCode) {
    const dataObj = getData(rawData, ctx.request.url);
    ctx.normalizeData = Object.assign({}, rawData, {
      pieProps: dataObj.pieProps,
      pieJson: dataObj.pieJson
    });
  }
};
