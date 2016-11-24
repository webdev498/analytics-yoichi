import {} from '../utils/chartUtils';

function getColumnIndex(columns, name, type) {
  let index = null, col = null;
  if (columns) {
    columns.forEach((column, i) => {
      if (column.name === name || column.columnType === type) {
        index = i;
        col = column;
        return;
      }
    });
  }

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

export function getChartData(chart) {
  // if (input.rows) {
  //   input = {0: input};
  // }

  let charts = {};
  // Object.keys(input).map((i) => {
  // const chart = input[i],
  const {rows, columns, uiConfig} = chart,
    xAxis = getColumnIndex(columns, null, 'DIMENSION');

  if (rows.length === 0) {
    return;
  }

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
      data = filterdRows.map(item => {
        let currentValue = item[current.index];
        currentValue = Math.round(currentValue);
        currentValue = currentValue <= 0 ? 0 : currentValue;

        let dataValue = currentValue === 0 ? 0 : Math.log10(currentValue);
        dataValue = dataValue.toFixed(2);

        let label = `${seriesname}, ${item[xAxis.index]}, ${dataValue}, ${currentValue}`;

        const val = item[yAxis.index];
        return (val === 0) ? null : {'value': dataValue, toolText: label};
      });
    }
    else {
      data = filterdRows.map(item => {
        let val = item[yAxis.index];
        val = Math.round(val);
        val = val <= 0 ? 0 : val;

        let dataValue = val === 0 ? 0 : Math.log10(val);
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

  charts = {
    categories,
    dataset,
    uiConfig
  };
  // });

  return charts;
}

function sortData(unordered) {
  const ordered = {};
  Object.keys(unordered).sort().reverse().forEach(function(key) {
    ordered[key] = unordered[key];
  });

  return ordered;
}

export default function(parsedData) {
  if (parsedData && !parsedData.errorCode) {
    const keys = Object.keys(parsedData),
      firstKey = keys[0];

    if ((parsedData.uiConfig && parsedData.uiConfig.type === 'combination') ||
        (parsedData[firstKey] && parsedData[firstKey].uiConfig && parsedData[firstKey].uiConfig.type === 'combination')
    ) {
      return sortData(getChartData(parsedData));
    }
  }
};
