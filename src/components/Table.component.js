import React from 'react';
import Reactable from 'reactable';
import ThreatAnalyticsGraph from 'components/ThreatAnalyticsGraph.component';
//import 'flag-icon-css/flag-icon-css';
import moment from 'moment';
import {generateChartDataSource, msToTime} from 'utils/utils';

const {Table, Tr, Td, unsafe} = Reactable;

//Declaration of variables
let tableProperties = {},
    tableDataSource = [];

const generateDataSource = (props) => {
  const data = props.data;
  if (!data) {
    return;
  }

  //if (props.tableData === undefined) {//props.child.tableData === undefined &&
   // return;
 // }

  //Initializing the variables
  tableProperties = {};
  tableDataSource = [];

  let mainData = data,
      tableData = [],
      tableOptions = {};

  // if (props.multiData[0] !== undefined) {
  //   mainData = props.multiData[0];
  // } else {
  //   mainData = props.multiData;
  // }

  /*if (props.props !== undefined) {
    tableData = props.props.tableData;
    tableOptions = props.props.tableOptions;
  } else {*/
    tableData = props.tableData;
    tableOptions = props.tableOptions;
 // }

  let rawData = {};
  for (let i = 0; i < tableData.length; i++) {
    let currentTableData = tableData[i];
    /*if (props.multiData === null && (props.multiData[0] !== undefined && mainData[currentTableData.reportId] === undefined)){
      return;
    } else *///if (mainData === undefined){//props.multiData === null && (props.multiData[0] === undefined &&
      //return;
    //} else {
      if (!rawData.hasOwnProperty(currentTableData.reportId)) {
        if (mainData[currentTableData.reportId] !== undefined) {
          rawData[currentTableData.reportId] = mainData[currentTableData.reportId];
        } else {
          rawData[currentTableData.reportId] = mainData;
        }
      }
    //}
  }
  tableProperties = {...tableOptions};

  for (let i = 0; i < tableData.length; i++) {
    let currentTableData = tableData[i],
        currentDataRows = rawData[currentTableData.reportId].rows,
        columnIndexArray = [],
        columnsArray = rawData[currentTableData.reportId].columns,
        columnText = '',
        chartValue = '';

    // if (props.multiData[0] === undefined && props.multiData !== undefined) {
    //   currentDataRows = rawData[currentTableData.reportId].rows;
    // }

    let currentDataRowsCount = 0;
    if (currentDataRows !== undefined && currentDataRows.length !== undefined) {
      currentDataRowsCount = currentDataRows.length;
    }

    for (let d = 0, rowsLen = currentDataRowsCount; d < rowsLen; d++) {
      const obj1 = {};
      obj1.columns = [];

      //Calculate column index from API response
      for (let a = 0; a < currentTableData.columns.length; a++) {
        let currentColumnType = currentTableData.columns[a].type;
        let currentColumnDataArray = currentTableData.columns[a].data;

        for (let cd = 0; cd < currentColumnDataArray.length; cd++) {
          if (columnsArray.length === 1 && columnsArray[0].name === 'json') {
          //This condition is if API response returns a single column with one JSON object. e.g. recent alerts table
            let fieldValue = '',
                {fieldName, displayName} = currentColumnDataArray[cd],
                fieldValueArray = [];

            if (fieldName.indexOf('.') > -1) {
              fieldValueArray = fieldName.split(".");
            } else {
              fieldValueArray = [fieldName];
            }

            for(let v=0; v<fieldValueArray.length; v++) {
              if (v == 0) {
                fieldValue = currentDataRows[d][0][fieldValueArray[v]];
                if (fieldValue === undefined) {
                  fieldValue = '';
                  break;
                }
              }
              else {
                fieldValue = fieldValue[fieldValueArray[v]];
                if (fieldValue === undefined) {
                  fieldValue = '';
                  break;
                }
              }
            }

            const columnDetails = {
              currentColumnType: currentColumnType,
              fieldName: fieldName,
              displayName: displayName,
              fieldValue: fieldValue,
              columnText: columnText
            }

            //Get Column Text
            switch(currentColumnType) {
              case 'chart':
                chartValue = fieldValue;
                break;
              case 'text':
                columnText = getColumnText(columnDetails);
                break;
              default:
                break;
            }
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
                  columnText: columnText
                }
                //Get Column Text
                switch(currentColumnType) {
                  case 'chart':
                    chartValue = fieldValue;
                    break;
                  case 'text':
                    columnText = getColumnText(columnDetails);
                    break;
                  default:
                    break;
                }
                break;
              }
            }
          }
        }//Column data loop ends

        let obj2 = {};
        switch(currentColumnType) {
          case 'chart':
            obj2 = {
              chartDataSource: generateChartDataSource(currentTableData.columns[a].chartType, chartValue),
              chartValue: chartValue,
              chartId: currentTableData.columns[a].chartId + d,
              chartType: currentTableData.columns[a].chartType,
              chartWidth: currentTableData.columns[a].chartWidth,
              chartHeight: currentTableData.columns[a].chartHeight,
              columnType: 'chart',
              columnName: currentTableData.columns[a].columnNameToDisplay,
              columnStyle: currentTableData.columns[a].style
            }
            chartValue = '';
            obj1.columns.push(obj2);
            break;
          case 'text':
            obj2 = {
              columnType: currentColumnType,
              columnName: currentTableData.columns[a].columnNameToDisplay,
              columnStyle: currentTableData.columns[a].style,
              columnText: unsafe(columnText)
            }
            columnText = '';
            obj1.columns.push(obj2);
            break;
          default:
            break;
        }
      }
      tableDataSource.push(obj1);
    }//mainData loop end
  }
}

function getColumnText(columnDetails) {
  let {currentColumnType, fieldName, displayName, fieldValue, columnText} = columnDetails;

  switch (currentColumnType) {
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
                columnText += ' <span className="flag-icon flag-icon-'+fieldValue.toLowerCase()+'"></span>';
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
  return columnText;
}

const tableCard = (props) => (
  <div style={{width:'100%'}}>
    <div className="tableCaption">{props.sectionTitle}</div>
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
