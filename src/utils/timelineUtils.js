import React from 'react';
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

function getSource(source) {
  if (source.ip) {
    return (
      <span>
        <span> {source.ip} </span>
        {
          source.country
          ? <span className={'flag-icon flag-icon-' + source.country.toLowerCase()}> </span>
          : null
        }
        {
          source.port > 0
          ? <span> on Port {source.port}</span>
          : null
        }
      </span>
    );
  };

  return null;
}

function getDestinaton(dest) {
  if (dest.ip) {
    return (
      <span>
        <span> connected to {dest.ip} </span>
        {
          dest.country
          ? <span className={'flag-icon flag-icon-' + dest.country.toLowerCase()}> </span>
          : null
        }
        {
          dest.port > 0
          ? <span> on Port {dest.port}</span>
          : null
        }
      </span>
    );
  };

  return null;
}

export function getSourceDestination(row) {
  const {source, destination} = row;
  return (
    <div>
      <span>{getSource(source)}</span>
      <span>{getDestinaton(destination)}</span>
    </div>
  );
}

function getConn(row) {
  const {data} = row;
  return (
    <div>
      {checkForNANUndefined(data.conn.service, 'Service', true)}
      {checkForNANUndefined(data.conn.state, 'State', true)}
      {checkForNANUndefined(formatBytes(data.conn.reqBytes, 2), 'Requested Bytes', true)}
      {checkForNANUndefined(formatBytes(data.conn.respBytes, 2), 'Response Bytes', true)}
      {checkForNANUndefined(formatMicroseconds(data.conn.duration), 'Duration', false)}
    </div>
  );
}

function getSSH(row) {
  const {data} = row;
  return (
    <div>
      {checkForNANUndefined(data.ssh.direction, 'Direction', true)}
      {checkForNANUndefined(data.ssh.client, 'Client', true)}
      {checkForNANUndefined(data.ssh.server, 'Server', true)}
      {checkForNANUndefined(data.ssh.success, 'Successful', false)}
    </div>
  );
}

function getDNS(row) {
  const {data} = row;

  return (
    <div>
      {checkForNANUndefined(data.dns.answers[0], 'DNS Response', true)}
    </div>
  );
}

function getHTTP(row) {
  const {data} = row;

  return (
    <div>
      {checkForNANUndefined(data.http.userAgent, 'User Agent', true)}
      {checkForNANUndefined(data.http.referrer, 'Referrer', false)}
    </div>
  );
}

function getSSL(row) {
  const {data} = row;

  return (
    <div>
      {checkForNANUndefined(data.ssl.serverName, 'Server', true)}
      {checkForNANUndefined(data.ssl.version, 'SSL Version', true)}
      {checkForNANUndefined(data.ssl.issue, 'Issuer', false)}
    </div>
  );
}

function getFile(row) {
  const {data} = row;

  return (
    <div>
      {checkForNANUndefined(data.files.txHosts[0], 'Source', true)}
      {checkForNANUndefined(data.files.rxHosts[0], 'Destination', true)}
      {checkForNANUndefined(data.files.sha256, 'File Hash', false)}
    </div>
  );
}

function getReport(row) {
  const {data} = row;
  return (
    <div>
      {checkForNANUndefined(data.report.file.fileName, 'File Name', true)}
      {checkForNANUndefined(data.report.file.sha256, 'sha256', true)}
      {checkForNANUndefined(data.report.status, 'Status', true)}
      {checkForNANUndefined(data.report.score, 'Score', true)}
      {checkForNANUndefined(data.report.file.mimeType, 'MIME Type', false)}
    </div>
  );
}

function getOther(data) {
  const keys = Object.keys(data);

  function getDetails(value) {
    const keys = Object.keys(value);
    return keys.map((key) => {
      return (<li>{key}: {value[key]} &nbsp;&nbsp;</li>);
    });
  }

  return (
    <ul style={{
      listStyleType: 'none',
      margin: 0,
      padding: 0
    }}>
      {
        keys.map((key) => {
          const value = data[key];
          if (Object.keys(value) > 1) {
            return getDetails(value);
          }
          else {
            return (<li>{key}: {value} &nbsp;&nbsp;</li>);
          }
        })
      }
    </ul>
  );
}

function getAlert(row) {
  const {data} = row;
  return (
    <div>
      {checkForNANUndefined(data.alert.severity, 'Severity', true)}
      {checkForNANUndefined(data.alert.signature, 'Signature', true)}
      {checkForNANUndefined(data.alert.proto, 'Protocol', true)}
      {checkForNANUndefined(data.alert.category, 'Category', false)}
    </div>
  );
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

function checkForNANUndefined(value, title, newline) {
  if (value === true || value === false) {
    return (
      <span>
        {title}: {value ? 'True' : 'False'}
        {(newline ? <br /> : null)}
      </span>
    );
  }
  else {
    if (value !== 'NaN' && value !== 'NAN' && value !== undefined && value !== '') {
      return (
        <span>
          {title}: {value}
          {(newline ? <br /> : null)}
        </span>
      );
    }
    else {
      return null;
    }
  }
}
