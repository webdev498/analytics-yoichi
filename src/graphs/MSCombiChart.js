import React from 'react';

import Card from 'material-ui/lib/card/card';
/*import FusionCharts from 'fusioncharts';
import FusionChartsTheme from 'fusionchartsTheme';
window.FusionCharts = FusionCharts;
window.FusionChartsTheme = FusionChartsTheme;*/

const renderChart = (id) => {
  FusionCharts.ready(function(){
      var fusioncharts = new FusionCharts({
      type: 'mscombi3d',
      renderAt: id,
      width: '100%',
      height: '400',
      dataFormat: 'json',
      dataSource: {
          "chart": {
              "caption": "Actual Revenues, Targeted Revenues & Profits",
              "subCaption": "Last year",
              "xAxisname": "Month",
              "yAxisName": "Amount (In USD)",
              "numberPrefix": "$",
              "theme": "zune"
          },
          "categories": [{
              "category": [{
                  "label": "Jan"
              }, {
                  "label": "Feb"
              }, {
                  "label": "Mar"
              }, {
                  "label": "Apr"
              }, {
                  "label": "May"
              }, {
                  "label": "Jun"
              }, {
                  "label": "Jul"
              }, {
                  "label": "Aug"
              }, {
                  "label": "Sep"
              }, {
                  "label": "Oct"
              }, {
                  "label": "Nov"
              }, {
                  "label": "Dec"
              }]
          }],
          "dataset": [{
              "seriesName": "Actual Revenue",
              "data": [{
                  "value": "16000"
              }, {
                  "value": "20000"
              }, {
                  "value": "18000"
              }, {
                  "value": "19000"
              }, {
                  "value": "15000"
              }, {
                  "value": "21000"
              }, {
                  "value": "16000"
              }, {
                  "value": "20000"
              }, {
                  "value": "17000"
              }, {
                  "value": "25000"
              }, {
                  "value": "19000"
              }, {
                  "value": "23000"
              }]
          }, {
              "seriesName": "Projected Revenue",
              "renderAs": "line",
              "showValues": "0",
              "data": [{
                  "value": "15000"
              }, {
                  "value": "16000"
              }, {
                  "value": "17000"
              }, {
                  "value": "18000"
              }, {
                  "value": "19000"
              }, {
                  "value": "19000"
              }, {
                  "value": "19000"
              }, {
                  "value": "19000"
              }, {
                  "value": "20000"
              }, {
                  "value": "21000"
              }, {
                  "value": "22000"
              }, {
                  "value": "23000"
              }]
          }, {
              "seriesName": "Profit",
              "renderAs": "area",
              "showValues": "0",
              "data": [{
                  "value": "4000"
              }, {
                  "value": "5000"
              }, {
                  "value": "3000"
              }, {
                  "value": "4000"
              }, {
                  "value": "1000"
              }, {
                  "value": "7000"
              }, {
                  "value": "1000"
              }, {
                  "value": "4000"
              }, {
                  "value": "1000"
              }, {
                  "value": "8000"
              }, {
                  "value": "2000"
              }, {
                  "value": "7000"
              }]
          }]
      }
  }
  );
      fusioncharts.render();
  });
}

const MSCombiChart = (props) => (
  <Card style={{...props.style, color: 'black'}}>
     <div id={props.id}>{renderChart(props.id)}</div>
  </Card>
)

export default MSCombiChart;