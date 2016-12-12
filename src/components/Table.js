import React, {PropTypes} from 'react';
import Reactable from 'reactable';

import AngularGaugeChart from 'components/AngularGaugeChart';
import Area2DAsSparkLineChart from 'components/Area2DAsSparkLineChart';
import DurationWidget from 'components/widgets/DurationWidget';
import ScoreWidget from 'components/widgets/ScoreWidget';
import AssetIcon from 'components/widgets/AssetIcon';

import {
  generateRawData,
  getIndexFromObjectName,
  isUndefined,
  msToTime,
  formatBytes,
  formatDateInLocalTimeZone
} from 'utils/utils';

import {getCountryNameByCountryCode} from 'utils/countryUtils';
import {generateClickThroughUrl} from 'utils/kibanaUtils';

const {Table, Tr, Td, unsafe} = Reactable;

// Declaration of variables
let tableProperties = {},
  tableDataSource = [];

const generateDataSource = (props) => {
  // Initializing the variables
  tableProperties = {};
  tableDataSource = [];

  if (!props.data) {
    return;
  }

  const data = props.data,
    {fieldMapping, nestedResult, emptyValueMessage} = props.tableData,
    tableOptions = props.tableOptions;

  let rawData = {};
  rawData = generateRawData(fieldMapping, data);
  tableProperties = {...tableOptions};

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentTableData = fieldMapping[i],
      {rows, columns} = rawData[currentTableData.reportId],
      columnText = '',
      chartValue = '',
      timeValue = '';

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
            chartValue: chartValue,
            timeValue: timeValue,
            nestedResult: nestedResult,
            emptyValueMessage: emptyValueMessage,
            currentColumnIndex: a
          };

        const individualRowData = generateIndividualRowData(rowColumnDetails);

        let rowDetails = {
          currentColumnType: currentColumnType,
          currentTableData: currentTableData.columns[a],
          chartValue: individualRowData.chartValue,
          columnText: individualRowData.columnText,
          rowNumber: d,
          timeValue: individualRowData.timeValue,
          row: rows[d]
        };
        mainObject = generateRowObject(rowDetails, mainObject);
        if (props.kibana) {
          let parameters = {
            data: props.data,
            duration: props.duration,
            queryParamsArray: props.kibana.queryParams,
            currentRowNumber: d,
            nestedResult: nestedResult,
            pathParams: props.kibana.pathParams
          };
          console.log(JSON.stringify(parameters));
          console.log(generateClickThroughUrl(parameters));
          mainObject.rowClickUrl = generateClickThroughUrl(parameters);
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
          columnText: columnText,
          chartValue: chartValue,
          timeValue: timeValue
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
              columnText: columnText,
              chartValue: chartValue,
              timeValue: timeValue,
              columnIndex: columnIndex,
              columnIndexLayoutJSON: currentColumnIndex,
              nestedResult: nestedResult,
              emptyValueMessage: emptyValueMessage
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
  let {currentColumnType, currentTableData, chartValue, columnText, rowNumber, timeValue, row} = rowDetails,
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
        chartHeight: currentTableData.attributes.chartHeight,
        row: row
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
      let timeValueSort = msToTime(timeValue);
      timeValueSort = timeValueSort.timeString;
      rowObj = Object.assign(rowObj, {
        columnText: unsafe(columnText),
        timeValue: timeValue,
        timeValueSort: timeValueSort
      });
      columnText = '';
      mainObject.columns.push(rowObj);
      break;
    case 'scoreWidget':
      rowObj = Object.assign(rowObj, {
        columnText: unsafe(columnText),
        chartValue: chartValue
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
    fieldName: fieldName,
    displayName: displayName,
    fieldValue: fieldValue,
    columnText: columnText,
    chartValue: chartValue,
    timeValue: timeValue
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
  let {currentColumnType, fieldValue, columnText, chartValue, timeValue} = columnDetails;

  switch (currentColumnType) {
    case 'chart':
      chartValue = fieldValue;
      break;
    case 'durationWidget':
      timeValue = fieldValue;
      break;
    case 'scoreWidget':
      chartValue = fieldValue;
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

export function appendColumnText(fieldName, displayName, fieldValue, columnText, newLine) {
  if (!isUndefined(fieldName)) {
    if (!isUndefined(displayName) && displayName.toLowerCase() === 'date') {
      fieldValue = generateColumnTextForDisplayingDate(fieldValue);
      columnText += newLine + fieldValue;
    }
    else if (!isUndefined(displayName) && displayName.toLowerCase() === 'port') {
      fieldValue = ':' + fieldValue;
      columnText += fieldValue;
    }
    else if (!isUndefined(displayName) && displayName.toLowerCase() === 'countryflag') {
      let fieldValueToDisplay = fieldValue.toUpperCase();
      columnText += newLine + '<span class="heading">Country: </span>' +
      getCountryNameByCountryCode[fieldValueToDisplay] + ' ' + generateColumnTextForDisplayingCountryFlag(fieldValue);
    }
    else if (!isUndefined(displayName) && displayName.toLowerCase() === 'description') {
      fieldValue = '<span class="description">' + fieldValue + '</span>';
      columnText += newLine + fieldValue;
    }
    else if (!isUndefined(displayName) && displayName.toLowerCase() === 'title') {
      fieldValue = '<span class="title">' + fieldValue + '</span>';
      columnText += newLine + fieldValue;
    }
    else if (!isUndefined(displayName) && displayName.includes('bytes')) {
      fieldValue = '<span class="heading">' + displayName + ': </span>' + formatBytes(fieldValue, 2);
      columnText += newLine + fieldValue;
    }
    else if (!isUndefined(displayName) && (displayName.toLowerCase() === 'ip' ||
      displayName.toLowerCase() === 'name' || displayName.toLowerCase() === 'asn' ||
      displayName.toLowerCase() === 'owner')) {
      columnText += newLine + '<span class="heading">' + displayName + ': </span><span>' + fieldValue + '</span>';
    }
    else if (!isUndefined(displayName) && displayName.toLowerCase() === 'users') {
      if (!isUndefined(fieldValue.length)) {
        if (fieldValue.length === 1) {
          displayName = 'User';
        }
        columnText += newLine + '<span class="heading">' + displayName + ': </span>';
        for (let i = 0; i < fieldValue.length; i++) {
          if (i > 0) {
            columnText += ', ';
          }
          columnText += '<span>' + fieldValue[i].info.displayName + '</span>';
        }
      }
    }
    else if (isUndefined(displayName)) {
      columnText += newLine + fieldValue;
    }
    else {
      if (displayName !== '') {
        displayName = '<span class="heading">' + displayName + ': </span>';
      }
      columnText += newLine + displayName + fieldValue;
    }
  }
  else {
    columnText += newLine + fieldValue;
  }

  return columnText;
}

export function generateColumnTextForColumnTypeAsText(columnDetails) {
  let {fieldName, displayName, fieldValue, columnText} = columnDetails;

  if (!isUndefined(fieldValue) && fieldValue !== '' && fieldValue !== null) {
    if (columnText !== '') {
      columnText = appendColumnText(fieldName, displayName, fieldValue, columnText, '<br/>');
    }
    else {
      columnText = appendColumnText(fieldName, displayName, fieldValue, columnText, '');
    }
  }

  return columnText;
}

export function generateColumnTextForDisplayingDate(fieldValue) {
  let dateTime = formatDateInLocalTimeZone(fieldValue);

  fieldValue = '<span style="font-size: 14px; font-weight: 600;">' + dateTime.date + '</span>';
  fieldValue += '<br/>' + dateTime.time;
  return fieldValue;
}

export function generateColumnTextForDisplayingCountryFlag(fieldValue) {
  if (fieldValue !== '' && fieldValue !== null) {
    let country = getCountryNameByCountryCode[fieldValue.toUpperCase()];
    fieldValue = ' <span class="flag-icon flag-icon-' + fieldValue.toLowerCase() +
      '" rel="tooltip" title="' + country + '"></span>';
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
    case 'assetIcon':
      return (
        <AssetIcon asset={tableColumn} />
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

export class TableCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  static propTypes = {
    attributes: PropTypes.object,
    tableOptions: PropTypes.object,
    data: PropTypes.object
  }

  handleRowClick(tableRow, index) {
    const {context, props} = this;

    return () => {
      if (props.openAlertDetails) {
        const {rows} = props.data,
          currentRow = rows[index][0],
          url = `/alert/${currentRow.id}/${currentRow.date}`;
        props.updateRoute(url);
      }
      else if (props.openAssetDetails) {
        const {rows} = props.data,
          currentRow = rows[index][0],
          url = `/asset/${currentRow.type}/${currentRow.id}`;
        props.updateRoute(url);
      }
      else {
        rowClick(context, tableRow);
      }
    };
  }

  render() {
    const {props} = this;
    const that = this;
    const id = props.attributes.id;

    generateDataSource(props);
    return (
      <div>
        <Table id={id}
          style={{width: '100%'}}
          className='threatTable'
          sortable={props.tableOptions.sortable}
          filterable={props.tableOptions.filterable}
          defaultSort={props.tableOptions.defaultSort}
          filterBy={props.search}
          itemsPerPage={tableDataSource.length > props.tableOptions.itemsPerPage ? props.tableOptions.itemsPerPage : 0}
          pageButtonLimit={5}
          currentPage={0}
          hideFilterInput
          previousPageLabel={'<<'} nextPageLabel={'>>'}>
          {
            tableDataSource.map(function(tableRow, index) {
              return (
                <Tr onClick={that.handleRowClick(tableRow, index)}
                  style={{'cursor': 'pointer'}}
                  key={`tr${id}${index}`}>
                  {tableRow.columns.map(function(tableColumn, indexCol) {
                    if (tableColumn.columnType === 'chart') {
                      return (
                        <Td column={tableColumn.columnName}
                          value={tableColumn.chartValue}
                          style={tableColumn.columnStyle}
                          key={`td${id}${indexCol}`}>
                          {loadChartComponentInTableRow(tableColumn, props.duration)}
                        </Td>
                      );
                    }
                    if (tableColumn.columnType === 'durationWidget') {
                      return (
                        <Td column={tableColumn.columnName}
                          value={tableColumn.timeValueSort}
                          style={tableColumn.columnStyle}
                          key={`td${id}${indexCol}`}>
                          <DurationWidget timeValue={tableColumn.timeValue} />
                        </Td>
                      );
                    }
                    if (tableColumn.columnType === 'scoreWidget') {
                      return (
                        <Td column={tableColumn.columnName}
                          value={tableColumn.chartValue}
                          style={tableColumn.columnStyle}
                          key={`td${id}${indexCol}`}>
                          <ScoreWidget scoreValue={tableColumn.chartValue} />
                        </Td>
                      );
                    }
                    if (tableColumn.columnType === 'text') {
                      return (
                        <Td column={tableColumn.columnName}
                          style={{...tableColumn.columnStyle, 'wordBreak': 'break-all'}}
                          key={`td${id}${indexCol}`}>
                          {tableColumn.columnText}
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

TableCard.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default TableCard;
