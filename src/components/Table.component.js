import React from 'react';
import Reactable from 'reactable';
import ThreatAnalyticsGraph from 'components/ThreatAnalyticsGraph.component';
//import utils from 'utils/utils';
//import constants from 'utils/constants';
//import fusionChartInterface from 'utils/fusionChartInterface.js';
var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;
var unsafe = Reactable.unsafe;

//Currently this function is created here. But later on I will generate chart data source from 'utils/fusionChartInterface.js' when I will make this API Driven
var generateChartDataSourceForAngularGaugeFusionChart = function (rankScore) {
  var chartDataSource = {"chart":{"lowerLimit":"0","upperLimit":"100","showValue":"1","valueBelowPivot":"1","valueFontSize":"11","valueFontBold":"1","gaugeOuterRadius":"33","gaugeInnerRadius":16.5,"showtickvalues":"0","showTickMarks":"0","tickvaluedistance":"25","showborder":0,"gaugeFillMix":"{dark-30},{light-60},{dark-10}","bgAlpha":"0","canvasBgAlpha":"0","caption":""},"colorRange":{"color":[{"minValue":"0","maxValue":"35","code":"#6baa01"},{"minValue":"35","maxValue":"65","code":"#f8bd19"},{"minValue":"65","maxValue":"100","code":"#e44a00"}]},"dials":{"dial":[{"value":rankScore,"bgcolor":"333333","bordercolor":"333333"}]},"value":rankScore};
  return chartDataSource;
}

