import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
/* import PaginationWidget from 'components/PaginationWidget';
import $ from 'jquery';
import { connect } from 'react-redux';
import {fetchTrafficDetailsApiData} from 'actions/ParentCard';
import Cookies from 'cookies-js';*/ // Was added for server side pagination, commented for now and kept it on hold.
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

// let dataUrl = 'https://demo.ranksoftwareinc.com/api/alert/traffic?window=1w&date=2016-07-09T15:13:45.050&filter=((source.ip%20=%2010.3.162.105%20AND%20(type%20=%20conn%20AND%20destination.port%20%3E%201024%20AND%20destination.internal%20!=%20true))%20OR%20(source.ip%20=%2010.3.162.105%20AND%20(type%20=%20http%20AND%20data.http.host%20%25%20%22www.download.windowsupdate.com%22%20AND%20data.http.userAgent%20%25%20%22Microsoft-CryptoAPI%22)))';

let dataArray = {
  rows: [],
  totalPage: 0,
  sortColumnName: null,
  sortOrder: null,
  currentPage: 1,
  pageSize: 25
};

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

function getSourceDestination(row) {
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
      {getSourceDestination(row)}
      <span><b>Service:</b> {data.conn.service} </span>
      <span><b>State:</b> {data.conn.state} </span>
      <span><b>Requested Bytes:</b> {formatBytes(data.conn.reqBytes, 2)} </span>
      <span><b>Response Bytes:</b> {formatBytes(data.conn.respBytes, 2)} </span>
      <span><b>Duration:</b> {formatMicroseconds(data.conn.duration)} </span>
    </div>
  );
}

function getSSH(row) {
  const {data} = row;
  return (
    <div>
      {getSourceDestination(row)}
      <span><b>Direction:</b> {data.ssh.direction} </span>
      <span><b>Client:</b> {data.ssh.client} </span>
      <span><b>Server:</b> {data.ssh.server} </span>
      <span><b>Successful:</b> {data.ssh.success} </span>
    </div>
  );
}

function getDNS(row) {
  const {data} = row;

  return (
    <div>
      {getSourceDestination(row)}
      <span><b>DNS Response:</b> {data.dns.answers[0]}</span>
    </div>
  );
}

function getHTTP(row) {
  const {data} = row;

  return (
    <div>
      {getSourceDestination(row)}
      <span><b>User Agent:</b> {data.http.userAgent} </span>
      <br />
      <span><b>Referrer:</b> {data.http.referrer} </span>
    </div>
  );
}

function getSSL(row) {
  const {data} = row;

  return (
    <div>
      {getSourceDestination(row)}
      <b>Server:</b> {data.ssl.serverName}
      <b>SSL Version:</b> {data.ssl.versio}
      <b>Issuer:</b> {data.ssl.issue}
    </div>
  );
}

function getFile(row) {
  const {data} = row;

  return (
    <div>
      <b>Source:</b> {data.files.txHosts[0]}
      <b>Destination:</b> {data.files.rxHosts[0]}
      <b>File Hash:</b> {data.files.sha256}
    </div>
  );
}

