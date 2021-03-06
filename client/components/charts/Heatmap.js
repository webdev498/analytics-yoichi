import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';
import {isUndefined} from '../../../commons/utils/utils';
import { DEFAULT_FONT } from 'Constants';

const chart = {
  showLabel: 0,
  showValues: 0,
  xAxisName: '',
  yAxisName: '',
  xAxisLabelsOnTop: '1',
  plottooltext: `<div id='nameDiv' style='font-size: 12px; border-bottom: 1px dashed #666666;
                    font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block; color: #888888;' >
                    $rowLabel :</div>{br}Value : <b>$dataValue</b>{br} $columnLabel`,
  // Cosmetics
  baseFontColor: Colors.grape,
  baseFont: DEFAULT_FONT,
  captionFontSize: '14',
  subcaptionFontSize: '14',
  subcaptionFontBold: '0',
  showBorder: '0',
  bgColor: 'transparent',
  showShadow: '0',
  usePlotGradientColor: '0',
  canvasBgColor: Colors.white,
  canvasBorderAlpha: '0',
  legendBgAlpha: '0',
  legendBorderAlpha: '1',
  legendShadow: '0',
  legendItemFontSize: '10',
  legendItemFontColor: '#666666',
  toolTipPadding: '5',
  showLegend: 0
};

const colorrange = {
  'gradient': '0',
  'minvalue': '0',
  'color': [{
    'code': Colors.arctic,
    'minvalue': '0',
    'maxvalue': 1
  }, {
    'code': Colors.bar,
    'minvalue': '1',
    'maxvalue': '9999999999'
  }]
};

class Heatmap extends React.Component {
  static propTypes = {
    attributes: PropTypes.object.isRequired,
    data: PropTypes.object
  }

  getDataSource(props) {
    const {data} = props;

    if (data.normalizeData) {
      const {columns, dataset} = data.normalizeData;

      return {
        chart: Object.assign({}, props.chartOptions, chart),
        dataset,
        columns: columns || {},
        colorrange
      };
    }
  }

  renderChart() {
    const {props, props: {data}, getDataSource} = this;
    if (!(data.rows && data.rows.length !== 0)) {
      return;
    }

    FusionCharts.ready(function() {
      const mapProps = props.attributes;

      const {containerBackgroundOpacity: opacity} = mapProps;

      const fusioncharts = new FusionCharts({
        type: 'heatmap',
        renderAt: mapProps.id,
        width: mapProps.chartWidth ? mapProps.chartWidth : '100%',
        height: mapProps.chartHeight ? mapProps.chartHeight : '400',
        containerBackgroundOpacity: isUndefined(opacity) ? 1 : opacity,
        dataFormat: 'json',
        dataSource: getDataSource(props)
      });
      fusioncharts.render();
    });
  }

  render() {
    const {props} = this;
    if (!props.data) return null;

    return (
      <div id={props.attributes.id} style={props.attributes.style}>
        {this.renderChart()}
      </div>
    );
  }
}

export default Heatmap;
