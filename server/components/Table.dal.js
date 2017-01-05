import {
  processData
} from '../utils/tableUtils';

const fs = require('fs');
const path = require('path');

function getDetails(rawData, url) {
  let reportId = url.split('?');
  reportId = reportId[0];
  reportId = reportId.split('/');
  reportId = reportId[reportId.length - 1];

  const fileName = `../dalJson/${reportId}.json`,
    filePath = path.join(__dirname, fileName);

  let tableJson = JSON.parse(fs.readFileSync(filePath, 'utf8')),
    processedData = processData(rawData, tableJson, url);

  return {
    processedData,
    tableJson
  };
}

export default async function Table(ctx, next) {
  let rawData = await ctx.tempData.json();

  if (!rawData.errorCode) {
    const details = getDetails(rawData, ctx.request.url);
    rawData.normalizeData = details.processedData;
    rawData.tableJson = details.tableJson;
    ctx.normalizeData = rawData;
  }
};
