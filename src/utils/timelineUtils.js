import React from 'react';
import {baseUrl} from 'config';
import Cookies from 'cookies-js';
import {Colors} from 'theme/colors';
import {
  formatBytes,
  msToTime,
  getEventTypeString
} from 'utils/utils';

export function fetchData(parameters, type, options) {
  const accessToken = Cookies.get('access_token'),
    tokenType = Cookies.get('token_type'),
    customHeaders = {
      'Accept': 'application/json'
    },
    defaultHeaders = Object.assign({
      'Authorization': `${tokenType} ${accessToken}`
    }, customHeaders);

  let apiUrl = '';

  if (type === 'traffic') {
    apiUrl = baseUrl + '/api/alert/' + parameters.type + '?window=' + parameters.duration +
      '&date=' + parameters.alertDate + '&filter=' + encodeURI(parameters.filter) + '&count=' + parameters.pageSize +
      '&from=' + parameters.pageNumber;
  }

  if (type === 'alert') {
    apiUrl = baseUrl + '/api/analytics/reporting/execute/' + parameters.reportId + '?window=' + parameters.duration +
      '&count=' + parameters.pageSize + '&from=' + parameters.pageNumber;
  }

  return fetch(apiUrl, {
    method: 'GET',
    headers: defaultHeaders
  })
  .then(response => response.json())
  .then(json => {
    json.options = options;
    return json;
  })
  .catch(error => {
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
    case 'files':
      return getFile(row);
    case 'report':
      return getReport(row);
    case 'alert':
      return getAlert(row);
    case 'rank_alert':
      return getRankAlert(row);
    case 'winevent':
      return getWinEvent(row);
    case 'anomaly':
      return getAnomaly(row);
    default:
      return null; // getOther(row.data[row.type]);
  }
}

function getSource(source) {
  if (source) {
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
    }
  }
  return null;
}

function getDestinaton(dest) {
  if (dest) {
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
    }
  }

  return null;
}

export function getSourceDestination(row) {
  const {source, destination} = row;
  return (
    <div style={{fontSize: '13px', Color: Colors.grape, fontWeight: '600'}}>
      <span>{getSource(source)}</span>
      <span>{getDestinaton(destination)}</span>
    </div>
  );
}

function getEventType(row) {
  return (
    <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
      Type: {getEventTypeString(row.type)}
    </div>
  );
}

function getConn(row) {
  const {data} = row;
  let duration = '';
  if (data.conn.duration !== undefined && data.conn.duration !== '') {
    duration = msToTime(data.conn.duration);
    duration = duration.timeString;
  }
  return (
    <div>
      {getSourceDestination(row)}
      {getEventType(row)}
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.conn.service, 'Service', true)}
        {checkForNANUndefined(data.conn.state, 'State', true)}
        {checkForNANUndefined(formatBytes(data.conn.reqBytes, 2), 'Requested Bytes', true)}
        {checkForNANUndefined(formatBytes(data.conn.respBytes, 2), 'Response Bytes', true)}
        {checkForNANUndefined(duration, 'Duration', false)}
      </div>
    </div>
  );
}

function getSSH(row) {
  const {data} = row;
  return (
    <div>
      {getSourceDestination(row)}
      {getEventType(row)}
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.ssh.direction, 'Direction', true)}
        {checkForNANUndefined(data.ssh.client, 'Client', true)}
        {checkForNANUndefined(data.ssh.server, 'Server', true)}
        {checkForNANUndefined(data.ssh.success, 'Successful', false)}
      </div>
    </div>
  );
}

function getDNS(row) {
  const {data} = row;

  return (
    <div>
      {getSourceDestination(row)}
      {getEventType(row)}
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.dns.answers[0], 'DNS Response', true)}
      </div>
    </div>
  );
}

