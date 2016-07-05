import React, {PropTypes} from 'react';
import {
  generateRawData,
  getCountryIDByCountryCode,
  isUndefined
} from 'utils/utils';
import {
  generateQueryParams,
  generateClickThroughUrl,
  generatePathParams
} from 'utils/kibanaUtils';

function generateChartDataSource(rawData, props) {
  const {chartOptions, chartData, shapes} = props;
  let markersItemsObject = [],
    markerIdSuffix = 0,
    dataObject = [],
    connectionsValues = [];

  for (let i = 0; i < chartData.fieldMapping.length; i++) {
    let currentChartData = chartData.fieldMapping[i],
      {rows, columns} = rawData[currentChartData.reportId],
      columnIndexArray = [];

    // Calculate column index from API response
    // for (let a = 0; a < currentChartData.columns.length; a++) {
    //   for (let c = 0; c < columns.length; c++) {
    //     if (currentChartData.columns[a] === columns[c].name) {
    //       columnIndexArray[a] = c;
    //       break;
    //     }
    //   }
    // }

    // Get column data for x-axis
    // if (columnIndexArray.length !== 0) {
    let valueIndex = 0;
    for (let a = 0, rowsLen = rows.length; a < rowsLen; a++) {
      let obj1 = {};
      if (rows[a][1] === 'N/A' || rows[a][2] === 'N/A') {
        // continue;
      }
      else {
        let countryCode = rows[a][0];
        if (currentChartData.shapeid !== 'circle') {
          obj1.shapeid = currentChartData.shapeid;
          obj1.label = rows[a][3];
          obj1.id = getCountryIDByCountryCode(countryCode) + markerIdSuffix;
          obj1.x = rows[a][1];
          obj1.y = rows[a][2];
          obj1.value = rows[a][4];
          obj1.alpha = currentChartData.alpha;

          markersItemsObject.push(obj1);
          markerIdSuffix = markerIdSuffix + 1;
        }
        if (currentChartData.shapeid === 'circle') {
          obj1.id = getCountryIDByCountryCode(countryCode);
          obj1.value = rows[a][4].toString();
          if (rows[a][4] !== null) {
            connectionsValues[valueIndex] = rows[a][4];
            valueIndex++;
          }
          dataObject.push(obj1);
        }
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
    'showLegend': '1',
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

  let shapesObject = [];
  if (!isUndefined(shapes)) {
    shapesObject = shapes;
  }

  // dataSourceObject.markers = {
  //   'shapes': shapesObject,
  //   'items': markersItemsObject
  // };

  // let colorRanges = [];
  // for ()

  dataSourceObject.colorrange = {
    'minvalue': '0',
    'startlabel': 'Less',
    'endlabel': 'More',
    'code': 'BAF2F0',
    'gradient': '1',
    'color': [
      // {
      //   'maxvalue': 50,
      //   'code': 'f8bd19'
      // },
      {
        'maxvalue': Math.max.apply(Math, connectionsValues),
        'code': '2BD8D0'
      }
    ],
    'maxvalue': 0
  };

   // "colorrange": {
   //      "color": [
   //          {
   //              "minvalue": "0",
   //              "maxvalue": "100",
   //              "code": "#D0DFA3",
   //              "displayValue": "< 100M"
   //          },
   //          {
   //              "minvalue": "100",
   //              "maxvalue": "500",
   //              "code": "#B0BF92",
   //              "displayValue": "100-500M"
   //          },
   //          {
   //              "minvalue": "500",
   //              "maxvalue": "1000",
   //              "code": "#91AF64",
   //              "displayValue": "500M-1B"
   //          },
   //          {
   //              "minvalue": "1000",
   //              "maxvalue": "5000",
   //              "code": "#A9FF8D",
   //              "displayValue": "> 1B"
   //          }
   //      ]
   //  },

  dataSourceObject.data = [{data: dataObject}];

  // console.log(JSON.stringify(dataSourceObject));
  return dataSourceObject;
}

function getMarkerClickUrl(props, dataObj) {
  if (!props.kibana) {
    return;
  }
  let parameters = {
      props: props,
      dataObj: dataObj,
      queryParamsArray: props.kibana.queryParams
    },
    queryParams = generateQueryParams(parameters),
    pathParams = generatePathParams(props.kibana.pathParams);
  return generateClickThroughUrl(pathParams, queryParams);
}

class WorldMap extends React.Component {
  static propTypes = {
    attributes: PropTypes.object
  }

  renderChart(props) {
    if (!props.data) {
      return;
    }

    const data = props.data,
      fieldMapping = props.chartData.fieldMapping,
      {clickThrough} = this.context;

    let rawData = {};
    rawData = generateRawData(fieldMapping, data);

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
            const url = getMarkerClickUrl(props, dataObj);
            if (url !== '' && !isUndefined(url)) {
              clickThrough(url);
            }
          }
        }
      });
      fusioncharts.render();
    });

    /*FusionCharts.ready(function() {
      var worldMap = new FusionCharts({
        type: 'maps/worldwithcountries',
        renderAt: 'chart-container',
        width: '600',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          'chart': {
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
          },
          'markers': {
            'shapes': [
              {
                'labelPadding': '15',
                'xscale': '30',
                'id': 'maliciousIcon',
                'type': 'image',
                'yscale': '30',
                'url': '/img/biohazard.png'
              }
            ],
            'items': [
              {
                'shapeid': 'maliciousIcon',
                'label': 'China',
                'id': '10124',
                'x': '1681.14',
                'y': '479.81',
                'value': 50,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'Netherlands',
                'id': '15725',
                'x': '1034.59',
                'y': '381.81',
                'value': 20,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'United States',
                'id': '2326',
                'x': '547.14',
                'y': '484.9',
                'value': 16,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'South Korea',
                'id': '11027',
                'x': '1756.23',
                'y': '497.63',
                'value': 10,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'Mexico',
                'id': '1628',
                'x': '441.5',
                'y': '618.54',
                'value': 5,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'Bangladesh',
                'id': '9629',
                'x': '1533.5',
                'y': '581.63',
                'value': 3,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'Japan',
                'id': '10730',
                'x': '1827.5',
                'y': '504',
                'value': 2,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'Switzerland',
                'id': '16831',
                'x': '1049.87',
                'y': '426.36',
                'value': 1,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'Sweden',
                'id': '16732',
                'x': '1105.87',
                'y': '319.45',
                'value': 1,
                'alpha': '100'
              },
              {
                'shapeid': 'maliciousIcon',
                'label': 'Vietnam',
                'id': '12533',
                'x': '1623.87',
                'y': '594.36',
                'value': 1,
                'alpha': '100'
              }
            ]
          },
          'colorrange': {
            'minvalue': '0',
            'startlabel': 'Low',
            'endlabel': 'High',
            'code': 'e44a00',
            'gradient': '1',
            'color': [
              {
                'maxvalue': 50,
                'code': 'f8bd19'
              },
              {
                'maxvalue': 1000,
                'code': '6baa01'
              }
            ],
            'maxvalue': 0
          },
          'data': [
            {
              'data': [
                {
                  'id': '104',
                  'value': '1000'
                }
              ]
            }
          ]
        }
      }).render();
    });*/
    /*FusionCharts.ready(function() {
      var airportsMap = new FusionCharts({
        type: 'maps/worldwithcountries',
        renderAt: 'chart-container',
        width: '600',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          'chart': {
            'theme': 'zune',
            'showMarkerLabels': '1',
            'entityFillColor': '#A8A8A8',
            'entityFillHoverColor': '#E5E5E9'
          },
          'markers': {
            'shapes': [{
              'id': 'myCustomShape',
              'type': 'image',
              'url': 'http://static.fusioncharts.com/docs/assets/airplane-99047_150.png',
              'xscale': '35',
              'yscale': '35',

              'labelPadding': '15'
            }],
            'items': [
              {
                'id': 'lon',
                'shapeid': 'myCustomShape',
                'x': '340.23',
                'y': '125.9',
                'label': 'LHR',
                'tooltext': 'Heathrow International Airport {br}IACL Code : EGLL',
                'labelpos': 'left'
              }
            ]
          },
          'colorrange': {
            'minvalue': '0',
            'startlabel': 'Low',
            'endlabel': 'High',
            'code': 'e44a00',
            'gradient': '1',
            'color': [{
              'maxvalue': 50,
              'code': 'f8bd19'
            }, {
              'maxvalue': 1000,
              'code': '6baa01'
            }],
            'maxvalue': 0
          },
          'data': [{
            'data': [{
              'id': '104',
              'value': '1000'
            }]
          }]
        }
      }).render();
    });*/
  }

  render() {
    const {props} = this;
    return (
      <div style={{width: '70%'}}>
        <div className='chartCaption'>{props.meta.subTitle}</div>
        <div style={{textAlign: 'center'}}><br />
          <img src='img/biohazard.png' width='20' height='20' />&nbsp;Malicious Connections
        </div>
        <div id={props.attributes.id}></div>
        {this.renderChart(props)}
      </div>
    );
  }
}

WorldMap.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default WorldMap;
