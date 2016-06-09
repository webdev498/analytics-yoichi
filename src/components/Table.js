import React from 'react';
import Reactable from 'reactable';
import ThreatAnalyticsGraph from 'components/ThreatAnalyticsGraph';

import DurationWidget from 'components/DurationWidget';
import moment from 'moment';
import {generateChartDataSource, msToTime, generateRawData, getIndexFromObjectName} from 'utils/utils';

const {Table, Tr, Td, unsafe} = Reactable;

//Declaration of variables
let tableProperties = {},
    tableDataSource = [];

const generateDataSource = (props) => {
  const data = props.data;
  if (!data) {
    return;
  }

  //Initializing the variables
  tableProperties = {};
  tableDataSource = [];

  let {fieldMapping, nestedResult, emptyValueMessage} = props.tableData,
      tableOptions = props.tableOptions;

  let rawData = {};
  rawData = generateRawData(fieldMapping, data);

  tableProperties = {...tableOptions};

  for (let i = 0; i < fieldMapping.length; i++) {
    let currentTableData = fieldMapping[i],
        currentDataRows = rawData[currentTableData.reportId].rows,
        columnIndexArray = [],
        columnsArray = rawData[currentTableData.reportId].columns,
        columnText = '',
        chartValue = '',
        timeValue = '';

    let currentDataRowsCount = 0;
    if (currentDataRows !== undefined && currentDataRows.length !== undefined) {
      currentDataRowsCount = currentDataRows.length;
    }

    for (let d = 0, rowsLen = currentDataRowsCount; d < rowsLen; d++) {
      let mainObject = {};
      mainObject.columns = [];

      //Calculate column index from API response
      for (let a = 0; a < currentTableData.columns.length; a++) {
        let currentColumnType = currentTableData.columns[a].type,
            currentColumnDataArray = currentTableData.columns[a].data;

        for (let cd = 0; cd < currentColumnDataArray.length; cd++) {
          if (columnsArray.length === 1 && columnsArray[0].name === 'json') {
            //This condition is if API response returns a single column with one JSON object. e.g. recent alerts table
            let fieldValue = '',
                {fieldName, displayName} = currentColumnDataArray[cd],
                fieldValueArray = [],
                inputArray = {
                  fieldName: fieldName,
                  fieldValueArray: fieldValueArray,
                  fieldValue: fieldValue,
                  dataArray: currentDataRows[d][0]
                };

            fieldValue = getIndexFromObjectName(inputArray);

            const columnDetails = {
              currentColumnType: currentColumnType,
              fieldName: fieldName,
              displayName: displayName,
              fieldValue: fieldValue,
              columnText: columnText,
              chartValue: chartValue,
              timeValue: timeValue
            }

            let columnTextObj = getColumnText(columnDetails);
            chartValue = columnTextObj.chartValue;
            columnText = columnTextObj.columnText;
            timeValue = columnTextObj.timeValue;
          } else {
            //Calculate column index from API response
            for (let c = 0; c < columnsArray.length; c++) {
              if (columnsArray[c].name === currentColumnDataArray[cd].fieldName) {
                columnIndexArray[a] = c;
                let fieldValue = '',
                    {fieldName, displayName} = currentColumnDataArray[cd];
                if (currentDataRows[d][c] !== undefined) {
                  fieldValue = currentDataRows[d][c];
                }

                //Following condition is for nested API response
                if (nestedResult) {
                  for (let key in currentDataRows[d]) {
                    if (key !== undefined) {
                      if (c == 0) {
                        fieldValue = (key !== '') ? key : '<i>' + emptyValueMessage + '</i>';
                      }
                      if (c == 1) {
                        fieldValue = currentDataRows[d][key];
                      }
                    }
                  }
                }

                const columnDetails = {
                  currentColumnType: currentColumnType,
                  fieldName: fieldName,
                  displayName: displayName,
                  fieldValue: fieldValue,
                  columnText: columnText,
                  chartValue: chartValue,
                  timeValue: timeValue
                }

                let columnTextObj = getColumnText(columnDetails);
                chartValue = columnTextObj.chartValue;
                columnText = columnTextObj.columnText;
                timeValue = columnTextObj.timeValue;
                break;
              }
            }
          }
        }//Column data loop ends

        let rowObj = {},
            rowDetails = {
              currentColumnType: currentColumnType,
              currentTableData: currentTableData.columns[a],
              chartValue: chartValue,
              columnText: columnText,
              rowNumber: d,
              timeValue: timeValue
            };
        mainObject = generateRowObject(rowDetails, mainObject);
        columnText = '';
        chartValue = '';
      }
      tableDataSource.push(mainObject);
    }//mainData loop end
  }
}

