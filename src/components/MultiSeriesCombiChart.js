import React from 'react';
import moment from 'moment';
import {calculateDateDisplayFormatForHistogram} from 'utils/dateUtils';

let className = '';

function generateChartDataSource(data, props) {
  const timeWindow = '1h';
  const series = props.props.chartData;
  const chartOptions = props.props.chartOptions;
  const chartData = props.props.chartData;
  const categories = [{
    category: []
  }];
  const lookup = {},
        dateDisplayFormat = calculateDateDisplayFormatForHistogram(timeWindow),
        dataset = [];
  let seriesCount = 0;

  for (let i = 0; i < chartData.length; i++) {
    let currentChartData = chartData[i];
    let currentDataRows = data[currentChartData.reportId].rows;
    let xColumnIndex = '';
    let yColumnIndex = '';

    //Check for x-axis chart data
    if (currentChartData.axis !== undefined && currentChartData.axis === 'x') {
      //Calculate column index from API response
      let columnsArray = data[currentChartData.reportId].columns;
      for (let c = 0; c < columnsArray.length; c++) {
        if (currentChartData.columns[0] === columnsArray[c].name) {
          xColumnIndex = c;
          break;
        }
      }

      //Get column data for x-axis
      if (xColumnIndex !== '') {
        for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
          let localTime = moment.utc(currentDataRows[d][xColumnIndex]).toDate();
          localTime = moment(localTime).format('D MMM YYYY HH:mm');

          let localTimeNew = moment.utc(currentDataRows[d][xColumnIndex]).toDate();
          localTimeNew = moment(localTimeNew).format(dateDisplayFormat);

          if (!(localTime in lookup)) {
            lookup[localTime] = 1;
            const obj1 = {
              label: localTimeNew,
              toolText: localTime
            };

            categories[0].category.push(obj1);
          }
        }
      }
    }

    //Check for y-axis chart data (i.e. multiple series)
    if (currentChartData.seriesname !== undefined) {
      //Calculate column index from API response
      let columnsArray = data[currentChartData.reportId].columns;
      for (let c = 0; c < columnsArray.length; c++) {
        if (currentChartData.columns[0] === columnsArray[c].name) {
          yColumnIndex = c;
          break;
        }
      }
      const tempObj = {};
      tempObj.seriesname = currentChartData.seriesname;
      tempObj.renderas = currentChartData.renderas;
      tempObj.data = [];

      //Get column data for x-axis
      if (yColumnIndex !== '') {
        for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
          var rowObj = {};
          if (currentDataRows[d][yColumnIndex][seriesCount] != "NaN") {
            rowObj["value"] = currentDataRows[d][yColumnIndex][seriesCount];
          } else {
            rowObj["value"] = '0';
          }
          tempObj.data.push(rowObj);
        }
        seriesCount += 1;
      }
      dataset.push(tempObj);
    }
  }

  const dataSourceObject = {
    chart: {
      "showvalues": "0",
      "decimals": "3",
      "sFormatNumberScale": "1",
      "setadaptiveymin": "1",
      "setadaptivesymin": "1",
      "showborder": "0",
      "theme": "zune",
      "numDivLines":"2",
      "divLineThickness":"0",
      "divLineAlpha":"0",
      "showAxisLines":"1",
      "showYAxisValues":"1",
      "labelDisplay":"wrap",
      "rotateLabels":"1",
      "xAxisName":"Time",
      "scrollHeight":"4",
      "xAxisNameFontSize":"14",
      "yAxisNameFontSize":"14",
      "slantLabels":"1",
      "labelFontSize": "13"
    },
  };

  var finalChartOptions = Object.assign(dataSourceObject.chart, chartOptions);
  dataSourceObject.chart = finalChartOptions;

  if (categories.length > 0){
    dataSourceObject.categories = categories;
  }

  if (dataset.length > 0){
    dataSourceObject.dataset = dataset;
  }

  return dataSourceObject;
}

const renderChart = (props) => {
  if (props.props.parent === undefined) {
    return;
  }
  if (props.multiData === null || props.multiData === undefined) {
    return;
  }

  const mainData = props.multiData[0];
  const chartData = props.props.chartData;
  const parent = props.props.parent;

  let data = {};
  for (let i = 0; i < chartData.length; i++) {
    let currentChartData = chartData[i];
    if (props.multiData === null && mainData[currentChartData.reportId] === undefined){
      return;
    } else {
      if (!data.hasOwnProperty(currentChartData.reportId)) {
        data[currentChartData.reportId] = mainData[currentChartData.reportId];
      }
    }
  }

  if (parent === 'Compound') {
    className = "chartBorder";
  }

  FusionCharts.ready(function(){
    const fusioncharts = new FusionCharts({
      type: 'mscombi2d',
      renderAt: props.id,
      width: '100%',
      height: '400',
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: generateChartDataSource(data, props)
    });

    fusioncharts.render();
  });
}

const MultiSeriesCombiChart = (props) => (
  <div className={className}>
    <div className="chartCaption">{props.sectionTitle}</div>
    <div id={props.id}>{renderChart(props)}</div>
  </div>
)

export default MultiSeriesCombiChart;