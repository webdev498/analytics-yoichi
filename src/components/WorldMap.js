import React, {PropTypes} from 'react';
import {
  generateRawData,
  getCountryIDByCountryCode,
  generateQueryParams,
  generateClickThroughUrl,
  isUndefined,
  generatePathParams
} from 'utils/utils';

function generateChartDataSource(rawData, props) {
  const {chartOptions, chartData, shapes} = props;
  let markersItemsObject = [],
    markerIdSuffix = 0;

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
    for (let a = 0, rowsLen = rows.length; a < rowsLen; a++) {
      let obj1 = {};
      if (rows[a][1] === 'N/A' || rows[a][2] === 'N/A') {
        // continue;
      }
      else {
        let countryCode = rows[a][0];
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

  let shapesObject = [];
  if (!isUndefined(shapes)) {
    shapesObject = shapes;
  }

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
  }

  render() {
    const {props} = this;
    return (
      <div style={{width: '100%'}}>
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
