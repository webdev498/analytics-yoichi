import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';
import {getDateTimeInLocalTimeZone} from '../../../commons/utils/utils';
import { DEFAULT_CHART_OPTIONS } from 'Constants';

const chart = Object.assign({}, DEFAULT_CHART_OPTIONS, {
  paletteColors: Colors.areaSparkLineChart.area,
  showCanvasBorder: '0',
  usePlotGradientColor: '0',
  showXAxisLine: '1',
  axisLineAlpha: '25',
  divLineAlpha: '0',
  showValues: '0',
  showXAxisValues: '1',
  showYAxisValues: '1',
  showAlternateHGridColor: '0',
  showPlotBorder: '1',
  plotBorderColor: Colors.areaSparkLineChart.border,
  plotBorderThickness: '1',
  anchorradius: '0',
  bgAlpha: '0',
  canvasBgAlpha: '0',
  minimizetendency: '1',
  labelDisplay: 'wrap',
  rotateLabels: '1'
});

export function generateDataSource(chartProperties, duration) {
  let dataSourceObject = {},
    dataSet = [],
    dataObject = [],
    dataSeries = {},
    {data, chartOptions} = chartProperties,
    chartValue = data[0].value;

  for (let key in chartValue) {
    let dataPoint = {
      label: getDateTimeInLocalTimeZone(key, 'D MMM'),
      value: '0'
    };
    if (chartValue[key][0] !== 0 && chartValue[key][0] !== '') {
      dataPoint.value = chartValue[key][0];
    }
    dataObject.push(dataPoint);
  }

  dataSeries.data = dataObject;
  dataSet.push(dataSeries);

  dataSourceObject.chart = Object.assign(chart, chartOptions);

  if (dataSet.length > 0) {
    dataSourceObject.dataset = dataSet;
  }

  return dataSourceObject;
}

const renderChart = (props) => {
  const chartProperties = props.chartProperties;

  if (!chartProperties.chartType) {
    return;
  }

  FusionCharts.ready(function() {
    let fusioncharts = new FusionCharts({
      type: chartProperties.chartType,
      renderAt: chartProperties.chartId,
      width: chartProperties.chartWidth,
      height: chartProperties.chartHeight,
      dataFormat: 'json',
      containerBackgroundOpacity: '0',
      dataSource: generateDataSource(chartProperties, props.duration)
    }
  );
    fusioncharts.render();
  });
};

class Area2DAsSparkLineChart extends React.Component {
  static propTypes = {
    chartProperties: PropTypes.object
  }

  render() {
    const {props} = this;
    return (
      <div id={props.chartProperties.chartId}>{renderChart(props)}</div>
    );
  }
}

export default Area2DAsSparkLineChart;
