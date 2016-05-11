import React from 'react';
import Reactable from 'reactable';
import ThreatAnalyticsGraph from 'components/ThreatAnalyticsGraph.component';
//import flagIcon from 'flag-icon';

var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;
var unsafe = Reactable.unsafe;

//Currently this function is created here. But later on I will generate chart data source from 'utils/fusionChartInterface.js' when I will make this API Driven
var generateChartDataSourceForAngularGaugeFusionChart = function (rankScore) {
  var chartDataSource = {"chart":{"lowerLimit":"0","upperLimit":"100","showValue":"1","valueBelowPivot":"1","valueFontSize":"11","valueFontBold":"1","gaugeOuterRadius":"33","gaugeInnerRadius":16.5,"showtickvalues":"0","showTickMarks":"0","tickvaluedistance":"25","showborder":0,"gaugeFillMix":"{dark-30},{light-60},{dark-10}","bgAlpha":"0","canvasBgAlpha":"0","caption":""},"colorRange":{"color":[{"minValue":"0","maxValue":"35","code":"#6baa01"},{"minValue":"35","maxValue":"65","code":"#f8bd19"},{"minValue":"65","maxValue":"100","code":"#e44a00"}]},"dials":{"dial":[{"value":rankScore,"bgcolor":"333333","bordercolor":"333333"}]},"value":rankScore};
  return chartDataSource;
}

//Initilization of variables
const tableDataSource = [];

const generateDataSource = (props) => {
  if(!props.data) {
    return;
  }

  let data = props.data.rows;

  for (let i=0;i<data.length;i++) {
    let currentRow = data[i][0];
    const obj1 = {};
    obj1.chartDataSource = generateChartDataSourceForAngularGaugeFusionChart(currentRow.data.rank_alert.score);
    obj1.chartValue = currentRow.data.rank_alert.score;
    obj1.chartId = 'recentAlert' + i;
    obj1.chartType = 'angulargauge';
    obj1.chartWidth = '70';
    obj1.chartHeight = '60';
    obj1.column2 = currentRow.date;
    let column3 = "<b>" + currentRow.data.rank_alert.description + "</b><br/>" + currentRow.data.rank_alert.message;

    let column4 = "";
    if (currentRow.source != undefined) {
      if (currentRow.source.ip != undefined && currentRow.source.ip != '') column4 = column4 + "<b>IP:</b> " + currentRow.source.ip;
      if (currentRow.source.port != undefined && currentRow.source.port != '' && column4 != '') column4 = column4 + ":" + currentRow.source.port;
      if (currentRow.source.country != undefined && currentRow.source.country != '') column4 = column4 + " <span class='flag-icon flag-icon-"+currentRow.source.country.toLowerCase()+"'></span>";
      if (column4 != '') column4 = column4 + "<br/>";
      if (currentRow.source.additionalInfo != undefined && currentRow.source.additionalInfo.user != undefined && currentRow.source.additionalInfo.user != '') column4 = column4 + "<b>User:</b> " + currentRow.source.additionalInfo.user;
      if (column4 != '') column4 = column4 + "<br/>";
      if (currentRow.source.additionalInfo != undefined && currentRow.source.additionalInfo.machine != undefined && currentRow.source.additionalInfo.machine != '') column4 = column4 + "<b>Machine:</b> " + currentRow.source.additionalInfo.machine;
    }

    let column5 = "";
    if (currentRow.destination != undefined) {
      if (currentRow.destination.ip != undefined && currentRow.destination.ip != '') column5 = column5 + "<b>IP:</b> " + currentRow.destination.ip;
      if (currentRow.destination.port != undefined && currentRow.destination.port != '' && column5 != '') column5 = column5 + ":" + currentRow.destination.port;
      if (currentRow.destination.country != undefined && currentRow.destination.country != '') column5 = column5 + " <span class='flag-icon flag-icon-"+currentRow.destination.country.toLowerCase()+"'></span>";
      if (column5 != '') column5 = column5 + "<br/>";
      if (currentRow.destination.additionalInfo != undefined && currentRow.destination.additionalInfo.user != undefined && currentRow.destination.additionalInfo.user != '') column5 = column5 + "<b>User:</b> " + currentRow.destination.additionalInfo.user;
      if (column5 != '') column5 = column5 + "<br/>";
      if (currentRow.destination.additionalInfo != undefined && currentRow.destination.additionalInfo.machine != undefined && currentRow.destination.additionalInfo.machine != '') column5 = column5 + "<b>Machine:</b> " + currentRow.destination.additionalInfo.machine;
    }

    obj1.column3 = unsafe(column3);
    obj1.column4 = unsafe(column4);
    obj1.column5 = unsafe(column5);
    obj1.columnNames = {'column1':'Rank Score','column2':'Date','column3':'Details','column4':'Source','column5':'Destination'};
    obj1.columnStyles = {'column1':{width:"10%"},'column2':{width:"20%"},'column3':{width:"30%"},'column4':{width:"20%"},'column5':{width:"20%"}};

    tableDataSource.push(obj1);
  }
}

