import React, {PropTypes} from 'react';
import {Colors} from '../../commons/colors';
import moment from 'moment';
import {
  getIndexFromColumnName
} from '../../commons/utils/utils';

import {
  calculateDateDisplayFormat
} from '../../commons/utils/dateUtils';

export function formatDate(date, dateDisplayFormat) {
  let localTimeNew = moment.utc(date).toDate();
  return moment(localTimeNew).format(dateDisplayFormat);
}

export function generateDataSource(props) {
  const data = props.data,
    chartOptions = props.chartOptions,
    fieldMapping = props.chartData.fieldMapping,
    dateDisplayFormat = calculateDateDisplayFormat(props.duration);

  const graphPoints = [],
    {rows, columns} = data;

  let x, y;

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i];

    // Check for x-axis chart data
    if (currentChartData.axis === 'x') {
      // Calculate column index from API response
      x = getIndexFromColumnName(currentChartData.columns, columns);
    }

    // Check for y-axis chart data
    if (currentChartData.axis === 'y') {
      // Calculate column index from API response
      y = getIndexFromColumnName(currentChartData.columns, columns);
    }
  }

  rows.forEach((row) => {
    const barObject = {
      label: formatDate(row[x], dateDisplayFormat),
      value: row[y]
    };

    graphPoints.push(barObject);
  });

  return {
    chart: Object.assign({
      'labelFontSize': '11',
      'showAxisLines': '1',
      'showLabels': '1',
      'showPercentInTooltip': '1',
      'showValues': '1',
      'showYAxisValues': '1',
      'theme': 'zune',
      'xAxisNameFontSize': '13',
      'yAxisNameFontSize': '13',
      'xAxisNamePadding': '20',
      'yAxisNamePadding': '20',
      'lineColor': Colors.turquoise,
      'showXAxisLine': '0',
      'showYAxisLine': '0',
      'divLineIsDashed': '0',
      'showsYAxisLine': '0',
      'divLineAlpha': '20',
      'chartLeftMargin': '0',
      'chartRightMargin': '0',
      'chartBottomMargin': '0',
      'numDivLines': '6',
      'baseFont': 'Open Sans, sans-serif',
      'baseFontColor': Colors.pebble,
      'paletteColors': Colors.defaultGraphPalette,
      'decimals': '0'
    }, chartOptions),
    data: graphPoints
  };
};

class LineChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object
  }

  renderChart(props) {
    if (!props.data) {
      return;
    }

    if (props.data.rows && props.data.rows.length === 0) {
      return;
    }

    FusionCharts.ready(function() {
      const mapProps = props.attributes;

      const fusioncharts = new FusionCharts({
        type: 'line',
        renderAt: mapProps.id,
        width: mapProps.chartWidth ? mapProps.chartWidth : '100%',
        height: mapProps.chartHeight ? mapProps.chartHeight : '400',
        dataFormat: 'json',
        containerBackgroundOpacity: '0',
        dataSource: generateDataSource(props)
      });
      fusioncharts.render();
    });
  }

  render() {
    const {props} = this;
    return (
      <div id={props.attributes.id}>{this.renderChart(props)}</div>
    );
  }
}

LineChart.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default LineChart;
