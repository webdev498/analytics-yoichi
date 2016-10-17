import {msToTime, getEventTypeString, formatBytes} from '../utils';
function getIPDetails(source) {
  if (source) {
    const info = {};
    if (source.ip) { info.ip = source.ip; }
    if (source.country) { info.country = source.country.toLowerCase(); }
    if (source.port) { info.port = source.port; }
    return info;
  }
  return null;
}

export function getSourceDestination(row) {
  const {source, destination} = row;
  return {
    source: getIPDetails(source),
    dest: getIPDetails(destination)
  };
}

function getConn(row) {
  const {data: {conn}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (conn.service) { info.Service = conn.service; }
  if (conn.state) { info.State = conn.state; }
  if (conn.reqBytes) { info['Requested Bytes'] = formatBytes(conn.reqBytes, 2); }
  if (conn.respBytes) { info['Response Bytes'] = formatBytes(conn.respBytes, 2); }
  if (conn.duration) { info.Duration = msToTime(conn.duration).timeString; }

  return info;
}

function getSSH(row) {
  const {data: {ssh}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (ssh.direction) { info.Direction = ssh.direction; }
  if (ssh.client) { info.Client = ssh.client; }
  if (ssh.server) { info.Server = ssh.server; }
  if (ssh.success) { info.Successful = ssh.success; }
  return info;
}

function getDNS(row) {
  const {data: {dns}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (dns.answers[0]) { info['DNS Response'] = dns.answers[0]; }

  return info;
}

function getHTTP(row) {
  const {data: {http}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (http.userAgent) { info['User Agent'] = http.userAgent; }
  if (http.referrer) { info['Referrer'] = http.referrer; }

  return info;
}

function getSSL(row) {
  const {data: {ssl}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (ssl.serverName) { info['Server'] = ssl.serverName; }
  if (ssl.version) { info['SSL Version'] = ssl.version; }
  if (ssl.issue) { info['Issuer'] = ssl.issue; }

  return info;
}

function getFile(row) {
  const {data: {files}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (files.txHosts[0]) { info['Source'] = files.txHosts[0]; }
  if (files.rxHosts[0]) { info['Destination'] = files.rxHosts[0]; }
  if (files.sha256) { info['File Hash'] = files.sha256; }

  return info;
}

function getReport(row) {
  const {data: {report}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (report.file.fileName) { info['File Name'] = report.file.fileName; }
  if (report.file.sha256) { info['sha256'] = report.file.sha256; }
  if (report.status) { info['Status'] = report.status; }
  if (report.score) { info['Score'] = report.score; }
  if (report.file.mimeType) { info['MIME Type'] = report.file.mimeType; }

  return info;
}

function getAlert(row) {
  const {data: {alert}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (alert.severity) { info['Severity'] = alert.severity; }
  if (alert.signature) { info['Signature'] = alert.signature; }
  if (alert.category) { info['Category'] = alert.category; }
  if (alert.score) { info['Score'] = alert.score; }

  return info;
}

function getRankAlert(row) {
  const {data: {rank_alert}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      typeString: getEventTypeString(row.type)
    };

  if (rank_alert.description) { info.Description = rank_alert.description; }
  if (rank_alert.message) { info.Message = rank_alert.message; }
  if (rank_alert.category) { info.Category = rank_alert.category; }
  if (rank_alert.score) { info.Score = rank_alert.score; }

  return info;
}

function getWinEvent(row) {
  const {data: {winevent}} = row;

  const info = {};
  if (winevent.Message) { info.Message = winevent.Message; }
  if (winevent.EventType) { info.Type = winevent.EventType; }
  if (winevent.Category) { info.Category = winevent.Category; }
  if (winevent.SourceName) { info.Source = winevent.SourceName; }
  if (winevent.Severity) { info.Severity = winevent.Severity; }
  if (winevent.SeverityValue) { info.SeverityValue = winevent.SeverityValue; }

  return info;
}

function getAnomaly(row) {
  const info = {
    sourceDest: getSourceDestination(row),
    typeString: getEventTypeString(row.type)
  };

  return info;
}

function getDetails(row) {
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
      return null;
  }
}

export default async function Timeline(ctx, next) {
  let parsedData = await ctx.tempData.json();
  const normalizeData = parsedData.rows.map((row) => (getDetails(row[0])));
  parsedData.normalizeData = normalizeData;
  ctx.normalizeData = parsedData;
};
