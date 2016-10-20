import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import {
  generateRawData,
  getXYIndexFromColumnNames
} from 'utils/utils';

export function generateChartDataSource(rawData, chartOptions, fieldMapping) {
  let dataSourceObject = {},
    dataSet = [],
    x = '',
    y = '';

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i],
      {rows, columns} = rawData[currentChartData.reportId],
      dataSeries = Object.assign({
        'drawline': '0',
        'anchorsides': '0',
        'anchorradius': '6',
        'color': Colors.turquoise,
        'anchorbgcolor': Colors.turquoise,
        'anchorbordercolor': Colors.turquoise
      }, currentChartData);

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
    'showAxisLines': '1',
    'showYAxisValues': '1',
    'labelDisplay': 'wrap',
    'rotateLabels': '0',
    'showlegend': '0',
    'bgAlpha': '0',
    'canvasBgAlpha': '0',
    'labelFontSize': '10',
    'baseFont': 'Open Sans, sans-serif',
    'baseFontColor': Colors.pebble,
    'xAxisNameFontSize': '13',
    'yAxisNameFontSize': '13',
    'xAxisNamePadding': '20',
    'yAxisNamePadding': '20',
    'lineColor': Colors.coral,
    'divLineIsDashed': '0',
    'showsYAxisLine': '0',
    'divLineAlpha': '20',
    'chartLeftMargin': '0',
    'chartRightMargin': '0',
    'chartBottomMargin': '0',
    'numVDivLines': '10',
    'canvasBgColor': Colors.defaultCanvasBG,
    'canvasbgAlpha': '100',
    'canvasBgRatio': '30,70',
    'canvasBgAngle': '280',
    'xAxisLineColor': Colors.axis,
    'yaxislinecolor': Colors.axis
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

  if (props.data.rows && props.data.rows.length === 0) {
    return;
  }

  const data = props.data,
    fieldMapping = props.chartData.fieldMapping,
    chartOptions = props.chartOptions;
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
      dataSource: generateChartDataSource(rawData, chartOptions, fieldMapping)
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
