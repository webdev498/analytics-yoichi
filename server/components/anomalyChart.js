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

    const uiConfigObj = Object.assign({}, uiConfig);
    delete uiConfigObj.type;
    delete uiConfigObj.title;

    const dataset = Object.keys(uiConfigObj).map((key, index) => {
      const yAxis = getColumnIndex(columns, key),
        value = uiConfigObj[key],
        renderAs = value === 'Point' ? 'line' : value.toLowerCase();

      let data;

      // if value is 0, set this to be null so it is not shown.
      if (value === 'Point') {
        const current = getColumnIndex(columns, 'current');
        data = filterdRows.map((item, index) => {
          let currentValue = item[current.index];
          currentValue = Math.round(currentValue);
          currentValue = currentValue <= 0 ? 0 : currentValue;

          const val = item[yAxis.index];
          return (val === 0) ? null : {'value': currentValue};
        });
      }
      else {
        data = getDataByIndex(filterdRows, yAxis.index, 'value', (val, index) => {
          val = Math.round(val);
          val = val <= 0 ? 0 : val;
          return {'value': val};
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
        chartConfig.color = '#ff0000';
        chartConfig.lineThickness = 0;
      }

      return Object.assign({
        data,
        seriesname: yAxis.col.displayName,
        renderAs
      }, chartConfig);
    });

    return {
      categories,
      dataset
    };
  });
}

export default async function(ctx, next) {
  let parsedData = await ctx.tempData.clone().json();
  if (parsedData && parsedData[0] && parsedData[0].uiConfig.baseline) {
    const normalizeData = getChartData(parsedData);
    parsedData.normalizeData = normalizeData;
    ctx.normalizeData = parsedData;
  }
};
