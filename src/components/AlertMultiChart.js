import React, {PropTypes} from 'react';
import {formatDate} from 'utils/dateUtils';
import MultiSeriesLineChart from './MultiSeriesLineChart';

const styles = {
  title: {
    'fontSize': '13px',
    'fontWeight': 600,
    'textTransform': 'capitalize',
    'margin': 0,
    'paddingBottom': '10px'
  },
  wrap: {
    marginBottom: '35px'
  }
};

function getDataByIndex(data, index, label, callback) {
  return data.map((val) => {
    let value = val[index] === 'N/A' ? 0 : val[index];

    if (callback) {
      return {
        [label]: callback(value)
      };
    }
    return {
      [label]: value
    };
  });
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

class AlertMultiChart extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    duration: PropTypes.string,
    chart: PropTypes.object,
    attributes: PropTypes.object.isRequired
  }

  getData(rows, columns) {
    const {duration} = this.props;

    let x, y = [];
    let filterIndex = -1;
    columns.forEach((col, index) => {
      if (col.name === 'date') {
        x = index;
      }
      else if (col.columnType === 'MEASURE' || col.columnType === 'FORMULA') {
        y.push({
          index,
          seriesname: col.displayName
        });
      }
      else if (col.columnType === 'DIMENSION' && col.dataType !== 'DATE') {
        filterIndex = index;
      }
    });

    let categories, dataset;

    if (filterIndex >= 0) {
      const filteredData = getFilteredRows(rows, filterIndex),
        keys = Object.keys(filteredData),
        yObj = y[0];

      categories = [{
        category: getDataByIndex(filteredData[keys[0]], x, 'label', val => (formatDate(val, duration)))
      }];

      dataset = keys.map(key => ({
        seriesname: key,
        data: getDataByIndex(filteredData[key], yObj.index, 'value')
      }));
    }
    else {
      categories = [{
        category: getDataByIndex(rows, x, 'label', val => (formatDate(val, duration)))
      }];

      dataset = y.map(yObj => ({
        seriesname: yObj.seriesname,
        data: getDataByIndex(rows, yObj.index, 'value')
      }));
    }

    const dataSource = {
      chart: this.props.chart.chartOptions,
      categories,
      dataset
    };

    return dataSource;
  }

  getCharts(data) {
    const charts = Object.keys(data);
    const {attributes} = this.props;
    return charts.map(key => {
      const {rows, columns} = data[key];
      const props = {
        attributes: {
          id: key,
          ...attributes.chart
        },
        processedData: true
      };

      if (rows.length !== 0) {
        props.data = this.getData(rows, columns);
        return (
          <div style={styles.wrap}>
            <h2 style={styles.title}>{key}</h2>
            <MultiSeriesLineChart {...props} />
          </div>
        );
      }
      else {
        return null;
      }
    });
  }

  render() {
    let {data} = this.props;
    if (!data) return null;

    if (data.rows) {
      let key = 'randomKey';
      try {
        key = data.options.body[0].uuid;
      }
      catch (ex) {}

      data = {[key]: data};
    }

    delete data.options;

    return (
      <div>
        {this.getCharts(data)}
      </div>
    );
  }
}

AlertMultiChart.contextTypes = {
  store: React.PropTypes.object
};

export default AlertMultiChart;
