import React, {PropTypes} from 'react';
import Reactable from 'reactable';
import moment from 'moment';
import {generateRawData, getIndexFromObjectName, isUndefined, generateQueryParams,
  generateClickThroughUrl, generatePathParams} from 'utils/utils';
import AngularGaugeChart from 'components/AngularGaugeChart';
import Area2DAsSparkLineChart from 'components/Area2DAsSparkLineChart';
import DurationWidget from 'components/DurationWidget';

const {Table, Tr, Td, unsafe} = Reactable;

// Declaration of variables
let tableProperties = {},
  tableDataSource = [];

const generateDataSource = (props) => {
  if (!props.data) {
    return;
  }

  const data = props.data,
    {fieldMapping, nestedResult, emptyValueMessage} = props.tableData,
    tableOptions = props.tableOptions;

  // Initializing the variables
  tableProperties = {};
  tableDataSource = [];

  let rawData = {};
  rawData = generateRawData(fieldMapping, data);
  tableProperties = {...tableOptions};

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentTableData = fieldMapping[i],
      {rows, columns} = rawData[currentTableData.reportId],
      columnText = '',
      chartValue = '',
      timeValue = '';

    let currentDataRowsCount = 0;
    if (!isUndefined(rows) && !isUndefined(rows.length)) {
      currentDataRowsCount = rows.length;
    }

    for (let d = 0, rowsLen = currentDataRowsCount; d < rowsLen; d++) {
      let mainObject = {};
      mainObject.columns = [];

      // Calculate column index from API response
      for (let a = 0; a < currentTableData.columns.length; a++) {
        let currentColumnType = currentTableData.columns[a].type,
          currentColumnDataArray = currentTableData.columns[a].data,
          rowColumnDetails = {
            currentColumnType: currentColumnType,
            currentColumnDataArray: currentColumnDataArray,
            columnsArray: columns, currentDataRows: rows[d],
            columnText: columnText, chartValue: chartValue, timeValue: timeValue,
            nestedResult: nestedResult, emptyValueMessage: emptyValueMessage, currentColumnIndex: a
          };

        const individualRowData = generateIndividualRowData(rowColumnDetails);

        let rowDetails = {
          currentColumnType: currentColumnType,
          currentTableData: currentTableData.columns[a],
          chartValue: individualRowData.chartValue,
          columnText: individualRowData.columnText,
          rowNumber: d,
          timeValue: individualRowData.timeValue
        };
        mainObject = generateRowObject(rowDetails, mainObject);
        if (props.kibana) {
          let parameters = {
              props: props,
              queryParamsArray: props.kibana.queryParams,
              currentRowNumber: d
            },
            queryParams = generateQueryParams(parameters),
            pathParams = generatePathParams(props.kibana.pathParams);
          mainObject.rowClickUrl = generateClickThroughUrl(pathParams, queryParams);
        }
        columnText = '';
        chartValue = '';
      }
      tableDataSource.push(mainObject);
    }// mainData loop end
  }
};

export function generateIndividualRowData(rowColumnDetails) {
  let {currentColumnType, currentColumnDataArray, columnsArray, currentDataRows,
    columnText, chartValue, timeValue, nestedResult, emptyValueMessage, currentColumnIndex} = rowColumnDetails;

  for (let cd = 0; cd < currentColumnDataArray.length; cd++) {
    if (columnsArray.length === 1 && columnsArray[0].name === 'json') {
      // This condition is if API response returns a single column with one JSON object. e.g. recent alerts table
      let columnDetails = {
          currentColumnType: currentColumnType,
          currentColumnDataArray: currentColumnDataArray[cd],
          currentDataRows: currentDataRows,
          columnText: columnText, chartValue: chartValue, timeValue: timeValue
        },
        columnTextObj = getColumnDataWhenApiReturnsSingleColumn(columnDetails);

      chartValue = columnTextObj.chartValue;
      columnText = columnTextObj.columnText;
      timeValue = columnTextObj.timeValue;
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
              columnText: columnText, chartValue: chartValue, timeValue: timeValue,
              columnIndex: columnIndex, columnIndexLayoutJSON: currentColumnIndex,
              nestedResult: nestedResult, emptyValueMessage: emptyValueMessage
            },
            columnTextObj = getColumnDataWhenApiReturnsMultipleColumns(columnDetails);

          chartValue = columnTextObj.chartValue;
          columnText = columnTextObj.columnText;
          timeValue = columnTextObj.timeValue;
        }
      }
    }
  }// Column data loop ends

  return {
    chartValue: chartValue,
    columnText: columnText,
    timeValue: timeValue
  };
}

