import {
  generateClickThroughUrl
} from 'utils/kibanaUtils';

const kibanaBaseUrl = (window.global && window.global.kibanaBaseUrl) ? window.global.kibanaBaseUrl : '/';

describe('Kibana Utility Function:', function() {
  it('should return kibana url', function() {
    const parameters = {
        'data': {
          'columns': [
            {
              'name': 'data.rank_alert.category',
              'displayName': 'Category',
              'columnType': 'DIMENSION',
              'dataType': 'TEXT',
              'sortable': true
            },
            {
              'name': 'date',
              'displayName': 'count of alerts',
              'columnType': 'MEASURE',
              'dataType': 'NUMBER',
              'sortable': true
            }
          ],
          'rows': [
            [
              'bad-reputation-traffic',
              354
            ]
          ]
        },
        'duration': '1mo',
        'dataObj': {
          'toolText': 'bad-reputation-traffic, 42.45%'
        },
        'queryParamsArray': {
          'window': '',
          'xAxisValueInLowerCase': 'type'
        },
        'pathParams': [
          'alerts-type'
        ]
      },
      url = kibanaBaseUrl + '/api/kibana/query/alerts-type?window=1mo&type=bad-reputation-traffic';
    expect(generateClickThroughUrl(parameters)).to.deep.equal(url);
  });
});
