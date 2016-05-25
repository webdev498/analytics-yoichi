import React from 'react';
import moment from 'moment';

import {calculateDateDisplayFormat} from 'utils/dateUtils';

function getData(data, timeWindow) {
  const seriesNames = ['Low', 'Medium', 'High'];

  const anchors =  true,
        legendPosition = 'right',
        pYAxisname = 'Alert Count',
        sYAxisname = '';

  const categories = [{
    category: []
  }];

  const anchorBorderColors = ['#ff0000', '#0F4D1F', '#0000ff'];
  const anchorBGColors = ['#ED6172', "#3DF26A", "#9F9FF5"];
  const anchorSides = [0, 4, 3];
  const parentyaxes = ['P', 'S', 'S'];

  const lookup = {},
        dateDisplayFormat = calculateDateDisplayFormat(timeWindow),
        dataset = [];

  for (let i = 0, rowsLen = data.rows.length; i < rowsLen; i++) {
    let localTime = moment.utc(data.rows[i][0]).toDate();
    localTime = moment(localTime).format('D MMM YYYY HH:mm');

    let localTimeNew = moment.utc(data.rows[i][0]).toDate();
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

  for(let j = 0; j < 3; j++) {
    const tempObj = {
      renderas: "Line",
      lineThickness: "0",
      drawanchors: "1",
      anchorradius: "10",
      anchorBorderColor: anchorBorderColors[j],
      anchorbgcolor: anchorBGColors[j],
      seriesname: seriesNames[j],
      anchorsides: anchorSides[j],
      data: []
    }

    if (pYAxisname !== '' && sYAxisname !== '') {
      tempObj.parentyaxis = parentyaxes[j];
    }

    for (let i = 0, rowsLen = data.rows.length; i < rowsLen; i++) {
      if ((seriesNames[j]).toLowerCase() === data.rows[i][1]){
        const rowObj = {};
        if(0 !== data.rows[i][2]) {
          rowObj.value = data.rows[i][2];
        }
        tempObj.data.push(rowObj);
      }
    }

    dataset.push(tempObj);
  }

  const dataSourceObject = {
    chart: {
      decimals: '3',
      labelDisplay: 'wrap',
      labelFontSize: '10',
      numDivLines: '2',
      paletteColors: '#0505F5, #D93609, #ACF50F,#FCFC0D, #05E9F5',
      rotateLabels: '1',
      sFormatNumberScale: '1',
      scrollHeight: '4',
      setadaptivesymin: '1',
      setadaptiveymin: '1',
      showAxisLines: '1',
      showYAxisValues: '1',
      slantLabels: '1',
      theme: 'fint',
      xAxisName: 'Time',
      xAxisNameFontSize: '14',
      yAxisNameFontSize: '14'
    },
  };

  if(!anchors) {
    dataSourceObject.chart.drawAnchors = "0";
  }

  dataSourceObject.chart.legendPosition = legendPosition;

  if (pYAxisname != "" && sYAxisname != "") {
    dataSourceObject.chart.pYAxisname = pYAxisname;
    dataSourceObject.chart.sYAxisname = sYAxisname;
  }

  if (pYAxisname != "" && sYAxisname == "") {
    dataSourceObject.chart.yAxisName = pYAxisname;
  }

  if (categories.length > 0){
    dataSourceObject.categories = categories;
  }

  if (dataset.length > 0){
    dataSourceObject.dataset = dataset;
  }

  return dataSourceObject;
}

const renderChart = (props) => {
  if(!props.data) {
    return;
  }

  FusionCharts.ready(function(){
    const fusioncharts = new FusionCharts({
      type: 'mscombi2d',
      renderAt: props.id,
      width: '100%',
      height: '400',
      dataFormat: 'json',
      dataSource: getData(props.data, '1h')
    });

    fusioncharts.render();
  });
}

const MSCombiChart = (props) => (
  <div id={props.id}>{renderChart(props)}</div>
)

export default MSCombiChart;