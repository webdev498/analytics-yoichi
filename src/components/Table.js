import React from 'react';
import Reactable from 'reactable';
import ThreatAnalyticsGraph from 'components/ThreatAnalyticsGraph';

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

  let tableData = props.tableData,
      tableOptions = props.tableOptions;

  let rawData = {};
  rawData = generateRawData(tableData, data);

  tableProperties = {...tableOptions};

  for (let i = 0; i < tableData.length; i++) {
    let currentTableData = tableData[i],
        currentDataRows = rawData[currentTableData.reportId].rows,
        columnIndexArray = [],
        columnsArray = rawData[currentTableData.reportId].columns,
        columnText = '',
        chartValue = '';

    let currentDataRowsCount = 0;
    if (currentDataRows !== undefined && currentDataRows.length !== undefined) {
      currentDataRowsCount = currentDataRows.length;
    }

    for (let d = 0, rowsLen = currentDataRowsCount; d < rowsLen; d++) {
      let mainObject = {};
      mainObject.columns = [];

      //Calculate column index from API response
      for (let a = 0; a < currentTableData.columns.length; a++) {
        let currentColumnType = currentTableData.columns[a].type;
        let currentColumnDataArray = currentTableData.columns[a].data;

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
              chartValue: chartValue
            }

            let columnTextObj = getColumnText(columnDetails);
            chartValue = columnTextObj.chartValue;
            columnText = columnTextObj.columnText;
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
                const columnDetails = {
                  currentColumnType: currentColumnType,
                  fieldName: fieldName,
                  displayName: displayName,
                  fieldValue: fieldValue,
                  columnText: columnText,
                  chartValue: chartValue
                }

                let columnTextObj = getColumnText(columnDetails);
                chartValue = columnTextObj.chartValue;
                columnText = columnTextObj.columnText;
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
              rowNumber: d
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
  let {currentColumnType, fieldName, displayName, fieldValue, columnText, chartValue} = columnDetails;

  switch (currentColumnType) {
    case 'chart':
      chartValue = fieldValue;
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
            else if (displayName == 'duration') {
              let time = msToTime(fieldValue);
              let durationWidgetDisplay = '<div style="float:left;"><div class="duration">' + time[0] + '</div><br/><div class="durationLabel">Hour</div></div><div class="durationSeparator">:</div><div style="float:left;"><div class="duration">' + time[1] + '</div><br/><div class="durationLabel">Min</div></div><div class="durationSeparator">:</div><div style="float:left;"><div class="duration">' + time[2] + '</div><br/><div class="durationLabel">Sec</div></div>';
              columnText += durationWidgetDisplay;//time[0] + ":" + time[1] + ":" + time[2];
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
            else if (displayName == 'duration') {
              let time = msToTime(fieldValue);
              let durationWidgetDisplay = '<div style="float:left;"><div class="duration">' + time[0] + '</div><br/><div class="durationLabel">Hour</div></div><div class="durationSeparator">:</div><div style="float:left;"><div class="duration">' + time[1] + '</div><br/><div class="durationLabel">Min</div></div><div class="durationSeparator">:</div><div style="float:left;"><div class="duration">' + time[2] + '</div><br/><div class="durationLabel">Sec</div></div>';
              columnText += durationWidgetDisplay;//time[0] + ":" + time[1] + ":" + time[2];
            } else if (displayName === undefined) {
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
    case "durationWidget":
      break;
    default:
      break;
  }
  return {columnText: columnText,
    chartValue: chartValue
  };
}

function generateRowObject(rowDetails, mainObject) {
  let rowObj = {},
      {currentColumnType, currentTableData, chartValue, columnText, rowNumber} = rowDetails;
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
    default:
      break;
  }
  return mainObject;
}

const tableCard = (props) => (
  <div style={{width:'100%'}}>
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
                if (tableColumn.columnType == 'chart') {
                  return (
                    <Td column={tableColumn.columnName}
                        value={tableColumn.chartValue}
                        style={tableColumn.columnStyle}>
                      <ThreatAnalyticsGraph chartProperties={tableColumn}/>
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
