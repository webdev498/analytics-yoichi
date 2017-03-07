import {
  processData
} from '../utils/tableUtils';
import {
  getParameterByName
} from '../../commons/utils/utils';

const fs = require('fs');
const path = require('path');

function getData(rawData, url) {
  let reportId = url.split('?'),
    type = getParameterByName('type', url);

  reportId = reportId[0];
  reportId = reportId.split('/');
  reportId = reportId[reportId.length - 1];

  if (type && type !== '') {
    reportId = reportId + '-' + type;
  }

  const fileName = `../json/table/${reportId}.json`,
    filePath = path.join(__dirname, fileName);

  let tableJson = JSON.parse(fs.readFileSync(filePath, 'utf8')),
    processedData = processData(rawData, tableJson, url);

  return {
    processedData,
    tableJson
  };
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
    // const dataObj = {};// getData(rawData, ctx.request.url);
    rawData.normalizeData = {}; // dataObj.processedData;
    rawData.tableJson = {}; // dataObj.tableJson;
    ctx.normalizeData = rawData;
  }
};
