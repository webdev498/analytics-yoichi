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

        let rowDetails = {
          currentColumnType: currentColumnType,
          currentTableData: currentTableData.columns[a],
          columnText: generateIndividualRowData(rowColumnDetails),
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

export function generateIndividualRowData(rowColumnDetails) {
  let {currentColumnType, currentColumnDataArray, columnsArray, currentDataRows,
    columnText, nestedResult, emptyValueMessage, currentColumnIndex} = rowColumnDetails;

  for (let cd = 0; cd < currentColumnDataArray.length; cd++) {
    if (columnsArray.length === 1 && columnsArray[0].name === 'json') {
      // This condition is if API response returns a single column with one JSON object. e.g. recent alerts table
      let columnDetails = {
        currentColumnType: currentColumnType,
        currentColumnDataArray: currentColumnDataArray[cd],
        currentDataRows: currentDataRows,
        columnText: columnText
      };
      columnText = getColumnDataWhenApiReturnsSingleColumn(columnDetails);
    }
    else {
      // This else condition is if API response returns multiple columns
      // Calculate column index from API response
      for (let columnIndex = 0; columnIndex < columnsArray.length; columnIndex++) {
        if (columnsArray[columnIndex].name === currentColumnDataArray[cd].fieldName) {
          let columnDetails = {
            currentColumnType: currentColumnType,
            currentColumnDataArray: currentColumnDataArray[cd],
            currentDataRows: currentDataRows,
            columnText: columnText,
            columnIndex: columnIndex,
            columnIndexLayoutJSON: currentColumnIndex,
            nestedResult: nestedResult,
            emptyValueMessage: emptyValueMessage
          };
          columnText = getColumnDataWhenApiReturnsMultipleColumns(columnDetails);
        }
      }
    }
  }// Column data loop ends

  return columnText;
}

export function generateRowObject(rowDetails, mainObject) {
  let {currentColumnType, currentTableData, columnText, rowNumber, row} = rowDetails,
    rowObj = {
      type: currentColumnType,
      name: currentTableData.columnNameToDisplay,
      style: currentTableData.style
    };
  switch (currentColumnType) {
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
      mainObject.columns.push(rowObj);
      break;
    case 'text':
      rowObj = Object.assign(rowObj, {
        data: columnText
      });
      columnText = '';
      mainObject.columns.push(rowObj);
      break;
    case 'durationWidget':
      let sortValue = msToTime(columnText);
      sortValue = sortValue.timeString;
      rowObj = Object.assign(rowObj, {
        data: columnText,
        sortValue: sortValue
      });
      columnText = '';
      mainObject.columns.push(rowObj);
      break;
    case 'scoreWidget':
      rowObj = Object.assign(rowObj, {
        data: columnText
      });
      columnText = '';
      mainObject.columns.push(rowObj);
      break;
    default:
      break;
  }
  return mainObject;
}

export function getColumnDataWhenApiReturnsSingleColumn(columnDetails) {
  let {currentColumnType, currentColumnDataArray, currentDataRows, columnText} = columnDetails;

  let fieldValue = '',
    {fieldName, displayName} = currentColumnDataArray,
    fieldValueArray = [],
    inputArray = {
      fieldName: fieldName,
      fieldValueArray: fieldValueArray,
      fieldValue: fieldValue,
      dataArray: currentDataRows[0]
    };

  fieldValue = getIndexFromObjectName(inputArray);

  columnDetails = {
    currentColumnType: currentColumnType,
    fieldName: fieldName,
    displayName: displayName,
    fieldValue: fieldValue,
    columnText: columnText
  };

  return getColumnText(columnDetails);
}

export function getColumnDataWhenApiReturnsMultipleColumns(columnDetails) {
  let {currentColumnType, currentColumnDataArray, currentDataRows,
    columnText, chartValue, timeValue, columnIndex, columnIndexLayoutJSON, nestedResult,
    emptyValueMessage} = columnDetails,
    fieldValue = '',
    {fieldName, displayName} = currentColumnDataArray;
  if (!isUndefined(currentDataRows[columnIndex])) {
    fieldValue = currentDataRows[columnIndex];
  }

  // Following condition is for nested API response
  if (nestedResult) {
    columnDetails = {
      currentDataRows: currentDataRows,
      fieldValue: fieldValue,
      columnIndexLayoutJSON: columnIndexLayoutJSON,
      emptyValueMessage: emptyValueMessage
    };
    fieldValue = calculateFieldValueForNestedResult(columnDetails);
  }

  columnDetails = {
    currentColumnType: currentColumnType,
    fieldName: fieldName,
    displayName: displayName,
    fieldValue: fieldValue,
    columnText: columnText,
    chartValue: chartValue,
    timeValue: timeValue
  };

  return getColumnText(columnDetails);
}

export function calculateFieldValueForNestedResult(columnDetails) {
  let {currentDataRows, fieldValue, columnIndexLayoutJSON, emptyValueMessage} = columnDetails;
  for (let key in currentDataRows) {
    if (!isUndefined(key)) {
      if (columnIndexLayoutJSON === 0) {
        fieldValue = (key !== '') ? key : emptyValueMessage;
      }
      if (columnIndexLayoutJSON === 1) {
        fieldValue = currentDataRows[key];
      }
    }
  }
  return fieldValue;
}

export function getColumnText(columnDetails) {
  let {currentColumnType, fieldValue, columnText} = columnDetails;

  if (currentColumnType === 'text') {
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
