//Function to get Country ID by passing Country Code
export function getCountryIDByCountryCode(countryCode) {
  const getCountryIDByCountryCode = {"AG":"01","BS":"02","BB":"03","BZ":"04","CA":"05","CR":"06","CU":"07","DM":"08","DO":"09",
    "SV":"10","GD":"11","GT":"12","HT":"13","HN":"14","JM":"15","MX":"16","NI":"17","PA":"18","KN":"19","LC":"20","VC":"21","TT":"22",
    "US":"23","GL":"24","AR":"25","BO":"26","BR":"27","CL":"28","CO":"29","EC":"30","FK":"31","GF":"32","GY":"33","PY":"34","PE":"35",
    "SR":"36","UY":"37","VE":"38","DZ":"39","AO":"40","BJ":"41","BW":"42","BF":"43","BI":"44","CM":"45","CV":"46","CP":"47","TD":"48",
    "KM":"49","CI":"50","CD":"51","DJ":"52","EG":"53","GQ":"54","ER":"55","ET":"56","GA":"57","GH":"58","GN":"59","GW":"60","KE":"61",
    "LS":"62","LI":"63","LR":"64","MS":"65","MW":"66","ML":"67","MR":"68","MA":"69","MZ":"70","NA":"71","NE":"72","NG":"73","RW":"74",
    "ST":"75","SN":"76","SC":"77","SL":"78","SO":"79","ZA":"80","SD":"81","SZ":"82","TZ":"83","TG":"84","TN":"85","UG":"86","WA":"87",
    "ZM":"88","ZW":"89","GM":"90","CG":"91","MI":"92","AF":"93","AM":"94","AZ":"95","BD":"96","BT":"97","BN":"98","MM":"99","KH":"100",
    "CN":"101","TP":"102","GE":"103","IN":"104","ID":"105","IA":"106","JP":"107","KZ":"108","KP":"109","KR":"110","KG":"111","LA":"112",
    "MY":"113","MN":"114","NP":"115","PK":"116","PH":"117","RU":"118","SG":"119","LK":"120","TJ":"121","TH":"122","TM":"123","UZ":"124",
    "VN":"125","TW":"126","HK":"127","MO":"128","AL":"129","AD":"130","AT":"131","BY":"132","BE":"133","BH":"134","BG":"135","HY":"136",
    "CZ":"137","DK":"138","EE":"139","FI":"140","FR":"141","DE":"142","GR":"143","HU":"144","IS":"145","IR":"146","IT":"147","LV":"148",
    "LN":"149","LT":"150","LU":"151","MK":"152","MT":"153","MV":"154","MC":"155","MG":"156","NL":"157","NO":"158","PL":"159","PT":"160",
    "RO":"161","SM":"162","CS":"163","SK":"164","SI":"165","ES":"166","SE":"167","CH":"168","UA":"169","UK":"170","VA":"171","CY":"172",
    "TK":"173","AU":"175","FJ":"176","KI":"177","MH":"178","FM":"179","NR":"180","NZ":"181","PW":"182","PG":"183","WS":"184","SB":"185",
    "TO":"186","TV":"187","VU":"188","NC":"188","BA":"190","IZ":"191","IE":"192","JO":"193","KU":"194","LB":"195","OM":"196","QA":"197",
    "SA":"198","SY":"199","AE":"200","YM":"201","PR":"202","KY":"203","SS":"204","KO":"205"};

  const countryID = getCountryIDByCountryCode[countryCode];
  return countryID;
}

//Function to generate chart data source
export function generateChartDataSource(chartType, chartValue) {
  let chartDataSource = '';
  switch (chartType) {
    case "angulargauge":
      chartDataSource = {"chart":
        {"lowerLimit":"0","upperLimit":"100","showValue":"1","valueBelowPivot":"1","valueFontSize":"11",
          "valueFontBold":"1","gaugeOuterRadius":"33","gaugeInnerRadius":16.5,"showtickvalues":"0","showTickMarks":"0",
          "tickvaluedistance":"25","showborder":0,"gaugeFillMix":"{dark-30},{light-60},{dark-10}","bgAlpha":"0",
          "canvasBgAlpha":"0","caption":""},
          "colorRange":{"color":[{"minValue":"0","maxValue":"35","code":"#6baa01"},
          {"minValue":"35","maxValue":"65","code":"#f8bd19"},
          {"minValue":"65","maxValue":"100","code":"#e44a00"}]},
          "dials":{"dial":[{"value":chartValue,"bgcolor":"333333","bordercolor":"333333"}]},
          "value":chartValue
        };
      break;
    default:
      break;
  }
  return chartDataSource;
}

//Function to convert milliseconds to time
export function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

  milliseconds = (milliseconds > 0) ? ":" + milliseconds : "";

  return [hours, minutes, seconds];// + milliseconds;
}

export function generateRawData(fieldMapping, apiData) {
  let rawData = {};
  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i];
    if (apiData === null && apiData[currentChartData.reportId] === undefined){
      return;
    } else {
      if (!rawData.hasOwnProperty(currentChartData.reportId)) {
        if (apiData[currentChartData.reportId] !== undefined) {
          rawData[currentChartData.reportId] = apiData[currentChartData.reportId];
        } else {
          rawData[currentChartData.reportId] = apiData;
        }
      }
    }
  }
  return rawData;
}

export function getIndexFromColumnName(columnIndex, currentChartDataColumns, columnsArray) {
  for (let a = 0; a < currentChartDataColumns.length; a++) {
    for (let c = 0; c < columnsArray.length; c++) {
      if (currentChartDataColumns[a] === columnsArray[c].name) {
        columnIndex = c;
        break;
      }
    }
  }
  return columnIndex;
}

export function getIndexFromObjectName(inputArray) {
  let {fieldName, fieldValueArray, fieldValue, dataArray} = inputArray;
  if (fieldName.indexOf('.') > -1) {
    fieldValueArray = fieldName.split(".");
  } else {
    fieldValueArray = [fieldName];
  }

  for(let v = 0; v < fieldValueArray.length; v++) {
    if (v == 0) {
      fieldValue = dataArray[fieldValueArray[v]];
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
  return fieldValue;
}

export function checkForUndefinedChartOptionObject(chartOptions, objectName, defaultValue) {
  let value = defaultValue;
  if (chartOptions !== undefined && chartOptions[objectName] !== undefined) {
    value = chartOptions[objectName];
  }
  console.log(value);
  return value;
}
