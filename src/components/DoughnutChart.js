import React from 'react';

var doughnutAttributes = {};

function generateDoughnutChart (assetsCount, topAssetsCount, top10Count, totalCount) {
  var highlightedColor1 = "#5E2B78"; //Purple
  var highlightedColor2 = "#8ABB24"; //Green
  var nonHighlightedColor = "#CCCCCC"; //Gray

  var percentage = Math.round((topAssetsCount / parseInt(assetsCount)) * 100, 2);
  var percentage1 = percentage;
  if (percentage == 0) {
    percentage = Math.round((topAssetsCount / parseInt(assetsCount)) * 100, 4);
  }

  if (percentage > 100) percentage = 100;
  var background = nonHighlightedColor;
  var color = highlightedColor2;
  var background2 = background;
  var color2 = color;
  var transform1 = "rotate(90deg)";
  var calculateTransform2 = (percentage/100*360);
  var transform2 = "rotate("+calculateTransform2+"deg)";

  if (percentage < 50) {
    background = color;
    color = background2;
    color2 = background2;
    var calculateTransform1 = (percentage/100*360+90);
    transform1 = "rotate("+calculateTransform1+"deg)";
    transform2 = "rotate(0deg)";
  }

  var chart1Background = {background: background};
  var chart1SliceOneStyle = {transform: transform1, WebkitTransform: transform1, background: color};
  var chart1SliceTwoStyle = {transform: transform2, WebkitTransform: transform2, background: color2};
  /**********************************************************/

  var percentage = Math.round((top10Count / totalCount) * 100, 2);
  var percentage2 = percentage;
  if (percentage == 0) {
    percentage = Math.round((top10Count / totalCount) * 100, 4);
  }

  if (percentage > 100) percentage = 100;
  var background = nonHighlightedColor;
  var color = highlightedColor1;
  var background2 = background;
  var color2 = color;
  var transform1 = "rotate(90deg)";
  var calculateTransform2 = (percentage/100*360);
  var transform2 = "rotate("+calculateTransform2+"deg)";

  if (percentage < 50) {
    background = color;
    color = background2;
    color2 = background2;
    var calculateTransform1 = (percentage/100*360+90);
    transform1 = "rotate("+calculateTransform1+"deg)";
    transform2 = "rotate(0deg)";
  }

  var chart2Background = {background: background};
  var chart2SliceOneStyle = {transform: transform1, WebkitTransform: transform1, background: color};
  var chart2SliceTwoStyle = {transform: transform2, WebkitTransform: transform2, background: color2};

  var assetPercentage = "";
  if (percentage1 == 0) {assetPercentage = assetsCount;}
  else {assetPercentage = percentage1;}

  /*if (chart1 == "chart1") {
    $("#connectionsPercentage").html("<span style='font-weight:bold;color:"+highlightedColor1+";'>" + percentage2 + "%</span> of connections are used by <span style='font-weight:bold;color:"+highlightedColor2+";'>" + assetPercentage + "%</span> of assets");
  }
  if (chart1 == "chart3") {
    $("#bandwidthPercentage").html("<span style='font-weight:bold;color:"+highlightedColor1+";'>" + percentage2 + "%</span> of bandwidth are used by <span style='font-weight:bold;color:"+highlightedColor2+";'>" + assetPercentage + "%</span> of assets");
  }*/

  var percentage2Color = {fontWeight:'bold',color:highlightedColor1};
  var percentage1Color = {fontWeight:'bold',color:highlightedColor2};

  doughnutAttributes = {percentage1: percentage1,
    percentage2: percentage2,
    chart1Background: chart1Background,
    chart1SliceOneStyle: chart1SliceOneStyle,
    chart1SliceTwoStyle: chart1SliceTwoStyle,
    chart2Background: chart2Background,
    chart2SliceOneStyle: chart2SliceOneStyle,
    chart2SliceTwoStyle: chart2SliceTwoStyle,
    percentage1Color: percentage1Color,
    percentage2Color: percentage2Color,
    assetPercentage: assetPercentage,
    assetsCount:assetsCount, topAssetsCount:topAssetsCount, top10Count:top10Count, totalCount:totalCount
  };

  console.log(JSON.stringify(doughnutAttributes));
}

const renderChart = (props) => {
  if(props.multiData == null) {
    return;
  }
  if(props.multiData[0] == null || props.multiData[1] == null || props.multiData[2] == null || props.multiData[3] == null) {
    return;
  }
  //console.log(props.sectionTitle);
  const data1 = props.multiData[0];
  const data2 = props.multiData[1];
  const data3 = props.multiData[2];
  const data4 = props.multiData[3];

  //console.log(props.apisFieldMapping);
  var totalConnections = parseInt(data1.rows[0][0]);
  var totalBandwidth = parseInt(data1.rows[0][1]);
  var assetsCount = data4.rows[0][0][0];

  var top10Connections = 0;
  var top10Bandwidth = 0;
  var topConnectionsAssetsCount = 0;
  var topBandwidthAssetsCount = 0;

  for (var i=0; i<data2.rows.length; i++) {
    var value = Math.round(((data2.rows[i][1] * 100) / totalConnections), 2);
    if (value > 0) {
      topConnectionsAssetsCount = topConnectionsAssetsCount + 1;
      top10Connections = top10Connections + parseInt(data2.rows[i][1]);
    }
  }
  for (var i=0; i<data3.rows.length; i++) {
    var value = Math.round(((data3.rows[i][1] * 100) / totalBandwidth), 2);
    if (value > 0) {
      topBandwidthAssetsCount = topBandwidthAssetsCount + 1;
      top10Bandwidth = top10Bandwidth + parseInt(data3.rows[i][1]);
    }
  }

  var averageConnections = top10Connections / parseInt(assetsCount);
  var averageBandwidth = top10Bandwidth / parseInt(assetsCount);

  generateDoughnutChart(assetsCount, topConnectionsAssetsCount, top10Connections, totalConnections.toPrecision());
  //generateDoughnutCharts(assetsCount, topBandwidthAssetsCount, top10Bandwidth, totalBandwidth.toPrecision(), "chart3", "chart4");
}

const DoughnutChart = (props) => (
  <div id={props.id}>{renderChart(props)}
    <div className="donutChartBorder">
      <div className="chartCaption">Top Connections</div>
      <div className="row">
        <div className="col-sm-12" >
          <div className="card1 text-center">
            <div className="percentage1 chart2">{doughnutAttributes.percentage2}%</div>
            <div className="donut-chart chart2" style={doughnutAttributes.chart2Background}>
              <div className="slice one" style={doughnutAttributes.chart2SliceOneStyle}></div>
              <div className="slice two" style={doughnutAttributes.chart2SliceTwoStyle}></div>
              <div className="chart-center"><span></span></div>
            </div>
          </div>
          <div className="card2">
            <div className="donut-chart chart1" style={doughnutAttributes.chart1Background}>
              <div className="slice one" style={doughnutAttributes.chart1SliceOneStyle}></div>
              <div className="slice two" style={doughnutAttributes.chart1SliceTwoStyle}></div>
              <div className="chart-center"><span>{doughnutAttributes.percentage1}%</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row"><br/><br/>
        <div className="col-sm-12 text-center" id="connectionsPercentage">
          <span style={doughnutAttributes.percentage2Color}>{doughnutAttributes.percentage2}%</span> of connections are used by
          <span style={doughnutAttributes.percentage1Color}>{doughnutAttributes.assetPercentage}%</span> of assets
        </div><br/><br/>
      </div>
    </div>
  </div>
)

export default DoughnutChart;
