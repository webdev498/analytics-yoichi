const staticLayout = {
  "layout": [
    [
      {
        "id": "1",
        "type": "MetricsCard",
        "meta": {
          "showHeader": false,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_alert_count_time_shifted"
            }
          },
          "query": {
            "window": "1h",
            "timeShift": "1h"
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "style": {
            "backgroundColor": "#d9534f",
            "width": "24%",
            "padding": "10px"
          },
          "title": "High Priority Alerts"
        },
        "children": [
          {
            "type": "FontIcon",
            "content": "add_alert"
          }
        ]
      },
      {
        "id": "2",
        "type": "MetricsCard",
        "meta": {
          "showHeader": false,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_malware_count_time_shifted"
            }
          },
          "query": {
            "window": "1h",
            "timeShift": "1h"
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "style": {
            "backgroundColor": "#f0ad4e",
            "width": "24%",
            "padding": "10px"
          },
          "title": "High Priority Malware"
        },
        "children": [
          {
            "type": "FontIcon",
            "content": "bug_report"
          }
        ]
      },
      {
        "id": "3",
        "type": "MetricsCard",
        "meta": {
          "showHeader": false,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_event_count_time_shifted"
            }
          },
          "query": {
            "window": "1h",
            "timeShift": "1h"
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "style": {
            "backgroundColor": "#337ab7",
            "width": "24%",
            "padding": "10px"
          },
          "title": "Events Processed"
        },
        "children": [
          {
            "type": "FontIcon",
            "content": "bug_report"
          }
        ]
      },
      {
        "id": "4",
        "type": "MetricsCard",
        "meta": {
          "showHeader": false,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_asset_count_time_shifted"
            }
          },
          "query": {
            "window": "1h",
            "timeShift": "1h"
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "style": {
            "backgroundColor": "#5cb85c",
            "width": "24%",
            "padding": "10px"
          },
          "title": "Assets Monitored"
        },
        "children": [
          {
            "type": "FontIcon",
            "content": "devices_other"
          }
        ]
      }
    ],
    [
      {
        "id": "56",
        "type": "Table",
        "name": "Table",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h",
              "count": 200
            },
            "pathParams": {
              "reportId": "taf_alert_highpriority"
            }
          },
          "title": "Recent Alerts"
        },
        "attributes": {
          "style": {
            "width": "100%"
          },
          "id": "RecentAlerts"
        },
        "tableData": {
          "fieldMapping": [
            {
              "reportId": "taf_alert_highpriority",
              "columns": [
                {
                  "type": "chart",
                  "columnNameToDisplay": "Rank Score",
                  "chartType": "angulargauge",
                  "chartId": "recentAlert",
                  "chartWidth": "70",
                  "chartHeight": "60",
                  "data": [
                    {
                      "fieldName": "data.rank_alert.score"
                    }
                  ],
                  "style": {
                    "width": "10%"
                  }
                },
                {
                  "type": "text",
                  "columnNameToDisplay": "Date",
                  "data": [
                    {
                      "fieldName": "date",
                      "displayName": "date"
                    }
                  ],
                  "style": {
                    "width": "15%"
                  }
                },
                {
                  "type": "text",
                  "columnNameToDisplay": "Details",
                  "data": [
                    {
                      "fieldName": "data.rank_alert.description",
                      "displayName": ""
                    },
                    {
                      "fieldName": "data.rank_alert.message",
                      "displayName": ""
                    }
                  ],
                  "style": {
                    "width": "30%"
                  }
                },
                {
                  "type": "text",
                  "columnNameToDisplay": "Source",
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
                      "fieldName": "source.additionalInfo.user",
                      "displayName": "User"
                    },
                    {
                      "fieldName": "source.additionalInfo.machine",
                      "displayName": "Machine"
                    }
                  ],
                  "style": {
                    "width": "20%"
                  }
                },
                {
                  "type": "text",
                  "columnNameToDisplay": "Destination",
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
                      "fieldName": "destination.additionalInfo.user",
                      "displayName": "User"
                    },
                    {
                      "fieldName": "destination.additionalInfo.machine",
                      "displayName": "Machine"
                    }
                  ],
                  "style": {
                    "width": "20%"
                  }
                }
              ]
            }
          ]
        },
        "tableOptions": {
          "sortable": [
            "Rank Score",
            "Date",
            "Details",
            "Source",
            "Destination"
          ],
          "defaultSort": {
            "column": "Rank Score",
            "direction": "desc"
          },
          "filterable": [
            "Date",
            "Details",
            "Source",
            "Destination"
          ],
          "filterBy": ""
        }
      }
    ],
    [
      {
        "id": "6",
        "type": "ParetoChart",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_threat_trend"
            }
          },
          "title": "Alert by type"
        },
        "attributes": {
          "style": {
            "width": "50%",
            "marginRight": "20px"
          },
          "id": "AlertByType",
          "chartWidth": "100%",
          "chartHeight": "400"
        },
        "chartOptions": {
          "pYAxisname": "Connections",
          "xAxisname": "Alert Types"
        },
        "chartData": {
          "fieldMapping": [
            {
              "axis": "x",
              "reportId": "taf_threat_trend",
              "columns": [
                "data.rank_alert.category"
              ]
            },
            {
              "axis": "y",
              "reportId": "taf_threat_trend",
              "columns": [
                "date"
              ]
            }
          ]
        }
      },
      {
        "id": "71",
        "type": "MultiSeriesCombiChart",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_alert_priority_time"
            }
          },
          "title": "Alert priority"
        },
        "attributes": {
          "style": {
            "width": "50%"
          },
          "id": "AlertPriorityChart",
          "chartBorder": {

          },
          "chartCaption": {
            "display": "none"
          }
        },
        "chartOptions": {
          "yAxisName": "Alert Count",
          "drawAnchors": "1",
          "legendPosition": "right",
          "linealpha": "0",
          "paletteColors": "#0505F5, #D93609, #ACF50F,#FCFC0D, #05E9F5"
        },
        "chartData": {
          "combinedResult": false,
          "fieldMapping": [
            {
              "axis": "x",
              "reportId": "taf_alert_priority_time",
              "columns": [
                "date"
              ]
            },
            {
              "axis": "y",
              "seriesOptions": {
                "renderas": "Line",
                "lineThickness": "0",
                "drawanchors": "1",
                "anchorradius": "10",
                "anchorsides": "0",
                "anchorBorderColor": [
                  "#ff0000",
                  "#0F4D1F",
                  "#0000ff"
                ],
                "anchorbgcolor": [
                  "#ff0000",
                  "#0F4D1F",
                  "#0000ff"
                ]
              },
              "reportId": "taf_alert_priority_time",
              "columns": [
                "data.rank_alert.score",
                "count"
              ]
            }
          ]
        }
      }
    ],
    [
      {
        "id": "79",
        "type": "Compound",
        "name": "Compound",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1d"
            },
            "pathParams": {
              "reportId": "taf_dest_countries,taf_dest_bad_reputation_countries,taf_connections_by_protocol"
            }
          },
          "title": "Outgoing Traffic HeatMap"
        },
        "attributes": {
          "style": {
            "width": "50%",
            "marginRight": "20px"
          },
          "id": "OutgoingTrafficHeatMap"
        },
        "children": [
          {
            "type": "WorldMap",
            "parent": "compound",
            "meta": {
              "showHeader": false,
              "title": "Outgoing Traffic Heatmap",
              "subTitle": "Number of Outgoing Connections By Country"
            },
            "attributes": {
              "style": {
                "width": "100%",
                "marginRight": "20px"
              },
              "id": "OutgoingTrafficWorldMap"
            },
            "chartOptions": {

            },
            "chartData": [
              {
                "reportId": "taf_dest_countries",
                "columns": [

                ],
                "shapeid": "circle",
                "alpha": "60"
              },
              {
                "reportId": "taf_dest_bad_reputation_countries",
                "columns": [

                ],
                "shapeid": "maliciousIcon",
                "alpha": "100"
              }
            ]
          },
          {
            "type": "HorizontalBarChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top 5 Connections"
            },
            "attributes": {
              "style": {
                "width": "48%",
                "marginRight": "20px"
              },
              "id": "OutgoingTopCountries",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              },
              "chartWidth": "100%",
              "chartHeight": "200"
            },
            "chartOptions": {

            },
            "chartData": {
              "multipleReportIds": false,
              "displayTopFive": true,
              "showTrendLines": false,
              "fieldMapping": [
                {
                  "reportId": "taf_dest_countries",
                  "columns": [
                    "country_name",
                    "connections"
                  ]
                }
              ]
            }
          },
          {
            "type": "HorizontalBarChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top 5 Bandwidth"
            },
            "attributes": {
              "style": {
                "width": "48%",
                "marginRight": "20px"
              },
              "id": "OutgoingTopBandwidth",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              },
              "chartWidth": "100%",
              "chartHeight": "200"
            },
            "chartOptions": {

            },
            "chartData": {
              "multipleReportIds": false,
              "displayTopFive": true,
              "showTrendLines": false,
              "fieldMapping": [
                {
                  "reportId": "taf_dest_countries",
                  "columns": [
                    "country_name",
                    "bandwidth"
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "80",
        "type": "Compound",
        "name": "Compound",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1d"
            },
            "pathParams": {
              "reportId": "taf_source_countries,taf_source_bad_reputation_countries"
            }
          },
          "title": "Incoming Traffic HeatMap"
        },
        "attributes": {
          "style": {
            "width": "50%",
            "marginRight": "20px"
          },
          "id": "IncomingTrafficHeatMap"
        },
        "children": [
          {
            "type": "WorldMap",
            "parent": "compound",
            "meta": {
              "showHeader": false,
              "title": "Incoming Traffic Heatmap",
              "subTitle": "Number of Incoming Connections By Country"
            },
            "attributes": {
              "style": {
                "width": "100%",
                "marginRight": "20px"
              },
              "id": "IncomingTrafficWorldMap"
            },
            "chartOptions": {

            },
            "chartData": [
              {
                "reportId": "taf_source_countries",
                "columns": [

                ],
                "shapeid": "circle",
                "alpha": "60"
              },
              {
                "reportId": "taf_source_bad_reputation_countries",
                "columns": [

                ],
                "shapeid": "maliciousIcon",
                "alpha": "100"
              }
            ]
          },
          {
            "type": "HorizontalBarChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top 5 Connections"
            },
            "attributes": {
              "style": {
                "width": "48%",
                "marginRight": "20px"
              },
              "id": "IncomingTopCountries",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              },
              "chartWidth": "100%",
              "chartHeight": "200"
            },
            "chartOptions": {

            },
            "chartData": {
              "multipleReportIds": false,
              "displayTopFive": true,
              "showTrendLines": false,
              "fieldMapping": [
                {
                  "reportId": "taf_source_countries",
                  "columns": [
                    "country_name",
                    "connections"
                  ]
                }
              ]
            }
          },
          {
            "type": "HorizontalBarChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top 5 Bandwidth"
            },
            "attributes": {
              "style": {
                "width": "48%",
                "marginRight": "20px"
              },
              "id": "IncomingTopBandwidth",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              },
              "chartWidth": "100%",
              "chartHeight": "200"
            },
            "chartOptions": {

            },
            "chartData": {
              "multipleReportIds": false,
              "displayTopFive": true,
              "showTrendLines": false,
              "fieldMapping": [
                {
                  "reportId": "taf_source_countries",
                  "columns": [
                    "country_name",
                    "bandwidth"
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    [
      {
        "id": "21",
        "type": "Compound",
        "name": "Compound",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1d"
            },
            "pathParams": {
              "reportId": "taf_stats_histogram,taf_connections_by_protocol"
            }
          },
          "title": "Traffic Details"
        },
        "attributes": {
          "style": {
            "width": "100%",
            "marginRight": "20px"
          },
          "id": "TrafficDetails"
        },
        "children": [
          {
            "type": "MultiSeriesCombiChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Incoming Bandwidth"
            },
            "attributes": {
              "style": {
                "width": "48%"
              },
              "id": "HistogramChart1",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              }
            },
            "chartOptions": {
              "xAxisName": "Time",
              "yAxisName": "Incoming Bandwidth",
              "lineThickness": "5",
              "paletteColors": "#d3d3d3, #D93609, #0505F5, #ACF50F,#FCFC0D, #05E9F5",
              "drawAnchors": "0",
              "usePlotGradientColor": "1",
              "plotGradientColor": "#887788"
            },
            "chartData": {
              "combinedResult": true,
              "fieldMapping": [
                {
                  "axis": "x",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "date"
                  ]
                },
                {
                  "axis": "y",
                  "seriesname": "Current Incoming Bandwidth",
                  "renderas": "Line",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "bytes_in"
                  ]
                },
                {
                  "axis": "y",
                  "seriesname": "Historical Incoming Bandwidth",
                  "renderas": "Area",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "bytes_in"
                  ]
                }
              ]
            }
          },
          {
            "type": "MultiSeriesCombiChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Outgoing Bandwidth"
            },
            "attributes": {
              "style": {
                "width": "48%"
              },
              "id": "HistogramChart2",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              }
            },
            "chartOptions": {
              "xAxisName": "Time",
              "yAxisName": "Outgoing Bandwidth",
              "lineThickness": "5",
              "paletteColors": "#d3d3d3, #D93609, #0505F5, #ACF50F,#FCFC0D, #05E9F5",
              "drawAnchors": "0",
              "usePlotGradientColor": "1",
              "plotGradientColor": "#887788"
            },
            "chartData": {
              "combinedResult": true,
              "fieldMapping": [
                {
                  "axis": "x",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "date"
                  ]
                },
                {
                  "axis": "y",
                  "seriesname": "Current Outgoing Bandwidth",
                  "renderas": "Line",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "bytes_out"
                  ]
                },
                {
                  "axis": "y",
                  "seriesname": "Historical Outgoing Bandwidth",
                  "renderas": "Area",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "bytes_out"
                  ]
                }
              ]
            }
          },
          {
            "type": "MultiSeriesCombiChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "No. of Connections"
            },
            "attributes": {
              "style": {
                "width": "48%"
              },
              "id": "HistogramChart3",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              }
            },
            "chartOptions": {
              "xAxisName": "Time",
              "yAxisName": "No. of Connections",
              "lineThickness": "5",
              "paletteColors": "#d3d3d3, #D93609, #0505F5, #ACF50F,#FCFC0D, #05E9F5",
              "drawAnchors": "0",
              "usePlotGradientColor": "1",
              "plotGradientColor": "#887788"
            },
            "chartData": {
              "combinedResult": true,
              "fieldMapping": [
                {
                  "axis": "x",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "date"
                  ]
                },
                {
                  "axis": "y",
                  "seriesname": "Current Connections",
                  "renderas": "Line",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "conn"
                  ]
                },
                {
                  "axis": "y",
                  "seriesname": "Historical Connections",
                  "renderas": "Area",
                  "reportId": "taf_stats_histogram",
                  "columns": [
                    "conn"
                  ]
                }
              ]
            }
          },
          {
            "type": "HorizontalBarChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top Connections By Protocol"
            },
            "attributes": {
              "style": {
                "width": "48%",
                "marginRight": "20px"
              },
              "id": "TopConnectionsByProtocol",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              }
            },
            "chartOptions": {

            },
            "chartData": {
              "multipleReportIds": false,
              "showTrendLines": false,
              "fieldMapping": [
                {
                  "reportId": "taf_connections_by_protocol",
                  "columns": [
                    "protocol.service",
                    "date"
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    [
      {
        "id": "22",
        "type": "Table",
        "name": "Table",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_top_longest_connections"
            }
          },
          "title": "Longest Connections"
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
                  "type": "text",
                  "columnNameToDisplay": "End Date",
                  "data": [
                    {
                      "fieldName": "date",
                      "displayName": "date"
                    }
                  ],
                  "style": {
                    "width": "15%"
                  }
                },
                {
                  "type": "durationWidget",
                  "columnNameToDisplay": "Duration",
                  "data": [
                    {
                      "fieldName": "data.conn.duration",
                      "displayName": "duration"
                    }
                  ],
                  "style": {
                    "width": "15%"
                  }
                },
                {
                  "type": "text",
                  "columnNameToDisplay": "Details",
                  "data": [
                    {
                      "fieldName": "protocol.service",
                      "displayName": ""
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
                    "width": "30%"
                  }
                },
                {
                  "type": "text",
                  "columnNameToDisplay": "Source",
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
                      "fieldName": "source.additionalInfo.user",
                      "displayName": "User"
                    },
                    {
                      "fieldName": "source.additionalInfo.machine",
                      "displayName": "Machine"
                    },
                    {
                      "fieldName": "source.owner",
                      "displayName": "Owner"
                    },
                    {
                      "fieldName": "source.asn",
                      "displayName": "ASN"
                    }
                  ],
                  "style": {
                    "width": "20%"
                  }
                },
                {
                  "type": "text",
                  "columnNameToDisplay": "Destination",
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
                      "fieldName": "destination.additionalInfo.user",
                      "displayName": "User"
                    },
                    {
                      "fieldName": "destination.additionalInfo.machine",
                      "displayName": "Machine"
                    },
                    {
                      "fieldName": "destination.owner",
                      "displayName": "Owner"
                    },
                    {
                      "fieldName": "destination.asn",
                      "displayName": "ASN"
                    }
                  ],
                  "style": {
                    "width": "20%"
                  }
                }
              ]
            }
          ]
        },
        "tableOptions": {
          "sortable": [
            "End Date",
            "Duration",
            "Details",
            "Source",
            "Destination"
          ],
          "defaultSort": {
            "column": "Duration",
            "direction": "asc"
          },
          "filterable": [],
          "filterBy": ""
        }
      }
    ],
    [
      {
        "id": "85",
        "type": "Compound",
        "name": "Compound",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1d",
              "timeShift": "1d"
            },
            "pathParams": {
              "reportId": "taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted"
            }
          },
          "title": "Asset Details"
        },
        "attributes": {
          "style": {
            "width": "100%",
            "marginRight": "20px"
          },
          "id": "AssetDetails"
        },
        "children": [
          {
            "type": "DoughnutChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top Connections",
              "legend": [
                "of connections are used by ",
                "of assets"
              ]
            },
            "attributes": {
              "style": {
                "width": "50%",
                "marginRight": "20px"
              },
              "id": "DoughnutChartConnections",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              }
            },
            "chartOptions": {
              "highlightedColor1": "#5E2B78",
              "highlightedColor2": "#8ABB24",
              "nonHighlightedColor": "#CCCCCC"
            },
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
            }
          },
          {
            "type": "DoughnutChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top Bandwidth",
              "legend": [
                "of bandwidth are used by ",
                "of assets"
              ]
            },
            "attributes": {
              "style": {
                "width": "50%",
                "marginRight": "20px"
              },
              "id": "DoughnutChartBandwidth",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              }
            },
            "chartOptions": {
              "highlightedColor1": "#5E2B78",
              "highlightedColor2": "#8ABB24",
              "nonHighlightedColor": "#CCCCCC"
            },
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
            }
          },
          {
            "type": "HorizontalBarChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top IPs using the highest number of connections"
            },
            "attributes": {
              "style": {
                "width": "48%",
                "marginRight": "20px"
              },
              "id": "HorizontalBarChartConnections",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              }
            },
            "chartOptions": {
              "numberSuffix": "%"
            },
            "chartData": {
              "multipleReportIds": true,
              "showTrendLines": true,
              "trendLines": [
                {
                  "line": [
                    {
                      "color": "#1aaf5d",
                      "valueOnRight": "1",
                      "dashed": "1",
                      "dashLen": "4",
                      "dashGap": "2"
                    }
                  ]
                }
              ],
              "reportId": "taf_top_talkers_connections",
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
            }
          },
          {
            "type": "HorizontalBarChart",
            "parent": "Compound",
            "meta": {
              "showHeader": false,
              "title": "Top IPs using the highest bandwidth"
            },
            "attributes": {
              "style": {
                "width": "48%",
                "marginRight": "20px"
              },
              "id": "HorizontalBarChartBandwidth",
              "chartBorder": {
                "border": "3px solid #BBBABA",
                "float": "left",
                "width": "48%",
                "margin": "1%"
              },
              "chartCaption": {
                "width": "100%",
                "color": "#555555",
                "fontFamily": "Verdana,sans",
                "fontSize": "14px",
                "fontWeight": "bold",
                "textAlign": "center",
                "paddingTop": "10px"
              }
            },
            "chartOptions": {
              "numberSuffix": "%"
            },
            "chartData": {
              "multipleReportIds": true,
              "showTrendLines": true,
              "trendLines": [
                {
                  "line": [
                    {
                      "color": "#1aaf5d",
                      "valueOnRight": "1",
                      "dashed": "1",
                      "dashLen": "4",
                      "dashGap": "2"
                    }
                  ]
                }
              ],
              "reportId": "taf_top_talkers_bandwidth",
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
            }
          }
        ]
      }
    ],
    [
      {
        "type": "ScatterChart",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1d"
            },
            "pathParams": {
              "reportId": "taf_user_agent_unique"
            }
          },
          "title": "User Agent Details"
        },
        "attributes": {
          "style": {
            "width": "100%"
          },
          "id": "UserAgentLength",
          "chartWidth": "100%",
          "chartHeight": "200"
        },
        "chartOptions": {
          "xAxisName": "User Agent Length",
          "yAxisName": "Connection Count"
        },
        "chartData": {
          "fieldMapping": [
            {
              "seriesname": "User Agent Length",
              "drawline": "0",
              "anchorsides": "3",
              "anchorradius": "10",
              "color": "#0505F5",
              "anchorbgcolor": "#9F9FF5",
              "anchorbordercolor": "#0505F5",
              "reportId": "taf_user_agent_unique",
              "columns": [
                "data.http.__info.userAgentLen",
                "date"
              ]
            }
          ]
        }
      }
    ],
    [
      {
        "id": "78",
        "type": "Compound",
        "name": "Compound",
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "headers": {
              "Accept": "application/json;report-format=nested"
            },
            "queryParams": {
              "window": "1d"
            },
            "pathParams": {
              "reportId": "taf_top_longest_user_agents,taf_top_shortest_user_agents"
            }
          },
          "title": "Longest and Shortest User Agents"
        },
        "attributes": {
          "style": {
            "width": "100%",
            "marginRight": "20px"
          },
          "id": "UserAgentDetails"
        },
        "children": [
          {
            "type": "Table",
            "name": "Table",
            "meta": {
              "showHeader": false,
              "title": "Longest User Agents"
            },
            "attributes": {
              "style": {
                "width": "50%"
              },
              "id": "LongestUserAgents"
            },
            "tableData": {
              "nestedResult": true,
              "emptyValueMessage": "{empty user agent}",
              "fieldMapping": [
                {
                  "reportId": "taf_top_longest_user_agents",
                  "columns": [
                    {
                      "type": "text",
                      "columnNameToDisplay": "User Agent",
                      "data": [
                        {
                          "fieldName": "data.http.userAgent"
                        }
                      ],
                      "style": {
                        "width": "70%"
                      }
                    },
                    {
                      "type": "chart",
                      "columnNameToDisplay": "Connections",
                      "chartType": "area2d",
                      "chartId": "connection",
                      "chartWidth": "100%",
                      "chartHeight": "75",
                      "data": [
                        {
                          "fieldName": "count"
                        }
                      ],
                      "style": {
                        "width": "30%"
                      }
                    }
                  ]
                }
              ]
            },
            "tableOptions": {
              "sortable": [],
              "defaultSort": {},
              "filterable": [],
              "filterBy": ""
            }
          },
          {
            "type": "Table",
            "name": "Table",
            "meta": {
              "showHeader": false,
              "title": "Shortest User Agents"
            },
            "attributes": {
              "style": {
                "width": "50%",
                "paddingLeft": "2%"
              },
              "id": "ShortestUserAgents"
            },
            "tableData": {
              "nestedResult": true,
              "emptyValueMessage": "{empty user agent}",
              "fieldMapping": [
                {
                  "reportId": "taf_top_shortest_user_agents",
                  "columns": [
                    {
                      "type": "text",
                      "columnNameToDisplay": "User Agent",
                      "data": [
                        {
                          "fieldName": "data.http.userAgent"
                        }
                      ],
                      "style": {
                        "width": "70%"
                      }
                    },
                    {
                      "type": "chart",
                      "columnNameToDisplay": "Connections",
                      "chartType": "area2d",
                      "chartId": "bandwidth",
                      "chartWidth": "100%",
                      "chartHeight": "75",
                      "data": [
                        {
                          "fieldName": "count"
                        }
                      ],
                      "style": {
                        "width": "30%"
                      }
                    }
                  ]
                }
              ]
            },
            "tableOptions": {
              "sortable": [],
              "defaultSort": {},
              "filterable": [],
              "filterBy": ""
            }
          }
        ]
      }
    ]
  ]
};

export default staticLayout;
