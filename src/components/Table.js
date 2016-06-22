import React, {PropTypes} from 'react';
import Reactable from 'reactable';
import AngularGaugeChart from 'components/AngularGaugeChart';
import Area2DAsSparkLineChart from 'components/Area2DAsSparkLineChart';
import DurationWidget from 'components/DurationWidget';
import moment from 'moment';
import {generateRawData, getIndexFromObjectName, isUndefined, generateQueryParams,
  generateClickThroughUrl, generatePathParams} from 'utils/utils';

const {Table, Tr, Td, unsafe} = Reactable;

// Declaration of variables
let tableProperties = {},
  tableDataSource = [];

function getColumnText(columnDetails) {
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

  if (fieldValue !== undefined && fieldValue !== '' && fieldValue !== null) {
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

function generateRowObject(rowDetails, mainObject) {
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

function getColumnDataWhenApiReturnsSingleColumn(currentColumnType, currentColumnDataArray, currentDataRows,
  columnText, chartValue, timeValue) {
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

  return generateColumnDetailsObject(currentColumnType,
        fieldName, displayName, fieldValue, columnText, chartValue, timeValue);
}

function getColumnDataWhenApiReturnsMultipleColumns(currentColumnType, currentColumnDataArray, currentDataRows,
  columnText, chartValue, timeValue, columnIndex, columnIndexLayoutJSON, nestedResult, emptyValueMessage) {
  let fieldValue = '',
    {fieldName, displayName} = currentColumnDataArray;
  if (!isUndefined(currentDataRows[columnIndex])) {
    fieldValue = currentDataRows[columnIndex];
  }

  // Following condition is for nested API response
  if (nestedResult) {
    fieldValue = calculateFieldValueForNestedResult(currentDataRows, fieldValue, columnIndexLayoutJSON,
      emptyValueMessage);
  }

  return generateColumnDetailsObject(currentColumnType,
        fieldName, displayName, fieldValue, columnText, chartValue, timeValue);
}

function calculateFieldValueForNestedResult(currentDataRows, fieldValue, columnIndex, emptyValueMessage) {
  for (let key in currentDataRows) {
    if (!isUndefined(key)) {
      if (columnIndex === 0) {
        fieldValue = (key !== '') ? key : '<i>' + emptyValueMessage + '</i>';
      }
      if (columnIndex === 1) {
        fieldValue = currentDataRows[key];
      }
    }
  }
  return fieldValue;
}

function generateColumnDetailsObject(currentColumnType, fieldName, displayName, fieldValue, columnText,
  chartValue, timeValue) {
  const columnDetails = {
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

function generateIndividualRowData(currentColumnType, currentColumnDataArray, columnsArray, currentDataRows,
  columnText, chartValue, timeValue, nestedResult, emptyValueMessage, currentColumnIndex) {
  for (let cd = 0; cd < currentColumnDataArray.length; cd++) {
    if (columnsArray.length === 1 && columnsArray[0].name === 'json') {
      // This condition is if API response returns a single column with one JSON object. e.g. recent alerts table
      let columnTextObj = getColumnDataWhenApiReturnsSingleColumn(currentColumnType, currentColumnDataArray[cd],
                            currentDataRows, columnText, chartValue, timeValue);

      chartValue = columnTextObj.chartValue;
      columnText = columnTextObj.columnText;
      timeValue = columnTextObj.timeValue;
    }
    else {
      // This else condition is if API response returns multiple columns
      // Calculate column index from API response
      for (let columnIndex = 0; columnIndex < columnsArray.length; columnIndex++) {
        if (columnsArray[columnIndex].name === currentColumnDataArray[cd].fieldName) {
          let columnTextObj = getColumnDataWhenApiReturnsMultipleColumns(currentColumnType,
            currentColumnDataArray[cd], currentDataRows, columnText, chartValue, timeValue,
            columnIndex, currentColumnIndex, nestedResult, emptyValueMessage);

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
      currentDataRows = rawData[currentTableData.reportId].rows,
      columnsArray = rawData[currentTableData.reportId].columns,
      columnText = '',
      chartValue = '',
      timeValue = '';

    let currentDataRowsCount = 0;
    if (!isUndefined(currentDataRows) && !isUndefined(currentDataRows.length)) {
      currentDataRowsCount = currentDataRows.length;
    }

    for (let d = 0, rowsLen = currentDataRowsCount; d < rowsLen; d++) {
      let mainObject = {};
      mainObject.columns = [];

      // Calculate column index from API response
      for (let a = 0; a < currentTableData.columns.length; a++) {
        let currentColumnType = currentTableData.columns[a].type,
          currentColumnDataArray = currentTableData.columns[a].data;

        const individualRowData = generateIndividualRowData(currentColumnType, currentColumnDataArray,
          columnsArray, currentDataRows[d], columnText, chartValue, timeValue, nestedResult,
          emptyValueMessage, a);

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

function rowClick(props, tableRow) {
  if (!tableRow.rowClickUrl) {
    return;
  }
  console.log(tableRow.rowClickUrl);
}

class tableCard extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    tableOptions: PropTypes.object
  }

  rowClick(props, tableRow) {
    if (!tableRow.rowClickUrl) {
      return;
    }
    console.log(tableRow.rowClickUrl);
  }

  render() {
    const {props} = this;
    return (
      <div style={props.attributes.style}>
        {generateDataSource(props)}
        <Table style={{width: '100%'}}
          className='threatTable'
          sortable={props.tableOptions.sortable}
          filterable={props.tableOptions.filterable}
          defaultSort={props.tableOptions.defaultSort}
          itemsPerPage={5}
          pageButtonLimit={5}
          currentPage={0}>
          {
            tableDataSource.map(function(tableRow, index) {
              return (
                <Tr onClick={() => rowClick(props, tableRow)} style={{'cursor': 'pointer'}}>
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
