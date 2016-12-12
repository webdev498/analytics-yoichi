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
  if (string === undefined) {
    return string;
  }
  else {
    if (string.toLowerCase() === 'ip') {
      return string.toUpperCase();
    }
    if (string.includes('_')) {
      string = string.replace('_', ' ');
    }

    string = string.toLowerCase().replace(/\b\w/g, function(m) {
      return m.toUpperCase();
    });

    if (string.includes(' Ip')) {
      string = string.replace(' Ip', ' IP');
    }
  }
  return string;
};
