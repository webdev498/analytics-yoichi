import {
  isUndefined,
  getIndexFromObjectName,
  msToTime,
  formatBytes,
  formatDateInLocalTimeZone,
  firstCharCapitalize,
  generateRawData,
  getParameterByName
} from '../utils/utils';

import {countryNameFull} from '../utils/countryUtils';
import {generateClickThroughUrl} from '../utils/kibanaUtils';

export function processData(data, tableJson, url) {
  const {fieldMapping, nestedResult, emptyValueMessage} = tableJson.tableData;
  let tableDataSource = [];

  let rawData = generateRawData(fieldMapping, data);

  for (let i = 0; i < fieldMapping.length; i++) {
    let tableData = fieldMapping[i],
      {rows, columns} = rawData[tableData.reportId],
      columnText = [];

    for (let d = 0, rowsLen = rows.length; d < rowsLen; d++) {
      let rowObject = {columns: []};

      // Calculate column index from API response
      for (let a = 0; a < tableData.columns.length; a++) {
        let columnType = tableData.columns[a].type,
          columnData = tableData.columns[a].data,
          rowColumnDetails = {
            columnType,
            columnData,
            columnsArray: columns,
            dataRows: rows[d],
            columnText,
            nestedResult,
            emptyValueMessage,
            columnIndex: a
          };

        let rowDetails = {
          columnType,
          currentTableData: tableData.columns[a],
          columnText: generateIndividualRowData(rowColumnDetails),
          rowNumber: d,
          row: rows[d]
        };
        rowObject = generateRowObject(rowDetails, rowObject);
        if (tableJson.kibana) {
          let parameters = {
            data,
            duration: getParameterByName('window', url),
            queryParamsArray: tableJson.kibana.queryParams,
            currentRowNumber: d,
            nestedResult,
            pathParams: tableJson.kibana.pathParams
          };
          rowObject.rowClickUrl = generateClickThroughUrl(parameters);
        }
        columnText = [];
      }
      tableDataSource.push(rowObject);
    }
  }

  return tableDataSource;
}

export function generateIndividualRowData(rowColumnDetails) {
  let {columnType, columnData, columnsArray, dataRows,
    columnText, nestedResult, emptyValueMessage, columnIndex} = rowColumnDetails;

  for (let cd = 0; cd < columnData.length; cd++) {
    if (columnsArray.length === 1 && columnsArray[0].name === 'json') {
      // This condition is if API response returns a single column with one JSON object. e.g. recent alerts table
      let columnDetails = {
        columnType,
        columnData: columnData[cd],
        dataRows,
        columnText: columnText
      };
      columnText = getColumnDataWhenApiReturnsSingleColumn(columnDetails);
    }
    else {
      // This else condition is if API response returns multiple columns
      // Calculate column index from API response
      for (let i = 0; i < columnsArray.length; i++) {
        if (columnsArray[i].name === columnData[cd].fieldName) {
          let columnDetails = {
            columnType,
            columnData: columnData[cd],
            dataRows,
            columnText,
            columnIndex: i,
            columnIndexLayoutJSON: columnIndex,
            nestedResult,
            emptyValueMessage
          };
          columnText = getColumnDataWhenApiReturnsMultipleColumns(columnDetails);
        }
      }
    }
  }// Column data loop ends

  return columnText;
}

export function generateRowObject(rowDetails, rowObject) {
  let {columnType, currentTableData, columnText, rowNumber, row} = rowDetails,
    rowObj = {
      type: columnType,
      name: currentTableData.columnNameToDisplay,
      style: currentTableData.style
    };
  switch (columnType) {
    case 'chart':
      rowObj = Object.assign(rowObj, {
        data: columnText,
        chartId: currentTableData.attributes.id + rowNumber,
        chartType: currentTableData.attributes.chartType,
        chartWidth: currentTableData.attributes.chartWidth,
        chartHeight: currentTableData.attributes.chartHeight,
        row: row
      });
      columnText = '';
      rowObject.columns.push(rowObj);
      break;
    case 'text':
      rowObj = Object.assign(rowObj, {
        data: columnText
      });
      columnText = '';
      rowObject.columns.push(rowObj);
      break;
    case 'durationWidget':
      let sortValue = msToTime(columnText);
      sortValue = sortValue.timeString;
      rowObj = Object.assign(rowObj, {
        data: columnText,
        sortValue: sortValue
      });
      columnText = '';
      rowObject.columns.push(rowObj);
      break;
    case 'scoreWidget':
      rowObj = Object.assign(rowObj, {
        data: columnText
      });
      columnText = '';
      rowObject.columns.push(rowObj);
      break;
    default:
      break;
  }
  return rowObject;
}

