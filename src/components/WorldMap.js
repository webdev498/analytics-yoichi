import React from 'react';
import {generateRawData, getCountryIDByCountryCode, getCountryCodeByCountryName, getTimePairFromWindow} from 'utils/utils';
import {baseUrl} from 'config';

function generateChartDataSource(rawData, props) {
  const {chartOptions, chartData} = props;
  let markersItemsObject = [],
    minValue = '0',
    maxValue = '0',
    markerIdSuffix = 0;

  for (let i = 0; i < chartData.length; i++) {
    let currentChartData = chartData[i];
    let currentDataRows = [];
    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].rows !== undefined) {
      currentDataRows = rawData[currentChartData.reportId].rows;
    }
    let columnIndexArray = [];
    let columnsArray = [];
    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].columns !== undefined) {
      columnsArray = rawData[currentChartData.reportId].columns;
    }

    // Calculate column index from API response
    for (let a = 0; a < currentChartData.columns.length; a++) {
      for (let c = 0; c < columnsArray.length; c++) {
        if (currentChartData.columns[a] === columnsArray[c].name) {
          columnIndexArray[a] = c;
          break;
        }
      }
    }

    // Get column data for x-axis
    // if (columnIndexArray.length !== 0) {
    for (let a = 0, rowsLen = currentDataRows.length; a < rowsLen; a++) {
      let obj1 = {};
      if (currentDataRows[a][1] === 'N/A' || currentDataRows[a][2] === 'N/A') {
        // continue;
      }
      else {
        let countryCode = currentDataRows[a][0];
        obj1.shapeid = currentChartData.shapeid;
        obj1.label = currentDataRows[a][3];
        obj1.id = getCountryIDByCountryCode(countryCode) + markerIdSuffix;
        obj1.x = currentDataRows[a][1];
        obj1.y = currentDataRows[a][2];
        obj1.value = currentDataRows[a][4];
        obj1.alpha = currentChartData.alpha;

        markersItemsObject.push(obj1);

        if (a === 0) {
          minValue = currentDataRows[a][4];
        }
        if (a === (currentDataRows.length - 1)) {
          maxValue = currentDataRows[a][4];
        }

        markerIdSuffix = markerIdSuffix + 1;
      }
    }
  }

  let dataSourceObject = {};
  dataSourceObject.chart = Object.assign({
    'entityFillHoverColor': '#cccccc',
    'nullEntityColor': 'aaaaaa',
    'showLabels': '0',
    'theme': 'zune',
    'useValuesForMarkers': '1',
    'showMarkerLabels': '0',
    'showvalue': '0',
    'autoScaleMarkers': '0',
    'showLegend': '0',
    'chartLeftMargin': '0',
    'chartRightMargin': '0',
    'chartTopMargin': '0',
    'chartBottomMargin': '0',
    'markerBgColor': '#00AFF0',
    'alignCaptionWithCanvas': '0',
    'captionFontSize': '14',
    'captionFontColor': '#555555',
    'bgAlpha': '0'
  }, chartOptions);

  var shapesObject = [
    {
      'id': 'maliciousIcon',
      'type': 'image',
      'url': '/img/biohazard.png',
      'xscale': '30',
      'yscale': '30',
      'labelPadding': '15'
    }
  ];

  dataSourceObject.markers = {
    'shapes': shapesObject,
    'items': markersItemsObject
  };

  return dataSourceObject;
}

function getMarkerClickUrl(props, dataObj) {
  if (!props.kibana) {
    return;
  }

  let label = dataObj.label,
    countryName = label.split(','),
    countryCode = getCountryCodeByCountryName[countryName[0]],
    pair = getTimePairFromWindow(props.duration, ''),
    dateTime1 = pair.fromDate,
    dateTime2 = pair.toDate;

  const url = baseUrl + '/kibana/query/' + props.kibana.pathParams.queryId + '?country=' + countryCode + '&from=' +
    dateTime1 + '&to=' + dateTime2;
  // this.context.clickThrough(url);
  console.log(url);
}

const renderChart = (props) => {
  if (!props.data) {
    return;
  }

  const data = props.data,
    fieldMapping = props.chartData.fieldMapping;

  let rawData = {};
  rawData = generateRawData(fieldMapping, data);
  // console.log(JSON.stringify(rawData));
  // const mainData = props.data;
  // const chartData = props.chartData;

  // let rawData = {};
  // for (let i = 0; i < chartData.length; i++) {
  //   let currentChartData = chartData[i];
  //   if (props.multiData === null && mainData[currentChartData.reportId] === undefined) {
  //     return;
  //   }
  //   else {
  //     if (!rawData.hasOwnProperty(currentChartData.reportId)) {
  //       rawData[currentChartData.reportId] = mainData[currentChartData.reportId];
  //     }
  //   }
  // }

  //const dataSourceObject = generateChartDataSource(rawData, props);
  // console.log(dataSourceObject);

  FusionCharts.ready(function() {
    const fusioncharts = new FusionCharts({
      type: 'maps/worldwithcountries',
      renderAt: props.attributes.id,
      width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
      height: props.attributes.chartHeight ? props.attributes.chartHeight : '400',
      dataFormat: 'json',
      containerBackgroundOpacity: '0',
      dataSource: generateChartDataSource(rawData, props),
      events: {
        markerClick: function(eventObj, dataObj) {
          getMarkerClickUrl(props, dataObj);
        }
      }
    });
    fusioncharts.render();
  });
};

const WorldMap = (props) => (
  <div style={{width: '100%'}}>
    <div className='chartCaption'>{props.meta.subTitle}</div>
    <div style={{textAlign: 'center'}}><br />
      <img src='/img/biohazard.png' width='20' height='20' />&nbsp;Malicious Connections
    </div>
    <div id={props.attributes.id}></div>
    {renderChart(props)}
  </div>
);

export default WorldMap;
