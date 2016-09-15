const asset = {
  'layout': [
    [
      {
        'id': 'asset-detail',
        'type': 'AssetDetails',
        'meta': {
          'showHeader': true,
          'api': [
            {
              'path': '/api/entity/{type}/{assetId}',
              'pathParams': {
                'assetId': ':pathParam',
                'type': ':pathParam'
              },
              'queryParams': {},
              'id': 'assetDetail'
            },
            {
              'path': '/api/analytics/reporting/execute/{reportId}',
              'pathParams': {
                'reportId': 'taf_asset_session_count,taf_asset_internal_resource_count,taf_asset_total_incoming_bandwidth_external,taf_asset_total_incoming_bandwidth_internal,taf_asset_total_outgoing_bandwidth_external,taf_asset_total_outgoing_bandwidth_internal,taf_asset_top_dest_countries,taf_asset_top_source_countries,taf_asset_top_dest_countries,taf_asset_top_source_countries'
              },
              'queryParams': {
                'user': 'assetId:pathParam',
                'window': ''
              },
              'id': 'assetReports'
            }
          ],
          'title': 'Risk Profile'
        },
        'name': 'AssetDetails',
        'attributes': {
          'style': {
            'width': '250px',
            'flex': '0 0 250px',
            'backgroundColor': '#F7F7F9'
          }
        }
      },
      {
        'id': 'network-graph',
        'type': 'NetworkGraph',
        'name': 'NetworkGraph',
        'meta': {
          'showHeader': true,
          'api': {
            'path': '/api/entity/{type}/{assetId}',
            'pathParams': {
              'assetId': ':pathParam',
              'type': ':pathParam'
            },
            'queryParams': {},
            'id': 'assetDetail'
          },
          'title': 'Overview'
        },
        'attributes': {
          'style': {
            'width': '80%'
          },
          'id': 'NetworkGraph'
        }
      }
    ],
    [
      {
        'id': 'asset-activity',
        'type': 'Compound',
        'name': 'Compound',
        'meta': {
          'showHeader': true,
          'title': 'Activity',
          'showRefresh': false
        },
        'attributes': {
          'style': {
            'width': '300px'
          },
          'id': 'activity'
        },
        children: [
          {
            'id': 'connections-by-protocol',
            'type': 'HorizontalBarChart',
            'meta': {
              'showHeader': true,
              'showRefresh': false,
              'api': {
                'path': '/api/analytics/reporting/execute/{reportId}',
                'pathParams': {
                  'reportId': 'taf_connections_by_protocol'
                },
                'queryParams': {
                  'window': ''
                }
              },
              'title': 'Connections By Protocol'
            },
            'attributes': {
              'chartCaption': {
                'display': 'none'
              },
              'chartWidth': '250px',
              'chartHeight': '250px',
              'style': {
                'width': '100%',
                'padding': 0,
                'boxShadow': 'none'
              },
              'id': 'connections-by-protocol-chart'
            },
            'chartOptions': {
              'showValues': '1',
              'showLabels': '1',
              'chartRightMargin': '0'
            },
            'chart': {
              'showAnnotations': false
            },
            'chartData': {
              'showTrendLines': false,
              'fieldMapping': [
                {
                  'reportId': 'taf_connections_by_protocol',
                  'columns': [
                    'protocol.service',
                    'date'
                  ]
                }
              ],
              'multipleReportIds': false
            }
          }
        ]
      }
    ]
  ]
};

export default asset;
