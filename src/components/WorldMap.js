import React from 'react';

import Card from 'material-ui/lib/card/card';

function getCountryIDByCountryCode(countryCode) {
  const getCountryIDByCountryCode = {"AG":"01","BS":"02","BB":"03","BZ":"04","CA":"05","CR":"06","CU":"07","DM":"08","DO":"09","SV":"10","GD":"11","GT":"12","HT":"13","HN":"14","JM":"15","MX":"16","NI":"17","PA":"18","KN":"19","LC":"20","VC":"21","TT":"22","US":"23","GL":"24","AR":"25","BO":"26","BR":"27","CL":"28","CO":"29","EC":"30","FK":"31","GF":"32","GY":"33","PY":"34","PE":"35","SR":"36","UY":"37","VE":"38","DZ":"39","AO":"40","BJ":"41","BW":"42","BF":"43","BI":"44","CM":"45","CV":"46","CP":"47","TD":"48","KM":"49","CI":"50","CD":"51","DJ":"52","EG":"53","GQ":"54","ER":"55","ET":"56","GA":"57","GH":"58","GN":"59","GW":"60","KE":"61","LS":"62","LI":"63","LR":"64","MS":"65","MW":"66","ML":"67","MR":"68","MA":"69","MZ":"70","NA":"71","NE":"72","NG":"73","RW":"74","ST":"75","SN":"76","SC":"77","SL":"78","SO":"79","ZA":"80","SD":"81","SZ":"82","TZ":"83","TG":"84","TN":"85","UG":"86","WA":"87","ZM":"88","ZW":"89","GM":"90","CG":"91","MI":"92","AF":"93","AM":"94","AZ":"95","BD":"96","BT":"97","BN":"98","MM":"99","KH":"100","CN":"101","TP":"102","GE":"103","IN":"104","ID":"105","IA":"106","JP":"107","KZ":"108","KP":"109","KR":"110","KG":"111","LA":"112","MY":"113","MN":"114","NP":"115","PK":"116","PH":"117","RU":"118","SG":"119","LK":"120","TJ":"121","TH":"122","TM":"123","UZ":"124","VN":"125","TW":"126","HK":"127","MO":"128","AL":"129","AD":"130","AT":"131","BY":"132","BE":"133","BH":"134","BG":"135","HY":"136","CZ":"137","DK":"138","EE":"139","FI":"140","FR":"141","DE":"142","GR":"143","HU":"144","IS":"145","IR":"146","IT":"147","LV":"148","LN":"149","LT":"150","LU":"151","MK":"152","MT":"153","MV":"154","MC":"155","MG":"156","NL":"157","NO":"158","PL":"159","PT":"160","RO":"161","SM":"162","CS":"163","SK":"164","SI":"165","ES":"166","SE":"167","CH":"168","UA":"169","UK":"170","VA":"171","CY":"172","TK":"173","AU":"175","FJ":"176","KI":"177","MH":"178","FM":"179","NR":"180","NZ":"181","PW":"182","PG":"183","WS":"184","SB":"185","TO":"186","TV":"187","VU":"188","NC":"188","BA":"190","IZ":"191","IE":"192","JO":"193","KU":"194","LB":"195","OM":"196","QA":"197","SA":"198","SY":"199","AE":"200","YM":"201","PR":"202","KY":"203","SS":"204","KO":"205"};

  const countryID = getCountryIDByCountryCode[countryCode];
  return countryID;
}

function getData(dataSource) {
  const data = dataSource[0];
  const badReputationData = dataSource[1];
  const items = data.rows;
  const dataSourceObject = {};
  const markersItemsObject = [];
  var topFiveCountries = [];
  var bandwidthUsage = [];
  var minValue = "0";
  var maxValue = "0";
  var markerIdSuffix = 0;

  for (let a=0; a<items.length; a++) {
    const obj1 = {};
    const countryData = {};
    const bandwidthUsageData = {};

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
      const countryCode = items[a][0];
      obj1.shapeid = "circle";
      obj1.label = items[a][3];
      obj1.id = getCountryIDByCountryCode(countryCode) + markerIdSuffix;//getCountryIDByCountryCode[countryCode];//using this function, the world map is not rendering properly.
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
  const items1 = badReputationData.rows;
  for (let a=0; a<items1.length; a++) {
    const obj1 = {};
    if(items1[a][1] === "N/A" || items1[a][2] === "N/A" ) {
      //continue;
    }
    else {
      const countryCode1 = items1[a][0];
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

  const dataSourceObject_1 = {};
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

  const shapesObject = [
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

  const dataSourceObject_2 = {};
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

  const dataSourceObject_3 = {};
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
