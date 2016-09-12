const asset = {
  'layout': [
    [
      {
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_alert_count_time_shifted'
            },
            'queryParams': {
              'window': ''
            }
          }
        },
        'name': 'MetricsCard',
        'attributes': {
          'countStyle': {
            'color': '#F69275'
          },
          'style': {
            'marginRight': '3px',
            'width': '25%',
            'borderTop': '6px solid #F69275'
          }
        },
        'id': '1',
        'type': 'MetricsCard',
        'title': 'High Priority Alerts',
        'kibana': {
          'pathParams': [
            'alerts-score'
          ],
          'queryParams': {
            'fromAndToBasedOnToday': '',
            'scoreRange': ''
          }
        }
      },
      {
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_malware_count_time_shifted'
            },
            'queryParams': {
              'window': ''
            }
          }
        },
        'name': 'MetricsCard',
        'attributes': {
          'countStyle': {
            'color': '#F69275'
          },
          'style': {
            'marginRight': '3px',
            'width': '25%',
            'borderTop': '6px solid #F69275'
          }
        },
        'id': '2',
        'type': 'MetricsCard',
        'title': 'High Priority Malware'
      },
      {
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_event_count_time_shifted'
            },
            'queryParams': {
              'window': ''
            }
          }
        },
        'name': 'MetricsCard',
        'attributes': {
          'countStyle': {
            'color': '#2bd8d0'
          },
          'style': {
            'marginRight': '3px',
            'width': '25%',
            'borderTop': '6px solid #2bd8d0'
          }
        },
        'id': '3',
        'type': 'MetricsCard',
        'title': 'Events Processed',
        'kibana': {
          'pathParams': [
            'traffic-details'
          ],
          'queryParams': {
            'fromAndToBasedOnToday': ''
          }
        }
      },
      {
        'meta': {
          'showHeader': false,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_asset_count_time_shifted'
            },
            'queryParams': {
              'window': ''
            }
          }
        },
        'name': 'MetricsCard',
        'attributes': {
          'countStyle': {
            'color': '#2bd8d0'
          },
          'style': {
            'marginRight': '3px',
            'width': '25%',
            'borderTop': '6px solid #2bd8d0'
          }
        },
        'id': '4',
        'type': 'MetricsCard',
        'title': 'Assets Monitored',
        'kibana': {
          'pathParams': [
            'assets-all'
          ],
          'queryParams': {
            'fromAndToBasedOnToday': ''
          }
        }
      }
    ],
    [
      {
        'chartOptions': {},
        'chartData': {
          'fieldMapping': [
            {
              'reportId': 'taf_asset_count_time_shifted',
              'columns': [
                '0.0'
              ]
            },
            {
              'reportId': 'taf_total_usage',
              'columns': [
                'date'
              ]
            },
            {
              'reportId': 'taf_top_talkers_connections',
              'columns': [
                'connections'
              ]
            }
          ]
        },
        'meta': {
          'showHeader': true,
          'legend': [
            'Connections',
            'Used by',
            'Assets'
          ],
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted'
            },
            'queryParams': {
              'timeShift': '',
              'window': ''
            }
          },
          'title': 'Top Connections'
        },
        'attributes': {
          'style': {
            'marginRight': '33px',
            'width': '100%'
          },
          'id': 'PieChartConnections'
        },
        'id': 'pie-chart-connections',
        'type': 'PieChart'
      },
      {
        'chartOptions': {
          'showValues': '0',
          'showLabels': '1',
          'numberSuffix': '%'
        },
        'chartData': {
          'showTrendLines': true,
          'fieldMapping': [
            {
              'reportId': 'taf_asset_count_time_shifted',
              'columns': [
                '0.0'
              ]
            },
            {
              'reportId': 'taf_total_usage',
              'columns': [
                'date'
              ]
            },
            {
              'reportId': 'taf_top_talkers_connections',
              'columns': [
                'connections'
              ]
            }
          ],
          'reportId': 'taf_top_talkers_connections',
          'trendLines': [
            {
              'line': [
                {
                  'dashed': '1',
                  'color': '#f69275',
                  'valueOnRight': '1',
                  'dashLen': '4',
                  'dashGap': '2'
                }
              ]
            }
          ],
          'multipleReportIds': true
        },
        'meta': {
          'showHeader': true,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted'
            },
            'queryParams': {
              'timeShift': '',
              'window': ''
            }
          },
          'title': 'Top IPs Using The Most Connections'
        },
        'attributes': {
          'chartCaption': {
            'display': 'none'
          },
          'style': {
            'width': '100%'
          },
          'id': 'HorizontalBarChartConnections'
        },
        'id': 'horizontal-bar-chart-connections',
        'type': 'HorizontalBarChart',
        'kibana': {
          'pathParams': [
            'ip-connection-details'
          ],
          'queryParams': {
            'fromAndToBasedOnToday': '',
            'ip': ''
          }
        }
      }
    ],
    [
      {
        'chartOptions': {},
        'chartData': {
          'fieldMapping': [
            {
              'reportId': 'taf_asset_count_time_shifted',
              'columns': [
                '0.0'
              ]
            },
            {
              'reportId': 'taf_total_usage',
              'columns': [
                'bandwidth'
              ]
            },
            {
              'reportId': 'taf_top_talkers_bandwidth',
              'columns': [
                'bandwidth'
              ]
            }
          ]
        },
        'meta': {
          'showHeader': true,
          'legend': [
            'Bandwidth ',
            'Used by',
            'Assets'
          ],
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted'
            },
            'queryParams': {
              'timeShift': '',
              'window': ''
            }
          },
          'title': 'Top Bandwidth'
        },
        'attributes': {
          'style': {
            'marginRight': '33px',
            'width': '100%'
          },
          'id': 'PieChartBandwidth'
        },
        'id': 'pie-chart-bandwidth',
        'type': 'PieChart'
      },
      {
        'chartOptions': {
          'showValues': '0',
          'showLabels': '1',
          'numberSuffix': '%'
        },
        'chartData': {
          'showTrendLines': true,
          'fieldMapping': [
            {
              'reportId': 'taf_asset_count_time_shifted',
              'columns': [
                '0.0'
              ]
            },
            {
              'reportId': 'taf_total_usage',
              'columns': [
                'bandwidth'
              ]
            },
            {
              'reportId': 'taf_top_talkers_bandwidth',
              'columns': [
                'bandwidth'
              ]
            }
          ],
          'reportId': 'taf_top_talkers_bandwidth',
          'trendLines': [
            {
              'line': [
                {
                  'dashed': '1',
                  'color': '#f69275',
                  'valueOnRight': '1',
                  'dashLen': '4',
                  'dashGap': '2'
                }
              ]
            }
          ],
          'multipleReportIds': true
        },
        'meta': {
          'showHeader': true,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted'
            },
            'queryParams': {
              'timeShift': '',
              'window': ''
            }
          },
          'title': 'Top IPs Using The Highest Bandwidth'
        },
        'attributes': {
          'chartCaption': {
            'display': 'none'
          },
          'style': {
            'width': '100%'
          },
          'id': 'HorizontalBarChartBandwidth'
        },
        'id': 'horizontal-bar-chart-bandwidth',
        'type': 'HorizontalBarChart'
      }
    ]
  ]
};

export default asset;