export function generateRowObject(rowDetails, mainObject) {
  let {currentColumnType, currentTableData, chartValue, columnText, rowNumber, timeValue} = rowDetails,
    rowObj = {
      columnType: currentColumnType,
      columnName: currentTableData.columnNameToDisplay,
      columnStyle: currentTableData.style
    };
  switch (currentColumnType) {
    case 'chart':
      rowObj = Object.assign(rowObj, {
        chartValue: chartValue,
        chartId: currentTableData.attributes.id + rowNumber,
        chartType: currentTableData.attributes.chartType,
        chartWidth: currentTableData.attributes.chartWidth,
        chartHeight: currentTableData.attributes.chartHeight
      });
      chartValue = '';
      mainObject.columns.push(rowObj);
      break;
    case 'text':
      rowObj = Object.assign(rowObj, {
        columnText: unsafe(columnText)
      });
      columnText = '';
      mainObject.columns.push(rowObj);
      break;
    case 'durationWidget':
      rowObj = Object.assign(rowObj, {
        columnText: unsafe(columnText),
        timeValue: timeValue
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
  let {currentColumnType, currentColumnDataArray, currentDataRows, columnText, chartValue,
    timeValue} = columnDetails;

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
    fieldName: fieldName, displayName: displayName, fieldValue: fieldValue,
    columnText: columnText, chartValue: chartValue, timeValue: timeValue
  };

  return getColumnText(columnDetails);// generateColumnDetailsObject(columnDetails);
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
      currentDataRows: currentDataRows, fieldValue: fieldValue,
      columnIndexLayoutJSON: columnIndexLayoutJSON, emptyValueMessage: emptyValueMessage
    };
    fieldValue = calculateFieldValueForNestedResult(columnDetails);
  }

  columnDetails = {
    currentColumnType: currentColumnType,
    fieldName: fieldName, displayName: displayName, fieldValue: fieldValue,
    columnText: columnText, chartValue: chartValue, timeValue: timeValue
  };

  return getColumnText(columnDetails); // generateColumnDetailsObject(currentColumnType,
        // fieldName, displayName, fieldValue, columnText, chartValue, timeValue);
}

export function calculateFieldValueForNestedResult(columnDetails) {
  let {currentDataRows, fieldValue, columnIndexLayoutJSON, emptyValueMessage} = columnDetails;
  for (let key in currentDataRows) {
    if (!isUndefined(key)) {
      if (columnIndexLayoutJSON === 0) {
        fieldValue = (key !== '') ? key : '<i>' + emptyValueMessage + '</i>';
      }
      if (columnIndexLayoutJSON === 1) {
        fieldValue = currentDataRows[key];
      }
    }
  }
  return fieldValue;
}

// function generateColumnDetailsObject(currentColumnType, fieldName, displayName, fieldValue, columnText,
//   chartValue, timeValue) {
//   const columnDetails = {
//     currentColumnType: currentColumnType,
//     fieldName: fieldName,
//     displayName: displayName,
//     fieldValue: fieldValue,
//     columnText: columnText,
//     chartValue: chartValue,
//     timeValue: timeValue
//   };

//   return getColumnText(columnDetails);
// }

export function getColumnText(columnDetails) {
  let {currentColumnType, fieldValue, columnText, chartValue, timeValue} = columnDetails;

  switch (currentColumnType) {
    case 'chart':
      chartValue = fieldValue;
      break;
    case 'durationWidget':
      timeValue = fieldValue;
      break;
    case 'text':
      columnText = generateColumnTextForColumnTypeAsText(columnDetails);
      break;
    default:
      break;
  }
  return {columnText: columnText,
    chartValue: chartValue,
    timeValue: timeValue
  };
}

