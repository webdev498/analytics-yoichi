import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import {
  formatBytes,
  formatMicroseconds,
  formatDateInLocalTimeZone
} from 'utils/utils';

import Reactable from 'reactable';
const {Table, Thead, Th, Tr, Td, unsafe} = Reactable;

const styles = {
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  source: {
    fontSize: '15px'
  }
};

class TrafficTable extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  getSource(source) {
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

  getDestinaton(dest) {
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

  getSourceDestination(row) {
    const {source, destination} = row;
    return (
      <div style={styles.source}>
        <span>{this.getSource(source)}</span>
        <span>{this.getDestinaton(destination)}</span>
      </div>
    );
  }

  getConn(row) {
    const {data} = row;
    return (
      <div>
        {this.getSourceDestination(row)}
        <span><b>Service:</b> {data.conn.service} </span>
        <span><b>State:</b> {data.conn.state} </span>
        <span><b>Requested Bytes:</b> {formatBytes(data.conn.reqBytes, 2)} </span>
        <span><b>Response Bytes:</b> {formatBytes(data.conn.respBytes, 2)} </span>
        <span><b>Duration:</b> {formatMicroseconds(data.conn.duration)} </span>
      </div>
    );
  }

  getSSH(row) {
    const {data} = row;
    return (
      <div>
        {this.getSourceDestination(row)}
        <span><b>Direction:</b> {data.ssh.direction} </span>
        <span><b>Client:</b> {data.ssh.client} </span>
        <span><b>Server:</b> {data.ssh.server} </span>
        <span><b>Successful:</b> {data.ssh.success} </span>
      </div>
    );
  }

  getDNS(row) {
    const {data} = row;

    return (
      <div>
        {this.getSourceDestination(row)}
        <span><b>DNS Response:</b> {data.dns.answers[0]}</span>
      </div>
    );
  }

  getHTTP(row) {
    const {data} = row;

    return (
      <div>
        {this.getSourceDestination(row)}
        <span><b>User Agent:</b> {data.http.userAgent} </span>
        <br />
        <span><b>Referrer:</b> {data.http.referrer} </span>
      </div>
    );
  }

  getSSL(row) {
    const {data} = row;

    return (
      <div>
        {this.getSourceDestination(row)}
        <b>Server:</b> {data.ssl.serverName}
        <b>SSL Version:</b> {data.ssl.versio}
        <b>Issuer:</b> {data.ssl.issue}
      </div>
    );
  }

  getFile(row) {
    const {data} = row;

    return (
      <div>
        <b>Source:</b> {data.files.txHosts[0]}
        <b>Destination:</b> {data.files.rxHosts[0]}
        <b>File Hash:</b> {data.files.sha256}
      </div>
    );
  }

  getReport(row) {
    const {data} = row;
    return (
      <div>
        <b>File Name:</b> {data.report.file.fileName}
        <b>sha256:</b> {data.report.file.sha256}
        <b>Status:</b> {data.report.status}
        <b>Score:</b> {data.report.score}
        <b>MIME Type:</b> {data.report.file.mimeType}
      </div>
    );
  }

  getOther(data) {
    const keys = Object.keys(data);

    function getDetails(value) {
      const keys = Object.keys(value);
      return keys.map((key) => {
        return (<li><b>{key}</b>: {value[key]} &nbsp;&nbsp;</li>);
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
              return (<li><b>{key}</b>: {value} &nbsp;&nbsp;</li>);
            }
          })
        }
      </ul>
    );
  }

  getDetails(row) {
    if (row.type === 'CONN' || row.type === 'conn') {
      return this.getConn(row);
    }
    else if (row.type === 'SSH' || row.type === 'ssh') {
      return this.getSSH(row);
    }
    else if (row.type === 'DNS' || row.type === 'dns') {
      return this.getDNS(row);
    }
    else if (row.type === 'HTTP' || row.type === 'http') {
      return this.getHTTP(row);
    }
    else if (row.type === 'SSL' || row.type === 'ssl') {
      return this.getSSL(row);
    }
    else if (row.type === 'File' || row.type === 'file') {
      return this.getFile(row);
    }
    else if (row.type === 'REPORT' || row.type === 'report') {
      return null;
    }
    else {
      return this.getOther(row.data[row.type]);
    }
  }

  getDate(date) {
    return date;
  }

  getTableRows(rows) {
    return rows.map((row) => {
      const r = row[0];
      let dateTime = formatDateInLocalTimeZone(this.getDate(r.date)),
        dateFormatted = '<span style="font-size: 14px; font-weight: 600;">' + dateTime.date + '</span>';
      dateFormatted += '<br/>' + dateTime.time;

      return (
        <Tr>
          <Td column='type'>
            {r.type}
          </Td>
          <Td column='date'>
            {unsafe(dateFormatted)}
          </Td>
          <Td column='details'>
            {this.getDetails(r)}
          </Td>
        </Tr>
      );
    });
  }

  getTable(rows) {
    const callback = page => {
      console.log(page);
    };

    return (
      <Table style={{width: '100%'}}
        className='threatTable'
        pageButtonLimit={5}
        currentPage={0}
        itemsPerPage={10}
        onPageChange={callback}>
        <Thead>
          <Th style={{backgroundColor: Colors.smoke, width: '100px'}} column='type'><b>Type</b></Th>
          <Th style={{backgroundColor: Colors.smoke, width: '200px'}} column='date'><b>Date</b></Th>
          <Th style={{backgroundColor: Colors.smoke}} column='details'><b>Details</b></Th>
        </Thead>
        {this.getTableRows(rows)}
      </Table>
    );
  }

  showMalwareDetails(data) {
    if (data.rows[0] && data.rows[0][0] && data.rows[0][0].data && data.rows[0][0].data.report) {
      // TODO crazy hack remove this
      document.getElementById('malware-traffic-details').style.display = 'block';
    }
  }

  render() {
    const {data} = this.props;
    if (!data) return null;
    this.showMalwareDetails(data);
    return (
      <div style={styles.card}>
        {this.getTable(data.rows)}
      </div>
    );
  }
}

export default TrafficTable;
