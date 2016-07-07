import React, {PropTypes} from 'react';
import {
  generateRawData,
  getColumnIndexArrayFromColumnName,
  getIndexFromColumnName,
  getIndexFromObjectName
} from 'utils/utils';

export function generateDataArray(columnIndexArray, rowsArray) {
  let dataset = [];
  if (columnIndexArray.length !== 0) {
    for (let d = 0, rowsLen = rowsArray.length; d < rowsLen; d++) {
      let obj1 = {};
      obj1.label = rowsArray[d][columnIndexArray[0]];
      if (obj1.label.length > 15) {
        obj1.label = obj1.label.substring(0, 15) + ' (...)';
      }
      obj1.value = rowsArray[d][columnIndexArray[1]];
      obj1.toolText = rowsArray[d][columnIndexArray[0]] + ', ' + rowsArray[d][columnIndexArray[1]];
      dataset.push(obj1);
    }
  }
  return dataset;
}

export function generateChartDataSource(rawData, props) {
  const chartOptions = props.chartOptions,
    {fieldMapping, multipleReportIds, displayTopFive, showTrendLines, trendLines} = props.chartData;

  let countValue = 0,
    totalValue = 0,
    top10TotalValue = 0,
    top10CountValue = 0,
    averageValue = '',
    dataset = [];

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
      {rows, columns} = rawData[currentChartData.reportId],
      columnIndexArray = [];

    top10CountValue = 0;
    top10TotalValue = 0;
    averageValue = '';

    // Calculate column index from API response
    if (multipleReportIds) {
      for (let d = 0, rowsLen = rows.length; d < rowsLen; d++) {
        if (currentChartData.reportId === 'taf_asset_count_time_shifted') {
          let fieldValue = '',
            fieldName = currentChartData.columns[0],
            fieldValueArray = [],
            inputArray = {
              fieldName: fieldName,
              fieldValueArray: fieldValueArray,
              fieldValue: fieldValue,
              dataArray: rows[d]
            };

          countValue = getIndexFromObjectName(inputArray);
        }

        if (currentChartData.reportId === 'taf_total_usage') {
          let columnIndex = '';
          columnIndex = getIndexFromColumnName(currentChartData.columns, columns);
          totalValue = rows[d][columnIndex];
        }

        if (currentChartData.reportId === 'taf_top_talkers_connections' ||
          currentChartData.reportId === 'taf_top_talkers_bandwidth') {
          let fieldValue = '',
            columnIndex = '';
          columnIndex = getIndexFromColumnName(currentChartData.columns, columns);
          fieldValue = rows[d][columnIndex];
          let value = Math.round(((fieldValue * 100) / totalValue), 2);
          if (value > 0) {
            top10CountValue = top10CountValue + 1;
            top10TotalValue = top10TotalValue + parseInt(fieldValue);
          }
        }
      }

      const reportId = props.chartData.reportId;
      rows = rawData[reportId].rows;
      let average = top10TotalValue / parseInt(countValue),
        newRawData = [];
      averageValue = Math.round(((average * 100) / totalValue), 2);

      for (let d = 0, rowsLen = rows.length; d < rowsLen; d++) {
        let obj = [];
        obj[0] = rows[d][0];
        let value = Math.round(((rows[d][1] * 100) / totalValue), 2);
        obj[1] = value;
        if (value > 0) {
          newRawData.push(obj);
        }
      }
      columnIndexArray = [0, 1]; // Need to generate this index array dynamically. For now, kept it as hardcode
      dataset = generateDataArray(columnIndexArray, newRawData);
    }
    else {
      columnIndexArray = getColumnIndexArrayFromColumnName(currentChartData.columns, columns);
      dataset = generateDataArray(columnIndexArray, rows);

      if (displayTopFive) {
        dataset.sort(function(a, b) {
          return b.value - a.value;
        });
        dataset = dataset.slice(0, 5);
      }
    }
  }

  const dataSourceObject = {
    chart: Object.assign({
      'bgColor': '#ffffff',
      'showborder': '0',
      'borderThickness': '0',
      'showCanvasBorder': '0',
      'usePlotGradientColor': '0',
      'plotBorderAlpha': '10',
      'placeValuesInside': '1',
      'valueFontColor': '#111111',
      'showAxisLines': '0',
      'axisLineAlpha': '25',
      'numDivLines': '9',
      // 'divLineAlpha': '10',
      'alignCaptionWithCanvas': '0',
      'showAlternateVGridColor': '0',
      'captionFontSize': '14',
      'subcaptionFontSize': '12',
      'subcaptionFontBold': '0',
      'toolTipColor': '#ffffff',
      'toolTipBorderThickness': '0',
      'toolTipBgColor': '#000000',
      'toolTipBgAlpha': '80',
      'toolTipBorderRadius': '2',
      'toolTipPadding': '5',
      'showYAxisValues': '0',
      'showValues': '1',
      'paletteColors': '#2BD8D0,#51DFD8,#71E5DF, #97ECE8,#BAF2F0, #DBF8F7',
      'xAxisNameFontSize': '14',
      'yAxisNameFontSize': '14',
      'labelFontSize': '13'
    }, chartOptions)
  };

  if (dataset.length > 0) dataSourceObject.data = dataset;

  if (showTrendLines && averageValue !== undefined && averageValue !== '') {
    dataSourceObject.trendlines = trendLines;
    dataSourceObject.trendlines[0].line[0].startvalue = averageValue;
    dataSourceObject.trendlines[0].line[0].displayvalue = averageValue +
    (chartOptions.numberSuffix ? chartOptions.numberSuffix : '');
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

  FusionCharts.ready(function() {
    const fusioncharts = new FusionCharts({
      type: 'bar2d',
      renderAt: props.attributes.id,
      width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
      height: props.attributes.chartHeight ? props.attributes.chartHeight : '400',
      dataFormat: 'json',
      containerBackgroundOpacity: '0',
      dataSource: generateChartDataSource(rawData, props)
    });
    fusioncharts.render();
  });
};

class HorizontalBarChart extends React.Component {
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

export default HorizontalBarChart;
