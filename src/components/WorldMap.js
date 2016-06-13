import React from 'react';

import Card from 'material-ui/Card/Card';

import {getCountryIDByCountryCode} from 'utils/utils';

function generateChartDataSourceOld(dataSource) {
  var data = dataSource[0];
  var badReputationData = dataSource[1];
  var items = data.rows;
  var dataSourceObject = {};
  var markersItemsObject = [];
  var topFiveCountries = [];
  var bandwidthUsage = [];
  var minValue = "0";
  var maxValue = "0";
  var markerIdSuffix = 0;

  for (var a=0; a<items.length; a++) {
    var obj1 = {};
    var countryData = {};
    var bandwidthUsageData = {};

    countryData.label = items[a][3];
    countryData.value = items[a][4];

    bandwidthUsageData.label = items[a][3];
    bandwidthUsageData.value = items[a][5];

    topFiveCountries.push(countryData);
    bandwidthUsage.push(bandwidthUsageData);

    if(items[a][1] === "N/A" || items[a][2] === "N/A") {
      //continue;
    }
    else {
      var countryCode = items[a][0];
      obj1.shapeid = "circle";
      obj1.label = items[a][3];
      obj1.id = getCountryIDByCountryCode(countryCode) + markerIdSuffix;
      obj1.x = items[a][1];
      obj1.y = items[a][2];
      obj1.value = items[a][4];
      obj1.alpha = "60";

      markersItemsObject.push(obj1);

      if (a == 0)
        minValue = items[a][4];
      if (a == (items.length - 1))
        maxValue = items[a][4];

      markerIdSuffix = markerIdSuffix + 1;
    }
  }

  topFiveCountries.sort(function(a, b) {
      return b.value - a.value;
  });

  bandwidthUsage.sort(function(a, b) {
      return b.value - a.value;
  });

  topFiveCountries = topFiveCountries.slice(0, 5);
  bandwidthUsage = bandwidthUsage.slice(0, 5);

  /***************************************/
  var items1 = badReputationData.rows;
  for (var a=0; a<items1.length; a++) {
    var obj1 = {};
    if(items1[a][1] === "N/A" || items1[a][2] === "N/A" ) {
      //continue;
    }
    else {
      var countryCode1 = items1[a][0];
      obj1.shapeid = "maliciousIcon";
      obj1.label = items1[a][3];
      obj1.id = getCountryIDByCountryCode(countryCode1) + markerIdSuffix;
      obj1.x = items1[a][1];
      obj1.y = items1[a][2];
      obj1.value = items1[a][4];
      obj1.alpha = "100";

      markersItemsObject.push(obj1);
      markerIdSuffix = markerIdSuffix + 1;
    }
  }
  /***************************************/

  var dataSourceObject_1 = {};
  dataSourceObject_1.chart = {
                "entityFillHoverColor": "#cccccc",
                "nullEntityColor" : "aaaaaa",
                "showLabels": "0",
                "theme":"zune",
                "useValuesForMarkers": "1",
                "showMarkerLabels":"0",
                "showvalue":"0",
                "autoScaleMarkers":"0",
                "showLegend":"0",
                "chartLeftMargin": "0",
                "chartRightMargin": "0",
                "chartTopMargin": "0",
                "chartBottomMargin": "0",
                "markerBgColor": "#00AFF0",
                "alignCaptionWithCanvas": "0",
                "captionFontSize": "14",
                "captionFontColor": "#555555",
                "bgAlpha":"0",
        };

  var shapesObject = [
          {
              "id": "maliciousIcon",
              "type": "image",
              "url": "/img/biohazard.png",
              "xscale": "30",
              "yscale": "30",
              "labelPadding": "15"
          }
      ];

  dataSourceObject_1.markers = {
    "shapes": shapesObject,
    "items":markersItemsObject
  };

  var dataSourceObject_2 = {};
  dataSourceObject_2.chart = {
                "caption": "Top 5 Connections",
                "bgColor": "#ffffff",
                "showBorder": "0",
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
                "captionFontSize": "12",
                "subcaptionFontSize": "12",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5",
                "useRoundEdges":"1",
                "showYAxisValues":"0",
                "showValues":"0",
                "paletteColors": "#ACF50F,#D93609,#FCFC0D, #05E9F5,#0505F5",
        };
  dataSourceObject_2.data = topFiveCountries;

  var dataSourceObject_3 = {};
  dataSourceObject_3.chart = {
                "caption": "Top 5 Bandwidth",
                "bgColor": "#ffffff",
                "showBorder": "0",
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
                "captionFontSize": "12",
                "subcaptionFontSize": "12",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5",
                "useRoundEdges":"1",
                "showYAxisValues":"0",
                "showValues":"0",
                "paletteColors": "#ACF50F,#D93609,#FCFC0D, #05E9F5,#0505F5",
        };
  dataSourceObject_3.data = bandwidthUsage;

  dataSourceObject.countriesContactedMapDataSource = dataSourceObject_1;
  dataSourceObject.topFiveCountriesDataSource = dataSourceObject_2;
  dataSourceObject.topBandwidthCountriesDataSource = dataSourceObject_3;

  return dataSourceObject;
};

