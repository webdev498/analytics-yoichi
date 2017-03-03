import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';
import {
  generateRawData,
  getIndexFromObjectName,
  getIndexFromColumnName,
  checkForUndefinedChartOptionObject
} from '../../../commons/utils/utils';

import PercentageWidget from 'components/widgets/PercentageWidget';

const styles = {
  'pieWrap': {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '0px',
    justifyContent: 'center',
    height: '400px',
    marginTop: '-30px'
  },
  'percentageDisplay': {
    fontSize: '35px',
    color: Colors.bar
  },
  'legend1': {
    fontSize: '13px',
    color: Colors.pebble
  },
  'legend2': {
    fontSize: '13px',
    color: Colors.smoke
  },
  noData: {}
};

let highlightedColor1 = Colors.bar,
  highlightedColor2 = Colors.coral,
  nonHighlightedColor = Colors.cloud,
  pieChartAttributes = {},
  countValue = 0,
  totalValue = 0,
  top10TotalValue = 0,
  top10CountValue = 0,
  background = '',
  background2 = '',
  color = '',
  color2 = '',
  transform1 = '',
  transform2 = '',
  calculateTransform1 = 0,
  calculateTransform2 = 0;

export function generatePieChart(inputArray) {
  pieChartAttributes = {}; // This initialization is required
  const doughnutInputArray1 = {
      countValue: inputArray.countValue,
      totalValue: inputArray.top10CountValue
    },
    pieChartAttributes1 = calculatePieChartAttributes(doughnutInputArray1, 1),
    doughnutInputArray2 = {
      countValue: inputArray.totalValue,
      totalValue: inputArray.top10TotalValue
    },
    pieChartAttributes2 = calculatePieChartAttributes(doughnutInputArray2, 2),
    percentage1 = Math.round((inputArray.top10CountValue / parseInt(inputArray.countValue)) * 100, 2),
    percentage2 = Math.round((inputArray.top10TotalValue / parseInt(inputArray.totalValue)) * 100, 2),
    displayPercentage1 = percentage1.toString() + '%',
    displayPercentage2 = isNaN(percentage2) ? '0%' : percentage2.toString() + '%',
    percentage2Color = {fontWeight: 'bold', color: highlightedColor1},
    percentage1Color = {fontWeight: 'bold', color: highlightedColor2},
    style = {percentageText: {}};

  if (percentage2 === 100 || isNaN(percentage2)) {
    style.percentageText = {
      paddingLeft: '0px'
    };
  }

  pieChartAttributes = {
    chart1Background: pieChartAttributes1.chartBackground,
    chart1SliceOneStyle: pieChartAttributes1.chartSliceOneStyle,
    chart1SliceTwoStyle: pieChartAttributes1.chartSliceTwoStyle,
    chart2Background: pieChartAttributes2.chartBackground,
    chart2SliceOneStyle: pieChartAttributes2.chartSliceOneStyle,
    chart2SliceTwoStyle: pieChartAttributes2.chartSliceTwoStyle,
    percentage1Color: percentage1Color,
    percentage2Color: percentage2Color,
    displayPercentage1: displayPercentage1,
    displayPercentage2: displayPercentage2,
    percentage1: percentage1.toString(),
    percentageTextStyle: style.percentageText
  };
  return pieChartAttributes;
}

export function calculatePieChartAttributes(inputArray, chartId) {
  let {countValue, totalValue} = inputArray,
    percentage = Math.round((totalValue / parseInt(countValue)) * 100, 2);

  background = '';
  background2 = '';
  color = '';
  color2 = '';
  transform1 = '';
  transform2 = '';
  calculateTransform1 = 0;
  calculateTransform2 = 0;

  if (percentage === 0) {
    percentage = Math.round((totalValue / parseInt(countValue)) * 100, 4);
  }
  if (percentage > 100) {
    percentage = 100;
  }
  background = nonHighlightedColor;
  color = (chartId === 1) ? highlightedColor2 : highlightedColor1;
  background2 = background;
  color2 = color;
  transform1 = 'rotate(90deg)';
  calculateTransform2 = (percentage / 100 * 360);
  transform2 = 'rotate(' + calculateTransform2 + 'deg)';

  if (percentage < 50) {
    background = color;
    color = background2;
    color2 = background2;
    calculateTransform1 = (percentage / 100 * 360 + 90);
    transform1 = 'rotate(' + calculateTransform1 + 'deg)';
    transform2 = 'rotate(0deg)';
  }

  const chartBackground = {background: background},
    chartSliceOneStyle = {transform: transform1, WebkitTransform: transform1, background: color},
    chartSliceTwoStyle = {transform: transform2, WebkitTransform: transform2, background: color2};

  return {
    chartBackground: chartBackground,
    chartSliceOneStyle: chartSliceOneStyle,
    chartSliceTwoStyle: chartSliceTwoStyle
  };
}

