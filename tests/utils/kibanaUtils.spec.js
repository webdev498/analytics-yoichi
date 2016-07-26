import {
  generatePathParams,
  generateQueryParams
  } from 'utils/kibanaUtils';

describe('Kibana Utility Function:', function() {
  it('generatePathParams should return path parameters.', function() {
    expect(generatePathParams(['alerts-score'])).to.deep.equal('alerts-score');
  });

  it('generateQueryParams should return query parameters.', function() {
    const parameters = {"data":{"total":-1,"next":-1,"columns":[{"name":"data.rank_alert.category","displayName":"Category","columnType":"DIMENSION","dataType":"TEXT","sortable":true},{"name":"date","displayName":"count of alerts","columnType":"MEASURE","dataType":"NUMBER","sortable":true}],"rows":[["suspicious-login",9],["potential-apt",2],["bad-reputation-traffic",1]]},"duration":"1h","dataObj":{"chartX":154,"chartY":217,"pageX":292,"pageY":948,"index":0,"value":9,"displayValue":"9","toolText":"suspicious-login, 9","id":"","datasetIndex":3,"visible":true,"dataIndex":0,"dataValue":9},"queryParamsArray":{"window":"","type":""}},
      queryParams = '?window=1h&type=suspicious-login';
    expect(generateQueryParams(parameters)).to.deep.equal(queryParams);
  });
});
