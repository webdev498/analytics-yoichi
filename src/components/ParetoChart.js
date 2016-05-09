import React from 'react';

import Card from 'material-ui/lib/card/card';

const renderChart = (id) => {
  FusionCharts.ready(function(){
      var fusioncharts = new FusionCharts({
      type: 'pareto2d',
      renderAt: id,
      width: '100%',
      height: '400',
      dataFormat: 'json',
      dataSource: {
          "chart": {
              "caption": "Employee late arrivals by reported cause",
              "subCaption": "Last month",
              "xAxisName": "Reported Cause",
              "pYAxisName": "No. of Occurrence",
              "sYAxisname": "Cumulative Percentage",
              "showHoverEffect": "1",
              "theme": "fint"

          },
          "data": [{
              "label": "Traffic",
              "value": "5680"
          }, {
              "label": "Family Engagement",
              "value": "1036"
          }, {
              "label": "Public Transport",
              "value": "950"
          }, {
              "label": "Weather",
              "value": "500"
          }, {
              "label": "Emergency",
              "value": "140"
          }, {
              "label": "Others",
              "value": "68"
          }]
      }
  }
  );
      fusioncharts.render();
  });
}

const ParetoChart = (props) => (
  <Card style={{...props.style, color: 'black'}}>
     <div id={props.id}>{renderChart(props.id)}</div>
  </Card>
)

export default ParetoChart;