function generateColumnTextForColumnTypeAsText(columnDetails) {
  let {fieldName, displayName, fieldValue, columnText} = columnDetails;

  if (!isUndefined(fieldValue) && fieldValue !== '' && fieldValue !== null) {
    if (columnText !== '') {
      if (!isUndefined(fieldName)) {
        if (displayName === 'date') {
          fieldValue = generateColumnTextForDisplayingDate(fieldValue);
          columnText += fieldValue;
        }
        else if (displayName === 'port') {
          columnText += ':' + fieldValue;
        }
        else if (displayName === 'countryFlag') {
          fieldValue = generateColumnTextForDisplayingCountryFlag(fieldValue);
          columnText += fieldValue;
        }
        else if (isUndefined(displayName)) {
          columnText += '<br/>' + fieldValue;
        }
        else {
          if (displayName !== '') {
            displayName = '<b>' + displayName + '</b>: ';
          }
          columnText += '<br/>' + displayName + fieldValue;
        }
      }
      else {
        columnText += '<br/>' + fieldValue;
      }
    }
    else {
      if (!isUndefined(fieldName)) {
        if (displayName === 'date') {
          fieldValue = generateColumnTextForDisplayingDate(fieldValue);
          columnText += fieldValue;
        }
        else if (isUndefined(displayName)) {
          columnText += '<br/>' + fieldValue;
        }
        else {
          if (displayName !== '') {
            displayName = '<b>' + displayName + '</b>: ';
          }
          columnText += displayName + fieldValue;
        }
      }
      else {
        columnText += fieldValue;
      }
    }
  }
  return columnText;
}

function generateColumnTextForDisplayingDate(fieldValue) {
  let fieldValueInLocalTime = moment.utc(fieldValue).toDate();
  fieldValueInLocalTime = moment(fieldValueInLocalTime).format('D MMM YYYY HH:mm:ss');
  fieldValue = fieldValueInLocalTime;
  return fieldValue;
}

function generateColumnTextForDisplayingCountryFlag(fieldValue) {
  if (fieldValue !== '' && fieldValue !== null) {
    fieldValue = ' <span class="flag-icon flag-icon-' + fieldValue.toLowerCase() + '"></span>';
  }
  return fieldValue;
}

function loadChartComponentInTableRow(tableColumn, duration) {
  switch (tableColumn.chartType) {
    case 'angulargauge':
      return (
        <AngularGaugeChart chartProperties={tableColumn} />
      );
    case 'area2d':
      return (
        <Area2DAsSparkLineChart chartProperties={tableColumn} duration={duration} />
      );
    default:
      break;
  }
}

function rowClick(context, tableRow) {
  if (!tableRow.rowClickUrl) {
    return;
  }
  context.clickThrough(tableRow.rowClickUrl);
}

class tableCard extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    tableOptions: PropTypes.object
  }

  render() {
    const {props, context} = this;
    return (
      <div style={props.attributes.style}>
        {generateDataSource(props)}
        <Table style={{width: '100%'}}
          className='threatTable'
          sortable={props.tableOptions.sortable}
          filterable={props.tableOptions.filterable}
          defaultSort={props.tableOptions.defaultSort}
          filterBy={props.tableOptions.filterBy}
          itemsPerPage={5}
          pageButtonLimit={5}
          currentPage={0}>
          {
            tableDataSource.map(function(tableRow, index) {
              return (
                <Tr onClick={() => rowClick(context, tableRow)} style={{'cursor': 'pointer'}}>
                  {tableRow.columns.map(function(tableColumn, indexCol) {
                    if (tableColumn.columnType === 'chart') {
                      return (
                        <Td column={tableColumn.columnName}
                          value={tableColumn.chartValue}
                          style={tableColumn.columnStyle}>
                          {loadChartComponentInTableRow(tableColumn, props.duration)}
                        </Td>
                      );
                    }
                    if (tableColumn.columnType === 'durationWidget') {
                      return (
                        <Td column={tableColumn.columnName}
                          value={tableColumn.timeValue}
                          style={tableColumn.columnStyle}>
                          <DurationWidget timeValue={tableColumn.timeValue} />
                        </Td>
                      );
                    }
                    if (tableColumn.columnType === 'text') {
                      return (
                        <Td column={tableColumn.columnName}
                          style={tableColumn.columnStyle}>{tableColumn.columnText}
                        </Td>
                      );
                    }
                  })}
                </Tr>
              );
            })
          }
        </Table>
      </div>
    );
  }
}

tableCard.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default tableCard;
