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
