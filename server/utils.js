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
  let typeString = '';
  if (typeName.indexOf('conn') > -1) typeString = 'Connection';
  else if (typeName.indexOf('ssh') > -1) typeString = 'SSH';
  else if (typeName.indexOf('dns') > -1) typeString = 'DNS';
  else if (typeName.indexOf('http') > -1) typeString = 'HTTP';
  else if (typeName.indexOf('ssl') > -1) typeString = 'SSL';
  else if (typeName.indexOf('files') > -1) typeString = 'File';
  else if (typeName.indexOf('rank_alert') > -1) typeString = 'Rank Alert';
  else if (typeName.indexOf('alert') > -1) typeString = 'Alert';
  else if (typeName.indexOf('sysmon') > -1) typeString = 'Sysmon';
  else if (typeName.indexOf('report') > -1) typeString = 'Report';
  else if (typeName.indexOf('anomaly') > -1) typeString = 'Anomaly';
  else if (typeName.indexOf('auth') > -1) typeString = 'Auth';
  else typeString = typeName;
  return typeString;
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
