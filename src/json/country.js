const country = {
  'layout': [
    [
      {
        'id': '1',
        'type': 'MetricsCard',
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'queryParams': {
              'window': '1h'
            },
            'pathParams': {
              'reportId': 'taf_alert_count_time_shifted'
            }
          },
          'query': {
            'window': '1h',
            'timeShift': '1h'
          }
        },
        'name': 'MetricsCard',
        'attributes': {
          'style': {
            'backgroundColor': '#d9534f',
            'width': '24%',
            'padding': '10px'
          },
          'title': 'High Priority Alerts'
        },
        'children': [{
          'type': 'FontIcon',
          'content': 'add_alert'
        }]
      },
      {
        'id': '2',
        'type': 'MetricsCard',
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'queryParams': {
              'window': '1h'
            },
            'pathParams': {
              'reportId': 'taf_malware_count_time_shifted'
            }
          },
          'query': {
            'window': '1h',
            'timeShift': '1h'
          }
        },
        'name': 'MetricsCard',
        'attributes': {
          'style': {
            'backgroundColor': '#f0ad4e',
            'width': '24%',
            'padding': '10px'
          },
          'title': 'High Priority Malware'
        },
        'children': [{
          'type': 'FontIcon',
          'content': 'bug_report'
        }]
      },
      {
        'id': '3',
        'type': 'MetricsCard',
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'queryParams': {
              'window': '1h'
            },
            'pathParams': {
              'reportId': 'taf_event_count_time_shifted'
            }
          },
          'query': {
            'window': '1h',
            'timeShift': '1h'
          }
        },
        'name': 'MetricsCard',
        'attributes': {
          'style': {
            'backgroundColor': '#337ab7',
            'width': '24%',
            'padding': '10px'
          },
          'title': 'Events Processed'
        },
        'children': [{
          'type': 'FontIcon',
          'content': 'bug_report'
        }]
      },
      {
        'id': '4',
        'type': 'MetricsCard',
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'queryParams': {
              'window': '1h'
            },
            'pathParams': {
              'reportId': 'taf_asset_count_time_shifted'
            }
          },
          'query': {
            'window': '1h',
            'timeShift': '1h'
          }
        },
        'name': 'MetricsCard',
        'attributes': {
          'style': {
            'backgroundColor': '#5cb85c',
            'width': '24%',
            'padding': '10px'
          },
          'title': 'Assets Monitored'
        },
        'children': [{
          'type': 'FontIcon',
          'content': 'devices_other'
        }]
      }
    ],
    [
      {
        'id': '56',
        'type': 'Table',
        'name': 'Table',
        'meta': {
          'showHeader': true,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'queryParams': {
              'window': '1h',
              'count': 200
            },
            'pathParams': {
              'reportId': 'taf_alert_highpriority'
            }
          },
          'title': 'Recent Alerts'
        },
        'attributes': {
          'style': {'width': '100%'},
          'id': 'RecentAlerts'
        },
        'tableData': [
          {
            'reportId': 'taf_alert_highpriority',
            'columns': [
              {
                'type': 'chart',
                'columnNameToDisplay': 'Rank Score',
                'chartType': 'angulargauge',
                'chartId': 'recentAlert',
                'chartWidth': '70',
                'chartHeight': '60',
                'data': [
                  {
                    'fieldName': 'data.rank_alert.score'
                  }
                ],
                'style': {'width': '10%'}
              },
              {
                'type': 'text',
                'columnNameToDisplay': 'Date',
                'data': [
                  {
                    'fieldName': 'date',
                    'displayName': 'date'
                  }
                ],
                'style': {'width': '15%'}
              },
              {
                'type': 'text',
                'columnNameToDisplay': 'Details',
                'data': [
                  {
                    'fieldName': 'data.rank_alert.description',
                    'displayName': ''
                  },
                  {
                    'fieldName': 'data.rank_alert.message',
                    'displayName': ''
                  }
                ],
                'style': {'width': '30%'}
              },
              {
                'type': 'text',
                'columnNameToDisplay': 'Source',
                'data': [
                  {
                    'fieldName': 'source.ip',
                    'displayName': 'IP'
                  },
                  {
                    'fieldName': 'source.port',
                    'displayName': 'port'
                  },
                  {
                    'fieldName': 'source.country',
                    'displayName': 'countryFlag'
                  },
                  {
                    'fieldName': 'source.additionalInfo.user',
                    'displayName': 'User'
                  },
                  {
                    'fieldName': 'source.additionalInfo.machine',
                    'displayName': 'Machine'
                  }
                ],
                'style': {'width': '20%'}
              },
              {
                'type': 'text',
                'columnNameToDisplay': 'Destination',
                'data': [
                  {
                    'fieldName': 'destination.ip',
                    'displayName': 'IP'
                  },
                  {
                    'fieldName': 'destination.port',
                    'displayName': 'port'
                  },
                  {
                    'fieldName': 'destination.country',
                    'displayName': 'countryFlag'
                  },
                  {
                    'fieldName': 'destination.additionalInfo.user',
                    'displayName': 'User'
                  },
                  {
                    'fieldName': 'destination.additionalInfo.machine',
                    'displayName': 'Machine'
                  }
                ],
                'style': {'width': '20%'}
              }
            ]
          }
        ],
        'tableOptions': {
          'sortable': ['Rank Score', 'Date', 'Details', 'Source', 'Destination'],
          'defaultSort': {'column': 'Rank Score', 'direction': 'desc'},
          'filterable': ['Date', 'Details', 'Source', 'Destination'],
          'filterBy': 'connection'
        }
      }
    ],
    [
      {
        'id': '6',
        'type': 'ParetoChart',
        'meta': {
          'showHeader': true,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'queryParams': {
              'window': '1h'
            },
            'pathParams': {
              'reportId': 'taf_threat_trend'
            }
          },
          'title': 'Alert by type'
        },
        'attributes': {
          'style': {'width': '50%', 'marginRight': '20px'},
          'id': 'AlertByType',
          'width': '100%',
          'height': '400'
        },
        'chartOptions': {
          'pYAxisname': 'Connections',
          'xAxisname': 'Alert Types'
        },
        'chartData': {
          'fieldMapping': [
            {
              'axis': 'x',
              'reportId': 'taf_threat_trend',
              'columns': [
                'data.rank_alert.category'
              ]
            },
            {
              'axis': 'y',
              'reportId': 'taf_threat_trend',
              'columns': [
                'date'
              ]
            }
          ]
        }
      },
      {
        'id': '71',
        'type': 'MultiSeriesCombiChart',
        'meta': {
          'showHeader': true,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'queryParams': {
              'window': '1h'
            },
            'pathParams': {
              'reportId': 'taf_alert_priority_time'
            }
          },
          'title': 'Alert priority'
        },
        'attributes': {
          'style': {'width': '50%'},
          'id': 'AlertPriorityChart',
          'chartBorder': {},
          'chartCaption': {'display': 'none'}
        },
        'chartOptions': {
          'yAxisName': 'Alert Count',
          'drawAnchors': '1',
          'legendPosition': 'right',
          'linealpha': '0',
          'paletteColors': '#0505F5, #D93609, #ACF50F,#FCFC0D, #05E9F5'
        },
        'chartData': {
          'combinedResult': false,
          'fieldMapping': [
            {
              'axis': 'x',
              'reportId': 'taf_alert_priority_time',
              'columns': [
                'date'
              ]
            },
            {
              'axis': 'y',
              'seriesOptions': {
                'renderas': 'Line',
                'lineThickness': '0',
                'drawanchors': '1',
                'anchorradius': '10',
                'anchorsides': '0',
                'anchorBorderColor': ['#ff0000', '#0F4D1F', '#0000ff'],
                'anchorbgcolor': ['#ff0000', '#0F4D1F', '#0000ff']
              },
              'reportId': 'taf_alert_priority_time',
              'columns': [
                'data.rank_alert.score',
                'count'
              ]
            }
          ]
        }
      }
    ]
  ]
};

export default country;
