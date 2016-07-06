import React, {PropTypes} from 'react';
import {
  generateRawData,
  getIndexFromObjectName,
  getIndexFromColumnName,
  checkForUndefinedChartOptionObject
} from 'utils/utils';
import PercentageWidget from 'components/PercentageWidget';

let highlightedColor1 = '#2BD8D0', // Blue (Default colors set)
  highlightedColor2 = '#8ABB24', // Green (Default colors set)
  nonHighlightedColor = '#E5E5EA', // Gray (Default colors set)
  doughnutAttributes = {},
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
  doughnutAttributes = {}; // This initialization is required
  const doughnutInputArray1 = {
      countValue: inputArray.countValue,
      totalValue: inputArray.top10CountValue
    },
    // doughnutAttributes1 = calculateDoughnutAttributes(doughnutInputArray1, 1),
    doughnutInputArray2 = {
      countValue: inputArray.totalValue,
      totalValue: inputArray.top10TotalValue
    },
    // doughnutAttributes2 = calculateDoughnutAttributes(doughnutInputArray2, 2),
    percentage1 = Math.round((inputArray.top10CountValue / parseInt(inputArray.countValue)) * 100, 2),
    percentage2 = Math.round((inputArray.top10TotalValue / parseInt(inputArray.totalValue)) * 100, 2),
    displayPercentage1 = percentage1.toString() + '%',
    displayPercentage2 = percentage2.toString() + '%',
    percentage2Color = {fontWeight: 'bold', color: highlightedColor1},
    percentage1Color = {fontWeight: 'bold', color: highlightedColor2};

    console.log(displayPercentage1, displayPercentage2);

  // doughnutAttributes = {
  //   chart1Background: doughnutAttributes1.chartBackground,
  //   chart1SliceOneStyle: doughnutAttributes1.chartSliceOneStyle,
  //   chart1SliceTwoStyle: doughnutAttributes1.chartSliceTwoStyle,
  //   chart2Background: doughnutAttributes2.chartBackground,
  //   chart2SliceOneStyle: doughnutAttributes2.chartSliceOneStyle,
  //   chart2SliceTwoStyle: doughnutAttributes2.chartSliceTwoStyle,
  //   percentage1Color: percentage1Color,
  //   percentage2Color: percentage2Color,
  //   displayPercentage1: displayPercentage1,
  //   displayPercentage2: displayPercentage2
  // };
  return doughnutAttributes;
}

export function generateDoughnutChart(inputArray) {
  doughnutAttributes = {}; // This initialization is required
  const doughnutInputArray1 = {
      countValue: inputArray.countValue,
      totalValue: inputArray.top10CountValue
    },
    doughnutAttributes1 = calculateDoughnutAttributes(doughnutInputArray1, 1),
    doughnutInputArray2 = {
      countValue: inputArray.totalValue,
      totalValue: inputArray.top10TotalValue
    },
    doughnutAttributes2 = calculateDoughnutAttributes(doughnutInputArray2, 2),
    percentage1 = Math.round((inputArray.top10CountValue / parseInt(inputArray.countValue)) * 100, 2),
    percentage2 = Math.round((inputArray.top10TotalValue / parseInt(inputArray.totalValue)) * 100, 2),
    displayPercentage1 = percentage1.toString() + '%',
    displayPercentage2 = percentage2.toString() + '%',
    percentage2Color = {fontWeight: 'bold', color: highlightedColor1},
    percentage1Color = {fontWeight: 'bold', color: highlightedColor2};

  doughnutAttributes = {
    chart1Background: doughnutAttributes1.chartBackground,
    chart1SliceOneStyle: doughnutAttributes1.chartSliceOneStyle,
    chart1SliceTwoStyle: doughnutAttributes1.chartSliceTwoStyle,
    chart2Background: doughnutAttributes2.chartBackground,
    chart2SliceOneStyle: doughnutAttributes2.chartSliceOneStyle,
    chart2SliceTwoStyle: doughnutAttributes2.chartSliceTwoStyle,
    percentage1Color: percentage1Color,
    percentage2Color: percentage2Color,
    displayPercentage1: displayPercentage1,
    displayPercentage2: displayPercentage2,
    percentage1: percentage1.toString()
  };
  return doughnutAttributes;
}

export function calculateDoughnutAttributes(inputArray, chartId) {
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

      if (currentChartData.reportId === 'taf_total_usage') {
        columnIndex = getIndexFromColumnName(currentChartData.columns, columns);
        totalValue = rows[d][columnIndex];
      }

      if (currentChartData.reportId === 'taf_top_talkers_connections' ||
       currentChartData.reportId === 'taf_top_talkers_bandwidth') {
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

  doughnutAttributes = generateDoughnutChart(inputArray);
  // generatePieChart(inputArray);
}

class DoughnutChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    tableOptions: PropTypes.object
  }
  render() {
    const {props} = this;
    return (
      <div style={props.attributes.chartBorder}>{renderChart(props)}
        <div style={props.attributes.chartCaption}>{props.meta.title}</div>
        <div
          style={
            {
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              margin: '0',
              justifyContent: 'center',
              height: '400'
            }
          }>
          <div className='pieCard'>
            <div className='pie-chart chart' style={doughnutAttributes.chart2Background}>
              <div className='slice one' style={doughnutAttributes.chart2SliceOneStyle}></div>
              <div className='slice two' style={doughnutAttributes.chart2SliceTwoStyle}></div>
              <div className='chart-center'><span>{doughnutAttributes.displayPercentage2}</span></div>
            </div>
          </div>
          <div style={{paddingLeft: '50px', paddingRight: '50px'}}>
            <PercentageWidget iconName='desktop_mac' percentage={doughnutAttributes.percentage1} />
          </div>
          <div style={{}}>
            <span style={{fontSize: '35px', color: '#2BD8D0'}}>{doughnutAttributes.displayPercentage2}</span>
            <br />
            <span style={{fontSize: '13px', color: '#6b7282'}}>{props.meta.legend[0]}</span>
            <br /><br />
            <span style={{fontSize: '13px', color: '#cbcbd1'}}>{props.meta.legend[1]}</span>
            <br /><br />
            <span style={{fontSize: '35px', color: '#2BD8D0'}}>{doughnutAttributes.displayPercentage1}</span>
            <br />
            <span style={{fontSize: '13px', color: '#6b7282'}}>{props.meta.legend[2]}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default DoughnutChart;
