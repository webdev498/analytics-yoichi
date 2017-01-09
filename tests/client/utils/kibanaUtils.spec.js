import {
  generateClickThroughUrl
} from '../../../commons/utils/kibanaUtils';

import {kibanaBaseUrl} from '../../../serverEnv';

describe('Kibana Utility Function:', function() {
  it('should return valid kibana url if query parameter requires x-axis value', function() {
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

  it('should return valid kibana url if query parameter requires field value', function() {
    const parameters = {
        'data': {
          'columns': [
            {
              'name': 'correlationIds',
              'displayName': 'correlationIds',
              'columnType': 'ATTRIBUTE',
              'dataType': 'TEXT',
              'sortable': true
            }
          ],
          'rows': [
            [
              [
                'CNTOKPNKMKNUMx1SROTMx1NTOKPNKTKSOx1PRNS'
              ]
            ]
          ]
        },
        'duration': '1mo',
        'queryParamsArray': {
          'correlationIds': 'correlationIds[0]:fieldName'
        },
        'currentRowNumber': 0,
        'pathParams': [
          'connection-details'
        ]
      },
      url = kibanaBaseUrl +
        '/api/kibana/query/connection-details?correlationIds=CNTOKPNKMKNUMx1SROTMx1NTOKPNKTKSOx1PRNS';
    expect(generateClickThroughUrl(parameters)).to.deep.equal(url);
  });

  it('should return valid kibana url if query parameter requires static text data', function() {
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
          'status': 'success'
        },
        'pathParams': [
          'alerts-type'
        ]
      },
      url = kibanaBaseUrl + '/api/kibana/query/alerts-type?window=1mo&status=success';
    expect(generateClickThroughUrl(parameters)).to.deep.equal(url);
  });
});
