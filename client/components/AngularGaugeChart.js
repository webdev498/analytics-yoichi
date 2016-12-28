import React, {PropTypes} from 'react';

function generateChartDataSource(chartProperties) {
  const dataSourceObject = {
    'chart': Object.assign({
      'lowerLimit': '0',
      'upperLimit': '100',
      'showValue': '1',
      'valueBelowPivot': '1',
      'valueFontSize': '11',
      'valueFontBold': '1',
      'gaugeOuterRadius': '33',
      'gaugeInnerRadius': 16.5,
      'showtickvalues': '0',
      'showTickMarks': '0',
      'tickvaluedistance': '25',
      'showborder': 0,
      'gaugeFillMix': '{dark-30},{light-60},{dark-10}',
      'bgAlpha': '0',
      'canvasBgAlpha': '0',
      'caption': ''
    }, chartProperties.chartOptions),
    'colorRange': Object.assign({
      'color': [
        {'minValue': '0', 'maxValue': '35', 'code': '#6baa01'},
        {'minValue': '35', 'maxValue': '65', 'code': '#f8bd19'},
        {'minValue': '65', 'maxValue': '100', 'code': '#e44a00'}
      ]
    }, chartProperties.colorRangeOptions),
    'dials': {
      'dial': [
        Object.assign({
          'value': chartProperties.chartValue,
          'bgcolor': '333333',
          'bordercolor': '333333'
        }, chartProperties.dialOptions)
      ]
    },
    'value': chartProperties.chartValue
  };
  return dataSourceObject;
}

const renderChart = (props) => {
  const chartProperties = props.chartProperties;

  FusionCharts.ready(function() {
    let fusioncharts = new FusionCharts({
      type: chartProperties.chartType,
      renderAt: chartProperties.chartId,
      width: chartProperties.chartWidth,
      height: chartProperties.chartHeight,
      dataFormat: 'json',
      containerBackgroundOpacity: '0',
      dataSource: generateChartDataSource(chartProperties)
    }
  );
    fusioncharts.render();
  });
};

class AngularGaugeChart extends React.Component {
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

export default AngularGaugeChart;
