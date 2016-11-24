import moment from 'moment';
import {msToTime, getEventTypeString, formatBytes} from '../utils/utils';
import {
  getChartData
} from '../components/anomalyChart';

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

function getSourceDestination(row) {
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
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
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
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (ssh.direction) { info.Direction = ssh.direction; }
  if (ssh.client) { info.Client = ssh.client; }
  if (ssh.server) { info.Server = ssh.server; }
  if (ssh.success) { info.Successful = ssh.success ? 'Successful' : 'Failed'; }
  return info;
}

function getDNS(row) {
  const {data: {dns}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (dns.answers[0]) { info['DNS Response'] = dns.answers[0]; }

  return info;
}

function getHTTP(row) {
  const {data: {http}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (http.userAgent) { info['User Agent'] = http.userAgent; }
  if (http.referrer) { info['Referrer'] = http.referrer; }

  return info;
}

function getSSL(row) {
  const {data: {ssl}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (ssl.serverName) { info['Server'] = ssl.serverName; }
  if (ssl.version) { info['SSL Version'] = ssl.version; }
  if (ssl.issue) { info['Issuer'] = ssl.issue; }

  return info;
}

function getFile(row) {
  const {data: {files}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (files.txHosts[0]) { info['Source'] = files.txHosts[0]; }
  if (files.rxHosts[0]) { info['Destination'] = files.rxHosts[0]; }
  if (files.sha256) { info['File Hash'] = files.sha256; }

  return info;
}

function getReport(row) {
  const {data: {report}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (report.file.fileName) { info['File Name'] = report.file.fileName; }
  if (report.file.sha256) { info['sha256'] = report.file.sha256; }
  if (report.status) { info['Status'] = report.status; }
  if (report.score) { info['Score'] = (report.score).toString(); }
  if (report.file.mimeType) { info['MIME Type'] = report.file.mimeType; }

  return info;
}

function getAlert(row) {
  const {data: {alert}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (alert.severity) { info['Severity'] = alert.severity; }
  if (alert.signature) { info['Signature'] = alert.signature; }
  if (alert.category) { info['Category'] = alert.category; }
  if (alert.score) { info['Score'] = (alert.score).toString(); }

  return info;
}

function getRankAlert(row) {
  const {data: {rank_alert}} = row,
    info = {
      sourceDest: getSourceDestination(row),
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (rank_alert.description) { info.Description = rank_alert.description; }
  if (rank_alert.message) { info.Message = rank_alert.message; }
  if (rank_alert.category) { info.Category = rank_alert.category; }
  if (rank_alert.score) { info.Score = (rank_alert.score).toString(); }

  return info;
}

function getWinEvent(row) {
  const {data: {winevent}} = row;

  const info = {};
  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (winevent.Message) { info.Message = winevent.Message; }
  if (winevent.EventType) { info.Type = winevent.EventType; }
  if (winevent.Category) { info.Category = winevent.Category; }
  if (winevent.SourceName) { info.Source = winevent.SourceName; }
  if (winevent.Severity) { info.Severity = winevent.Severity; }
  if (winevent.SeverityValue) { info.SeverityValue = winevent.SeverityValue; }

  return info;
}

function getAnomaly(row) {
  const {data: {anomaly}} = row,
    info = {
      Type: getEventTypeString(row.type)
    };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (anomaly.impact) { info.Impact = anomaly.impact; }
  if (anomaly.anomaly_description) { info['Anomaly Description'] = anomaly.anomaly_description; }
  if (anomaly.context) { info.chart = getChartData(anomaly.context); }

  return info;
}

function getRDP(row) {
  const info = {
    sourceDest: getSourceDestination(row),
    Type: getEventTypeString(row.type)
  };

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }

  return info;
}

function getAuth(row) {
  const {data: {auth}} = row,
    info = {};

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (auth.message) { info.Message = auth.message; }
  if (row.type) { info.Type = getEventTypeString(row.type); }
  if (auth.severity && auth.severity_label) { info.Severity = auth.severity_label + ' (' + auth.severity + ')'; }
  if (auth.status) { info.Status = auth.status; }
  if (auth.priority) { info.Priority = (auth.priority).toString(); }

  return info;
}

function formatDateInLocalTimeZone(value) {
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

function getSession(row, info) {
  if (row.from) {
    let dateTime = formatDateInLocalTimeZone(row.from);
    info['Start Date'] = dateTime.date + ' ' + dateTime.time;
    info.Date = row.from;
  }
  if (row.to) {
    let dateTime = formatDateInLocalTimeZone(row.to);
    info['End Date'] = dateTime.date + ' ' + dateTime.time;
    info.endParam = row.to;
  }
  if (row.machine) { info.Machine = row.machine; }
  if (row.user) { info.User = row.user; }
  if (row.session.durationMs) { info.Duration = row.session.durationMs; }
  return info;
}

function getOther(row) {
  let info = {};

  if (row.date) { info.Date = row.date; }
  if (row.id) { info.id = row.id; }
  if (row.session) {
    info.session = true;
    info = getSession(row, info);
  }
  else {
    info.Type = getEventTypeString(row.type);
  }

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
    case 'rdp':
      return getRDP(row);
    case 'auth':
      return getAuth(row);
    default:
      return getOther(row);
  }
}

export default async function Timeline(ctx, next) {
  let parsedData = await ctx.tempData.json();
  if (!parsedData.errorCode) {
    const normalizeData = parsedData.rows.map((row) => (getDetails(row[0])));
    parsedData.normalizeData = normalizeData;
    ctx.normalizeData = parsedData;
  }
};
