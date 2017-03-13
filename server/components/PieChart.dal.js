import {
  getColumnIndexOrValue,
  generateRawData
} from '../../commons/utils/utils';

const fs = require('fs'),
  path = require('path');

function getPieJson(url) { // This url is a proxy server url.
  let reportId = url.split('?');
  reportId = reportId[0];
  reportId = reportId.split('/');
  reportId = reportId[reportId.length - 1];

  const fileName = `../json/pieChart/${reportId}.json`,
    filePath = path.join(__dirname, fileName),
    json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return json;
}

function processData(rawData, url) {
  const json = getPieJson(url),
    fieldMapping = json.chart.data.fieldMapping,
    options = json.chart.options,
    data = generateRawData(fieldMapping, rawData);

  let countValue = 0,
    totalValue = 0,
    topCountValue = 0,
    topTotalValue = 0;

  fieldMapping.forEach((api) => {
    let {rows, columns} = data[api.reportId];
    topCountValue = 0;
    topTotalValue = 0;

    rows.forEach((row) => {
      let index = getColumnIndexOrValue(api.columns, columns, row),
        value = getValue(api.columns[0].type, index, row);
      if (api.returnValueIs === 'countValue') {
        countValue = value;
      }
      else if (api.returnValueIs === 'totalValue') {
        totalValue = value;
      }
      else if (api.returnValueIs === 'topValue') {
        let total = Math.round(((value * 100) / totalValue), 2);
        if (total > 0) {
          topCountValue = topCountValue + 1;
          topTotalValue = topTotalValue + parseInt(value);
        }
      }
    });
  });

  let values = {
    countValue,
    totalValue,
    topCountValue,
    topTotalValue
  };

  return {
    pieJson: json,
    pieProps: generatePieProps(values, options)
  };
}

function getValue(columnType, index, data) {
  let value = 0;
  if (columnType === 'name') {
    value = data[index];
  }
  else if (columnType === 'index') {
    value = index;
  }
  return value;
}

export function generatePieProps(values, options) {
  let pieProps = {},
    assetPercentage = Math.round((values.topCountValue / parseInt(values.countValue)) * 100, 2),
    piePercentage = Math.round((values.topTotalValue / parseInt(values.totalValue)) * 100, 2);

  if (piePercentage > 100) {
    piePercentage = 100;
  }

  assetPercentage = isNaN(assetPercentage) ? '0' : assetPercentage.toString();
  piePercentage = isNaN(piePercentage) ? '0' : piePercentage.toString();

  pieProps = {
    assetPercentage,
    piePercentage
  };
  return pieProps;
}

export default async function PieChart(ctx, next) {
  let rawData;
  try {
    rawData = await ctx.tempData.json();
  }
  catch (error) {
    const obj = {
      errorCode: 400,
      errorMessage: 'api error',
      errorDetails: error
    };

    ctx.throw('api response error', 400, obj);
  }

  if (rawData && !rawData.errorCode) {
    const dataObj = processData(rawData, ctx.request.url);
    ctx.normalizeData = Object.assign({}, rawData, {
      pieProps: dataObj.pieProps,
      pieJson: dataObj.pieJson
    });
  }
};
