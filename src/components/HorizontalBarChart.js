import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import {
  generateRawData,
  getColumnIndexArrayFromColumnName,
  getIndexFromColumnName,
  getIndexFromObjectName,
  isUndefined
} from 'utils/utils';

export function generateDataArray(columnIndexArray, rowsArray, displayTopFive) {
  let dataset = [],
    annotationItems = [];
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

      annotationItems = annotationItems.concat([
        /*{
          'id': 'datasetline' + d + '-1',
          'type': 'line',
          'x': '$dataset.0.set.' + d + '.STARTX',
          'y': '$dataset.0.set.' + d + '.STARTY',
          'toX': '$canvasEndX',
          'toY': '$dataset.0.set.' + d + '.STARTY',
          'thickness': '1',
          'color': '#E5E5EA'
        },
        {
          'id': 'datasetline' + d + '-2',
          'type': 'line',
          'x': '$dataset.0.set.' + d + '.ENDX',
          'y': '$dataset.0.set.' + d + '.ENDY',
          'toX': '$canvasEndX',
          'toY': '$dataset.0.set.' + d + '.ENDY',
          'thickness': '1',
          'color': '#E5E5EA'
        },*/
        {
          'id': 'datasetlabel' + d,
          'type': 'text',
          'text': obj1.label,
          'align': 'left',
          'x': '$chartEndX - 146',
          'y': '$dataset.0.set.' + d + '.CenterY',
          'fontSize': '11',
          'color': '#6B7282',
          'font': 'Open Sans, sans-serif'
        }
      ]);

      if (!isUndefined(displayTopFive) && displayTopFive && d === 4) {
        break;
      }
    }
  }
  return {
    dataset: dataset,
    annotationItems: annotationItems
  };
}

export function generateChartDataSource(rawData, props) {
  const chartOptions = props.chartOptions,
    {fieldMapping, multipleReportIds, displayTopFive, showTrendLines, trendLines} = props.chartData;

  let countValue = 0,
    totalValue = 0,
    top10TotalValue = 0,
    top10CountValue = 0,
    averageValue = '',
    dataset = [],
    annotationItems = [],
    dataArray = [];

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
      dataArray = generateDataArray(columnIndexArray, newRawData, displayTopFive);
      dataset = dataArray.dataset;
      annotationItems = dataArray.annotationItems;
    }
    else {
      // if (currentChartData.reportId === 'taf_dest_countries,taf_dest_bad_reputation_countries' ||
      //  currentChartData.reportId === 'taf_source_countries,taf_source_bad_reputation_countries') {
      // }
      // else {
        columnIndexArray = getColumnIndexArrayFromColumnName(currentChartData.columns, columns);
        dataArray = generateDataArray(columnIndexArray, rows, displayTopFive);
        dataset = dataArray.dataset;
        annotationItems = dataArray.annotationItems;

        if (displayTopFive) {
          dataset.sort(function(a, b) {
            return b.value - a.value;
          });
          dataset = dataset.slice(0, 5);
        }
      // }
    }
  }

  annotationItems.push(
    {
      'id': 'canvas-bg',
      'type': 'image',
      'alpha': '20',
      'url': 'img/canvas-grid-bg.png',
      'x': '$CanvasStartX',
      'tox': '$canvasEndX',
      'y': '$CanvasStartY',
      'toy': '$canvasEndY'
    }
  );

  const dataSourceObject = {
    chart: Object.assign({
      'paletteColors': '#2BD8D0,#51DFD8,#71E5DF, #97ECE8,#BAF2F0, #DBF8F7',
      'bgColor': '#ffffff',
      'showBorder': '0',
      'showCanvasBorder': '0',
      'usePlotGradientColor': '0',
      'placeValuesInside': '1',
      'valueFontColor': '#444C63',
      'showAxisLines': '1',
      'axisLineAlpha': '15',
      'alignCaptionWithCanvas': '0',
      'showAlternateVGridColor': '0',
      'captionFontSize': '14',
      'subcaptionFontSize': '14',
      'subcaptionFontBold': '0',
      'showLabels': '0',
      'divLineAlpha': '50',
      'divLineColor': '#E5E5EA',
      'divLineThickness': '1',
      'plotBorderAlpha': '0',
      'chartRightMargin': '150',
      'animation': '0',
      'toolTipColor': '#ffffff',
      'toolTipBorderThickness': '0',
      'toolTipBgColor': '#000000',
      'toolTipBgAlpha': '80',
      'toolTipBorderRadius': '2',
      'toolTipPadding': '5',
      'showYAxisValues': '0',
      'showValues': '1',
      'xAxisNameFontSize': '14',
      'yAxisNameFontSize': '14',
      'labelFontSize': '13',
      'chartLeftMargin': '0',
      'numDivLines': '4'
      // 'canvasBgColor': '#ff0000'
    }, chartOptions),
    'annotations': {'groups': [{'items': annotationItems}]}
  };

  if (dataset.length < 5) {
    dataSourceObject.chart = Object.assign(dataSourceObject.chart, {'Plotspacepercent': '100'});
  }

  if (dataset.length > 0) {
    dataSourceObject.data = dataset;
  }

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
    const {props} = this,
      style = {
        heading: {
          fontSize: '14px',
          color: Colors.grape,
          fontWeight: '600',
          position: 'absolute'
        }
      };
    return (
      <div style={props.attributes.chartBorder}>
        <div style={Object.assign({}, style.heading, props.attributes.chartCaption)}>{props.meta.title}</div>
        <div id={props.attributes.id} style={props.attributes.style}>{renderChart(props)}</div>
        <div id={props.attributes.id1}></div>
      </div>
    );
  }
}

export default HorizontalBarChart;
