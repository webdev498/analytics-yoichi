import React from 'react';
import Reactable from 'reactable';
import ThreatAnalyticsGraph from 'components/ThreatAnalyticsGraph.component';
//import 'flag-icon-css/flag-icon-css';
import moment from 'moment';
import {generateChartDataSource, msToTime} from 'utils/utils';

const {Table, Tr, Td, unsafe} = Reactable;

//Declaration of variables
let tableProperties, tableDataSource;

const generateDataSource = (props) => {
  //Initilization of variables
  tableProperties = {};
  tableDataSource = [];

  if(!props.data) {
    return;
  }

  tableProperties = {...props.attributes};

  const data = props.data.rows;

  for (let i = 0; i < data.length;i++) {
    const currentRow = data[i];
    const obj1 = {};
    obj1.columns = [];

    const columns = props.columns;

    for (let k = 0, colLen = columns.length; k < colLen; k++) {
      const column = columns[k];

      console.log(column);

      switch (column.type) {
        case "chart": {
          const chartValueArray = column.data.chartValue;
          let chartValue = column.data.chartValue;

          for(let v = 0; v < chartValueArray.length; v++) {
            if (v === 0) {
              chartValue = currentRow[chartValueArray[v]];
            }
            else {
              chartValue = chartValue[chartValueArray[v]];
            }
          }

          const obj2 = {
            chartDataSource: generateChartDataSource(column.data.chartType, chartValue),
            chartValue: chartValue,
            chartId: column.data.chartId + i,
            chartType: column.data.chartType,
            chartWidth: column.data.chartWidth,
            chartHeight: column.data.chartHeight,
            columnType: 'chart',
            columnName: column.columnName,
            columnStyle: column.style
          }

          console.log(obj2);
          obj1.columns.push(obj2);
          break;
        }
        case "text": {
          let columnText = '';
          let dataArray = column.data;
          for (let d = 0; d < dataArray.length; d++) {
            let {fieldName, fieldValue: fieldValueArray, fieldValue} = dataArray[d];

            for(let v = 0; v < fieldValueArray.length; v++) {
              if (v === 0) {
                fieldValue = currentRow[fieldValueArray[v]];
                if (fieldValue === undefined) {
                  break;
                }
              }
              else {
                fieldValue = fieldValue[fieldValueArray[v]];
                if (fieldValue === undefined) {
                  break;
                }
              }
            }

            if( dataArray[d].style !== undefined &&
                dataArray[d].style === 'bold' &&
                fieldValue !== undefined &&
                fieldValue !== '')
            {
              fieldValue = '<b>' + fieldValue + '</b>';
            }

            if (fieldValue !== undefined && fieldValue !== '') {
              if (columnText != '') {
                if (fieldName != undefined) {
                  if (fieldName == 'date') {
                    var fieldValueInLocalTime = moment.utc(fieldValue).toDate();
                    fieldValueInLocalTime = moment(fieldValueInLocalTime).format('D MMM YYYY HH:mm:ss');
                    fieldValue = fieldValueInLocalTime;
                    columnText += fieldValue;
                  }
                  else if (fieldName == 'duration') {
                    let time = msToTime(fieldValue);
                    columnText += time[0] + ":" + time[1] + ":" + time[2];
                  }
                  else if (fieldName == 'port') {
                    columnText += ':' + fieldValue;
                  }
                  else if (fieldName == 'countryFlag') {
                    columnText += ' <span class="flag-icon flag-icon-'+fieldValue.toLowerCase()+'"></span>';
                  } else {
                    columnText += '<br/>' + '<b>' + fieldName + '</b>: ' + fieldValue;
                  }
                }
                else {
                  columnText += '<br/>' + fieldValue;
                }
              }
              else {
                if (fieldName != undefined) {
                  if (fieldName == 'date') {
                    var fieldValueInLocalTime = moment.utc(fieldValue).toDate();
                    fieldValueInLocalTime = moment(fieldValueInLocalTime).format('D MMM YYYY HH:mm');
                    fieldValue = fieldValueInLocalTime;
                    columnText += fieldValue;
                  }
                  else if (fieldName == 'duration') {
                    let time = msToTime(fieldValue);
                    columnText += time[0] + ":" + time[1] + ":" + time[2];
                  }
                  else {
                    columnText += '<b>' + fieldName + '</b>: ' + fieldValue;
                  }
                }
                else {
                  columnText += fieldValue;
                }
              }
            }
          }

          let columnIndex = k + 1;
          const obj2 = {
            columnType: 'text',
            columnName: column.columnName,
            columnStyle: column.style,
            columnText: unsafe(columnText)
          }

          obj1.columns.push(obj2);
          break;
        }
        default:
          break;
      }
    }

    tableDataSource.push(obj1);
  }
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
