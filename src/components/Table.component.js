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
  if (props.multiData === null || props.multiData === undefined) {
    return;
  }

  if (props.props.tableData === undefined) {
    return;
  }

  const mainData = props.multiData[0];
  const tableData = props.props.tableData;
  const tableOptions = props.props.tableOptions;

  let rawData = {};
  for (let i = 0; i < tableData.length; i++) {
    let currentTableData = tableData[i];
    if (props.multiData === null && mainData[currentTableData.reportId] === undefined){
      return;
    } else {
      if (!rawData.hasOwnProperty(currentTableData.reportId)) {
        rawData[currentTableData.reportId] = mainData[currentTableData.reportId];
      }
    }
  }

  tableProperties = {...tableOptions};

  for (let i = 0; i < tableData.length; i++) {
    let currentTableData = tableData[i],
        currentDataRows = rawData[currentTableData.reportId].rows,
        columnIndexArray = [],
        columnsArray = rawData[currentTableData.reportId].columns,
        columnText = '';

    for (let d = 0, rowsLen = currentDataRows.length; d < rowsLen; d++) {
      const obj1 = {};
      obj1.columns = [];

      if (columnsArray.length === 1 && columnsArray[0].name === 'json') {
        //This condition is if API response returns a single columns with one JSON object. e.g. recent alerts table
      } else {
        //Calculate column index from API response
        for (let a = 0; a < currentTableData.columns.length; a++) {
          let currentColumnType = currentTableData.columns[a].type;
          let currentColumnDataArray = currentTableData.columns[a].data;

          for (let cd = 0; cd < currentColumnDataArray.length; cd++) {
            for (let c = 0; c < columnsArray.length; c++) {
              if (columnsArray[c].name === currentColumnDataArray[cd].fieldName) {
                columnIndexArray[a] = c;
                //code to add columns data
                switch (currentColumnType) {
                  case "chart":
                    break;
                  case "text":
                    //console.log(currentDataRows[d][c]);
                    let fieldValue = '',
                        {fieldName, displayName} = currentColumnDataArray[cd];

                    if (currentDataRows[d][c] !== undefined) {
                      fieldValue = currentDataRows[d][c];
                    }

                    if (fieldValue !== undefined && fieldValue !== '' && fieldValue !== null) {
                      if (columnText != '') {
                        if (fieldName != undefined) {
                          if (displayName == 'date') {
                            var fieldValueInLocalTime = moment.utc(fieldValue).toDate();
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
                            var fieldValueInLocalTime = moment.utc(fieldValue).toDate();
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
                break;
              }
            }
          }//Column data loop ends
          const obj2 = {
            columnType: currentColumnType,
            columnName: currentTableData.columns[a].columnNameToDisplay,
            columnStyle: currentTableData.columns[a].style,
            columnText: unsafe(columnText)
          }
          columnText = '';
          obj1.columns.push(obj2);
        }
      }
      tableDataSource.push(obj1);
    }
  }
}

const tableCard = (props) => (
  <div style={{width:'100%'}}>
    {generateDataSource(props)}
    <Table style={{width:'100%'}}
           className="threatTable"
           sortable={true}
           filterBy=""
           itemsPerPage={5}
           pageButtonLimit={5}>

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