export function getColumnDataWhenApiReturnsSingleColumn(columnDetails) {
  let {columnType, columnData, dataRows, columnText} = columnDetails;

  let fieldValue = '',
    {fieldName, displayName} = columnData,
    fieldValueArray = [],
    inputArray = {
      fieldName,
      fieldValueArray,
      fieldValue,
      dataArray: dataRows[0]
    };

  fieldValue = getIndexFromObjectName(inputArray);

  columnDetails = {
    columnType,
    fieldName,
    displayName,
    fieldValue,
    columnText
  };

  return getColumnText(columnDetails);
}

export function getColumnDataWhenApiReturnsMultipleColumns(columnDetails) {
  let {columnType, columnData, dataRows,
    columnText, chartValue, timeValue, columnIndex, columnIndexLayoutJSON, nestedResult,
    emptyValueMessage} = columnDetails,
    fieldValue = '',
    {fieldName, displayName} = columnData;
  if (!isUndefined(dataRows[columnIndex])) {
    fieldValue = dataRows[columnIndex];
  }

  // Following condition is for nested API response
  if (nestedResult) {
    columnDetails = {
      dataRows,
      fieldValue,
      columnIndexLayoutJSON,
      emptyValueMessage
    };
    fieldValue = calculateFieldValueForNestedResult(columnDetails);
  }

  columnDetails = {
    columnType,
    fieldName,
    displayName,
    fieldValue,
    columnText,
    chartValue,
    timeValue
  };

  return getColumnText(columnDetails);
}

export function calculateFieldValueForNestedResult(columnDetails) {
  let {dataRows, fieldValue, columnIndexLayoutJSON, emptyValueMessage} = columnDetails;
  for (let key in dataRows) {
    if (!isUndefined(key)) {
      if (columnIndexLayoutJSON === 0) {
        fieldValue = (key !== '') ? key : emptyValueMessage;
      }
      if (columnIndexLayoutJSON === 1) {
        fieldValue = dataRows[key];
      }
    }
  }
  return fieldValue;
}

export function getColumnText(columnDetails) {
  let {columnType, fieldValue, columnText} = columnDetails;

  if (columnType === 'text') {
    columnText = generateColumnText(columnDetails);
  }
  else {
    columnText.push({
      value: fieldValue
    });
  }

  return columnText;
}

export function appendColumnText(fieldName, displayName, fieldValue, columnText) {
  let name = displayName ? displayName.toLowerCase() : '';

  if (!isUndefined(fieldName)) {
    if (name === 'date') {
      let dateTime = formatDateInLocalTimeZone(fieldValue);
      columnText.push({
        value: dateTime.date
      });
      columnText.push({
        value: dateTime.time
      });
    }
    else if (name === 'port') {
      if (columnText[columnText.length - 1].value) {
        columnText[columnText.length - 1].value = columnText[columnText.length - 1].value + ':' + fieldValue;
      }
    }
    else if (name === 'country') {
      columnText.push({
        header: firstCharCapitalize(displayName),
        value: countryNameFull[fieldValue.toUpperCase()],
        flag: fieldValue
      });
    }
    else if (name.includes('bytes')) {
      columnText.push({
        header: displayName,
        value: formatBytes(fieldValue, 2)
      });
    }
    else if (name === 'users') {
      if (!isUndefined(fieldValue.length)) {
        if (fieldValue.length === 1) {
          displayName = 'User';
        }
        let values = '';
        for (let i = 0; i < fieldValue.length; i++) {
          if (i > 0) {
            values += ', ';
          }
          values += fieldValue[i].info.displayName;
        }

        columnText.push({
          header: displayName,
          value: values
        });
      }
    }
    else if (name !== '') {
      columnText.push({
        header: displayName,
        value: fieldValue
      });
    }
    else if (name === '') {
      columnText.push({
        value: fieldValue
      });
    }
    else {
      columnText.push({
        type: displayName.toLowerCase(),
        value: fieldValue
      });
    }
  }
  else {
    columnText.push({
      value: fieldValue
    });
  }

  return columnText;
}

export function generateColumnText(columnDetails) {
  let {fieldName, displayName, fieldValue, columnText} = columnDetails;

  if (!isUndefined(fieldValue) && fieldValue !== '' && fieldValue !== null) {
    columnText = appendColumnText(fieldName, displayName, fieldValue, columnText);
  }

  return columnText;
}
