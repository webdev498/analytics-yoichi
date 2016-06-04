import React from 'react';

let className;

function generateChartDataSource(rawData, props) {

  const chartOptions = props.chartOptions;
  const chartData = props.chartData;
  const dataset = [];

  for (let i = 0; i < chartData.length; i++) {
    let currentChartData = chartData[i];
    let currentDataRows = [];
    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].rows !== undefined) {
      currentDataRows = rawData[currentChartData.reportId].rows;
    }
    let columnIndexArray = [];
    let columnsArray = [];
    if (rawData[currentChartData.reportId] !== undefined && rawData[currentChartData.reportId].columns !== undefined) {
      columnsArray = rawData[currentChartData.reportId].columns;
    }

    //Calculate column index from API response
    for (let a = 0; a < currentChartData.columns.length; a++) {
      for (let c = 0; c < columnsArray.length; c++) {
        if (currentChartData.columns[a] === columnsArray[c].name) {
          columnIndexArray[a] = c;
          break;
        }
      }
    }

    //Get column data for x-axis
    if (columnIndexArray.length !== 0) {
      for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
        let obj1 = {};
        obj1.label = currentDataRows[d][columnIndexArray[0]];
        if (obj1.label.length > 13) {
          obj1.label = obj1.label.substring(0, 13) + " (...)";
        }
        obj1.value = currentDataRows[d][columnIndexArray[1]];
        obj1.toolText = currentDataRows[d][columnIndexArray[0]] + ", " + currentDataRows[d][columnIndexArray[1]];
        dataset.push(obj1);
      }
    }
  }

  const dataSourceObject = {
    chart: {
      "bgColor": "#ffffff",
      "showborder": "0",
      "borderThickness":"0",
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
      "captionFontSize": "14",
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
      'showValues':'1',
      "paletteColors": "#ACF50F,#D93609,#FCFC0D, #05E9F5,#0505F5",
      "xAxisNameFontSize":"14",
      "yAxisNameFontSize":"14",
      "labelFontSize": "13",
    }
  };

  let finalChartOptions = Object.assign(dataSourceObject.chart, chartOptions);
  dataSourceObject.chart = finalChartOptions;

  if (dataset.length > 0) dataSourceObject.data = dataset;

  if (chartOptions.averageValue != undefined) {
    dataSourceObject.trendlines = [
      {
        "line": [
          {
            "startvalue": chartOptions.averageValue,
            "color": "#1aaf5d",
            "valueOnRight": "1",
            "displayvalue": chartOptions.averageValue + "%",
            "dashed": "1",
            "dashLen": "4",
            "dashGap": "2"
          }
        ]
      }
    ];
  }

  return dataSourceObject;
};

const renderChart = (props) => {
  /*if (props.props.parent === undefined) {
    return;
  }*/
  const data = props.data;

  if (!data) {
    return;
  }

  const mainData = data;
  const chartData = props.chartData;
  //const parent = props.parent;

  let rawData = {};
  for (let i = 0; i < chartData.length; i++) {
    let currentChartData = chartData[i];
    if (props.multiData === null && mainData[currentChartData.reportId] === undefined){
      return;
    } else {
      if (!rawData.hasOwnProperty(currentChartData.reportId)) {
        rawData[currentChartData.reportId] = mainData[currentChartData.reportId];
      }
    }
  }

  FusionCharts.ready(function(){
      const fusioncharts = new FusionCharts({
      type: 'bar2d',
      renderAt: props.attributes.id,
      width: '100%',
      height: '400',
      dataFormat: 'json',
      containerBackgroundOpacity:'0',
      dataSource: generateChartDataSource(rawData, props)
    });
      fusioncharts.render();
  });
}

const HorizontalBarChart = (props) => (
  <div className="chartBorder">
    <div className="chartCaption">{props.meta.title}</div>
    <div id={props.attributes.id}>{renderChart(props)}</div>
  </div>
)

export default HorizontalBarChart;
