import React, {PropTypes} from 'react';
import moment from 'moment';
import { Colors, StandardChartPalette } from '../../../commons/colors';
import { getIndexFromColumnName } from '../../../commons/utils/utils';
import { calculateDateDisplayFormat } from '../../../commons/utils/dateUtils';
import { DEFAULT_FONT } from 'Constants';

export function generateDataSource(data, chartOptions, fieldMapping, duration) {
  const graphBars = [];

  let x, y;

  const {rows, columns} = data;

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

  for (let i = 0; i < rows.length; i++) {
    let xValue = rows[i][x],
      yValue = rows[i][y];

    if (new Date(xValue).toString() !== 'Invalid Date') {
      let dateDisplayFormat = calculateDateDisplayFormat(duration);
      xValue = moment.utc(xValue).toDate();
      xValue = moment(xValue).format(dateDisplayFormat);
    }

    let barObject = {
      label: xValue || 'Other',
      value: yValue
    };

    graphBars.push(barObject);
  }

  return {
    chart: Object.assign({
      labelFontSize: '11',
      showAxisLines: '1',
      showLabels: '1',
      showPercentInTooltip: '1',
      showValues: '0',
      showYAxisValues: '1',
      theme: 'zune',
      xAxisNameFontSize: '13',
      yAxisNameFontSize: '13',
      xAxisNamePadding: '20',
      yAxisNamePadding: '20',
      lineColor: Colors.coral,
      showXAxisLine: '0',
      showYAxisLine: '0',
      divLineIsDashed: '0',
      showsYAxisLine: '0',
      divLineAlpha: '20',
      chartLeftMargin: '0',
      chartRightMargin: '0',
      chartBottomMargin: '0',
      numDivLines: '6',
      baseFont: DEFAULT_FONT,
      baseFontColor: Colors.pebble,
      paletteColors: StandardChartPalette,
      decimals: '2',
      labelDisplay: 'wrap',
      slantLabels: '1',
      toolTipSepChar: ' | '
    }, chartOptions),
    data: graphBars
  };
};

class StandardChart extends React.Component {
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

    const {data, chartOptions, chartData, duration} = props,
      fieldMapping = chartData.fieldMapping;

    FusionCharts.ready(function() {
      const mapProps = props.attributes;

      const fusioncharts = new FusionCharts({
        type: mapProps.chartType,
        renderAt: mapProps.id,
        width: mapProps.chartWidth ? mapProps.chartWidth : '100%',
        height: mapProps.chartHeight ? mapProps.chartHeight : '400',
        dataFormat: 'json',
        containerBackgroundOpacity: '0',
        dataSource: generateDataSource(data, chartOptions, fieldMapping, duration)
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

export default StandardChart;
