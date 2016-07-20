import React, {PropTypes} from 'react';
import WorldMapLegends from 'components/WorldMapLegends';
import {Colors} from 'theme/colors';
import {
  generateRawData,
  getCountryIDByCountryCode,
  isUndefined,
  getColorRanges
} from 'utils/utils';
import {
  generateQueryParams,
  generateClickThroughUrl,
  generatePathParams
} from 'utils/kibanaUtils';

const styles = {
  chartCaption: {
    fontSize: '14px',
    color: Colors.grape,
    fontWeight: '600',
    position: 'absolute',
    marginTop: '-30px'
  }
};

export function generateChartDataSource(rawData, chartOptions, fieldMapping) {
  let dataObject = [],
    secureConnectionsValues = [],
    maliciousConnectionsValues = [];

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
      {rows, columns} = rawData[currentChartData.reportId],
      columnIndexArray = [];

    // Calculate column index from API response
    for (let j = 0; j < currentChartData.columns.length; j++) {
      for (let k = 0; k < columns.length; k++) {
        if (currentChartData.columns[j] === columns[k].name) {
          columnIndexArray[j] = k;
          break;
        }
      }
    }

    // Get column data for x-axis
    if (columnIndexArray.length !== 0) {
      let valueIndex = 0;
      // Calculate max connections values and create color ranges for both secure and malicious connections
      for (let l = 0, rowsLen = rows.length; l < rowsLen; l++) {
        if (rows[l][columnIndexArray[1]] === 'N/A' || rows[l][columnIndexArray[2]] === 'N/A') {
          // continue;
        }
        else {
          let value = rows[l][columnIndexArray[3]];
          if (currentChartData.connection === 'secure' || currentChartData.connection === 'malicious') {
            if (value !== null && parseInt(value) !== 0) {
              if (currentChartData.connection === 'secure') {
                secureConnectionsValues[valueIndex] = value;
              }
              if (currentChartData.connection === 'malicious') {
                maliciousConnectionsValues[valueIndex] = value;
              }
              valueIndex++;
            }
          }
        }
      }

      let colorRanges = getColorRanges(secureConnectionsValues, maliciousConnectionsValues),
        secureColorRanges = colorRanges.secure,
        maliciousColorRanges = colorRanges.malicious;

      for (let n = 0, rowsLen = rows.length; n < rowsLen; n++) {
        let obj1 = {};
        if (rows[n][columnIndexArray[1]] === 'N/A' || rows[n][columnIndexArray[2]] === 'N/A') {
          // continue;
        }
        else {
          let countryCode = rows[n][columnIndexArray[0]],
            value = rows[n][columnIndexArray[3]];
          if (currentChartData.connection === 'secure' || currentChartData.connection === 'malicious') {
            obj1.id = getCountryIDByCountryCode(countryCode);
            obj1.countryCode = countryCode;
            obj1.value = value.toString();
            if (value !== null && parseInt(value) !== 0) {
              if (currentChartData.connection === 'malicious') {
                for (let p = 0; p < maliciousColorRanges.length; p++) {
                  if (maliciousColorRanges[p].min <= parseInt(value) &&
                    maliciousColorRanges[p].max >= parseInt(value)) {
                    obj1.color = maliciousColorRanges[p].color;
                    obj1.connection = 'malicious';
                    break;
                  }
                }
              }
              if (currentChartData.connection === 'secure') {
                for (let p = 0; p < secureColorRanges.length; p++) {
                  if (secureColorRanges[p].min <= parseInt(value) &&
                    secureColorRanges[p].max >= parseInt(value)) {
                    obj1.color = secureColorRanges[p].color;
                    obj1.connection = 'secure';
                    break;
                  }
                }
              }
              valueIndex++;
              dataObject.push(obj1);
            }
          }
        }
      }
    }
  }

  let dataSourceObject = {};
  dataSourceObject.chart = Object.assign({
    'entityFillHoverColor': Colors.smoke,
    'nullEntityColor': Colors.smoke,
    'showLabels': '0',
    'theme': 'zune',
    'showvalue': '0',
    'showLegend': '0',
    'chartLeftMargin': '0',
    'chartRightMargin': '0',
    'chartTopMargin': '0',
    'chartBottomMargin': '0',
    'bgAlpha': '0',
    'canvasTopMargin': '0',
    'canvasBottomMargin': '0'
  }, chartOptions);

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
      chartOptions = props.chartOptions,
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
        dataSource: generateChartDataSource(rawData, chartOptions, fieldMapping),
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
      <div>
        <div style={styles.chartCaption}>
          {props.meta.subTitle}
        </div>

        <div id={props.attributes.id} style={{minHeight: '450px'}}></div>

        {this.renderChart(props)}

        <WorldMapLegends />

      </div>
    );
  }
}

WorldMap.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default WorldMap;
