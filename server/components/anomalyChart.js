import {} from '../utils/chartUtils';

function getColumnIndex(columns, name, type) {
  let index = null, col = null;
  columns.forEach((column, i) => {
    if (column.name === name || column.columnType === type) {
      index = i;
      col = column;
      return;
    }
  });

  return {index, col};
}

function getDataByIndex(data, index, label, callback) {
  return data.map((val, i) => {
    let value = val[index] === 'N/A' ? 0 : val[index];

    if (callback) {
      return callback(value, i);
    }
    return {
      [label]: value
    };
  });
}

function checkIfColumnExist(cols, item) {
  let flag = false;
  cols.forEach(col => {
    if (col.name === item) {
      flag = true;
      return;
    }
  });
  return flag;
}

function getChartData(input) {
  if (input.rows) {
    input = {0: input};
  }

  return Object.keys(input).map((i) => {
    const chart = input[i],
      {rows, columns, uiConfig} = chart,
      xAxis = getColumnIndex(columns, null, 'DIMENSION');

    if (rows.length === 0) return null;

    const outlierIndex = getColumnIndex(columns, 'outlier');

    let counter = 0;
    let filterdRows = rows.filter((item) => {
      counter++;
      if (counter < 50 || item[outlierIndex.index] !== 0) {
        return true;
      }

      return false;
    });

    const categories = [{
      category: getDataByIndex(filterdRows, xAxis.index, 'label')
    }];

    const uiConfigObj = {};

    for (let key in uiConfig) {
      if (checkIfColumnExist(columns, key)) {
        uiConfigObj[key] = uiConfig[key];
      }
    }

    const dataset = Object.keys(uiConfigObj).map((key, index) => {
      const yAxis = getColumnIndex(columns, key),
        value = uiConfigObj[key],
        renderAs = value === 'Point' ? 'line' : value.toLowerCase();

      let data,
        seriesname = yAxis.col.displayName;

      // if value is 0, set this to be null so it is not shown.
      if (value === 'Point') {
        const current = getColumnIndex(columns, 'current');
        data = filterdRows.map((item, index) => {
          let currentValue = item[current.index];
          currentValue = Math.round(currentValue);
          currentValue = currentValue <= 0 ? 0 : currentValue;

          let dataValue = currentValue === 0 ? 0 : Math.log2(currentValue);
          dataValue = dataValue.toFixed(2);

          let label = `${seriesname}, ${item[xAxis.index]}, ${dataValue}, ${currentValue}`;

          const val = item[yAxis.index];
          return (val === 0) ? null : {'value': dataValue, toolText: label};
        });
      }
      else {
        data = filterdRows.map((item, index) => {
          let val = item[yAxis.index];
          val = Math.round(val);
          val = val <= 0 ? 0 : val;

          let dataValue = val === 0 ? 0 : Math.log2(val);
          dataValue = dataValue.toFixed(2);

          let label = `${seriesname}, ${item[xAxis.index]}, ${dataValue}, ${val}`;

          return {
            'value': dataValue,
            toolText: label
          };
        });
      }

      let chartConfig = {};
      if (value.toLowerCase() === 'line') {
        chartConfig.color = '#60E2DC';
        chartConfig.anchorradius = 0;
      }
      else if (value.toLowerCase() === 'area') {
        chartConfig.color = '#C9EDDF';
        chartConfig.anchorradius = 0;
      }
      else if (value.toLowerCase() === 'point') {
        chartConfig.lineThickness = 0;
        chartConfig.anchorradius = 4;
        chartConfig.anchorbgcolor = '#F69275';
        chartConfig.anchorBorderColor = '#F69275';
        chartConfig.anchorsides = 0;
      }

      return Object.assign({
        data,
        seriesname,
        renderAs
      }, chartConfig);
    });

    return {
      categories,
      dataset
    };
  });
}

export default function(parsedData) {
  if (parsedData && !parsedData.errorCode) {
    if ((parsedData[0] && parsedData[0].uiConfig && parsedData[0].uiConfig.type === 'combination') ||
        (parsedData.uiConfig && parsedData.uiConfig.type === 'combination')
    ) {
      return getChartData(parsedData);
    }
  }
};
