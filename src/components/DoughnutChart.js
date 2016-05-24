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

  var displayPercentage1 = percentage1.toString() + '%';

  var percentage2Color = {fontWeight:'bold',color:highlightedColor1};
  var percentage1Color = {fontWeight:'bold',color:highlightedColor2};

  doughnutAttributes = {displayPercentage1: displayPercentage1,
    percentage2: percentage2,
    chart1Background: chart1Background,
    chart1SliceOneStyle: chart1SliceOneStyle,
    chart1SliceTwoStyle: chart1SliceTwoStyle,
    chart2Background: chart2Background,
    chart2SliceOneStyle: chart2SliceOneStyle,
    chart2SliceTwoStyle: chart2SliceTwoStyle,
    percentage1Color: percentage1Color,
    percentage2Color: percentage2Color,
    assetPercentage: assetPercentage
  };
}

const renderChart = (props) => {
  if(props.multiData == null) {
    return;
  }
  if(props.multiData[0] == null || props.multiData[1] == null || props.multiData[2] == null || props.multiData[3] == null) {
    return;
  }

  var apiFieldMapping = props.apiFieldMapping;
  var totalValue = 0;//totalConnections OR totalBandwidth
  var countValue = 0;//assetsCount
  var top10TotalValue = 0;//top10Connections OR top10Bandwidth
  var top10CountValue = 0;//topConnectionsAssetsCount OR topBandwidthAssetsCount

  for (let a=0; a < apiFieldMapping.length; a++) {
    var apiFieldMappingIndividual = apiFieldMapping[a];
    var apiData = props.multiData[apiFieldMappingIndividual.api];
    apiData = apiData.rows;

    switch (a) {
      case 0:
        var fieldValueArray = apiFieldMappingIndividual.fieldValue;
        var fieldValue = 0;
        for(let v=0; v<fieldValueArray.length; v++) {
          if (v == 0) {
            fieldValue = apiData[fieldValueArray[v]];
          }
          else {
            fieldValue = fieldValue[fieldValueArray[v]];
          }
        }
        countValue = parseInt(fieldValue);
        break;
      case 1:
        var fieldValueArray = apiFieldMappingIndividual.fieldValue;
        var fieldValue = 0;
        for(let v=0; v<fieldValueArray.length; v++) {
          if (v == 0) {
            fieldValue = apiData[fieldValueArray[v]];
          }
          else {
            fieldValue = fieldValue[fieldValueArray[v]];
          }
        }
        totalValue = parseInt(fieldValue);
        break;
      case 2:
        for (var i=0; i<apiData.length; i++) {
          var fieldValueArray = apiFieldMappingIndividual.fieldValue;
          var fieldValue = 0;
          for(let v=0; v<fieldValueArray.length; v++) {
            if (v == 0) {
              fieldValue = apiData[i][fieldValueArray[v]];
            }
            else {
              fieldValue = fieldValue[fieldValueArray[v]];
            }
          }
          var value = Math.round(((fieldValue * 100) / totalValue), 2);
          if (value > 0) {
            top10CountValue = top10CountValue + 1;
            top10TotalValue = top10TotalValue + parseInt(fieldValue);
          }
        }
        break;
      default:
        break;
    }
  }

  generateDoughnutChart(countValue, top10CountValue, top10TotalValue, totalValue.toPrecision());
}

const DoughnutChart = (props) => (
  <div id={props.id}>{renderChart(props)}
    <div className="chartBorder">
      <div className="chartCaption">{props.sectionTitle}</div>
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
              <div className="chart-center"><span>{doughnutAttributes.displayPercentage1}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row"><br/><br/>
        <div className="col-sm-12 text-center" id="connectionsPercentage">
          <span style={doughnutAttributes.percentage2Color}>{doughnutAttributes.percentage2}%</span> {props.legend[0]}
          <span style={doughnutAttributes.percentage1Color}> {doughnutAttributes.assetPercentage}%</span> {props.legend[1]}
        </div><br/><br/>
      </div>
    </div>
  </div>
)

export default DoughnutChart;
