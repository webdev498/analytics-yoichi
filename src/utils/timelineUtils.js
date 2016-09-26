import {baseUrl} from 'config';
import Cookies from 'cookies-js';
import {
  formatBytes,
  formatMicroseconds
} from 'utils/utils';

export function fetchData(parameters) {
  const accessToken = Cookies.get('access_token'),
    tokenType = Cookies.get('token_type'),
    apiUrl = baseUrl + '/api/alert/' + parameters.timelineType + '?window=' + parameters.duration +
    '&date=' + parameters.alertDate + '&filter=' + parameters.filter + '&count=' + parameters.pageSize +
    '&from=' + parameters.pageNumber,
    customHeaders = {
      'Accept': 'application/json'
    },
    defaultHeaders = Object.assign({
      'Authorization': `${tokenType} ${accessToken}`
    }, customHeaders);

  return fetch(apiUrl, {
    method: 'GET',
    headers: defaultHeaders
  })
  .then(response => response.json()
  )
  .catch(error => {
    this.setState({
      isFetching: false
    });
    return Promise.reject(Error(error.message));
  });
}

export function getDetails(row) {
  switch (row.type.toLowerCase()) {
    case 'conn':
      return getConn(row);
    case 'ssh':
      return getSSH(row);
    case 'dns':
      return getDNS(row);
    case 'http':
      return getHTTP(row);
    case 'ssl':
      return getSSL(row);
    case 'file':
      return getFile(row);
    case 'report':
      return getReport(row);
    case 'alert':
      return getAlert(row);
    default:
      return getOther(row.data[row.type]);
  }
}

export function getSourceDestination(row) {
  let details = '';
  const {source, destination} = row;
  details += '<div>';
  details += '<span>' + getSource(source) + '</span>';
  details += '<span>' + getDestinaton(destination) + '</span>';
  details += '</div>';
  return details;
}

function getSource(source) {
  let details = '';
  if (source.ip) {
    details += '<span>';
    details += '<span>' + source.ip + ' </span>';
    if (source.country) {
      details += '<span class="flag-icon flag-icon-' + source.country.toLowerCase() + '"> </span>';
    }
    if (source.port) {
      details += '<span> on Port ' + source.port + '</span>';
    }
    details += '</span>';
  }

  return details;
}

function getDestinaton(dest) {
  let details = '';
  if (dest.ip) {
    details += '<span>';
    details += '<span> connected to ' + dest.ip + ' </span>';
    if (dest.country) {
      details += '<span class={"flag-icon flag-icon-' + dest.country.toLowerCase() + '"> </span>';
    }
    if (dest.port) {
      details += '<span> on Port ' + dest.port + '</span>';
    }
    details += '</span>';
  }

  return details;
}

function getConn(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Service: ' + data.conn.service + '</span><br />';
  details += '<span>State: ' + data.conn.state + '</span><br />';
  details += '<span>Requested Bytes: ' + formatBytes(data.conn.reqBytes, 2) + '</span><br />';
  details += '<span>Response Bytes: ' + formatBytes(data.conn.respBytes, 2) + '</span><br />';
  details += '<span>Duration: ' + formatMicroseconds(data.conn.duration) + '</span>';
  details += '</div>';
  return details;
}

function getSSH(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Direction: ' + data.ssh.direction + '</span><br />';
  details += '<span>Client: ' + data.ssh.client + '</span><br />';
  details += '<span>Server: ' + data.ssh.server + '</span><br />';
  details += '<span>Successful: ' + data.ssh.success + '</span>';
  details += '</div>';
  return details;
}

function getDNS(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>DNS Response: ' + data.dns.answers[0] + '</span>';
  details += '</div>';
  return details;
}

function getHTTP(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>User Agent: ' + data.http.userAgent + '</span><br />';
  details += '<span>Referrer: ' + data.http.referrer + '</span>';
  details += '</div>';
  return details;
}

function getSSL(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Server: ' + data.ssl.serverName + '</span><br />';
  details += '<span>SSL Version: ' + data.ssl.versio + '</span><br />';
  details += '<span>Issuer: ' + data.ssl.issue + '</span>';
  details += '</div>';
  return details;
}

function getFile(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Source: ' + data.files.txHosts[0] + '</span><br />';
  details += '<span>Destination: ' + data.files.rxHosts[0] + '</span><br />';
  details += '<span>File Hash: ' + data.files.sha256 + '</span>';
  details += '</div>';
  return details;
}

function getReport(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>File Name: ' + data.report.file.fileName + '</span><br />';
  details += '<span>sha256: ' + data.report.file.sha256 + '</span><br />';
  details += '<span>Status: ' + data.report.status + '</span><br />';
  details += '<span>Score: ' + data.report.score + '</span><br />';
  details += '<span>MIME Type: ' + data.report.file.mimeType + '</span>';
  details += '</div>';
  return details;
}

function getAlert(row) {
  const {data} = row;
  let details = '';
  details += '<div>';
  details += '<span>Severity: ' + data.alert.severity + '</span><br />';
  details += '<span>Signature: ' + data.alert.signature + '</span><br />';
  details += '<span>Protocol: ' + data.alert.proto + '</span><br />';
  details += '<span>Category: ' + data.alert.category + '</span>';
  details += '</div>';
  return details;
}

function getOther(data) {
  const keys = Object.keys(data);
  let details = '';

  function getDetails(value) {
    const keys = Object.keys(value);
    return keys.map((key) => {
      return '<li>' + key + ':' + value[key] + '&nbsp;&nbsp;</li>';
    });
  }

  details += '<ul style="list-style-type: none;margin: 0;padding: 0;">';
  keys.map((key) => {
    const value = data[key];
    if (Object.keys(value) > 1) {
      return getDetails(value);
    }
    else {
      details += '<li>' + key + ':' + value + '&nbsp;&nbsp;</li>';
    }
  });
  details += '</ul>';
  return details;
}

function getTimelineColor(eventType) {
  let color = '';
  switch (eventType) {
    case 'conn':
      color = Colors.defaultTimelineGraphPaletteColors[0];
      break;
    case 'ip':
      color = Colors.defaultTimelineGraphPaletteColors[1];
      break;
    case 'ssh':
      color = Colors.defaultTimelineGraphPaletteColors[2];
      break;
    case 'dns':
      color = Colors.turquoise;
      break;
    case 'ssl':
      color = Colors.cloud;
      break;
    case 'file':
      color = Colors.garnet;
      break;
    case 'http':
      color = 'red';
      break;
  }
  return color;
}

export function getPosition(el) {
  let lx = 0, ly = 0;
  for (lx = 0, ly = 0;
     el != null;
     lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx, y: ly};
}