function getReport(row) {
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

function getOther(data) {
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

function getDetails(row) {
  if (row.type === 'CONN' || row.type === 'conn') {
    return getConn(row);
  }
  else if (row.type === 'SSH' || row.type === 'ssh') {
    return getSSH(row);
  }
  else if (row.type === 'DNS' || row.type === 'dns') {
    return getDNS(row);
  }
  else if (row.type === 'HTTP' || row.type === 'http') {
    return getHTTP(row);
  }
  else if (row.type === 'SSL' || row.type === 'ssl') {
    return getSSL(row);
  }
  else if (row.type === 'File' || row.type === 'file') {
    return getFile(row);
  }
  else if (row.type === 'REPORT' || row.type === 'report') {
    return null;
  }
  else {
    return getOther(row.data[row.type]);
  }
}

function getDate(date) {
  return date;
}

function getTableRows(rows) {
  return rows.map((row) => {
    const r = row[0];
    let dateTime = formatDateInLocalTimeZone(getDate(r.date)),
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
          {getDetails(r)}
        </Td>
      </Tr>
    );
  });
}

function showMalwareDetails(data) {
  if (data.rows[0] && data.rows[0][0] && data.rows[0][0].data && data.rows[0][0].data.report) {
    // TODO crazy hack remove this
    document.getElementById('malware-traffic-details').style.display = 'block';
  }
}

class TrafficTable extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.populateData = this.populateData.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.prevPageChanged = this.prevPageChanged.bind(this);
    this.nextPageChanged = this.nextPageChanged.bind(this);
  }

  getTable(data) {
    const {rows} = data;
    return (
      <div>
        <Table style={{width: '100%'}}
          className='threatTable'
          pageButtonLimit={5}
          currentPage={0}
          itemsPerPage={10}
          previousPageLabel={'<<'} nextPageLabel={'>>'}>
          <Thead>
            <Th style={{backgroundColor: Colors.smoke, width: '100px'}} column='type'><b>Type</b></Th>
            <Th style={{backgroundColor: Colors.smoke, width: '200px'}} column='date'><b>Date</b></Th>
            <Th style={{backgroundColor: Colors.smoke}} column='details'><b>Details</b></Th>
          </Thead>
          {getTableRows(rows)}
        </Table>

        {/*<PaginationWidget Size={data.totalPage}
          onPageChanged={this.pageChanged}
          onPrevPageChanged={this.prevPageChanged}
          onNextPageChanged={this.nextPageChanged}
          currentPage={data.currentPage} />*/}
      </div>
    );
  }

  componentDidMount() {
    // this.populateData(1);
  }

  populateData(currentPage) {
    let fromParameter = 0;
    if (currentPage === 1) {
      fromParameter = 0;
    }
    else {
      fromParameter = (parseInt(currentPage) - 1) * parseInt(dataArray.pageSize);
    }
    var params = {
      count: dataArray.pageSize,
      from: fromParameter
    };

    this.getTrafficDetails(params);

    // const accessToken = Cookies.get('access_token');
    // const tokenType = Cookies.get('token_type');

    // let oauthHeader = {
    //   'Authorization': tokenType + ' ' + accessToken
    // };

    // $.ajax({
    //   url: dataUrl,
    //   type: 'GET',
    //   data: params,
    //   contentType: 'application/json;charset=UTF-8',
    //   headers: oauthHeader,
    //   success: function(data) {
    //     dataArray = {
    //       rows: data.rows,
    //       totalPage: Math.ceil(data.total / 25),
    //       sortColumnName: null,
    //       sortOrder: null,
    //       currentPage: currentPage,
    //       pageSize: 25
    //     };
    //   }.bind(this),
    //   error: function(err) {
    //     alert('Error');
    //   }.bind(this)
    // });
  }

  pageChanged(pageNumber, e) {
    e.preventDefault();
    dataArray.currentPage = pageNumber;
    this.populateData(pageNumber);
  }

  prevPageChanged(pageNumber, e) {
    e.preventDefault();
    console.log('prev:', (parseInt(pageNumber) - 1));
    if ((parseInt(pageNumber) - 1) > 0) {
      dataArray.currentPage = pageNumber - 1;
      this.populateData(pageNumber);
    }
  }

  nextPageChanged(pageNumber, pageSize, e) {
    e.preventDefault();
    if ((parseInt(pageNumber) + 1) <= pageSize) {
      dataArray.currentPage = pageNumber + 1;
      this.populateData(pageNumber);
    }
  }

  getTrafficDetails(params) {
    const {props} = this;
    console.log('from traffic details:', props);
    // const data = this.props.data.data.rank_alert;
    // const {props} = this;
    // const {id, api} = props.meta.fetchDataFor;

    // api.queryParams.filter = encodeURI(data.trafficFilter);
    // api.queryParams.date = data.triggered || props.params.date;
    // props.fetchApiData(id, api);
  }

  render() {
    const {data} = this.props;
    if (!data) return null;
    showMalwareDetails(data);

    dataArray = {
      rows: data.rows,
      totalPage: Math.ceil(data.total / 25),
      sortColumnName: null,
      sortOrder: null,
      currentPage: 1,
      pageSize: 25
    };

    return (
      <div style={styles.card}>
        {this.getTable(dataArray)}
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   return {
//     state
//   };
// }

// export default connect(mapStateToProps, {
//   fetchTrafficDetailsApiData
// })(TrafficTable);

export default TrafficTable;
