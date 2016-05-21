import React from 'react';
import Reactable from 'reactable';
import ThreatAnalyticsGraph from 'components/ThreatAnalyticsGraph.component';
//import 'flag-icon-css/flag-icon-css';
import moment from 'moment';
import {generateChartDataSource, msToTime} from 'utils/utils';

var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;
var unsafe = Reactable.unsafe;

//Initilization of variables
let tableProperties = {};
let tableDataSource = [];

const generateDataSource = (props) => {
  //Initilization of variables
  tableProperties = {};
  tableDataSource = [];

  if(!props.data) {
    return;
  }

  tableProperties.sortable = props.attributes.sortable;
  tableProperties.defaultSort = props.attributes.defaultSort;
  tableProperties.filterable = props.attributes.filterable;
  tableProperties.filterBy = props.attributes.filterBy;

  let data = props.data.rows;
  for (let i=0;i<data.length;i++) {
    let currentRow = data[i];//[0];
    let obj1 = {};
    obj1.columns = [];

    let columns = props.columns;

    for (let k=0; k<columns.length; k++) {
      var column = columns[k];
      let obj2 = {};
      switch (column.type) {
        case "chart":
          let chartValueArray = column.data.chartValue;
          var chartValue = column.data.chartValue;
          for(let v=0; v<chartValueArray.length; v++) {
            if (v == 0) {
              chartValue = currentRow[chartValueArray[v]];
            }
            else {
              chartValue = chartValue[chartValueArray[v]];
            }
          }
          obj2.chartDataSource = generateChartDataSource(column.data.chartType, chartValue);
          obj2.chartValue = chartValue;
          obj2.chartId = column.data.chartId + i;
          obj2.chartType = column.data.chartType;
          obj2.chartWidth = column.data.chartWidth;
          obj2.chartHeight = column.data.chartHeight;
          obj2.columnType = 'chart';
          obj2.columnName = column.columnName;
          obj2.columnStyle = column.style;
          obj1.columns.push(obj2);
          break;
        case "text":
          let columnText = '';
          let dataArray = column.data;
          for (let d=0; d<dataArray.length; d++) {
            let fieldName = dataArray[d].fieldName;

            let fieldValueArray = dataArray[d].fieldValue;
            let fieldValue = dataArray[d].fieldValue;
            for(let v=0; v<fieldValueArray.length; v++) {
              if (v == 0) {
                fieldValue = currentRow[fieldValueArray[v]];
                if (fieldValue == undefined) {
                  break;
                }
              }
              else {
                fieldValue = fieldValue[fieldValueArray[v]];
                if (fieldValue == undefined) {
                  break;
                }
              }
            }
            if(dataArray[d].style != undefined && dataArray[d].style == 'bold' && fieldValue != undefined && fieldValue != '') {
              fieldValue = '<b>' + fieldValue + '</b>';
            }
            if (fieldValue != undefined && fieldValue != '') {
              if (columnText != '') {
                if (fieldName != undefined) {
                  if (fieldName == 'date') {
                    var fieldValueInLocalTime = moment.utc(fieldValue).toDate();
                    fieldValueInLocalTime = moment(fieldValueInLocalTime).format('D MMM YYYY HH:mm:ss');
                    fieldValue = fieldValueInLocalTime;
                    columnText = columnText + fieldValue;
                  }
                  else if (fieldName == 'duration') {
                    let time = msToTime(fieldValue);
                    columnText = columnText + time[0] + ":" + time[1] + ":" + time[2];
                  }
                  else if (fieldName == 'port') {
                    columnText = columnText + ':' + fieldValue;
                  }
                  else if (fieldName == 'countryFlag') {
                    columnText = columnText + ' <span class="flag-icon flag-icon-'+fieldValue.toLowerCase()+'"></span>';
                  } else {
                    columnText = columnText + '<br/>' + '<b>' + fieldName + '</b>: ' + fieldValue;
                  }
                } else {
                  columnText = columnText + '<br/>' + fieldValue;
                }
              } else {
                if (fieldName != undefined) {
                  if (fieldName == 'date') {
                    var fieldValueInLocalTime = moment.utc(fieldValue).toDate();
                    fieldValueInLocalTime = moment(fieldValueInLocalTime).format('D MMM YYYY HH:mm');
                    fieldValue = fieldValueInLocalTime;
                    columnText = columnText + fieldValue;
                  }
                  else if (fieldName == 'duration') {
                    let time = msToTime(fieldValue);
                    columnText = columnText + time[0] + ":" + time[1] + ":" + time[2];
                  } else {
                    columnText = columnText + '<b>' + fieldName + '</b>: ' + fieldValue;
                  }
                } else {
                  columnText = columnText + fieldValue;
                }
              }
            }
          }
          let columnIndex = k + 1;
          obj2.columnType = 'text';
          obj2.columnName = column.columnName;
          obj2.columnStyle = column.style;
          obj2.columnText = unsafe(columnText);
          obj1.columns.push(obj2);
          break;
        default:
          break;
      }
    }

    tableDataSource.push(obj1);
  }
}

const tableCard = (props) => (
  <div style={{width:'100%'}}>{generateDataSource(props)}
      <Table style={{width:'100%'}}
             className="threatTable"
             sortable={true}
             defaultSort={tableProperties.defaultSort}
             filterable={tableProperties.filterable}
             filterBy=""
             itemsPerPage={5}
             pageButtonLimit={5}>
        {tableDataSource.map(function(tableRow, index){
          return (
              <Tr>
                {tableRow.columns.map(function(tableColumn, indexCol){
                  if (tableColumn.columnType == 'chart') {
                    return (
                      <Td column={tableColumn.columnName} value={tableColumn.chartValue} style={tableColumn.columnStyle}>
                        <ThreatAnalyticsGraph chartProperties={tableColumn}/>
                      </Td>
                    );
                  }
                  if (tableColumn.columnType == 'text') {
                    return (
                        <Td column={tableColumn.columnName} style={tableColumn.columnStyle}>{tableColumn.columnText}</Td>
                      );
                  }
                })}
              </Tr>
            );
        })}
      </Table>
  </div>
);

export default tableCard;
