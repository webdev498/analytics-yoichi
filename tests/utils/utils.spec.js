import {getCountryIDByCountryCode, msToTime, generateRawData, getIndexFromColumnName, getColumnIndexArrayFromColumnName,
  getXYIndexFromColumnNames, getIndexFromObjectName, translateTimeWindow, isUndefined, getTimePairFromWindow
  } from 'utils/utils';

describe('Utility Function:', function() {
  it('getCountryIDByCountryCode should return country id.', function() {
    expect(getCountryIDByCountryCode('IN')).to.deep.equal('104');
  });

  it('msToTime should convert milliseconds to time.', function() {
    expect(msToTime('3263358313')).to.deep.equal([18, 29, 18]);
  });

  it('generateRawData should generate raw data object.', function() {
    const fieldMapping = [{
        'reportId': 'taf_top_longest_user_agents',
        'columns': [
          {
            'type': 'text', 'columnNameToDisplay': 'User Agent',
            'data': [{'fieldName': 'data.http.userAgent'}], 'style': {'width': '70%'}
          },
          {
            'type': 'chart', 'columnNameToDisplay': 'Connections',
            'attributes': {'id': 'connection', 'chartType': 'area2d', 'chartWidth': '100%', 'chartHeight': '75'},
            'data': [{'fieldName': 'count'}], 'style': {'width': '30%'}
          }
        ]
      }],
      apiData = {'taf_top_longest_user_agents': {'total': -1, 'next': -1, 'columns': [{'name': 'data.http.userAgent', 'displayName': 'data.http.userAgent', 'columnType': 'DIMENSION', 'dataType': 'TEXT', 'sortable': true}, {'name': 'date', 'displayName': 'date', 'columnType': 'DIMENSION', 'dataType': 'DATE', 'sortable': true}, {'name': 'count', 'displayName': 'connections', 'columnType': 'MEASURE', 'dataType': 'NUMBER', 'sortable': true}], 'rows': [{'Jakarta Commons-HttpClient/3.1': {'2016-06-23T09:25:00.000': [0], '2016-06-23T10:00:00.000': [0], '2016-06-23T09:35:00.000': [0], '2016-06-23T10:10:00.000': [7], '2016-06-23T09:30:00.000': [0], '2016-06-23T10:05:00.000': [0], '2016-06-23T09:45:00.000': [0], '2016-06-23T09:40:00.000': [0], '2016-06-23T10:15:00.000': [0], '2016-06-23T09:20:00.000': [0], '2016-06-23T09:55:00.000': [0], '2016-06-23T09:15:00.000': [0], '2016-06-23T09:50:00.000': [0]}}]}, 'taf_top_shortest_user_agents': {'total': -1, 'next': -1, 'columns': [{'name': 'data.http.userAgent', 'displayName': 'data.http.userAgent', 'columnType': 'DIMENSION', 'dataType': 'TEXT', 'sortable': true}, {'name': 'date', 'displayName': 'date', 'columnType': 'DIMENSION', 'dataType': 'DATE', 'sortable': true}, {'name': 'count', 'displayName': 'connections', 'columnType': 'MEASURE', 'dataType': 'NUMBER', 'sortable': true}], 'rows': [{'Jakarta Commons-HttpClient/3.1': {'2016-06-23T09:25:00.000': [0], '2016-06-23T10:00:00.000': [0], '2016-06-23T09:35:00.000': [0], '2016-06-23T10:10:00.000': [7], '2016-06-23T09:30:00.000': [0], '2016-06-23T10:05:00.000': [0], '2016-06-23T09:45:00.000': [0], '2016-06-23T09:40:00.000': [0], '2016-06-23T10:15:00.000': [0], '2016-06-23T09:20:00.000': [0], '2016-06-23T09:55:00.000': [0], '2016-06-23T09:15:00.000': [0], '2016-06-23T09:50:00.000': [0]}}]}},
      rawData = {'taf_top_longest_user_agents': {'total': -1, 'next': -1, 'columns': [{'name': 'data.http.userAgent', 'displayName': 'data.http.userAgent', 'columnType': 'DIMENSION', 'dataType': 'TEXT', 'sortable': true}, {'name': 'date', 'displayName': 'date', 'columnType': 'DIMENSION', 'dataType': 'DATE', 'sortable': true}, {'name': 'count', 'displayName': 'connections', 'columnType': 'MEASURE', 'dataType': 'NUMBER', 'sortable': true}], 'rows': [{'Jakarta Commons-HttpClient/3.1': {'2016-06-23T09:25:00.000': [0], '2016-06-23T10:00:00.000': [0], '2016-06-23T09:35:00.000': [0], '2016-06-23T10:10:00.000': [7], '2016-06-23T09:30:00.000': [0], '2016-06-23T10:05:00.000': [0], '2016-06-23T09:45:00.000': [0], '2016-06-23T09:40:00.000': [0], '2016-06-23T10:15:00.000': [0], '2016-06-23T09:20:00.000': [0], '2016-06-23T09:55:00.000': [0], '2016-06-23T09:15:00.000': [0], '2016-06-23T09:50:00.000': [0]}}]}};
    expect(generateRawData(fieldMapping, apiData)).to.deep.equal(rawData);
  });

  it('getIndexFromColumnName should return index from column name.', function() {
    const columns = ['bandwidth'],
      columnArray = [{'name': 'source.ip', 'displayName': 'source.ip', 'columnType': 'DIMENSION',
          'dataType': 'TEXT', 'sortable': true},
        {'name': 'bandwidth', 'displayName': 'bandwidth', 'columnType': 'FORMULA',
          'dataType': 'NUMBER', 'sortable': true}],
      index = 1;
    expect(getIndexFromColumnName(columns, columnArray)).to.deep.equal(index);
  });

  it('getColumnIndexArrayFromColumnName should return index array from column name.', function() {
    const columns = ['country_name', 'connections'],
      columnArray = [{'name': 'destination.country', 'displayName': 'destination.country', 'columnType': 'DIMENSION', 'dataType': 'TEXT', 'sortable':true},{'name': 'pos_x', 'displayName': 'pos_x', 'columnType': 'DIMENSION', 'dataType': 'TEXT', 'sortable':true},{'name': 'pos_y', 'displayName': 'pos_y', 'columnType': 'DIMENSION', 'dataType': 'TEXT', 'sortable':true},{'name': 'country_name', 'displayName': 'country_name', 'columnType': 'DIMENSION', 'dataType': 'TEXT', 'sortable':true},{'name': 'connections', 'displayName': 'connections', 'columnType': 'MEASURE', 'dataType': 'NUMBER', 'sortable':true},{'name': 'bandwidth', 'displayName': 'bandwidth', 'columnType': 'FORMULA', 'dataType': 'NUMBER', 'sortable':true}],
      indexArray = [3, 4];
    expect(getColumnIndexArrayFromColumnName(columns, columnArray)).to.deep.equal(indexArray);
  });

  it('getXYIndexFromColumnNames should return x and y index from column name.', function() {
    const columns = ['data.http.__info.userAgentLen', 'date'],
      columnArray = [{'name': 'data.http.__info.userAgentLen', 'displayName': 'data.http.__info.userAgentLen', 'columnType': 'DIMENSION', 'dataType': 'NUMBER', 'sortable':true},{'name': 'date', 'displayName': 'date', 'columnType': 'MEASURE', 'dataType': 'NUMBER', 'sortable':true}],
      indexArray = [0, 1];
    expect(getXYIndexFromColumnNames(columns, columnArray)).to.deep.equal(indexArray);
  });

  it('getIndexFromObjectName should return x and y index from column name.', function() {
    const objectName = {'fieldName': 'data.rank_alert.score', 'fieldValueArray': [], 'fieldValue': '', 'dataArray': {'date': '2016-06-23T11:07:53.621', 'data': {'rank_alert': {'score':66, 'triggered': '2016-06-23T11:07:53.621', 'partition': 'OikKAfhDbGl2ZUQzMzIyM_k', 'created': '2016-06-23T11:07:53.621', 'interesting': [], 'scoreDetails': [{'contribution':66, 'firstSeen': '2016-06-23T11:07:53.643', 'message': 'Suspicious listening port on internal host.', 'uuid': '1428403803'}], 'name': 'unique.uniqueport', 'description': 'Suspicious listening port on internal host.', 'modified': '2016-06-23T11:07:53.621', 'justification': [], 'message': '172.31.9.171 received a connection and transferred 54,663 bytes on port: 33,223.', 'category': 'potential-apt'}}, 'origin': 'live', 'correlationIds': [], 'id': 'OikKAfhWT2lrS0FmaERiR2wyWlVRek16SXlNX2tDbGl2ZVB1bmlxdWUudW5pcXVlcG9ydPk', 'type': 'rank_alert'}},
      index = 66;
    expect(getIndexFromObjectName(objectName)).to.deep.equal(index);
  });

  it('translateTimeWindow should return time window.', function() {
    expect(translateTimeWindow('1 hour')).to.deep.equal('1h');
  });

  it('isUndefined should return true if variable is defined.', function() {
    let index = 1;
    expect(isUndefined(index)).to.deep.equal(false);
  });

  it('getTimePairFromWindow should return from and to dates for the specific time window.', function() {
    const timePair = {'fromDate': '2016-06-23T17:45:00.000', 'toDate': '2016-06-23T17:50:00.000'};
    expect(getTimePairFromWindow('1h', '23 Jun 2016 17:45')).to.deep.equal(timePair);
  });
});
