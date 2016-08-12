const traffic = {
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
          "paletteColors": "#C9EDDF, #60E2DC",
          "yAxisName": "INCOMING BANDWIDTH",
          "xAxisName": "TIME",
          "lineThickness": "2",
          "drawAnchors": "0"
        },
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_stats_histogram",
              "columns": [
                "date"
              ],
              "axis": "x"
            },
            {
              "seriesname": "Historical Incoming Bandwidth",
              "reportId": "taf_stats_histogram",
              "columns": [
                "bytes_in[1]"
              ],
              "renderas": "Area",
              "axis": "y"
            },
            {
              "seriesname": "Current Incoming Bandwidth",
              "reportId": "taf_stats_histogram",
              "columns": [
                "bytes_in[0]"
              ],
              "renderas": "Line",
              "axis": "y"
            }
          ],
          "combinedResult": true
        },
        "meta": {
          "subTitle": "(in bytes)",
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_stats_histogram,taf_connections_by_protocol"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Incoming Bandwidth"
        },
        "attributes": {
          "chartCaption": {
            "display": "none"
          },
          "style": {
            "marginRight": "33px",
            "width": "50%"
          },
          "id": "HistogramChart1"
        },
        "id": "histogram-chart1",
        "type": "MultiSeriesCombiChart"
      },
      {
        "chartOptions": {
          "paletteColors": "#C9EDDF, #60E2DC",
          "yAxisName": "OUTGOING BANDWIDTH",
          "xAxisName": "TIME",
          "lineThickness": "2",
          "drawAnchors": "0"
        },
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_stats_histogram",
              "columns": [
                "date"
              ],
              "axis": "x"
            },
            {
              "seriesname": "Historical Outgoing Bandwidth",
              "reportId": "taf_stats_histogram",
              "columns": [
                "bytes_out[1]"
              ],
              "renderas": "Area",
              "axis": "y"
            },
            {
              "seriesname": "Current Outgoing Bandwidth",
              "reportId": "taf_stats_histogram",
              "columns": [
                "bytes_out[0]"
              ],
              "renderas": "Line",
              "axis": "y"
            }
          ],
          "combinedResult": true
        },
        "meta": {
          "subTitle": "(in bytes)",
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_stats_histogram,taf_connections_by_protocol"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Outgoing Bandwidth"
        },
        "attributes": {
          "chartCaption": {
            "display": "none"
          },
          "style": {
            "width": "50%"
          },
          "id": "HistogramChart2"
        },
        "id": "histogram-chart2",
        "type": "MultiSeriesCombiChart"
      }
    ],
    [
      {
        "chartOptions": {
          "paletteColors": "#C9EDDF, #60E2DC",
          "yAxisName": "NO. OF CONNECTIONS",
          "xAxisName": "TIME",
          "lineThickness": "2",
          "drawAnchors": "0"
        },
        "chartData": {
          "fieldMapping": [
            {
              "reportId": "taf_stats_histogram",
              "columns": [
                "date"
              ],
              "axis": "x"
            },
            {
              "seriesname": "Historical Connections",
              "reportId": "taf_stats_histogram",
              "columns": [
                "conn[1]"
              ],
              "renderas": "Area",
              "axis": "y"
            },
            {
              "seriesname": "Current Connections",
              "reportId": "taf_stats_histogram",
              "columns": [
                "conn[0]"
              ],
              "renderas": "Line",
              "axis": "y"
            }
          ],
          "combinedResult": true
        },
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_stats_histogram,taf_connections_by_protocol"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "No. of Connections"
        },
        "attributes": {
          "chartCaption": {
            "display": "none"
          },
          "style": {
            "marginRight": "33px",
            "width": "100%"
          },
          "id": "HistogramChart3"
        },
        "id": "histogram-chart3",
        "type": "MultiSeriesCombiChart"
      },
      {
        "chartOptions": {
          "showValues": "0",
          "showLabels": "1",
          "singleLineCharacters": "27"
        },
        "chartData": {
          "showTrendLines": false,
          "fieldMapping": [
            {
              "reportId": "taf_connections_by_protocol",
              "columns": [
                "protocol.service",
                "date"
              ]
            }
          ],
          "multipleReportIds": false
        },
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_stats_histogram,taf_connections_by_protocol"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Top Connections By Protocol"
        },
        "attributes": {
          "chartCaption": {
            "display": "none"
          },
          "style": {
            "width": "100%"
          },
          "id": "TopConnectionsByProtocol"
        },
        "id": "top-connections-by-protocol",
        "type": "HorizontalBarChart"
      }
    ],
    [
      {
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_top_longest_connections"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Longest Connections"
        },
        "name": "Table",
        "tableOptions": {
          "filterable": [],
          "itemsPerPage": 5,
          "sortable": [
            "END DATE",
            "DURATION",
            "DETAILS",
            "SOURCE",
            "DESTINATION"
          ],
          "defaultSort": {
            "column": "DURATION",
            "direction": "asc"
          }
        },
        "attributes": {
          "style": {
            "width": "100%"
          },
          "id": "LongestConnections"
        },
        "tableData": {
          "fieldMapping": [
            {
              "reportId": "taf_top_longest_connections",
              "columns": [
                {
                  "data": [
                    {
                      "fieldName": "date",
                      "displayName": "date"
                    }
                  ],
                  "style": {
                    "width": "10%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "END DATE"
                },
                {
                  "data": [
                    {
                      "fieldName": "data.conn.duration",
                      "displayName": "duration"
                    }
                  ],
                  "style": {
                    "width": "15%"
                  },
                  "type": "durationWidget",
                  "columnNameToDisplay": "DURATION"
                },
                {
                  "data": [
                    {
                      "fieldName": "protocol.service",
                      "displayName": "title"
                    },
                    {
                      "fieldName": "data.conn.reqBytes",
                      "displayName": "Incoming bytes"
                    },
                    {
                      "fieldName": "data.conn.respBytes",
                      "displayName": "Outcoming bytes"
                    }
                  ],
                  "style": {
                    "width": "35%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "DETAILS"
                },
                {
                  "data": [
                    {
                      "fieldName": "source.ip",
                      "displayName": "IP"
                    },
                    {
                      "fieldName": "source.port",
                      "displayName": "port"
                    },
                    {
                      "fieldName": "source.country",
                      "displayName": "countryFlag"
                    },
                    {
                      "fieldName": "source.name",
                      "displayName": "Machine"
                    },
                    {
                      "fieldName": "source.owner",
                      "displayName": "Owner"
                    },
                    {
                      "fieldName": "source.asn",
                      "displayName": "ASN"
                    },
                    {
                      "fieldName": "source.assets",
                      "displayName": "Users"
                    }
                  ],
                  "style": {
                    "width": "20%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "SOURCE"
                },
                {
                  "data": [
                    {
                      "fieldName": "destination.ip",
                      "displayName": "IP"
                    },
                    {
                      "fieldName": "destination.port",
                      "displayName": "port"
                    },
                    {
                      "fieldName": "destination.country",
                      "displayName": "countryFlag"
                    },
                    {
                      "fieldName": "destination.name",
                      "displayName": "Machine"
                    },
                    {
                      "fieldName": "destination.owner",
                      "displayName": "Owner"
                    },
                    {
                      "fieldName": "destination.asn",
                      "displayName": "ASN"
                    },
                    {
                      "fieldName": "destination.assets",
                      "displayName": "Users"
                    }
                  ],
                  "style": {
                    "width": "20%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "DESTINATION"
                }
              ]
            }
          ]
        },
        "id": "longest-connections",
        "type": "Table",
        "kibana": {
          "pathParams": [
            "connection-details"
          ],
          "queryParams": {
            "correlationIds": "correlationIds[0]"
          }
        }
      }
    ]
  ]
};

export default traffic;
