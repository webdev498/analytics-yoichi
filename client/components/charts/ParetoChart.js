import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';
import {
  getIndexFromColumnName,
  isUndefined
} from '../../../commons/utils/utils';
import {generateClickThroughUrl} from 'utils/kibanaUtils';

const chart = {
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
  'lineColor': Colors.coral,
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
  'baseFontColor': Colors.grape,
  'paletteColors': Colors.defaultGraphPalette,
  'decimals': '2',
  'slantLabels': '1'
};

export function generateDataSource(data, chartOptions, fieldMapping, updateChartOptions) {
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
    const xValue = rows[i][x],
      yValue = rows[i][y],
      barObject = {
        label: xValue || 'Other',
        value: yValue
      };

    graphBars.push(barObject);
  }

  if (updateChartOptions &&
    updateChartOptions.displayLabelAs &&
    updateChartOptions.displayLabelAs.slanted &&
    updateChartOptions.displayLabelAs.afterCount < rows.length) {
    chartOptions.labelDisplay = 'rotate';
  }
  else {
    chartOptions.labelDisplay = 'wrap';
  }

  return {
    chart: Object.assign(chart, chartOptions),
    data: graphBars
  };
};

function getDataPlotClickUrl(props, dataObj) {
  let parameters = {
    data: props.data,
    duration: props.duration,
    dataObj: dataObj,
    queryParamsArray: props.kibana.queryParams,
    pathParams: props.kibana.pathParams
  };

  return generateClickThroughUrl(parameters);
}

class ParetoChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.handleGraphClick = this.handleGraphClick.bind(this);
  }

  handleGraphClick(dataObj) {
    const {props} = this,
      {clickData} = props;

    let filterText = '';
    if (clickData.filterText.startsWith(':')) {
      filterText = dataObj.toolText.split(',')[0];
    }

    if (props.history.isActive(clickData.page)) {
      props.broadcastEvent(clickData.tableId, {data: filterText, type: 'updateSearch'});
    }
    else {
      // this is to enable to call the broadcastEvent when user is on some other page other than '/alerts'
      //  so that this event can be called after the page load
      window.sessionStorage.broadcastEvent = JSON.stringify({
        id: clickData.tableId,
        data: {data: filterText, type: 'updateSearch'}
      });
      props.history.push(clickData.page);
    }
  }

  renderChart(props) {
    if (!props.data) {
      return;
    }

    if (props.data.rows && props.data.rows.length === 0) {
      return;
    }

    const {data, chartOptions, updateChartOptions, chartData} = props,
      fieldMapping = chartData.fieldMapping,
      {clickThrough} = this.context,
      handleGraphClick = this.handleGraphClick;

    FusionCharts.ready(function() {
      const mapProps = props.attributes;

      const fusioncharts = new FusionCharts({
        type: 'pareto2d',
        renderAt: mapProps.id,
        width: mapProps.chartWidth ? mapProps.chartWidth : '100%',
        height: mapProps.chartHeight ? mapProps.chartHeight : '400',
        dataFormat: 'json',
        containerBackgroundOpacity: '0',
        dataSource: generateDataSource(data, chartOptions, fieldMapping, updateChartOptions),
        events: {
          dataplotClick: function(eventObj, dataObj) {
            if (props.kibana) {
              const url = getDataPlotClickUrl(props, dataObj);
              if (url !== '' && !isUndefined(url)) {
                clickThrough(url);
              }
            }
            else if (props.clickData) {
              handleGraphClick(dataObj);
            }
          }
        }
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

ParetoChart.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default ParetoChart;
