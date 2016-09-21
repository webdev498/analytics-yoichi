import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import moment from 'moment';
import {
  calculateDateDisplayFormat
} from 'utils/dateUtils';

import {
  generateRawData
} from 'utils/utils';

const chart = {
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
  'divlineThickness': '1',
  'divLineIsDashed': '1',
  'divLineDashLen': '1',
  'divLineGapLen': '1',
  'xAxisName': 'Day',
  'showValues': '0',
  'paletteColors': Colors.LineChartPallete
};

function getIndex(obj, cols) {
  let index;
  const colName = obj.columns[0];
  cols.forEach((col, currentIndex) => {
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
    category: getData(filterData[keys[0]], x, 'label', (val) => { formatDate(val, duration); })
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

class MultiSeriesLineChart extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    meta: PropTypes.object
  }

  renderChart(props) {
    if (!props.duration) {
      return;
    }

    if (!props.data) {
      return;
    }

    if (props.data.rows && props.data.rows.length === 0) {
      return;
    }

    const data = props.data,
      fieldMapping = props.chartData.fieldMapping;

    let rawData = generateRawData(fieldMapping, data);

    FusionCharts.ready(function() {
      const fusioncharts = new FusionCharts({
        type: 'msline',
        renderAt: props.attributes.id,
        width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
        height: props.attributes.chartHeight ? props.attributes.chartHeight : '400',
        dataFormat: 'json',
        containerBackgroundOpacity: '0',
        dataSource: getDataSource(props, rawData)
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