function getColumnText(columnDetails) {
  let {currentColumnType, fieldName, displayName, fieldValue, columnText, chartValue, timeValue} = columnDetails;

  switch (currentColumnType) {
    case 'chart':
      chartValue = fieldValue;
      break;
    case 'durationWidget':
      timeValue = fieldValue;
      break;
    case "text":
      if (fieldValue !== undefined && fieldValue !== '' && fieldValue !== null) {
        if (columnText != '') {
          if (fieldName != undefined) {
            if (displayName == 'date') {
              let fieldValueInLocalTime = moment.utc(fieldValue).toDate();
              fieldValueInLocalTime = moment(fieldValueInLocalTime).format('D MMM YYYY HH:mm:ss');
              fieldValue = fieldValueInLocalTime;
              columnText += fieldValue;
            }
            else if (displayName == 'port') {
              columnText += ':' + fieldValue;
            }
            else if (displayName == 'countryFlag') {
              if (fieldValue != '' && fieldValue != null) {
                columnText += ' <span class="flag-icon flag-icon-'+fieldValue.toLowerCase()+'"></span>';
              }
            } else if (displayName === undefined) {
              columnText += '<br/>' + fieldValue;
            } else {
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
          if (fieldName != undefined) {
            if (displayName == 'date') {
              let fieldValueInLocalTime = moment.utc(fieldValue).toDate();
              fieldValueInLocalTime = moment(fieldValueInLocalTime).format('D MMM YYYY HH:mm');
              fieldValue = fieldValueInLocalTime;
              columnText += fieldValue;
            }
            else if (displayName === undefined) {
              columnText += '<br/>' + fieldValue;
            } else {
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
      break;
    default:
      break;
  }
  return {columnText: columnText,
    chartValue: chartValue,
    timeValue: timeValue
  };
}

function generateRowObject(rowDetails, mainObject) {
  let rowObj = {},
      {currentColumnType, currentTableData, chartValue, columnText, rowNumber, timeValue} = rowDetails;
  switch(currentColumnType) {
    case 'chart':
      rowObj = {
        chartDataSource: generateChartDataSource(currentTableData.chartType, chartValue),
        chartValue: chartValue,
        chartId: currentTableData.chartId + rowNumber,
        chartType: currentTableData.chartType,
        chartWidth: currentTableData.chartWidth,
        chartHeight: currentTableData.chartHeight,
        columnType: 'chart',
        columnName: currentTableData.columnNameToDisplay,
        columnStyle: currentTableData.style
      }
      chartValue = '';
      mainObject.columns.push(rowObj);
      break;
    case 'text':
      rowObj = {
        columnType: currentColumnType,
        columnName: currentTableData.columnNameToDisplay,
        columnStyle: currentTableData.style,
        columnText: unsafe(columnText)
      }
      columnText = '';
      mainObject.columns.push(rowObj);
      break;
    case 'durationWidget':
      rowObj = {
        columnType: currentColumnType,
        columnName: currentTableData.columnNameToDisplay,
        columnStyle: currentTableData.style,
        columnText: unsafe(columnText),
        timeValue: timeValue
      }
      columnText = '';
      mainObject.columns.push(rowObj);
      break;
    default:
      break;
  }
  return mainObject;
}

const tableCard = (props) => (
  <div style={props.attributes.style}>
    {generateDataSource(props)}
    <Table style={{width:'100%'}}
           className="threatTable"
           sortable={true}
           defaultSort={tableProperties.defaultSort}
           filterable={tableProperties.filterable}
           filterBy=""
           itemsPerPage={5}
           pageButtonLimit={5}
           currentPage={0}>
      {
        tableDataSource.map(function(tableRow, index){
          return (
            <Tr>
              {tableRow.columns.map(function(tableColumn, indexCol){
                if (tableColumn.columnType === 'chart') {
                  return (
                    <Td column={tableColumn.columnName}
                        value={tableColumn.chartValue}
                        style={tableColumn.columnStyle}>
                      {/*function(tableColumn, indexCol){
                        if (tableColumn.chartType === 'angulargauge') {
                          return (
                            <ThreatAnalyticsGraph chartProperties={tableColumn}/>
                          )
                        } else if (tableColumn.chartType === 'area2d') {
                          return (
                            <ThreatAnalyticsGraph chartProperties={tableColumn}/>
                          )
                        }
                      }*/}
                      <ThreatAnalyticsGraph chartProperties={tableColumn}/>
                    </Td>
                  );
                }
                if (tableColumn.columnType == 'durationWidget') {
                  return (
                    <Td column={tableColumn.columnName}
                        value={tableColumn.timeValue}
                        style={tableColumn.columnStyle}>
                      <DurationWidget timeValue={tableColumn.timeValue}/>
                    </Td>
                  );
                }
                if (tableColumn.columnType == 'text') {
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

export default tableCard;
