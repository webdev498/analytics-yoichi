const alert = {
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
        'meta': {
          'showHeader': true,
          'showSearch': true,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_alert_highpriority'
            },
            'queryParams': {
              'count': 200,
              'window': ''
            }
          },
          'title': 'Recent Alerts'
        },
        'name': 'Table',
        'tableOptions': {
          'filterable': [
            'DATE',
            'DETAILS',
            'SOURCE',
            'DESTINATION'
          ],
          'itemsPerPage': 5,
          'sortable': [
            'RANK SCORE',
            'DATE',
            'DETAILS',
            'SOURCE',
            'DESTINATION'
          ],
          'defaultSort': {
            'column': 'RANK SCORE',
            'direction': 'desc'
          }
        },
        'attributes': {
          'style': {
            'width': '100%'
          },
          'id': 'RecentAlerts'
        },
        'tableData': {
          'fieldMapping': [
            {
              'reportId': 'taf_alert_highpriority',
              'columns': [
                {
                  'data': [
                    {
                      'fieldName': 'data.rank_alert.score'
                    }
                  ],
                  'style': {
                    'width': '12%'
                  },
                  'type': 'scoreWidget',
                  'columnNameToDisplay': 'RANK SCORE'
                },
                {
                  'data': [
                    {
                      'fieldName': 'date',
                      'displayName': 'date'
                    }
                  ],
                  'style': {
                    'width': '10%'
                  },
                  'type': 'text',
                  'columnNameToDisplay': 'DATE'
                },
                {
                  'data': [
                    {
                      'fieldName': 'data.rank_alert.description',
                      'displayName': 'description'
                    },
                    {
                      'fieldName': 'data.rank_alert.message',
                      'displayName': ''
                    }
                  ],
                  'style': {
                    'width': '38%'
                  },
                  'type': 'text',
                  'columnNameToDisplay': 'DETAILS'
                },
                {
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
                      'fieldName': 'source.name',
                      'displayName': 'Machine'
                    },
                    {
                      'fieldName': 'source.owner',
                      'displayName': 'Owner'
                    },
                    {
                      'fieldName': 'source.asn',
                      'displayName': 'ASN'
                    },
                    {
                      'fieldName': 'source.assets',
                      'displayName': 'Users'
                    }
                  ],
                  'style': {
                    'width': '20%'
                  },
                  'type': 'text',
                  'columnNameToDisplay': 'SOURCE'
                },
                {
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
                      'fieldName': 'destination.name',
                      'displayName': 'Name'
                    },
                    {
                      'fieldName': 'destination.owner',
                      'displayName': 'Owner'
                    },
                    {
                      'fieldName': 'destination.asn',
                      'displayName': 'ASN'
                    },
                    {
                      'fieldName': 'destination.assets',
                      'displayName': 'Users'
                    }
                  ],
                  'style': {
                    'width': '20%'
                  },
                  'type': 'text',
                  'columnNameToDisplay': 'DESTINATION'
                }
              ]
            }
          ]
        },
        'id': 'recent-alerts',
        'type': 'Table',
        'openAlertDetails': true
      }
    ],
    [
      {
        'chartOptions': {
          'xAxisname': 'ALERT TYPES',
          'pYAxisname': 'ALERT COUNT'
        },
        'chartData': {
          'fieldMapping': [
            {
              'reportId': 'taf_threat_trend',
              'columns': [
                'data.rank_alert.category'
              ],
              'axis': 'x'
            },
            {
              'reportId': 'taf_threat_trend',
              'columns': [
                'date'
              ],
              'axis': 'y'
            }
          ]
        },
        'meta': {
          'showHeader': true,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_threat_trend'
            },
            'queryParams': {
              'window': ''
            }
          },
          'title': 'Alert by type'
        },
        'attributes': {
          'chartWidth': '100%',
          'style': {
            'marginRight': '33px',
            'width': '50%'
          },
          'id': 'AlertByType',
          'chartHeight': '350'
        },
        'id': 'alert-by-type',
        'type': 'ParetoChart',
        'kibana': {
          'pathParams': [
            'alerts-type'
          ],
          'queryParams': {
            'window': '',
            'type': ''
          }
        }
      },
      {
        'chartOptions': {
          'linealpha': '0',
          'yAxisName': 'ALERT COUNT',
          'drawAnchors': '1',
          'legendPosition': 'right'
        },
        'chartData': {
          'fieldMapping': [
            {
              'reportId': 'taf_alert_priority_time',
              'columns': [
                'date'
              ],
              'axis': 'x'
            },
            {
              'reportId': 'taf_alert_priority_time',
              'columns': [
                'data.rank_alert.score',
                'count'
              ],
              'seriesOptions': {
                'drawanchors': '1',
                'lineThickness': '0',
                'anchorradius': '5',
                'renderas': 'Line',
                'anchorbgcolor': [
                  '#90d0a4',
                  '#fcc875',
                  '#f69275'
                ],
                'anchorBorderColor': [
                  '#90d0a4',
                  '#fcc875',
                  '#f69275'
                ],
                'anchorsides': [
                  '0',
                  '0',
                  '0'
                ]
              },
              'axis': 'y'
            }
          ],
          'combinedResult': false
        },
        'meta': {
          'showHeader': true,
          'api': {
            'path': '/api/analytics/reporting/execute/{reportId}',
            'pathParams': {
              'reportId': 'taf_alert_priority_time'
            },
            'queryParams': {
              'window': ''
            }
          },
          'title': 'Alert priority'
        },
        'attributes': {
          'chartWidth': '100%',
          'chartCaption': {
            'display': 'none'
          },
          'style': {
            'width': '50%'
          },
          'id': 'AlertPriorityChart',
          'chartHeight': '350'
        },
        'id': 'alert-priority-chart',
        'type': 'MultiSeriesCombiChart',
        'kibana': {
          'pathParams': [
            'alerts-score'
          ],
          'queryParams': {
            'scoreRange': '',
            'fromAndToBasedOnClickedDate': ''
          }
        }
      }
    ]
  ]
};

export default alert;
