import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import moment from 'moment';
import {
  calculateDateDisplayFormat
} from 'utils/dateUtils';

const chart = {
  'baseFont': 'Open Sans, sans-serif',
  'captionFontSize': '14',
  'subcaptionFontSize': '14',
  'subcaptionFontBold': '0',
  'bgcolor': '#ffffff',
  'showBorder': '0',
  'showShadow': '0',
  'showCanvasBorder': '0',
  'usePlotGradientColor': '0',
  'legendBorderAlpha': '0',
  'legendShadow': '0',
  'showAxisLines': '0',
  'showAlternateHGridColor': '0',
  'divLineAlpha': '50',
  'divLineColor': Colors.cloud,
  'divLineThickness': '1',
  'xAxisName': 'Day',
  'showValues': '0',
  'paletteColors': Colors.LineChartPallete
};

function getIndex(obj, columns) {
  let index;
  const colName = obj.columns[0];
  columns.forEach((col, currentIndex) => {
    if (colName === col.name) index = currentIndex;
  });

  return index;
}

function formatDate(date, duration) {
  const dateDisplayFormat = calculateDateDisplayFormat(duration);
  let localTimeNew = moment.utc(date).toDate();
  return moment(localTimeNew).format(dateDisplayFormat);
}

function getFilteredRows(rows, filterIndex) {
  const filteredData = {};

  rows.forEach((row) => {
    const key = row[filterIndex];
    if (!filteredData.hasOwnProperty(key)) {
      filteredData[key] = [];
    }

    filteredData[key].push(row);
  });

  return filteredData;
}

function getData(data, index, label, callback) {
  return data.map((val) => {
    if (callback) {
      return {
        [label]: callback(val[index])
      };
    }
    return {
      [label]: val[index]
    };
  });
}

function getDataSource(props, rawData) {
  const {chartData: {fieldMapping, filter}, data: {rows, columns}, duration} = props;
  const x = getIndex(fieldMapping.x[0], columns),
    y = getIndex(fieldMapping.y[0], columns);

  let filterData;
  if (filter) {
    const filterIndex = getIndex(filter, columns);
    filterData = getFilteredRows(rows, filterIndex);
  }

  const keys = Object.keys(filterData);
  const categories = [{
    category: getData(filterData[keys[0]], x, 'label', val => (formatDate(val, duration)))
  }];

  const dataset = [];
  keys.forEach(key => {
    const data = getData(filterData[key], y, 'value');
    dataset.push({
      seriesname: key,
      data
    });
  });

  const dataSource = {
    chart: Object.assign({}, chart, props.chartOptions),
    categories,
    dataset
  };

  return dataSource;
}

function getDataMultipleReports(props) {
  const {chartData: {fieldMapping: {x, y}}, data, duration} = props,
    xObj = x[0];

  const xIndex = getIndex(xObj, data[xObj.reportId].columns);

  const categories = [{
    category: getData(data[xObj.reportId].rows, xIndex, 'label', val => (formatDate(val, duration)))
  }];

  const dataset = [];

  y.forEach((set) => {
    const {rows, columns} = data[set.reportId],
      index = getIndex(set, columns);

    dataset.push({
      seriesname: set.seriesname,
      data: getData(rows, index, 'value')
    });
  });

  return {
    chart: Object.assign({}, chart, props.chartOptions),
    categories,
    dataset
  };
}

class MultiSeriesLineChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    meta: PropTypes.object
  }

  renderChart(props) {
    if (!props.data) {
      return;
    }

    const {chartData: {multipleReports}} = props;

    let dataSource;
    if (multipleReports) {
      dataSource = getDataMultipleReports(props);
    }
    else {
      dataSource = getDataSource(props);
    }

    FusionCharts.ready(function() {
      const fusioncharts = new FusionCharts({
        type: 'msline',
        renderAt: props.attributes.id,
        width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
        height: props.attributes.chartHeight ? props.attributes.chartHeight : '400',
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
      <div id={props.attributes.id}>{this.renderChart(props)}</div>
    );
  }
}

export default MultiSeriesLineChart;