function generateChartDataSource(rawData, props) {
  const chartOptions = props.chartOptions;
  const chartData = props.chartData;
  let markersItemsObject = [];
  let minValue = "0";
  let maxValue = "0";
  let markerIdSuffix = 0;

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

    //Calculate column index from API response
    for (let a = 0; a < currentChartData.columns.length; a++) {
      for (let c = 0; c < columnsArray.length; c++) {
        if (currentChartData.columns[a] === columnsArray[c].name) {
          columnIndexArray[a] = c;
          break;
        }
      }
    }

    //Get column data for x-axis
    //if (columnIndexArray.length !== 0) {
      for (let a = 0, rowsLen = currentDataRows.length; a < rowsLen; a++) {
        let obj1 = {};
        if(currentDataRows[a][1] === "N/A" || currentDataRows[a][2] === "N/A") {
          //continue;
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

          if (a == 0)
            minValue = currentDataRows[a][4];
          if (a == (currentDataRows.length - 1))
            maxValue = currentDataRows[a][4];

          markerIdSuffix = markerIdSuffix + 1;
        }
      }
    //}
  }

  let dataSourceObject = {};
  dataSourceObject.chart = {
    "entityFillHoverColor": "#cccccc",
    "nullEntityColor" : "aaaaaa",
    "showLabels": "0",
    "theme":"zune",
    "useValuesForMarkers": "1",
    "showMarkerLabels":"0",
    "showvalue":"0",
    "autoScaleMarkers":"0",
    "showLegend":"0",
    "chartLeftMargin": "0",
    "chartRightMargin": "0",
    "chartTopMargin": "0",
    "chartBottomMargin": "0",
    "markerBgColor": "#00AFF0",
    "alignCaptionWithCanvas": "0",
    "captionFontSize": "14",
    "captionFontColor": "#555555",
    "bgAlpha":"0",
  };

  var shapesObject = [
    {
      "id": "maliciousIcon",
      "type": "image",
      "url": "/img/biohazard.png",
      "xscale": "30",
      "yscale": "30",
      "labelPadding": "15"
    }
  ];

  dataSourceObject.markers = {
    "shapes": shapesObject,
    "items":markersItemsObject
  };

  return dataSourceObject;
}

const renderChart = (props) => {
  if(!props.data) {
    return;
  }

  if(!props.chartData) {
    return;
  }

  const mainData = props.data;
  const chartData = props.chartData;

  let rawData = {};
  for (let i = 0; i < chartData.length; i++) {
    let currentChartData = chartData[i];
    if (props.multiData === null && mainData[currentChartData.reportId] === undefined){
      return;
    } else {
      if (!rawData.hasOwnProperty(currentChartData.reportId)) {
        rawData[currentChartData.reportId] = mainData[currentChartData.reportId];
      }
    }
  }

  // const dataSourceObject = generateChartDataSource(rawData, props);
  // console.log(dataSourceObject);

  FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'maps/worldwithcountries',
      renderAt: props.attributes.id[0],
      width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
      height: props.attributes.chartHeight ? props.attributes.chartHeight : '400',
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: generateChartDataSource(rawData, props)
  });
      fusioncharts.render();
  });

  /*FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'bar2d',
      renderAt: props.attributes.id[1],
      width: '100%',
      height: '200',
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: dataSourceObject.topFiveCountriesDataSource
  });
      fusioncharts.render();
  });

  FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'bar2d',
      renderAt: props.attributes.id[2],
      width: '100%',
      height: '200',
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: dataSourceObject.topBandwidthCountriesDataSource
  });
      fusioncharts.render();
  });*/
}

const WorldMap = (props) => (
  <div style={{width:'100%'}}>
    <div className="chartCaption">{props.meta.subTitle}</div>
    <div style={{textAlign:'center'}}><br/>
      <img src="/img/biohazard.png" width="20" height="20"/>&nbsp;Malicious Connections
    </div>
    <div id={props.attributes.id[0]}></div>
    <div>
      <div id={props.attributes.id[1]} style={{width:'50%',float:'left'}}></div>
      <div id={props.attributes.id[2]} style={{width:'50%',float:'left'}}></div>
    </div>
    {renderChart(props)}
  </div>
)

export default WorldMap;
