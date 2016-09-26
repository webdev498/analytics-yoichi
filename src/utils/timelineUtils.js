import React from 'react';
import {baseUrl} from 'config';
import Cookies from 'cookies-js';
import {
  formatBytes,
  formatMicroseconds
} from 'utils/utils';

const styles = {
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
};

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
    <div style={styles.source}>
      <span>{getSource(source)}</span>
      <span>{getDestinaton(destination)}</span>
    </div>
  );
}

function getConn(row) {
  const {data} = row;
  return (
    <div>
      <span>Service: {data.conn.service} </span><br />
      <span>State: {data.conn.state} </span><br />
      <span>Requested Bytes: {formatBytes(data.conn.reqBytes, 2)} </span><br />
      <span>Response Bytes: {formatBytes(data.conn.respBytes, 2)} </span><br />
      <span>Duration: {formatMicroseconds(data.conn.duration)} </span>
    </div>
  );
}

function getSSH(row) {
  const {data} = row;
  return (
    <div>
      <span>Direction: {data.ssh.direction} </span><br />
      <span>Client: {data.ssh.client} </span><br />
      <span>Server: {data.ssh.server} </span><br />
      <span>Successful: {data.ssh.success} </span>
    </div>
  );
}

function getDNS(row) {
  const {data} = row;

  return (
    <div>
      <span>DNS Response: {data.dns.answers[0]}</span>
    </div>
  );
}

function getHTTP(row) {
  const {data} = row;

  return (
    <div>
      <span>User Agent: {data.http.userAgent} </span>
      <br />
      <span>Referrer: {data.http.referrer} </span>
    </div>
  );
}

function getSSL(row) {
  const {data} = row;

  return (
    <div>
      Server: {data.ssl.serverName}<br />
      SSL Version: {data.ssl.versio}<br />
      Issuer: {data.ssl.issue}
    </div>
  );
}

function getFile(row) {
  const {data} = row;

  return (
    <div>
      Source: {data.files.txHosts[0]}<br />
      Destination: {data.files.rxHosts[0]}<br />
      File Hash: {data.files.sha256}
    </div>
  );
}

function getReport(row) {
  const {data} = row;
  return (
    <div>
      File Name: {data.report.file.fileName}<br />
      sha256: {data.report.file.sha256}<br />
      Status: {data.report.status}<br />
      Score: {data.report.score}<br />
      MIME Type: {data.report.file.mimeType}
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
    <ul style={styles.list}>
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
      <span>Severity: {data.alert.severity} </span><br />
      <span>Signature: {data.alert.signature} </span><br />
      <span>Protocol: {data.alert.proto} </span><br />
      <span>Category: {data.alert.category} </span>
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