function getHTTP(row) {
  const {data} = row;

  return (
    <div>
      {getSourceDestination(row)}
      {getEventType(row)}
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.http.userAgent, 'User Agent', true)}
        {checkForNANUndefined(data.http.referrer, 'Referrer', false)}
      </div>
    </div>
  );
}

function getSSL(row) {
  const {data} = row;

  return (
    <div>
      {getSourceDestination(row)}
      {getEventType(row)}
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.ssl.serverName, 'Server', true)}
        {checkForNANUndefined(data.ssl.version, 'SSL Version', true)}
        {checkForNANUndefined(data.ssl.issue, 'Issuer', false)}
      </div>
    </div>
  );
}

function getFile(row) {
  const {data} = row;

  return (
    <div>
      {getSourceDestination(row)}
      {getEventType(row)}
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.files.txHosts[0], 'Source', true)}
        {checkForNANUndefined(data.files.rxHosts[0], 'Destination', true)}
        {checkForNANUndefined(data.files.sha256, 'File Hash', false)}
      </div>
    </div>
  );
}

function getReport(row) {
  const {data} = row;
  return (
    <div>
      {getSourceDestination(row)}
      {getEventType(row)}
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.report.file.fileName, 'File Name', true)}
        {checkForNANUndefined(data.report.file.sha256, 'sha256', true)}
        {checkForNANUndefined(data.report.status, 'Status', true)}
        {checkForNANUndefined(data.report.score, 'Score', true)}
        {checkForNANUndefined(data.report.file.mimeType, 'MIME Type', false)}
      </div>
    </div>
  );
}

function getAnomaly(row) {
  return (
    <div>
      {getSourceDestination(row)}
      {getEventType(row)}
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
    }} key='test'>
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
      {getSourceDestination(row)}
      {getEventType(row)}
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.alert.severity, 'Severity', true)}
        {checkForNANUndefined(data.alert.signature, 'Signature', true)}
        {checkForNANUndefined(data.alert.category, 'Category', true)}
        {checkForNANUndefined(data.alert.score, 'Score', false)}
      </div>
    </div>
  );
}

function getRankAlert(row) {
  const {data} = row;
  return (
    <div>
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: '600'}}>
        {checkForNANUndefined(data.rank_alert.description, '', true)}
      </div>
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.rank_alert.message, '', true)}
        {checkForNANUndefined(data.rank_alert.category, 'Category', true)}
        {checkForNANUndefined(data.rank_alert.score, 'Score', true)}
        {row.source !== undefined
          ? checkForNANUndefined(row.source.ip, 'Source', true)
          // (row.source.port !== undefined ? checkForNANUndefined(row.source.port, ':', true) : null)
          : null}
        {row.destination !== undefined
          ? checkForNANUndefined(row.destination.ip, 'Destination', false, 'Score', true)
          : null}
      </div>
    </div>
  );
}

function getWinEvent(row) {
  const {data} = row;
  return (
    <div>
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: '600'}}>
        {checkForNANUndefined(data.winevent.Message, '', true)}
      </div>
      <div style={{fontSize: '13px', color: Colors.grape, fontWeight: 'lighter'}}>
        {checkForNANUndefined(data.winevent.EventType, 'Type', true)}
        {checkForNANUndefined(data.winevent.Category, 'Category', true)}
        {checkForNANUndefined(data.winevent.SourceName, 'Source', true)}
        {checkForNANUndefined(data.winevent.Severity, 'Severity', false)}
        {checkForNANUndefined(data.winevent.SeverityValue, '', false)}
      </div>
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
        {title !== '' ? title + ':' : ''} {value ? 'True' : 'False'}
        {(newline ? <br /> : null)}
      </span>
    );
  }
  else {
    if (value !== 'NaN' && value !== 'NAN' && value !== undefined && value !== '') {
      return (
        <span>
          {title !== '' ? title + ':' : ''} {value}
          {(newline ? <br /> : null)}
        </span>
      );
    }
    else {
      return (
        <span></span>
      );
    }
  }
}
