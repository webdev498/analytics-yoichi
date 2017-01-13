import {
  processData
} from '../utils/tableUtils';
import {
  getParameterByName
} from '../../commons/utils/utils';

const fs = require('fs');
const path = require('path');

function getData(rawData, url) {
  let reportId = url.split('?');
  reportId = reportId[0];
  reportId = reportId.split('/');
  reportId = reportId[reportId.length - 1];

  const fileName = `../dalJson/table/${reportId}.json`,
    filePath = path.join(__dirname, fileName);

  let tableJson = JSON.parse(fs.readFileSync(filePath, 'utf8')),
    processedData = processData(rawData, tableJson, url);

  if (!tableJson.data) {
    let type = getParameterByName('type', url);
    tableJson = tableJson[type];
  }

  return {
    processedData,
    tableJson
  };
}

export default async function Table(ctx, next) {
  let rawData = await ctx.tempData.json();

  if (!rawData.errorCode) {
    const dataObj = getData(rawData, ctx.request.url);
    rawData.normalizeData = dataObj.processedData;
    rawData.tableJson = dataObj.tableJson;
    ctx.normalizeData = rawData;
  }
};