function renderChart(props) {
  if (!props.data) {
    return;
  }

  if (props.data && props.chartData &&
    props.chartData.fieldMapping &&
    props.chartData.fieldMapping[0] &&
    props.chartData.fieldMapping[0].reportId &&
    props.data[props.chartData.fieldMapping[0].reportId].rows &&
    props.data[props.chartData.fieldMapping[0].reportId].rows.length === 0) {
    styles.noData = {
      display: 'none'
    };
    return;
  }

  styles.noData = {};

  const data = props.data,
    fieldMapping = props.chartData.fieldMapping,
    chartOptions = props.chartOptions;

  let rawData = {};

  highlightedColor1 = checkForUndefinedChartOptionObject(chartOptions, 'highlightedColor1', highlightedColor1);
  highlightedColor2 = checkForUndefinedChartOptionObject(chartOptions, 'highlightedColor2', highlightedColor2);
  nonHighlightedColor = checkForUndefinedChartOptionObject(chartOptions, 'nonHighlightedColor', nonHighlightedColor);

  rawData = generateRawData(fieldMapping, data);

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
      {rows, columns} = rawData[currentChartData.reportId],
      columnIndex = '';
    top10CountValue = 0;
    top10TotalValue = 0;

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

      if (currentChartData.reportId === 'taf_s3_requester' || currentChartData.reportId === 'taf_s3_ua' ||
        currentChartData.reportId === 'taf_sysmon_unique_process_count' ||
        currentChartData.reportId === 'taf_ct_events_by_user') {
        columnIndex = getIndexFromColumnName(currentChartData.columns, columns);
        countValue = rows[d][columnIndex];
      }

      if (currentChartData.reportId === 'taf_total_usage' || currentChartData.reportId === 'taf_s3_total' ||
          currentChartData.reportId === 'taf_sysmon_total_network_conn_count' ||
          currentChartData.reportId === 'taf_ct_total') {
        columnIndex = getIndexFromColumnName(currentChartData.columns, columns);
        totalValue = rows[d][columnIndex];
      }

      if (currentChartData.reportId === 'taf_top_talkers_connections' ||
       currentChartData.reportId === 'taf_top_talkers_bandwidth' ||
       currentChartData.reportId === 'taf_s3_most_frequent_useragent' ||
       currentChartData.reportId === 'taf_s3_most_active_requester' ||
       currentChartData.reportId === 'taf_processes_with_most_network_conn' ||
       currentChartData.reportId === 'taf_ct_most_active_user') {
        let fieldValue = '';
        columnIndex = getIndexFromColumnName(currentChartData.columns, columns);
        fieldValue = rows[d][columnIndex];
        let value = Math.round(((fieldValue * 100) / totalValue), 2);
        if (value > 0) {
          top10CountValue = top10CountValue + 1;
          top10TotalValue = top10TotalValue + parseInt(fieldValue);
        }
      }
    }
  }

  let inputArray = {
    countValue: countValue,
    top10CountValue: top10CountValue,
    top10TotalValue: top10TotalValue,
    totalValue: totalValue.toPrecision()
  };

  pieChartAttributes = generatePieChart(inputArray);
}

class PieChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    tableOptions: PropTypes.object
  }
  render() {
    const {props} = this;

    renderChart(props);

    return (
      <div style={{...styles.noData}}>
        <div style={styles.pieWrap}>
          <div className='pieCard'>
            <div className='pie-chart chart' style={pieChartAttributes.chart2Background}>
              <div className='slice one' style={pieChartAttributes.chart2SliceOneStyle} />
              <div className='slice two' style={pieChartAttributes.chart2SliceTwoStyle} />
              <div className='chart-center'>
                <span style={pieChartAttributes.percentageTextStyle}>
                  {pieChartAttributes.displayPercentage2}
                </span>
              </div>
            </div>
          </div>

          <div style={{paddingLeft: '50px', paddingRight: '50px'}}>
            <PercentageWidget iconName='desktop_mac' percentage={pieChartAttributes.percentage1} />
          </div>

          <div>
            <span style={styles.percentageDisplay}>{pieChartAttributes.displayPercentage2}</span>
            <br />
            <span style={styles.legend1}>{props.meta.legend[0]}</span>
            <br /><br />
            <span style={styles.legend2}>{props.meta.legend[1]}</span>
            <br /><br />
            <span style={styles.percentageDisplay}>{pieChartAttributes.displayPercentage1}</span>
            <br />
            <span style={styles.legend1}>{props.meta.legend[2]}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PieChart;
