const newSummaryPage = {
  "layout": [
    [
      {
        "meta": {
          "showHeader": false,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_alert_count_time_shifted"
            },
            "queryParams": {
              "window": ""
            }
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "countStyle": {
            "color": "#F69275"
          },
          "style": {
            "marginRight": "3px",
            "width": "25%",
            "borderTop": "6px solid #F69275"
          }
        },
        "id": "1",
        "type": "MetricsCard",
        "title": "High Priority Alerts",
        "kibana": {
          "pathParams": [
            "alerts-score"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": "",
            "scoreRange": ""
          }
        }
      },
      {
        "meta": {
          "showHeader": false,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_malware_count_time_shifted"
            },
            "queryParams": {
              "window": ""
            }
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "countStyle": {
            "color": "#F69275"
          },
          "style": {
            "marginRight": "3px",
            "width": "25%",
            "borderTop": "6px solid #F69275"
          }
        },
        "id": "2",
        "type": "MetricsCard",
        "title": "High Priority Malware"
      },
      {
        "meta": {
          "showHeader": false,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_event_count_time_shifted"
            },
            "queryParams": {
              "window": ""
            }
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "countStyle": {
            "color": "#2bd8d0"
          },
          "style": {
            "marginRight": "3px",
            "width": "25%",
            "borderTop": "6px solid #2bd8d0"
          }
        },
        "id": "3",
        "type": "MetricsCard",
        "title": "Events Processed",
        "kibana": {
          "pathParams": [
            "traffic-details"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": ""
          }
        }
      },
      {
        "meta": {
          "showHeader": false,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_asset_count_time_shifted"
            },
            "queryParams": {
              "window": ""
            }
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "countStyle": {
            "color": "#2bd8d0"
          },
          "style": {
            "marginRight": "3px",
            "width": "25%",
            "borderTop": "6px solid #2bd8d0"
          }
        },
        "id": "4",
        "type": "MetricsCard",
        "title": "Assets Monitored",
        "kibana": {
          "pathParams": [
            "assets-all"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": ""
          }
        }
      }
    ],
    [
      {
        "chartOptions": {
          "xAxisname": "ALERT TYPES",
          "pYAxisname": "ALERT COUNT"
        },
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_threat_trend",
              "columns": [
                "data.rank_alert.category"
              ],
              "axis": "x"
            },
            {
              "reportId": "taf_threat_trend",
              "columns": [
                "date"
              ],
              "axis": "y"
            }
          ]
        },
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_threat_trend"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Alert by type"
        },
        "attributes": {
          "chartWidth": "100%",
          "style": {
            "marginRight": "33px",
            "width": "50%"
          },
          "id": "AlertByType",
          "chartHeight": "350"
        },
        "id": "alert-by-type",
        "type": "ParetoChart",
        "kibana": {
          "pathParams": [
            "alerts-type"
          ],
          "queryParams": {
            "window": "",
            "type": ""
          }
        }
      },
      {
        "chartOptions": {
          "xAxisname": "ENTITIES",
          "pYAxisname": "ALERT COUNT"
        },
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_top_entity_with_alerts",
              "columns": [
                "destination.ip"
              ],
              "axis": "x"
            },
            {
              "reportId": "taf_top_entity_with_alerts",
              "columns": [
                "count"
              ],
              "axis": "y"
            }
          ]
        },
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_top_entity_with_alerts"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Top Attacked Entities"
        },
        "attributes": {
          "chartWidth": "100%",
          "style": {
            "width": "50%"
          },
          "id": "TopAttackedEntities",
          "chartHeight": "350"
        },
        "id": "top-attacked-entities ",
        "type": "ParetoChart",
        "kibana": {
          "pathParams": [
            "attacked-entity-details"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": "",
            "ip": ""
          }
        }
      }
    ],
    [
      {
        "chartOptions": {},
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_asset_count_time_shifted",
              "columns": [
                "0.0"
              ]
            },
            {
              "reportId": "taf_total_usage",
              "columns": [
                "date"
              ]
            },
            {
              "reportId": "taf_top_talkers_connections",
              "columns": [
                "connections"
              ]
            }
          ]
        },
        "meta": {
          "showHeader": true,
          "legend": [
            "Connections",
            "Used by",
            "Assets"
          ],
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted"
            },
            "queryParams": {
              "timeShift": "",
              "window": ""
            }
          },
          "title": "Top Connections"
        },
        "attributes": {
          "style": {
            "marginRight": "33px",
            "width": "100%"
          },
          "id": "PieChartConnections"
        },
        "id": "pie-chart-connections",
        "type": "PieChart"
      },
      {
        "chartOptions": {
          "showValues": "0",
          "showLabels": "1",
          "numberSuffix": "%"
        },
        "chartData": {
          "showTrendLines": true,
          "fieldMapping": [
            {
              "reportId": "taf_asset_count_time_shifted",
              "columns": [
                "0.0"
              ]
            },
            {
              "reportId": "taf_total_usage",
              "columns": [
                "date"
              ]
            },
            {
              "reportId": "taf_top_talkers_connections",
              "columns": [
                "connections"
              ]
            }
          ],
          "reportId": "taf_top_talkers_connections",
          "trendLines": [
            {
              "line": [
                {
                  "dashed": "1",
                  "color": "#f69275",
                  "valueOnRight": "1",
                  "dashLen": "4",
                  "dashGap": "2"
                }
              ]
            }
          ],
          "multipleReportIds": true
        },
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted"
            },
            "queryParams": {
              "timeShift": "",
              "window": ""
            }
          },
          "title": "Top IPs Using The Most Connections"
        },
        "attributes": {
          "chartCaption": {
            "display": "none"
          },
          "style": {
            "width": "100%"
          },
          "id": "HorizontalBarChartConnections"
        },
        "id": "horizontal-bar-chart-connections",
        "type": "HorizontalBarChart",
        "kibana": {
          "pathParams": [
            "ip-connection-details"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": "",
            "ip": ""
          }
        }
      }
    ],
    [
      {
        "chartOptions": {},
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_asset_count_time_shifted",
              "columns": [
                "0.0"
              ]
            },
            {
              "reportId": "taf_total_usage",
              "columns": [
                "bandwidth"
              ]
            },
            {
              "reportId": "taf_top_talkers_bandwidth",
              "columns": [
                "bandwidth"
              ]
            }
          ]
        },
        "meta": {
          "showHeader": true,
          "legend": [
            "Bandwidth ",
            "Used by",
            "Assets"
          ],
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted"
            },
            "queryParams": {
              "timeShift": "",
              "window": ""
            }
          },
          "title": "Top Bandwidth"
        },
        "attributes": {
          "style": {
            "marginRight": "33px",
            "width": "100%"
          },
          "id": "PieChartBandwidth"
        },
        "id": "pie-chart-bandwidth",
        "type": "PieChart"
      },
      {
        "chartOptions": {
          "showValues": "0",
          "showLabels": "1",
          "numberSuffix": "%"
        },
        "chartData": {
          "showTrendLines": true,
          "fieldMapping": [
            {
              "reportId": "taf_asset_count_time_shifted",
              "columns": [
                "0.0"
              ]
            },
            {
              "reportId": "taf_total_usage",
              "columns": [
                "bandwidth"
              ]
            },
            {
              "reportId": "taf_top_talkers_bandwidth",
              "columns": [
                "bandwidth"
              ]
            }
          ],
          "reportId": "taf_top_talkers_bandwidth",
          "trendLines": [
            {
              "line": [
                {
                  "dashed": "1",
                  "color": "#f69275",
                  "valueOnRight": "1",
                  "dashLen": "4",
                  "dashGap": "2"
                }
              ]
            }
          ],
          "multipleReportIds": true
        },
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted"
            },
            "queryParams": {
              "timeShift": "",
              "window": ""
            }
          },
          "title": "Top IPs Using The Highest Bandwidth"
        },
        "attributes": {
          "chartCaption": {
            "display": "none"
          },
          "style": {
            "width": "100%"
          },
          "id": "HorizontalBarChartBandwidth"
        },
        "id": "horizontal-bar-chart-bandwidth",
        "type": "HorizontalBarChart"
      }
    ],
    [
      {
        "chartOptions": {},
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_dest_bad_reputation_countries",
              "columns": [
                "destination.country",
                "pos_x",
                "pos_y",
                "connections"
              ],
              "connection": "malicious"
            },
            {
              "reportId": "taf_dest_countries",
              "columns": [
                "destination.country",
                "pos_x",
                "pos_y",
                "connections"
              ],
              "connection": "secure"
            }
          ]
        },
        "meta": {
          "subTitle": "NUMBER OF OUTGOING CONNECTIONS BY COUNTRY",
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_dest_countries,taf_dest_bad_reputation_countries"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Outgoing Traffic Heatmap"
        },
        "attributes": {
          "chartWidth": "100%",
          "chartCaption": {},
          "loaderStyle": {
            "marginTop": "-30px"
          },
          "style": {
            "marginRight": "33px",
            "width": "50%"
          },
          "legendStyle": {
            "width": "15%",
            "marginLeft": "-15%"
          },
          "id": "OutgoingTrafficWorldMap",
          "chartHeight": "350"
        },
        "id": "Outgoingworld-map",
        "type": "WorldMap",
        "kibana": {
          "pathParams": [
            "destination-country-details"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": "",
            "country": ""
          }
        }
      },
      {
        "chartOptions": {},
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_source_bad_reputation_countries",
              "columns": [
                "source.country",
                "pos_x",
                "pos_y",
                "connections"
              ],
              "connection": "malicious"
            },
            {
              "reportId": "taf_source_countries",
              "columns": [
                "source.country",
                "pos_x",
                "pos_y",
                "connections"
              ],
              "connection": "secure"
            }
          ]
        },
        "meta": {
          "subTitle": "NUMBER OF INCOMING CONNECTIONS BY COUNTRY",
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_source_countries,taf_source_bad_reputation_countries"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Incoming Traffic Heatmap"
        },
        "attributes": {
          "chartWidth": "100%",
          "chartCaption": {},
          "loaderStyle": {
            "marginTop": "-30px"
          },
          "style": {
            "width": "50%"
          },
          "legendStyle": {
            "width": "15%",
            "marginLeft": "-15%"
          },
          "id": "IncomingTrafficWorldMap",
          "chartHeight": "350"
        },
        "id": "world-map",
        "type": "WorldMap",
        "kibana": {
          "pathParams": [
            "source-country-details"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": "",
            "country": ""
          }
        }
      }
    ],
    [
      {
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_least_used_software"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Least Used Software Details"
        },
        "name": "Table",
        "tableOptions": {
          "itemsPerPage": 5
        },
        "attributes": {
          "style": {
            "marginRight": "33px",
            "width": "100%"
          },
          "id": "LeastUsedSoftwareDetails"
        },
        "tableData": {
          "fieldMapping": [
            {
              "reportId": "taf_least_used_software",
              "columns": [
                {
                  "data": [
                    {
                      "fieldName": "data.software.version"
                    }
                  ],
                  "style": {
                    "width": "80%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "SOFTWARE NAME"
                },
                {
                  "data": [
                    {
                      "fieldName": "count"
                    }
                  ],
                  "style": {
                    "width": "20%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "COUNT"
                }
              ]
            }
          ],
          "emptyValueMessage": "(Empty)"
        },
        "id": "least-used-software-details",
        "type": "Table",
        "kibana": {
          "pathParams": [
            "software-details"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": ""
          }
        }
      },
      {
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "headers": {
              "Accept": "application/json;report-format=nested"
            },
            "pathParams": {
              "reportId": "taf_top_successful_logins"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Successful Logins"
        },
        "name": "Table",
        "tableOptions": {
          "itemsPerPage": 5
        },
        "attributes": {
          "style": {
            "marginRight": "33px",
            "width": "100%"
          },
          "id": "SuccessfulLogins"
        },
        "tableData": {
          "fieldMapping": [
            {
              "reportId": "taf_top_successful_logins",
              "columns": [
                {
                  "data": [
                    {
                      "fieldName": "data.auth.username"
                    }
                  ],
                  "style": {
                    "width": "70%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "USER NAME"
                },
                {
                  "data": [
                    {
                      "fieldName": "count"
                    }
                  ],
                  "attributes": {
                    "chartWidth": "100%",
                    "chartType": "area2d",
                    "id": "SuccessfulLogins",
                    "chartHeight": "75"
                  },
                  "style": {
                    "width": "30%"
                  },
                  "type": "chart",
                  "columnNameToDisplay": "LOGINS"
                }
              ]
            }
          ],
          "nestedResult": true,
          "emptyValueMessage": "(Empty)"
        },
        "id": "successful-logins",
        "type": "Table",
        "kibana": {
          "pathParams": [
            "login-details"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": "",
            "username": "data.auth.username",
            "status": "success"
          }
        }
      },
      {
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "headers": {
              "Accept": "application/json;report-format=nested"
            },
            "pathParams": {
              "reportId": "taf_top_failed_logins"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Failed Logins"
        },
        "name": "Table",
        "tableOptions": {
          "itemsPerPage": 5
        },
        "attributes": {
          "style": {
            "width": "100%"
          },
          "id": "FailedLogins"
        },
        "tableData": {
          "fieldMapping": [
            {
              "reportId": "taf_top_failed_logins",
              "columns": [
                {
                  "data": [
                    {
                      "fieldName": "data.auth.username"
                    }
                  ],
                  "style": {
                    "width": "70%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "USER NAME"
                },
                {
                  "data": [
                    {
                      "fieldName": "count"
                    }
                  ],
                  "attributes": {
                    "chartWidth": "100%",
                    "chartType": "area2d",
                    "id": "FailedLogins",
                    "chartHeight": "75"
                  },
                  "style": {
                    "width": "30%"
                  },
                  "type": "chart",
                  "columnNameToDisplay": "LOGINS"
                }
              ]
            }
          ],
          "nestedResult": true,
          "emptyValueMessage": "(Empty)"
        },
        "id": "failed-logins",
        "type": "Table",
        "kibana": {
          "pathParams": [
            "login-details"
          ],
          "queryParams": {
            "fromAndToBasedOnToday": "",
            "username": "data.auth.username",
            "status": "fail"
          }
        }
      }
    ]
  ]
};

export default newSummaryPage;