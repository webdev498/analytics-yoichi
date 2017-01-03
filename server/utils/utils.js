import moment from 'moment';

// Function to convert milliseconds to time
export function msToTime(duration) {
  let seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return {
    'timeArray': [hours, minutes, seconds],
    'timeString': hours + ' : ' + minutes + ' : ' + seconds
  };
};

export function getEventTypeString(typeName) {
  const typeStrings = {
    conn: 'Connection',
    ssh: 'SSH',
    dns: 'DNS',
    http: 'HTTP',
    ssl: 'SSL',
    files: 'File',
    rank_alert: 'Rank Alert',
    alert: 'Alert',
    sysmon: 'Sysmon',
    report: 'Report',
    anomaly: 'Anomaly',
    auth: 'Auth'
  };

  return typeStrings[typeName] ? typeStrings[typeName] : typeName;
};

export function formatBytes(bytes, decimals) {
  if (bytes === '' || bytes === undefined) return '-';

  if (bytes === 0) {
    return '0 Byte';
  }

  const k = 1000,
    dm = decimals + 1 || 3,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  const val = (bytes / Math.pow(k, i)).toPrecision(dm),
    text = sizes[i];
  return val + ' ' + text;
};

export function militaryTimeToNormalTime(time) {
  time = time.toString().split(':'); // convert to array

  const hours = Number(time[0]);

  let timeValue = '';
  if (hours > 12) {
    timeValue += hours - 12;
  }
  else {
    timeValue += hours === 0 ? 12 : hours;
  }
  timeValue += (hours >= 12) ? ' PM' : ' AM';  // get AM/PM

  return timeValue;
}

let stringConstructor = 'test'.constructor;
let arrayConstructor = [].constructor;
let objectConstructor = {}.constructor;

export function whatIsIt(object) {
  if (object === null) {
    return 'null';
  }
  else if (object === undefined) {
    return 'undefined';
  }
  else if (object.constructor === stringConstructor) {
    return 'String';
  }
  else if (object.constructor === arrayConstructor) {
    return 'Array';
  }
  else if (object.constructor === objectConstructor) {
    return 'Object';
  }
  else {
    return 'unknown';
  }
}

// function to format Date In Local TimeZone
export function formatDateInLocalTimeZone(value) {
  let value1 = moment.utc(value).format('YYYY-MM-DD HH:mm:ss.SSS'),
    dateTime = {
      date: '',
      time: ''
    },
    localDateTime = moment.utc(value1).toDate();
  dateTime.date = moment(localDateTime).format('DD MMM YYYY');
  dateTime.time = moment(localDateTime).format('HH:mm:ss.SSS');
  return dateTime;
}

export function firstCharCapitalize(string) {
  string = string.toLowerCase().replace(/\b\w/g, function(m) {
    return m.toUpperCase();
  });
  return string;
};

// Function to generate row data
export function generateRawData(fieldMapping, apiData) {
  let rawData = {};
  if (apiData === null) {
    return;
  }
  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i];
    if (!rawData.hasOwnProperty(currentChartData.reportId)) {
      rawData[currentChartData.reportId] = apiData[currentChartData.reportId] !== undefined
        ? apiData[currentChartData.reportId]
        : apiData;
    }
  }
  return rawData;
}

export function isUndefined(value) {
  return value === undefined;
}

// Function to get field value from object name specified in layout JSON
export function getIndexFromObjectName(inputArray) {
  let {fieldName, dataArray: fieldValue} = inputArray;
  let fieldValueArray = fieldName.includes('.') ? fieldName.split('.') : [fieldName];

  fieldValueArray.forEach((arrayValue) => {
    if (!arrayValue.includes('[') && !arrayValue.includes(']')) {
      fieldValue = fieldValue[arrayValue];
    }
    else {
      let tempArray = arrayValue.split('[');
      let arrayName = tempArray[0],
        arrayIndex = tempArray[1].replace('[', '');
      arrayIndex = arrayIndex.replace(']', '');
      if (!isUndefined(fieldValue)) {
        fieldValue = fieldValue[arrayName];
      }
      if (!isUndefined(fieldValue)) {
        fieldValue = fieldValue[arrayIndex];
      }
    }

    if (isUndefined(fieldValue)) {
      fieldValue = '';
      return false;
    }
  });

  return fieldValue;
}

export function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function addZero(x, n) {
  while (x.toString().length < n) {
    x = '0' + x;
  }
  return x;
}

// Format Date in YYYY-MM-DDThh:mm:ss format
export function formatDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;// January is 0!
  let yyyy = (date.getFullYear());
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  let hh = addZero(date.getHours(), 2);
  let min = addZero(date.getMinutes(), 2);
  let ss = addZero(date.getSeconds(), 2);
  let milisec = addZero(date.getMilliseconds(), 3);
  milisec = (milisec !== '' || milisec !== 0 || milisec !== '0') ? '.' + milisec : milisec;

  let formattedDateString = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min + ':' + ss + milisec;

  return formattedDateString;
}

function getFromDate(params, todayDate, fromDate) {
  if (params.functionName === 'hour') {
    fromDate.setHours(todayDate.getHours() - params.diffInUnits);
  }
  else if (params.functionName === 'date') {
    fromDate.setDate(todayDate.getDate() - params.diffInUnits);
  }
  else if (params.functionName === 'month') {
    fromDate.setMonth(todayDate.getMonth() - params.diffInUnits);
  }
  return fromDate;
}

// Function to get from and to dates for the specific time window
export function getTimePairFromWindow(timeWindow, dateString) {
  const timeDifferences = {
    '1h': {
      diffInMin: 5,
      functionName: 'hour',
      diffInUnits: 1
    },
    '6h': {
      diffInMin: 15,
      functionName: 'hour',
      diffInUnits: 6
    },
    '12h': {
      diffInMin: 30,
      functionName: 'hour',
      diffInUnits: 12
    },
    '24h': {
      diffInMin: 60,
      functionName: 'date',
      diffInUnits: 1
    },
    '48h': {
      diffInMin: 120,
      functionName: 'date',
      diffInUnits: 2
    },
    '1d': {
      diffInMin: 60,
      functionName: 'date',
      diffInUnits: 1
    },
    '1w': {
      diffInMin: 1440,
      functionName: 'date',
      diffInUnits: 7
    },
    '1mo': {
      diffInMin: 10080,
      functionName: 'month',
      diffInUnits: 1
    }
  };
  let dateString1 = '',
    dateString2 = '';

  if (dateString !== '') {
    dateString = dateString.replace(/-/g, '/');
    let dateParameter = new Date(Date.parse((dateString).toString()));
    dateString1 = formatDate(dateParameter);

    let timeDifference = timeDifferences[timeWindow] ? timeDifferences[timeWindow].diffInMin : 5,
      toDate = dateParameter;
    toDate.setMinutes(toDate.getMinutes() + timeDifference);
    dateString2 = formatDate(toDate);
    return {fromDate: dateString1, toDate: dateString2};
  }
  else {
    let todayDate = new Date(),
      fromDate = todayDate;
    fromDate = getFromDate(timeDifferences[timeWindow], todayDate, fromDate);
    dateString1 = formatDate(new Date());
    dateString2 = formatDate(fromDate);
    return {fromDate: dateString2, toDate: dateString1};
  }
}
