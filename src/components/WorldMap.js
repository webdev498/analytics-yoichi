import React, {PropTypes} from 'react';
import WorldMapLegends from 'components/WorldMapLegends';
import {Colors} from 'theme/colors';
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

function generateChartDataSource(rawData, props, secureColors, maliciousColors) {
  const {chartOptions, chartData} = props;
  let dataObject = [],
    secureConnectionsValues = [],
    maliciousConnectionsValues = [];

  for (let i = 0; i < chartData.fieldMapping.length; i++) {
    let currentChartData = chartData.fieldMapping[i],
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

      let colorRanges = getColorRanges(secureConnectionsValues, maliciousConnectionsValues,
        secureColors, maliciousColors),
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
    'entityFillHoverColor': '#cccccc',
    'nullEntityColor': 'aaaaaa',
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

function getColorRanges(secureConnectionsValues,
  maliciousConnectionsValues,
  secureColors,
  maliciousColors) {
  let secureMaxValue = Math.max.apply(Math, secureConnectionsValues),
    maliciousMaxValue = Math.max.apply(Math, maliciousConnectionsValues),
    secureMidValue = parseInt(secureMaxValue / 6) + 1,
    maliciousMidValue = parseInt(maliciousMaxValue / 6) + 1,
    minSecureRange = 1,
    minMaliciousRange = 1,
    colorIndex = 5,
    secureColorRanges = [],
    maliciousColorRanges = [];

  for (let m = 0; m < 6; m++) {
    let tempColorObj = {};
    if (m === 0) {
      tempColorObj.min = minSecureRange;
    }
    else {
      tempColorObj.min = minSecureRange + 1;
    }
    tempColorObj.max = minSecureRange + secureMidValue;
    minSecureRange = tempColorObj.max;
    tempColorObj.color = secureColors[colorIndex];
    secureColorRanges.push(tempColorObj);

    tempColorObj = {};
    if (m === 0) {
      tempColorObj.min = minMaliciousRange;
    }
    else {
      tempColorObj.min = minMaliciousRange + 1;
    }
    tempColorObj.max = minMaliciousRange + maliciousMidValue;
    minMaliciousRange = tempColorObj.max;
    tempColorObj.color = maliciousColors[colorIndex];
    maliciousColorRanges.push(tempColorObj);

    colorIndex--;
  }
  return {
    secure: secureColorRanges,
    malicious: maliciousColorRanges
  };
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

  renderChart(props, secureColors, maliciousColors) {
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
        dataSource: generateChartDataSource(rawData, props, secureColors, maliciousColors),
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
    const {props} = this,
      secureColors = [
        '#2BD8D0',
        '#51DFD8',
        '#71E5DF',
        '#97ECE8',
        '#BAF2F0',
        '#DBF8F7'
      ],
      maliciousColors = [
        '#F69275',
        '#F7A48B',
        '#F9B6A2',
        '#F8CABB',
        '#FCDBD2',
        '#FEEDE8'
      ],
      style = {
        heading: {
          fontSize: '14px',
          color: Colors.grape,
          fontWeight: '600',
          position: 'absolute',
          marginTop: '-30px'
        }
      };
    return (
      <div>
        <div style={style.heading}>
          {props.meta.subTitle}
        </div>

        <div id={props.attributes.id}></div>{/*marginTop: '-65px'*/}

        {this.renderChart(props, secureColors, maliciousColors)}

        <WorldMapLegends />

      </div>
    );
  }
}

WorldMap.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default WorldMap;
