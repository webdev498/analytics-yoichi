import React from 'react';

const chart = {
  'caption': '',
  'theme': 'fint',
  'radarfillcolor': '#ffffff',
  'baseFont': 'Open Sans, sans-serif',
  'divLineAlpha': '20',
  'showBorder': '0',
  'showShadow': '0',
  'showCanvasBorder': '0'
};
class RadarChart extends React.Component {
  getDataSource() {
    const {props} = this,
      {data, chartOptions} = props;

    const category = data.map(val => ({label: val.message.split(' ').join('{br}')}));
    const datasetArr = data.map(val => ({value: Math.round(val.contribution)}));

    const dataset = [{seriesname: '', data: datasetArr}];
    const categories = [{category}];

    return {
      chart: Object.assign({}, chart, chartOptions),
      dataset,
      categories
    };
  }

  renderChart() {
    const {props} = this;
    const dataSource = this.getDataSource();

    FusionCharts.ready(function() {
      var fusioncharts = new FusionCharts({
        type: 'radar',
        renderAt: props.attributes.id,
        width: props.attributes.chartWidth || '100%',
        height: props.attributes.chartHeight || '200',
        dataFormat: 'json',
        dataSource
      });
      fusioncharts.render();
    });
  }

  render() {
    const { props } = this;
    if (!props.data) { return null; }
    return (
      <div id={props.attributes.id} style={{...props.attributes.style}}>
        {this.renderChart()}
      </div>
    );
  }
}

export default RadarChart;