const tableCard = (props) => (
  <div style={{width:'100%'}}>{generateDataSource(props)}
      <Table style={{width:'100%'}}
             className="threatTable"
             sortable={['Rank Score','Date','Details', 'Source', 'Destination']}
             defaultSort={{column: 'Rank Score', direction: 'desc'}}
             filterable={['Date', 'Details', 'Source', 'Destination']}
             filterBy=""
             itemsPerPage={5}
             pageButtonLimit={5}>
        {tableDataSource.map(function(tableRow, index){
          return (
              <Tr>
                <Td column={tableRow.columnNames.column1} value={tableRow.chartValue} style={tableRow.columnStyles.column1}><ThreatAnalyticsGraph chartProperties={tableRow}/></Td>
                <Td column={tableRow.columnNames.column2} style={tableRow.columnStyles.column2}>{tableRow.column2}</Td>
                <Td column={tableRow.columnNames.column3} style={tableRow.columnStyles.column3}>{tableRow.column3}</Td>
                <Td column={tableRow.columnNames.column4} style={tableRow.columnStyles.column4}>{tableRow.column4}</Td>
                <Td column={tableRow.columnNames.column5} style={tableRow.columnStyles.column5}>{tableRow.column5}</Td>
              </Tr>
            );
        })}
      </Table>
  </div>
);
/*var tableCard = React.createClass({
  render: function() {
    console.log(JSON.stringify(props));
    return (
      <div style={{width:'100%'}}>
          <Table style={{width:'100%'}}
                 className="threatTable"
                 sortable={['Rank Score','Date','Details', 'Source', 'Destination']}
                 defaultSort={{column: 'Rank Score', direction: 'desc'}}
                 filterable={['Date', 'Details', 'Source', 'Destination']}
                 filterBy=""
                 itemsPerPage={5}
                 pageButtonLimit={5}>
            {tableDataSource.map(function(tableRow, index){
              return (
                  <Tr>
                    <Td column={tableRow.columnNames.column1} value={tableRow.chartValue} style={tableRow.columnStyles.column1}><ThreatAnalyticsGraph chartProperties={tableRow}/></Td>
                    <Td column={tableRow.columnNames.column2} style={tableRow.columnStyles.column2}>{tableRow.column2}</Td>
                    <Td column={tableRow.columnNames.column3} style={tableRow.columnStyles.column3}>{tableRow.column3}</Td>
                    <Td column={tableRow.columnNames.column4} style={tableRow.columnStyles.column4}>{tableRow.column4}</Td>
                    <Td column={tableRow.columnNames.column5} style={tableRow.columnStyles.column5}>{tableRow.column5}</Td>
                  </Tr>
                );
            })}
          </Table>
    	</div>
    );
  }
});
*/
export default tableCard;
