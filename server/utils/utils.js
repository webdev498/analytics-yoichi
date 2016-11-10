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
  if (typeName === 'conn') typeString = 'Connection';
  else if (typeName === 'ssh') typeString = 'SSH';
  else if (typeName === 'dns') typeString = 'DNS';
  else if (typeName === 'http') typeString = 'HTTP';
  else if (typeName === 'ssl') typeString = 'SSL';
  else if (typeName === 'files') typeString = 'File';
  else if (typeName === 'rank_alert') typeString = 'Rank Alert';
  else if (typeName === 'alert') typeString = 'Alert';
  else if (typeName === 'sysmon') typeString = 'Sysmon';
  else if (typeName === 'report') typeString = 'Report';
  else if (typeName === 'anomaly') typeString = 'Anomaly';
  else if (typeName === 'auth') typeString = 'Auth';
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
