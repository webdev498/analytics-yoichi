import {
  generateRawData,
  getParameterByName
} from '../utils/utils';

import {
  generateIndividualRowData,
  generateRowObject
} from '../utils/tableUtils';

import {generateClickThroughUrl} from '../utils/kibanaUtils';

const fs = require('fs');
const path = require('path');

function processData(data, tableJson, url) {
  const {fieldMapping, nestedResult, emptyValueMessage} = tableJson.tableData;
  let tableDataSource = [];

  let rawData = generateRawData(fieldMapping, data);

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentTableData = fieldMapping[i],
      {rows, columns} = rawData[currentTableData.reportId],
      columnText = [];

    for (let d = 0, rowsLen = rows.length; d < rowsLen; d++) {
      let mainObject = {columns: []};

      // Calculate column index from API response
      for (let a = 0; a < currentTableData.columns.length; a++) {
        let currentColumnType = currentTableData.columns[a].type,
          currentColumnDataArray = currentTableData.columns[a].data,
          rowColumnDetails = {
            currentColumnType: currentColumnType,
            currentColumnDataArray: currentColumnDataArray,
            columnsArray: columns,
            currentDataRows: rows[d],
            columnText: columnText,
            nestedResult: nestedResult,
            emptyValueMessage: emptyValueMessage,
            currentColumnIndex: a
          };

        const individualRowData = generateIndividualRowData(rowColumnDetails);

        let rowDetails = {
          currentColumnType: currentColumnType,
          currentTableData: currentTableData.columns[a],
          columnText: individualRowData.columnText,
          rowNumber: d,
          row: rows[d]
        };
        mainObject = generateRowObject(rowDetails, mainObject);
        if (tableJson.kibana) {
          let parameters = {
            data: data,
            duration: getParameterByName('window', url),
            queryParamsArray: tableJson.kibana.queryParams,
            currentRowNumber: d,
            nestedResult: nestedResult,
            pathParams: tableJson.kibana.pathParams
          };
          mainObject.rowClickUrl = generateClickThroughUrl(parameters);
        }
        columnText = [];
      }
      tableDataSource.push(mainObject);
    }
  }

  return tableDataSource;
}

function getDetails(rawData, ctx) {
  let url = ctx.request.url,
    reportId = url.split('?');
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
    // const normalizeData = parsedData.rows.map((row) => (getDetails(row[0], ctx.request.url)));
    const details = getDetails(rawData, ctx);
    rawData.normalizeData = details.processedData;
    rawData.tableJson = details.tableJson;
    ctx.normalizeData = rawData;
  }
};
