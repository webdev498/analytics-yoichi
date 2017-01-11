import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';
import {DEFAULT_FONT} from 'Constants';

class ScatterChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    data: PropTypes.object,
    chart: PropTypes.object
  }

  generateDataSource() {
    const {props: {data, chart}} = this,
      {normalizeData} = data;

    let dataSourceObject = {},
      dataSet = [],
      dataObject = [],
      dataSeries = {
        'drawline': '0',
        'anchorsides': '0',
        'anchorradius': '6',
        'color': Colors.turquoise,
        'anchorbgcolor': Colors.turquoise,
        'anchorbordercolor': Colors.turquoise,
        'seriesname': ''
      };

    normalizeData.forEach((row) => {
      let {x, y, toolText} = row,
        dataPoint = {
          x,
          y,
          toolText
        };
      dataObject.push(dataPoint);
      dataSeries.data = dataObject;
      dataSet.push(dataSeries);
    });

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
      'baseFont': DEFAULT_FONT,
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
    }, chart.options);

    if (dataSet.length > 0) {
      dataSourceObject.dataset = dataSet;
    }

    return dataSourceObject;
  }

  renderChart() {
    const {props: {data, attributes, chart}} = this;
    if (!data) {
      return;
    }
    const {normalizeData} = data,
      {width, height} = chart;

    if (!normalizeData) {
      return;
    }

    let dataSource = this.generateDataSource();

    FusionCharts.ready(function() {
      let fusioncharts = new FusionCharts({
        type: 'scatter',
        renderAt: attributes.id,
        width: width || '100%',
        height: height || '200',
        dataFormat: 'json',
        containerBackgroundOpacity: '0',
        dataSource
      });
      fusioncharts.render();
    });
  }

  render() {
    const {props} = this;
    return (
      <div id={props.attributes.id}>{this.renderChart()}</div>
    );
  }
}

export default ScatterChart;
