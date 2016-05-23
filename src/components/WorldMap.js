import React from 'react';

import Card from 'material-ui/lib/card/card';

import {getCountryIDByCountryCode} from 'utils/utils';

function getData(dataSource) {
  const data = dataSource[0];
  const badReputationData = dataSource[1];
  const items = data.rows;
  var dataSourceObject = {};
  var markersItemsObject = [];
  var topFiveCountries = [];
  var bandwidthUsage = [];
  var minValue = "0";
  var maxValue = "0";
  var markerIdSuffix = 0;

  for (let a=0; a<items.length; a++) {
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
  for (let a=0; a<items1.length; a++) {
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

const renderChart = (props) => {
  if(props.multiData == null) {
    return;
  }
  if(props.multiData[0] == null || props.multiData[1] == null) {
    return;
  }
  const dataSourceObject = getData(props.multiData);

  FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'maps/worldwithcountries',
      renderAt: props.id[0],
      width: '100%',
      height: '400',
      dataFormat: 'json',
      dataSource: dataSourceObject.countriesContactedMapDataSource
  });
      fusioncharts.render();
  });

  FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'bar2d',
      renderAt: props.id[1],
      width: '100%',
      height: '200',
      dataFormat: 'json',
      dataSource: dataSourceObject.topFiveCountriesDataSource
  });
      fusioncharts.render();
  });

  FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'bar2d',
      renderAt: props.id[2],
      width: '100%',
      height: '200',
      dataFormat: 'json',
      dataSource: dataSourceObject.topBandwidthCountriesDataSource
  });
      fusioncharts.render();
  });
}

const WorldMap = (props) => (
  <div>
    <div className="chartCaption">Number of {props.mapType} Connections By Country</div>
    <div style={{textAlign:'center'}}><br/>
      <img src="/img/biohazard.png" width="20" height="20"/>&nbsp;Malicious Connections
    </div>
    <div id={props.id[0]}></div>
    <div style={{width:'100%'}}>
      <div id={props.id[1]} style={{width:'50%',float:'left'}}></div>
      <div id={props.id[2]} style={{width:'50%',float:'left'}}></div>
    </div>
    {renderChart(props)}
  </div>
)

export default WorldMap;
