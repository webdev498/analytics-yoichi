import React from 'react';
import Reactable from 'reactable';
var Table = Reactable.Table;
var unsafe = Reactable.unsafe;

var chartDataSource = {"chart":{"lowerLimit":"0","upperLimit":"100","showValue":"1","valueBelowPivot":"1","valueFontSize":"11","valueFontBold":"1","gaugeOuterRadius":"33","gaugeInnerRadius":16.5,"showtickvalues":"0","showTickMarks":"0","tickvaluedistance":"25","showborder":0,"gaugeFillMix":"{dark-30},{light-60},{dark-10}","bgAlpha":"0","canvasBgAlpha":"0","caption":""},"colorRange":{"color":[{"minValue":"0","maxValue":"35","code":"#6baa01"},{"minValue":"35","maxValue":"65","code":"#f8bd19"},{"minValue":"65","maxValue":"100","code":"#e44a00"}]},"dials":{"dial":[{"value":75,"bgcolor":"333333","bordercolor":"333333"}]},"value":75};

/*var scoreChartConfigs = {
              id: "score-chart",
              renderAt: "angulargauge",
              type: "column2d",
              width: 70,
              height: 60,
              dataFormat: "json",
              dataSource: chartDataSource
          };*/



var tableCard = React.createClass({
  render: function() {
    return (
      <div style={{width:'100%'}}>

      {/*<fusioncharts width="70"  height="60" type="angulargauge" datasource={{"chart":{"lowerLimit":"0","upperLimit":"100","showValue":"1","valueBelowPivot":"1","valueFontSize":"11","valueFontBold":"1","gaugeOuterRadius":"33","gaugeInnerRadius":16.5,"showtickvalues":"0","showTickMarks":"0","tickvaluedistance":"25","showborder":0,"gaugeFillMix":"{dark-30},{light-60},{dark-10}","bgAlpha":"0","canvasBgAlpha":"0","caption":""},"colorRange":{"color":[{"minValue":"0","maxValue":"35","code":"#6baa01"},{"minValue":"35","maxValue":"65","code":"#f8bd19"},{"minValue":"65","maxValue":"100","code":"#e44a00"}]},"dials":{"dial":[{"value":75,"bgcolor":"333333","bordercolor":"333333"}]},"value":75}}></fusioncharts>*/}

      {/*<div id="score-chart"></div>


      <react_fc.FusionCharts {...scoreChartConfigs}/>
*/}

      <Table style={{width:'100%'}} className="threatTable" data={[
            {
                'Rank Score': unsafe('20'),
                'Date': unsafe('May 3 12:00:32.768'),
                'Details': unsafe('<b>Dridex Malware</b><br/>10.3.162.105 is likely infected with Dridex'),
                'Source': unsafe('<b>IP:</b>172.31.9.170:48633<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-us"></span>'),
                'Destination': unsafe('<b>IP:</b>172.31.9.170:20<br/><b>Machine:</b>rank-master <span className="flag-icon flag-icon-de"></span>')
            },
            {
                'Rank Score': unsafe('40'),
                'Date': unsafe('May 4 12:00:32.768'),
                'Details': unsafe('<b>Malware Alert</b><br/>10.3.162.105 is likely infected with Dridex'),
                'Source': unsafe('<b>IP:</b>152.31.9.170:48633<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-us"></span>'),
                'Destination': unsafe('<b>IP:</b>154.31.9.170:20<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-de"></span>')
            },
            {
                'Rank Score': unsafe('60'),
                'Date': unsafe('May 5 12:00:32.768'),
                'Details': unsafe('<b>Malware Alert</b><br/>10.3.162.105 is likely infected with Dridex'),
                'Source': unsafe('<b>IP:</b>152.31.9.170:48633<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-us"></span>'),
                'Destination': unsafe('<b>IP:</b>154.31.9.170:20<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-de"></span>')
            },
            {
                'Rank Score': unsafe('35'),
                'Date': unsafe('May 6 12:00:32.768'),
                'Details': unsafe('<b>Malware Alert</b><br/>10.3.162.105 is likely infected with Dridex'),
                'Source': unsafe('<b>IP:</b>152.31.9.170:48633<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-us"></span>'),
                'Destination': unsafe('<b>IP:</b>154.31.9.170:20<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-de"></span>')
            },
            {
                'Rank Score': unsafe('10'),
                'Date': unsafe('May 7 12:00:32.768'),
                'Details': unsafe('<b>Malware Alert</b><br/>10.3.162.105 is likely infected with Dridex'),
                'Source': unsafe('<b>IP:</b>152.31.9.170:48633<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-us"></span>'),
                'Destination': unsafe('<b>IP:</b>154.31.9.170:20<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-de"></span>')
            },
            {
                'Rank Score': unsafe('25'),
                'Date': unsafe('May 8 12:00:32.768'),
                'Details': unsafe('<b>Malware Alert</b><br/>10.3.162.105 is likely infected with Dridex'),
                'Source': unsafe('<b>IP:</b>152.31.9.170:48633<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-us"></span>'),
                'Destination': unsafe('<b>IP:</b>154.31.9.170:20<br/><b>Machine:</b>rank-master-machine <span className="flag-icon flag-icon-de"></span>')
            }
        ]} sortable={[
          'Rank Score',
          'Date'
      ]}
      defaultSort={{column: 'Rank Score', direction: 'desc'}}

      filterable={['Date', 'Details', 'Source', 'Destination']}
      filterBy="" itemsPerPage={5} pageButtonLimit={5}/>

	</div>
    );
  }
});
/*config="{"containerBackgroundOpacity":"0"}"
*/
export default tableCard;
