//This file has function to generate fusion charts data source

var fusionChartInterface;

function ChartModelInterface() {
  //Following is the generic function for
  this.createChartModel = function(chartType, data) {
      var chartDataSource = {};
      switch(chartType) {
        case "angulargauge":
          chartDataSource = this.createAngularGaugeModel(data,'75','25');
          break;
        default:
          break;
      }
      return chartDataSource;
  };

	/******** create Line Chart Model ************/
	this.createLineChartModel = function(data,seriesNames,timeWindow,chartOptions) {
		var categories = [];
		categories[0] = {};
		categories[0]["category"] = [];
		var lookup = {};
		var anchors = checkForUndefined(chartOptions["anchors"]);
		var legendPosition = checkForUndefined(chartOptions["legendPosition"]);
		var pYAxisname = checkForUndefined(chartOptions["pYAxisname"]);
		var sYAxisname = checkForUndefined(chartOptions["sYAxisname"]);

		var dateDisplayFormat = calculateDateDisplayFormat(timeWindow);

		var dataset = [];
		var obj2 = {};
		obj2["seriesname"] = seriesNames[0];
		if (pYAxisname != "" && sYAxisname != "") obj2["parentyaxis"] = "P";
		obj2["renderas"] = "Line";
		obj2["lineThickness"] = "0";
		obj2["drawanchors"] = "1";
		obj2["anchorradius"] = "10";
		obj2["anchorBorderColor"] = "#ff0000";
		obj2["anchorbgcolor"] = "#ED6172";

		obj2["data"] = [];

		for (var i = 0; i < data.rows.length; i++) {
			var localTime = moment.utc(data.rows[i][0]).toDate();
			localTime = moment(localTime).format('D MMM YYYY HH:mm');

			var localTimeNew = moment.utc(data.rows[i][0]).toDate();
			localTimeNew = moment(localTimeNew).format(dateDisplayFormat);

			if (!(localTime in lookup)) {
				lookup[localTime] = 1;
				var obj1 = {};
				obj1["label"] = localTimeNew;
				obj1["toolText"] = localTime;
				categories[0]["category"].push(obj1);
			}

			if ((seriesNames[0]).toLowerCase() == data.rows[i][1]){
				var obj3 = {};
				if(0 != data.rows[i][2] ) {
					obj3["value"] = data.rows[i][2];
				}
				obj2["data"].push(obj3);
			}
		}
		dataset.push(obj2);
		var obj2 = {};
		obj2["seriesname"] = seriesNames[1];
		if (pYAxisname != "" && sYAxisname != "") obj2["parentyaxis"] = "S";
		obj2["renderas"] = "Line";
		obj2["lineThickness"] = "0";
		obj2["drawanchors"] = "1";
		obj2["anchorradius"] = "10";
		obj2["anchorBorderColor"] = "#0F4D1F";
		obj2["anchorbgcolor"] = "#3DF26A";
		obj2["anchorsides"] = "4";

		obj2["data"] = [];
		for (var i = 0; i < data.rows.length; i++) {
			if ((seriesNames[1]).toLowerCase() == data.rows[i][1]) {
				var obj3 = {};
				if(0 != data.rows[i][2]) {
					obj3["value"] = data.rows[i][2];
				}
				obj2["data"].push(obj3);
			}
		}
		dataset.push(obj2);

		if (seriesNames[2] != undefined) {
			var obj2 = {};
			obj2["seriesname"] = seriesNames[2];
			if (pYAxisname != "" && sYAxisname != "") obj2["parentyaxis"] = "S";
			obj2["renderas"] = "Line";
			obj2["lineThickness"] = "0";
			obj2["drawanchors"] = "1";
			obj2["anchorradius"] = "10";
			obj2["anchorBorderColor"] = "#0000ff";

			obj2["anchorbgcolor"] = "#9F9FF5";
			obj2["anchorsides"] = "3";

			obj2["data"] = [];
			for (var i = 0; i < data.rows.length; i++) {
				if ((seriesNames[2]).toLowerCase() == data.rows[i][1]) {
					var obj3 = {};
					if(0 != data.rows[i][2]) {
						obj3["value"] = data.rows[i][2];
					}
					obj2["data"].push(obj3);
				}
			}
			dataset.push(obj2);
		}

		var dataSourceObject = {};
		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.lineChart));
		dataSourceObject["chart"]["caption"] = "";
		if(!anchors) {
			dataSourceObject["chart"]["drawAnchors"] = "0";
		}
		dataSourceObject["chart"]["legendPosition"] = legendPosition;
		if (pYAxisname != "" && sYAxisname != "") {
			dataSourceObject["chart"]["pYAxisname"] = pYAxisname;
			dataSourceObject["chart"]["sYAxisname"] = sYAxisname;
		}
		if (pYAxisname != "" && sYAxisname == "") {
			dataSourceObject["chart"]["yAxisName"] = pYAxisname;
		}
		if (categories.length > 0)
			dataSourceObject["categories"] = categories;
		if (dataset.length > 0)
			dataSourceObject["dataset"] = dataset;

		return dataSourceObject;
	};

	this.createScatterChartModel = function(data, seriesname, xAxisLabel, yAxisLabel) {
		var dataSourceObject = {};
		var dataSet = [];
		var dataSeries = {
                "drawline": "0",
                "anchorsides": "3",
                "anchorradius": "10",
                "color":"#0505F5",
                "anchorbgcolor":"#9F9FF5",
                "anchorbordercolor":"#0505F5",
              }
		dataSeries["seriesname"] = seriesname;
		var dataObject = [];
		for (var i = 0; i < data.rows.length; i++) {
			var dataPoint = {};
			dataPoint["x"] = data.rows[i][0];
			dataPoint["y"] = data.rows[i][1].toString();
			dataPoint["toolText"] = "User Agent Length:" + data.rows[i][0] + " Connection Count:" + data.rows[i][1];
			dataObject.push(dataPoint);
		}
		dataSeries["data"] = dataObject;
		dataSet.push(dataSeries);

		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.scatterChart));
		dataSourceObject["chart"]["caption"] = "";
		dataSourceObject["chart"]["xaxisname"] = xAxisLabel;
		dataSourceObject["chart"]["yaxisname"] = yAxisLabel;

		if (dataSet.length > 0)
			dataSourceObject["dataset"] = dataSet;

		return dataSourceObject;
	};

	/******** create Spark Chart Model ************/
	this.createSparkColumnModel = function(data) {
		var dataSourceObject = {};
		var dataSet = [];
		var dataObject = [];
		var dataSeries = {};

		for (var i = 0; i < data.length; i++) {
			var dataPoint = {};
			dataPoint["value"] = data[i];
			dataObject.push(dataPoint);
		}
		dataSeries["data"] = dataObject;
		dataSet.push(dataSeries);

		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.spark));
		dataSourceObject["chart"]["caption"] = "";

		if (dataSet.length > 0)
			dataSourceObject["dataset"] = dataSet;

		return dataSourceObject;
	};

	/******** create Area Chart Like Spark Line Filled Color Model ************/
	this.createAreaChartLikeSparkLineFilledColorModel = function(data, window) {
		var dataSourceObject = {};
		var dataSet = [];
		var dataObject = [];
		var dataSeries = {};

		for (var i = 0; i < data.length; i++) {
			var dataPoint = {};
			dataPoint["label"] = "";
			dataPoint["value"] = data[i];
			dataObject.push(dataPoint);
		}
		dataSeries["data"] = dataObject;
		dataSet.push(dataSeries);

		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.areaChartLikeSparkLineFilledColor));
		dataSourceObject["chart"]["xAxisName"] = "Past " + translateTimeWindow(window);

		if (dataSet.length > 0)
			dataSourceObject["dataset"] = dataSet;

		return dataSourceObject;
	};

	/******** create Pie Chart Model ************/
	this.createPieChartModel = function(data) {
		var obj1 = [];
		for (var i = 0; i < data.rows.length; i++) {
			var obj2 = {};
			if (data.rows[i][0] == "")
				obj2["label"] = "Other";
			else
				obj2["label"] = data.rows[i][0];
			obj2["value"] = data.rows[i][1];
			obj1.push(obj2);
		}

		var dataSourceObject = {};
		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.pieChart));
		dataSourceObject["chart"]["caption"] = "";
		dataSourceObject["data"] = obj1;

		return dataSourceObject;
	};

	/******** create Pareto Chart Model ************/
	this.createParetoChartModel = function(data) {
		var obj1 = [];
		var chartColors = appConstants.chartColors;
		var a = -1;
		for (var i = 0; i < data.rows.length; i++) {
			var obj2 = {};
			if (data.rows[i][0] == "")
				obj2["label"] = "Other";
			else
				obj2["label"] = (data.rows[i][0]).capitalize();
			obj2["value"] = data.rows[i][1];
			a = a + 1;
			if (chartColors[a] == undefined) a = 0;
			obj2["color"] = chartColors[a];
			obj1.push(obj2);
		}

		var dataSourceObject = {};
		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.paretoChart));
		dataSourceObject["chart"]["caption"] = "";
		dataSourceObject["data"] = obj1;

		return dataSourceObject;
	};

	/******** create Bar Chart Model ************/
	this.createBarChartModel = function(data, defaultSeriesName, yAxisName, caption, timeWindow, border) {
		var lookup = {};
		var items = data.rows;
		var dateArray = [];
		var categoryArray = [];
		var categories = [];
		categories[0] = {};
		categories[0]["category"] = [];
		var dataset = [];

		var dateDisplayFormat = calculateDateDisplayFormat(timeWindow);

		for (var item, i = 0; item = items[i++];) {
			var localTimeOriginal = moment.utc(item[0]).toDate();

			var localTime = moment.utc(item[0]).toDate();
			localTime = moment(localTime).format('D MMM YYYY HH:mm');
			var date = localTime;

			var localTimeNew = moment.utc(item[0]).toDate();
			localTimeNew = moment(localTimeNew).format(dateDisplayFormat);
			var dateNew = localTimeNew;

			if (!(date in lookup)) {
				lookup[date] = 1;
				dateArray.push(date);
				var obj1 = {};
				obj1["label"] = dateNew;
				obj1["toolText"] = date;
				categories[0]["category"].push(obj1);
			}
			var category = item[1];

			if (!(category in lookup)) {
				lookup[category] = 1;
				categoryArray.push(category);
			}
		}

		for (var a=0; a<categoryArray.length; a++) {
			var obj2 = {};
			if (categoryArray[a] != "") {
				obj2["seriesname"] = categoryArray[a];
			}
			else {
				if (defaultSeriesName == "No Category")
					obj2["seriesname"] = "";
				else
					obj2["seriesname"] = defaultSeriesName;
			}
			obj2["data"] = [];
			for (var j=0; j<dateArray.length; j++) {
				var valueExists = 0;
				for (var item, i = 0; item = items[i++];) {
					var localTime = moment.utc(item[0]).toDate();
					localTime = moment(localTime).format('D MMM YYYY HH:mm');
					var date = localTime;
					var category = item[1];
					var value = item[2];
					if (date == dateArray[j] && category == categoryArray[a]) {
						var obj3 = {};
						obj3["value"] = value;
						obj2["data"].push(obj3);
						valueExists = 1;
						break;
					}
				}
				if (valueExists != 1) {
					var obj3 = {};
					obj3["value"] = 0;
					obj2["data"].push(obj3);
				}
			}
			dataset.push(obj2);
		}

		var dataSourceObject = {};
		var dataObject = {};
		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.barChart));
		dataSourceObject["chart"]["caption"] = caption;
		dataSourceObject["chart"]["yAxisName"] = yAxisName;

		if(border) {
			dataSourceObject["chart"]["showBorder"] = "1";
			dataSourceObject["chart"]["borderThickness"] = "3";
		}

		if (categories.length > 0)
			dataSourceObject.categories = categories;
		if (dataObject.length > 0)
			dataSourceObject.data = dataObject;
		if (dataset.length > 0)
			dataSourceObject.dataset = dataset;

		return dataSourceObject;
	};

	/******** create WorldWithCountry Chart Model ************/
	this.createWorldWithCountryChartModel = function(data, badReputationData, chartOptions) {
		//var getCountryIDByCountryCode = JSON.parse(JSON.stringify(appConstants.getCountryIDByCountryCode));
		var items = data.rows;
		var dataSourceObject = {};
		var markersItemsObject = [];
		var topFiveCountries = [];
		var bandwidthUsage = [];
		var minValue = "0";
		var maxValue = "0";
		var markerIdSuffix = 0;

		for (var a=0; a<items.length; a++) {
			var obj1 = {};
			var countryData = {};
			var bandwidthUsageData = {};

			countryData["label"] = items[a][3];
			countryData["value"] = items[a][4];

			bandwidthUsageData["label"] = items[a][3];
			bandwidthUsageData["value"] = items[a][5];

			topFiveCountries.push(countryData);
			bandwidthUsage.push(bandwidthUsageData);

			if(items[a][1] === "N/A" || items[a][2] === "N/A") {
				//continue;
			}
			else {
				var countryCode = items[a][0];
				obj1["shapeid"] = "circle";
				obj1["label"] = items[a][3];
				obj1["id"] = getCountryIDByCountryCode(countryCode) + markerIdSuffix;//getCountryIDByCountryCode[countryCode];//using this function, the world map is not rendering properly.
				obj1["x"] = items[a][1];
				obj1["y"] = items[a][2];
				obj1["value"] = items[a][4];
				obj1["alpha"] = "60";

				markersItemsObject.push(obj1);

				if (a == 0)
					minValue = items[a][4];
				if (a == (items.length - 1))
					maxValue = items[a][4];

				markerIdSuffix = markerIdSuffix + 1;
			}
		}

		topFiveCountries.sort(function(a, b) {
		    return b.value - a.value;
		});

		bandwidthUsage.sort(function(a, b) {
		    return b.value - a.value;
		});

		topFiveCountries = topFiveCountries.slice(0, 5);
		bandwidthUsage = bandwidthUsage.slice(0, 5);

		/***************************************/
		var items1 = badReputationData.rows;
		for (var a=0; a<items1.length; a++) {
			var obj1 = {};
			if(items1[a][1] === "N/A" || items1[a][2] === "N/A" ) {
				//continue;
			}
			else {
				var countryCode1 = items1[a][0];
				obj1["shapeid"] = "maliciousIcon";
				obj1["label"] = items1[a][3];
				obj1["id"] = getCountryIDByCountryCode(countryCode1) + markerIdSuffix;
				obj1["x"] = items1[a][1];
				obj1["y"] = items1[a][2];
				obj1["value"] = items1[a][4];
				obj1["alpha"] = "100";

				markersItemsObject.push(obj1);
				markerIdSuffix = markerIdSuffix + 1;
			}
		}
		/***************************************/

		var dataSourceObject_1 = {};
		dataSourceObject_1["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.countriesContactedMapWorldChart));
		dataSourceObject_1["chart"]["caption"] = chartOptions["caption"];
		/*dataSourceObject_1["colorrange"] = {
			"minvalue": minValue,
			"startlabel": "Low",
			"endlabel": "High",
			"code": "#FF4411",
			"gradient": "1",
			"color": [
				{
					"maxvalue": maxValue,
					"code": "#6baa01"
				}
			]
		};*/
		var shapesObject = [
            {
                "id": "maliciousIcon",
                "type": "image",
                "url": "img/icons/biohazard.png",
                "xscale": "30",
                "yscale": "30",
                "labelPadding": "15"
            }
        ];

		dataSourceObject_1["markers"] = {
			"shapes": shapesObject,
			"items":markersItemsObject
		};

		var dataSourceObject_2 = {};
		dataSourceObject_2["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.topCountriesBarChart));
		dataSourceObject_2["data"] = topFiveCountries;

		var dataSourceObject_3 = {};
		dataSourceObject_3["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.topBandwidthCountriesBarChart));
		dataSourceObject_3["data"] = bandwidthUsage;

		dataSourceObject["countriesContactedMapDataSource"] = dataSourceObject_1;
		dataSourceObject["topFiveCountriesDataSource"] = dataSourceObject_2;
		dataSourceObject["topBandwidthCountriesDataSource"] = dataSourceObject_3;
		return dataSourceObject;
	};

	/******** create Area Chart Model ************/
	this.createAreaChartModel = function(data, timeWindow, series, chartId, yAxisName, dateDisplayFormat) {
		var categories = [];
		categories[0] = {};
		categories[0]["category"] = [];
		var lookup = {};

		var dataset = [];
		var obj2 = {};
		obj2["seriesname"] = series[0];
		obj2["renderas"] = "Area";
		obj2["data"] = [];

		for (var i = 0; i < data.length; i++) {
			var localTime = moment.utc(data[i][0]).toDate();
			localTime = moment(localTime).format('D MMM YYYY HH:mm');
			var localTimeNew = moment.utc(data[i][0]).toDate();
			localTimeNew = moment(localTimeNew).format(dateDisplayFormat);

			var obj1 = {};
			obj1["label"] = localTimeNew;
			obj1["toolText"] = localTime;
			categories[0]["category"].push(obj1);

			var obj3 = {};
			if (data[i][chartId][0] != "NaN") {
				obj3["value"] = data[i][chartId][0];
			} else {
				obj3["value"] = '0';
			}
			obj2["data"].push(obj3);
		}
		dataset.push(obj2);
		var obj2 = {};
		obj2["seriesname"] = series[1];
		obj2["renderas"] = "Line";
		obj2["data"] = [];
		for (var i = 0; i < data.length; i++) {
			var obj3 = {};
			obj3["value"] = data[i][chartId][1];
			obj2["data"].push(obj3);
		}
		dataset.push(obj2);

		var dataSourceObject = {};
		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.areaChart));
		dataSourceObject["chart"]["caption"] = "";
		dataSourceObject["chart"]["yAxisName"] = yAxisName;

		if (categories.length > 0)
			dataSourceObject["categories"] = categories;
		if (dataset.length > 0)
			dataSourceObject["dataset"] = dataset;

		return dataSourceObject;
	};

	/******** create Horizontal Bar Chart Model ************/
	this.createHorizontalBarChartModel = function(data, chartOptions) {
		var dataset = [];
		for (var i = 0; i < data.length; i++) {
			var obj1 = {};
			obj1["label"] = data[i][0];
			obj1["value"] = data[i][1];
			obj1["toolText"] = data[i][0] + ", " + data[i][1];
			dataset.push(obj1);
		}

		var dataSourceObject = {};
		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.horizontalBarChart));
		dataSourceObject["chart"]["caption"] = chartOptions["caption"];
		if (chartOptions["numberSuffix"] != undefined) dataSourceObject["chart"]["numberSuffix"] = chartOptions["numberSuffix"];

		if (dataset.length > 0) dataSourceObject["data"] = dataset;

		if (chartOptions["averageValue"] != undefined) {
			dataSourceObject["trendlines"] = [
				{
					"line": [
						{
							"startvalue": chartOptions["averageValue"],
							"color": "#1aaf5d",
							"valueOnRight": "1",
							"displayvalue": chartOptions["averageValue"] + "%",
							"dashed": "1",
							"dashLen": "4",
							"dashGap": "2"
						}
					]
				}
			];
		}

		return dataSourceObject;
	};

	/******** create LED Gauge Model ************/
	this.createLedGaugeModel = function(data) {
		var dataSourceObject = {};
		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.ledGauge));
		dataSourceObject["chart"]["caption"] = "";
		dataSourceObject["colorRange"] = JSON.parse(JSON.stringify(appConstants.ledGaugeColorRange));
		dataSourceObject["value"] = data;
		return dataSourceObject;
	};

	/******** create LED Gauge Model ************/
	this.createAngularGaugeModel = function(data, radius, valueFontSize) {
		var dataSourceObject = {};
		dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.angularGauge));
		dataSourceObject["chart"]["caption"] = "";
		dataSourceObject["chart"]["gaugeOuterRadius"] = radius;
		dataSourceObject["chart"]["gaugeInnerRadius"] = radius/2;
		dataSourceObject["chart"]["valueFontSize"] = valueFontSize;
		dataSourceObject["colorRange"] = JSON.parse(JSON.stringify(appConstants.angularGaugeColorRange));
		dataSourceObject["dials"] = {"dial": [{"value": data,"bgcolor": "333333", "bordercolor": "333333"}]};
		dataSourceObject["value"] = data;
		return dataSourceObject;
	};

	/******** create Bubble Line Chart Model ************/
	this.createBubbleLineChartModel = function(data, timeWindow, seriesNames) {
		var bubbleChartAnchorColors = appConstants.bubbleChartAnchorColors;
		var categories = [];
		categories[0] = {};
		categories[0]["category"] = [];
		var lookup = {};
		var dataSourceObject = {};
		var dataset = [];

		for (var s=0; s < seriesNames.length; s++) {
			var datasetObject = {};
			datasetObject["seriesname"] = seriesNames[s]['name'];
			datasetObject["anchorbgcolor"] = bubbleChartAnchorColors[s]['color'];
			datasetObject["anchorBorderColor"] = bubbleChartAnchorColors[s]['borderColor'];
			datasetObject["data"] = [];

			dataset.push(datasetObject);
		}

		for (var i = 0; i < data.length; i++) {
			for (var dateTimeString in data[i]) {
				if (data[i].hasOwnProperty(dateTimeString)) {
					var localTime = moment.utc(dateTimeString).toDate();
					localTime = moment(localTime).format('D MMM YYYY HH:mm');

					if (!(localTime in lookup)) {
						var index = 0;
						var notCountry = 1,notProtocol = 1, notASN = 1, notUserAgent = 1;
						for (var deviationType in data[i][dateTimeString]) {
							if (data[i][dateTimeString].hasOwnProperty(deviationType)) {
								if (deviationType != '') {
									if (index == 0) {
										lookup[localTime] = 1;
										var obj1 = {};
										obj1["label"] = localTime;
										categories[0]["category"].push(obj1);
										index++;
									}

									var d = 0;
									for (var deviationValue in data[i][dateTimeString][deviationType]) {
										if (data[i][dateTimeString][deviationType].hasOwnProperty(deviationValue) && d == 0 && deviationValue != "") {
											var obj3 = {};
											obj3["value"] = data[i][dateTimeString][deviationType][deviationValue][0];//Math.round(data[i][dateTimeString][deviationType][deviationValue][0], 2);
											obj3["anchorradius"] = data[i][dateTimeString][deviationType][deviationValue][1] / 50;
										}
										else {
											var obj3 = {};
											obj3["value"] = "";
										}
										d++;
										break;
									}

									for (var s=0; s < seriesNames.length; s++) {
										if (deviationType == seriesNames[s]['apiJsonObjectName']) {
											obj3["toolText"] = "<b>" + seriesNames[s]['name'] + ": " + deviationValue + "</b>{br}Deviation Factor: " + data[i][dateTimeString][deviationType][deviationValue][0] + "{br} Time: " + localTime + "{br} Connections: " + data[i][dateTimeString][deviationType][deviationValue][1];
											dataset[s]['data'].push(obj3);
										}
									}

									for (var s=0; s < seriesNames.length; s++) {
										if (s == 0 && !("country" in data[i][dateTimeString]) && notCountry == 1) {
											var obj3 = {};
											obj3["value"] = "";
											dataset[s]['data'].push(obj3);
											notCountry = 0;
										}
										if (s == 1 && !("protocol" in data[i][dateTimeString]) && notProtocol == 1) {
											var obj3 = {};
											obj3["value"] = "";
											dataset[s]['data'].push(obj3);
											notProtocol = 0;
										}
										if (s == 2 && !("asn" in data[i][dateTimeString]) && notASN == 1) {
											var obj3 = {};
											obj3["value"] = "";
											dataset[s]['data'].push(obj3);
											notASN = 0;
										}
										if (s == 3 && !("user_agent" in data[i][dateTimeString]) && notUserAgent == 1) {
											var obj3 = {};
											obj3["value"] = "";
											dataset[s]['data'].push(obj3);
											notUserAgent = 0;
										}
									}
								}
							}
						}
					}
				}
			}
		}

		var totalDataCount = 0;
		for (var s=0; s < seriesNames.length; s++) {
			totalDataCount = totalDataCount + dataset[s]['data'].length;
		}

		if (totalDataCount == 0) {
		}
		else {
			dataSourceObject["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.bubbleLineChart));

			dataSourceObject["trendlines"] =  [
				{
					"line": [
						{
							"startValue": "-1",
							"endValue": "1",
							"isTrendZone": "1",
							"color": "#00FF00",
							"alpha": "20"
						}
					]
				}
			];

			if (categories.length > 0)
				dataSourceObject["categories"] = categories;

			if (dataset.length > 0)
				dataSourceObject["dataset"] = dataset;
		}
		//console.log(JSON.stringify(dataSourceObject));
		return dataSourceObject;
	};

    /******** create Multi Series Line Chart Model ************/
	this.createMultiSeriesLineChartModel = function(data, timeWindow, deviationType) {
		var chartAnchorColors = appConstants.chartAnchorColors;
		var categories = [];
		categories[0] = {};
		categories[0]["category"] = [];
		var lookup = {};
		var dataSourceObjectIn = {};
		var datasetIn = [];
		var dataSourceObjectOut = {};
		var datasetOut = [];

		var series = [];
		var anchorColorIndex = 0;

		//Get the list of series
		for (var i = 0; i < data.length; i++) {
			for (var dateTimeString in data[i]) {
				if (data[i].hasOwnProperty(dateTimeString)) {
					for (var deviationValue in data[i][dateTimeString]) {
						if (data[i][dateTimeString].hasOwnProperty(deviationValue)) {
							if (deviationValue != '') {
								if (!(deviationValue in lookup)) {
									lookup[deviationValue] = 1;
									var obj = {};
									obj[deviationType] = deviationValue;
									series.push(obj);
								}
							}
						}
					}
				}
			}
		}
		lookup = {};

		//Loop through main API response array.
		for (var i = 0; i < data.length; i++) {
			for (var dateTimeString in data[i]) {
				if (data[i].hasOwnProperty(dateTimeString)) {
					var localTime = moment.utc(dateTimeString).toDate();
					localTime = moment(localTime).format('D MMM YYYY HH:mm');

					//Check for duplicate category i.e. datetime
					if (!(localTime in lookup)) {
						lookup[localTime] = 1;
						var obj1 = {};
						obj1["label"] = localTime;
						categories[0]["category"].push(obj1);

						//Get the list of series which are not exists for the current datetime
						var seriesWhichAreNotExistsForCurrentDate = [];
						for (var a = 0; a < series.length; a++) {
							var flagSet = 0;
							for (var deviationValue in data[i][dateTimeString]) {
								if (data[i][dateTimeString].hasOwnProperty(deviationValue)) {
									if (deviationValue != '' && series[a][deviationType] == deviationValue) {
										flagSet = 1;
									}
								}
							}
							if (!flagSet) {
								var obj = {};
								obj[deviationType] = series[a][deviationType];
								seriesWhichAreNotExistsForCurrentDate.push(obj);
							}
						}

						//Loop through the list of series which are not exists in current datatime and add value = '' in Data array for these series and for that respective datetime.
						for (var a = 0; a < seriesWhichAreNotExistsForCurrentDate.length; a++) {
							var isAlreadyExistsIn = 0;
							for (var j=0; j < datasetIn.length; j++) {
								if (datasetIn[j]["seriesname"] == seriesWhichAreNotExistsForCurrentDate[a][deviationType]) {
									var objValue = {};
									objValue["dateTime"] = localTime;
									objValue["value"] = '';
									datasetIn[j]["data"].push(objValue);
									isAlreadyExistsIn = 1;
								}
							}
							if (!isAlreadyExistsIn) {
								var datasetObject = {};
								datasetObject["seriesname"] = seriesWhichAreNotExistsForCurrentDate[a][deviationType];
								if (chartAnchorColors[anchorColorIndex] != undefined && chartAnchorColors[anchorColorIndex]['color'] != undefined) {
									datasetObject["anchorbgcolor"] = chartAnchorColors[anchorColorIndex]['color'];
									anchorColorIndex++;
								} else {
									datasetObject["anchorbgcolor"] = "#ff0000";
								}
								datasetObject["data"] = [];
								var objValue = {};
								objValue["dateTime"] = localTime;
								objValue["value"] = '';
								datasetObject["data"].push(objValue);
								datasetIn.push(datasetObject);
							}

							var isAlreadyExistsOut = 0;
							for (var j=0; j < datasetOut.length; j++) {
								if (datasetOut[j]["seriesname"] == seriesWhichAreNotExistsForCurrentDate[a][deviationType]) {
									var objValue = {};
									objValue["dateTime"] = localTime;
									objValue["value"] = '';
									datasetOut[j]["data"].push(objValue);
									isAlreadyExistsOut = 1;
								}
							}
							if (!isAlreadyExistsOut) {
								var datasetObject = {};
								datasetObject["seriesname"] = seriesWhichAreNotExistsForCurrentDate[a][deviationType];
								if (chartAnchorColors[anchorColorIndex] != undefined && chartAnchorColors[anchorColorIndex]['color'] != undefined) {
									datasetObject["anchorbgcolor"] = chartAnchorColors[anchorColorIndex]['color'];
									anchorColorIndex++;
								} else {
									datasetObject["anchorbgcolor"] = "#ff0000";
								}
								datasetObject["data"] = [];
								var objValue = {};
								objValue["dateTime"] = localTime;
								objValue["value"] = '';
								datasetObject["data"].push(objValue);
								datasetOut.push(datasetObject);
							}
						}

						for (var deviationValue in data[i][dateTimeString]) {
							if (data[i][dateTimeString].hasOwnProperty(deviationValue)) {
								if (deviationValue != '') {

									var bandwidthIn = checkForNA(data[i][dateTimeString][deviationValue][0]);
									var bandwidthOut = checkForNA(data[i][dateTimeString][deviationValue][1]);

									var isAlreadyExistsIn = 0;
									var isAlreadyExistsOut = 0;

									for (var j=0; j < datasetIn.length; j++) {
										if (datasetIn[j]["seriesname"] == deviationValue) {
											var objValue = {};
											objValue["dateTime"] = localTime;
											objValue["value"] = bandwidthIn;
											objValue["toolText"] = "<b>"+capitalizeFirstLetter(deviationType)+"</b>: "+deviationValue+"{br}<b>Date</b>:"+localTime+"{br}<b>Bandwidth</b>:"+bandwidthIn;
											datasetIn[j]["data"].push(objValue);
											isAlreadyExistsIn = 1;
										}
									}

									if (!isAlreadyExistsIn) {
										var datasetObject = {};
										datasetObject["seriesname"] = deviationValue;
										if (chartAnchorColors[anchorColorIndex] != undefined && chartAnchorColors[anchorColorIndex]['color'] != undefined) {
											datasetObject["anchorbgcolor"] = chartAnchorColors[anchorColorIndex]['color'];
											anchorColorIndex++;
										} else {
											datasetObject["anchorbgcolor"] = "#ff0000";
										}
										datasetObject["data"] = [];
										var objValue = {};
										objValue["dateTime"] = localTime;
										objValue["value"] = bandwidthIn;
										objValue["toolText"] = "<b>"+capitalizeFirstLetter(deviationType)+"</b>: "+deviationValue+"{br}<b>Date</b>:"+localTime+"{br}<b>Bandwidth</b>:"+bandwidthIn;
										datasetObject["data"].push(objValue);
										datasetIn.push(datasetObject);
									}

									for (var j=0; j < datasetOut.length; j++) {
										if (datasetOut[j]["seriesname"] == deviationValue) {
											var objValue = {};
											objValue["dateTime"] = localTime;
											objValue["value"] = bandwidthOut;
											objValue["toolText"] = "<b>"+capitalizeFirstLetter(deviationType)+"</b>: "+deviationValue+"{br}<b>Date</b>:"+localTime+"{br}<b>Bandwidth</b>:"+bandwidthOut;
											datasetOut[j]["data"].push(objValue);
											isAlreadyExistsOut = 1;
										}
									}
									if (!isAlreadyExistsOut) {
										var datasetObject = {};
										datasetObject["seriesname"] = deviationValue;
										if (chartAnchorColors[anchorColorIndex] != undefined && chartAnchorColors[anchorColorIndex]['color'] != undefined) {
											datasetObject["anchorbgcolor"] = chartAnchorColors[anchorColorIndex]['color'];
											anchorColorIndex++;
										} else {
											datasetObject["anchorbgcolor"] = "#ff0000";
										}
										datasetObject["data"] = [];
										var objValue = {};
										objValue["dateTime"] = localTime;
										objValue["value"] = bandwidthOut;
										objValue["toolText"] = "<b>"+capitalizeFirstLetter(deviationType)+"</b>: "+deviationValue+"{br}<b>Date</b>:"+localTime+"{br}<b>Bandwidth</b>:"+bandwidthOut;
										datasetObject["data"].push(objValue);
										datasetOut.push(datasetObject);
									}
								}
							}
						}
					}
				}
			}
		}

		//console.log(JSON.stringify(datasetIn));
		//console.log(JSON.stringify(datasetOut));

		if (datasetIn.length > 0) {
			dataSourceObjectIn["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.multiSeriesLineChart));
			dataSourceObjectIn["chart"]["caption"] = "Incoming Bandwidth by " + (capitalizeFirstLetter(deviationType)).replace("_"," ");
			dataSourceObjectIn["trendlines"] =  [
				{
					"line": [
						{
							"startValue": threshold,
							"color": "#2e6da4",
							"thickness": "2"
						}
					]
				}
			];

			if (categories.length > 0)
				dataSourceObjectIn["categories"] = categories;

			if (datasetIn.length > 0)
				dataSourceObjectIn["dataset"] = datasetIn;
		}

		if (datasetOut.length > 0) {
			dataSourceObjectOut["chart"] = JSON.parse(JSON.stringify(appConstants.chartObjects.multiSeriesLineChart));
			dataSourceObjectOut["chart"]["caption"] = "Outgoing Bandwidth by " + (capitalizeFirstLetter(deviationType)).replace("_"," ");
			dataSourceObjectOut["trendlines"] =  [
				{
					"line": [
						{
							"startValue": threshold,
							"color": "#2e6da4",
							"thickness": "2"
						}
					]
				}
			];

			if (categories.length > 0)
				dataSourceObjectOut["categories"] = categories;

			if (datasetOut.length > 0)
				dataSourceObjectOut["dataset"] = datasetOut;
		}

		return [dataSourceObjectIn, dataSourceObjectOut];
	};
}
