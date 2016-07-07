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
  const {chartOptions, chartData} = props;
  let dataObject = [],
    connectionsValues = [];

  for (let i = 0; i < chartData.fieldMapping.length; i++) {
    let currentChartData = chartData.fieldMapping[i],
      {rows, columns} = rawData[currentChartData.reportId],
      columnIndexArray = [];

    // Calculate column index from API response
    for (let a = 0; a < currentChartData.columns.length; a++) {
      for (let c = 0; c < columns.length; c++) {
        if (currentChartData.columns[a] === columns[c].name) {
          columnIndexArray[a] = c;
          break;
        }
      }
    }

    // Get column data for x-axis
    if (columnIndexArray.length !== 0) {
      let valueIndex = 0;
      for (let a = 0, rowsLen = rows.length; a < rowsLen; a++) {
        let obj1 = {};
        if (rows[a][columnIndexArray[1]] === 'N/A' || rows[a][columnIndexArray[2]] === 'N/A') {
          // continue;
        }
        else {
          let countryCode = rows[a][columnIndexArray[0]],
            value = rows[a][columnIndexArray[3]];
          if (currentChartData.connection !== 'secure') {
            obj1.id = getCountryIDByCountryCode(countryCode);
            obj1.value = value.toString();
            if (value !== null) {
              connectionsValues[valueIndex] = value;
              valueIndex++;
            }
            dataObject.push(obj1);
          }
          if (currentChartData.connection === 'secure') {
            obj1.id = getCountryIDByCountryCode(countryCode);
            obj1.value = value.toString();
            if (value !== null) {
              connectionsValues[valueIndex] = value;
              valueIndex++;
            }
            dataObject.push(obj1);
          }
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

  dataSourceObject.colorrange = {
    'minvalue': '0',
    'startlabel': 'Less',
    'endlabel': 'More',
    'code': 'DBF8F7',
    'gradient': '1',
    'color': [
      {
        'maxvalue': Math.max.apply(Math, connectionsValues),
        'code': '2BD8D0'
      }
    ],
    'maxvalue': 0
  };

  dataSourceObject.data = [{data: dataObject}];

  return dataSourceObject;
}

function getEntityClickUrl(props, dataObj) {
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
          entityClick: function(eventObj, dataObj) {
            const url = getEntityClickUrl(props, dataObj);
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
      <div style={{width: '70%'}}>
        <div style={{fontSize: '14px', color: '#6b7282', fontWeight: '600', position: 'absolute'}}>
          {props.meta.subTitle}
        </div>
        <div id={props.attributes.id} style={{marginTop: '-40px'}}></div>
        {this.renderChart(props)}
        <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '-40px'}}>
          <div>
            <span style={{fontSize: '11px', color: '#6b7282'}}>Secure Connections</span><br />
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              <div style={{backgroundColor: '#2BD8D0', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#51DFD8', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#71E5DF', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#97ECE8', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#BAF2F0', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#DBF8F7', width: '20px', height: '12px'}}></div>
            </div>
          </div>
          <div style={{marginLeft: '40px'}}>
            <span style={{fontSize: '11px', color: '#6b7282'}}>Malicious Connections</span><br />
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              <div style={{backgroundColor: '#F69275', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#F7A48B', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#F9B6A2', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#F8CABB', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#FCDBD2', width: '20px', height: '12px'}}></div>
              <div style={{backgroundColor: '#FEEDE8', width: '20px', height: '12px'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorldMap.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default WorldMap;
