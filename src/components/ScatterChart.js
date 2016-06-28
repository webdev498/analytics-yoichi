import React, {PropTypes} from 'react';
import {
  generateRawData,
  getXYIndexFromColumnNames
} from 'utils/utils';

function generateChartDataSource(rawData, props) {
  const {chartOptions, chartData} = props,
    fieldMapping = chartData.fieldMapping;

  let dataSourceObject = {},
    dataSet = [],
    x = '',
    y = '';

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
      {rows, columns} = rawData[currentChartData.reportId],
      dataSeries = currentChartData;

    let columnIndexes = getXYIndexFromColumnNames(currentChartData.columns, columns);
    x = columnIndexes[0];
    y = columnIndexes[1];

    let dataObject = [];
    for (let d = 0; d < rows.length; d++) {
      let dataPoint = {};
      dataPoint.x = rows[d][x];
      dataPoint.y = rows[d][y];
      dataPoint.toolText = chartOptions.xAxisName + ': ' + rows[d][x] + ' ' +
      chartOptions.yAxisName + ': ' + rows[d][y];
      dataObject.push(dataPoint);
    }
    dataSeries.data = dataObject;
    dataSet.push(dataSeries);
  }

  dataSourceObject.chart = Object.assign({
    'showvalues': '0',
    'theme': 'zune',
    'numDivLines': '2',
    'lineThickness': '5',
    'divLineThickness': '0',
    'divLineAlpha': '0',
    'showAxisLines': '1',
    'showYAxisValues': '1',
    'labelDisplay': 'wrap',
    'rotateLabels': '0',
    'showlegend': '0',
    'bgAlpha': '0',
    'canvasBgAlpha': '0',
    'xAxisNameFontSize': '14',
    'yAxisNameFontSize': '14',
    'labelFontSize': '13'
  }, chartOptions);

  if (dataSet.length > 0) {
    dataSourceObject.dataset = dataSet;
  }

  return dataSourceObject;
}

const renderChart = (props) => {
  if (!props.data) {
    return;
  }

  const data = props.data,
    fieldMapping = props.chartData.fieldMapping;
  let rawData = {};

  rawData = generateRawData(fieldMapping, data);

  FusionCharts.ready(function() {
    let fusioncharts = new FusionCharts({
      type: 'scatter',
      renderAt: props.attributes.id,
      width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
      height: props.attributes.chartHeight ? props.attributes.chartHeight : '200',
      dataFormat: 'json',
      containerBackgroundOpacity: '0',
      dataSource: generateChartDataSource(rawData, props)
    });
    fusioncharts.render();
  });
};

class ScatterChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object
  }

  render() {
    const {props} = this;
    return (
      <div id={props.attributes.id}>{renderChart(props)}</div>
    );
  }
}

export default ScatterChart;