//Currently tableDataSource is hardcoded JSON array. But later on this will generated from API Response
var tableDataSource = [{
                'chartDataSource': generateChartDataSourceForAngularGaugeFusionChart('75'),
                'chartValue': '75',
                'chartId': 'tablechart1',
                'chartType': 'angulargauge',
                'chartWidth': '70',
                'chartHeight': '60',
                'column2': 'May 3 12:00:32.768',
                'column3': unsafe('<b>Dridex Malware</b><br/>170.3.162.105 is likely infected with Dridex'),
                'column4': unsafe('<b>IP:</b>172.31.9.170:48633<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-us"></span>'),
                'column5': unsafe('<b>IP:</b>172.31.9.170:20<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-de"></span>'),
                'columnNames': {'column1':'Rank Score','column2':'Date','column3':'Details','column4':'Source','column5':'Destination'},
                'columnStyles': {'column1':{width:"10%"},'column2':{width:"20%"},'column3':{width:"30%"},'column4':{width:"20%"},'column5':{width:"20%"}}
            },
            {
                'chartDataSource': generateChartDataSourceForAngularGaugeFusionChart('65'),
                'chartValue': '65',
                'chartId': 'tablechart2',
                'chartType': 'angulargauge',
                'chartWidth': '70',
                'chartHeight': '60',
                'column2': 'May 4 12:00:32.768',
                'column3': unsafe('<b>Malware Alert</b><br/>10.3.162.105 is likely infected with Dridex'),
                'column4': unsafe('<b>IP:</b>173.31.9.170:48633<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-us"></span>'),
                'column5': unsafe('<b>IP:</b>172.31.9.170:20<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-de"></span>'),
                'columnNames': {'column1':'Rank Score','column2':'Date','column3':'Details','column4':'Source','column5':'Destination'},
                'columnStyles': {'column1':{width:"10%"},'column2':{width:"20%"},'column3':{width:"30%"},'column4':{width:"20%"},'column5':{width:"20%"}}
            },
            {
                'chartDataSource': generateChartDataSourceForAngularGaugeFusionChart('45'),
                'chartValue': '45',
                'chartId': 'tablechart3',
                'chartType': 'angulargauge',
                'chartWidth': '70',
                'chartHeight': '60',
                'column2': 'May 4 12:00:32.768',
                'column3': unsafe('<b>Connection from bad reputation</b><br/>103.3.162.105 is likely infected with Dridex'),
                'column4': unsafe('<b>IP:</b>174.31.9.170:48633<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-us"></span>'),
                'column5': unsafe('<b>IP:</b>172.31.9.170:20<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-de"></span>'),
                'columnNames': {'column1':'Rank Score','column2':'Date','column3':'Details','column4':'Source','column5':'Destination'},
                'columnStyles': {'column1':{width:"10%"},'column2':{width:"20%"},'column3':{width:"30%"},'column4':{width:"20%"},'column5':{width:"20%"}}
            },
            {
                'chartDataSource': generateChartDataSourceForAngularGaugeFusionChart('65'),
                'chartValue': '65',
                'chartId': 'tablechart4',
                'chartType': 'angulargauge',
                'chartWidth': '70',
                'chartHeight': '60',
                'column2': 'May 4 12:00:32.768',
                'column3': unsafe('<b>Malware Alert</b><br/>10.3.162.105 is likely infected with Dridex'),
                'column4': unsafe('<b>IP:</b>175.31.9.170:48633<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-us"></span>'),
                'column5': unsafe('<b>IP:</b>172.31.9.170:20<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-de"></span>'),
                'columnNames': {'column1':'Rank Score','column2':'Date','column3':'Details','column4':'Source','column5':'Destination'},
                'columnStyles': {'column1':{width:"10%"},'column2':{width:"20%"},'column3':{width:"30%"},'column4':{width:"20%"},'column5':{width:"20%"}}
            },
            {
                'chartDataSource': generateChartDataSourceForAngularGaugeFusionChart('45'),
                'chartValue': '45',
                'chartId': 'tablechart5',
                'chartType': 'angulargauge',
                'chartWidth': '70',
                'chartHeight': '60',
                'column2': 'May 4 12:00:32.768',
                'column3': unsafe('<b>Connection from bad reputation</b><br/>103.3.162.105 is likely infected with Dridex'),
                'column4': unsafe('<b>IP:</b>176.31.9.170:48633<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-us"></span>'),
                'column5': unsafe('<b>IP:</b>172.31.9.170:20<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-de"></span>'),
                'columnNames': {'column1':'Rank Score','column2':'Date','column3':'Details','column4':'Source','column5':'Destination'},
                'columnStyles': {'column1':{width:"10%"},'column2':{width:"20%"},'column3':{width:"30%"},'column4':{width:"20%"},'column5':{width:"20%"}}
            },
            {
                'chartDataSource': generateChartDataSourceForAngularGaugeFusionChart('65'),
                'chartValue': '65',
                'chartId': 'tablechart6',
                'chartType': 'angulargauge',
                'chartWidth': '70',
                'chartHeight': '60',
                'column2': 'May 4 12:00:32.768',
                'column3': unsafe('<b>Malware Alert</b><br/>10.3.162.105 is likely infected with Dridex'),
                'column4': unsafe('<b>IP:</b>177.31.9.170:48633<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-us"></span>'),
                'column5': unsafe('<b>IP:</b>172.31.9.170:20<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-de"></span>'),
                'columnNames': {'column1':'Rank Score','column2':'Date','column3':'Details','column4':'Source','column5':'Destination'},
                'columnStyles': {'column1':{width:"10%"},'column2':{width:"20%"},'column3':{width:"30%"},'column4':{width:"20%"},'column5':{width:"20%"}}
            },
            {
                'chartDataSource': generateChartDataSourceForAngularGaugeFusionChart('45'),
                'chartValue': '45',
                'chartId': 'tablechart7',
                'chartType': 'angulargauge',
                'chartWidth': '70',
                'chartHeight': '60',
                'column2': 'May 4 12:00:32.768',
                'column3': unsafe('<b>Connection from bad reputation</b><br/>103.3.162.105 is likely infected with Dridex'),
                'column4': unsafe('<b>IP:</b>178.31.9.170:48633<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-us"></span>'),
                'column5': unsafe('<b>IP:</b>172.31.9.170:20<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-de"></span>'),
                'columnNames': {'column1':'Rank Score','column2':'Date','column3':'Details','column4':'Source','column5':'Destination'},
                'columnStyles': {'column1':{width:"10%"},'column2':{width:"20%"},'column3':{width:"30%"},'column4':{width:"20%"},'column5':{width:"20%"}}
            }];

const renderData = (props) => {
  if(!props.data) {
    return;
  }
  console.log(JSON.stringify(props.data.rows));
}

const tableCard = (props) => (
  <div style={{width:'100%'}}>{renderData(props)}
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
