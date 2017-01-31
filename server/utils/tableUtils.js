import {
  isUndefined,
  getIndexFromObjectName,
  msToTime,
  formatBytes,
  formatDateInLocalTimeZone,
  firstCharCapitalize,
  generateRawData,
  getParameterByName
} from '../../commons/utils/utils';

import {getCountryName} from '../../commons/utils/countryUtils';
import {generateKibanaParameters} from './kibanaUtils';

export function processData(data, tableJson, url) {
  const {fieldMapping, nestedResult, emptyValueMessage} = tableJson.data;
  let tableDataSource = [];

  let rawData = generateRawData(fieldMapping, data);

  for (let i = 0; i < fieldMapping.length; i++) {
    let tableData = fieldMapping[i],
      {rows, columns} = rawData[tableData.reportId],
      columnText = [];

    for (let j = 0, rowsLen = rows.length; j < rowsLen; j++) {
      let rowObject = {columns: []};

      // Calculate column index from API response
      for (let k = 0; k < tableData.columns.length; k++) {
        let columnType = tableData.columns[k].type,
          columnData = tableData.columns[k].data,
          rowColumnDetails = {
            columnType,
            columnData,
            columns,
            dataRows: rows[j],
            columnText,
            nestedResult,
            emptyValueMessage,
            columnIndex: k
          },
          rowDetails = {
            columnType,
            columnData: tableData.columns[k],
            columnText: getDataBasedOnResponse(rowColumnDetails),
            rowNumber: j,
            row: rows[j]
          };

        rowObject = generateRowObject(rowDetails, rowObject);
        if (tableJson.kibana) {
          let parameters = {
            data,
            duration: getParameterByName('window', url),
            queryParamsArray: tableJson.kibana.queryParams,
            currentRowNumber: j,
            nestedResult,
            pathParams: tableJson.kibana.pathParams
          };
          rowObject.dataObj = {
            queryParams: generateKibanaParameters(parameters)
          };
        }
        columnText = [];
      }
      tableDataSource.push(rowObject);
    }
  }

  return tableDataSource;
}

export function getDataBasedOnResponse(rowColumnDetails) {
  let {columnType, columnData, columns, dataRows,
    columnText, nestedResult, emptyValueMessage, columnIndex} = rowColumnDetails;

  for (let i = 0; i < columnData.length; i++) {
    if (columns.length === 1 && columns[0].name === 'json') {
      // This condition is if API response returns a single column with one JSON object. e.g. recent alerts table
      let columnDetails = {
        columnType,
        columnData: columnData[i],
        dataRows,
        columnText: columnText
      };
      columnText = getDataBySingleColumnResponse(columnDetails);
    }
    else {
      // This else condition is if API response returns multiple columns
      // Calculate column index from API response
      for (let j = 0; j < columns.length; j++) {
        if (columns[j].name === columnData[i].fieldName) {
          let columnDetails = {
            columnType,
            columnData: columnData[i],
            dataRows,
            columnText,
            columnIndex: j,
            columnIndexLayoutJSON: columnIndex,
            nestedResult,
            emptyValueMessage
          };
          columnText = getDataByMultiColumnsResponse(columnDetails);
        }
      }
    }
  }// Column data loop ends

  return columnText;
}

export function generateRowObject(rowDetails, rowObject) {
  let {
      columnType,
      columnData: {header, style, attributes},
      columnText,
      rowNumber,
      row
    } = rowDetails,
    rowObj = {
      type: columnType,
      name: header,
      style
    };
  switch (columnType) {
    case 'chart':
      let {id, chartType, chartWidth, chartHeight, chartOptions} = attributes;
      rowObj = Object.assign(rowObj, {
        data: columnText,
        chartId: id + rowNumber,
        chartType,
        chartWidth,
        chartHeight,
        chartOptions,
        row
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
        sortValue
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

export function getDataBySingleColumnResponse(columnDetails) {
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

export function getDataByMultiColumnsResponse(columnDetails) {
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
      else if (columnIndexLayoutJSON === 1) {
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
        value: getCountryName[fieldValue.toUpperCase()],
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
