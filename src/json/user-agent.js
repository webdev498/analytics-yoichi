const userAgent = {
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
          "yAxisName": "CONNECTION COUNT",
          "xAxisName": "USER AGENT LENGTH"
        },
        "chartData": {
          "fieldMapping": [
            {
              "seriesname": "User Agent Length",
              "reportId": "taf_user_agent_unique",
              "columns": [
                "data.http.__info.userAgentLen",
                "date"
              ]
            }
          ]
        },
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "pathParams": {
              "reportId": "taf_user_agent_unique"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "User Agent Details"
        },
        "attributes": {
          "chartWidth": "100%",
          "style": {
            "width": "100%"
          },
          "id": "UserAgentLength",
          "chartHeight": "300"
        },
        "id": "user-agent-length",
        "type": "ScatterChart"
      }
    ],
    [
      {
        "meta": {
          "showHeader": true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "headers": {
              "Accept": "application/json;report-format=nested"
            },
            "pathParams": {
              "reportId": "taf_top_longest_user_agents,taf_top_shortest_user_agents"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Longest User Agents"
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
          "id": "LongestUserAgents"
        },
        "tableData": {
          "fieldMapping": [
            {
              "reportId": "taf_top_longest_user_agents",
              "columns": [
                {
                  "data": [
                    {
                      "fieldName": "data.http.userAgent"
                    }
                  ],
                  "style": {
                    "width": "70%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "LONGEST USER AGENT"
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
                    "id": "connection",
                    "chartHeight": "75"
                  },
                  "style": {
                    "width": "30%"
                  },
                  "type": "chart",
                  "columnNameToDisplay": "CONNECTIONS"
                }
              ]
            }
          ],
          "nestedResult": true,
          "emptyValueMessage": "(Empty)"
        },
        "id": "longest-user-agents",
        "type": "Table"
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
              "reportId": "taf_top_longest_user_agents,taf_top_shortest_user_agents"
            },
            "queryParams": {
              "window": ""
            }
          },
          "title": "Shortest User Agents"
        },
        "name": "Table",
        "tableOptions": {
          "itemsPerPage": 5
        },
        "attributes": {
          "style": {
            "width": "100%"
          },
          "id": "ShortestUserAgents"
        },
        "tableData": {
          "fieldMapping": [
            {
              "reportId": "taf_top_shortest_user_agents",
              "columns": [
                {
                  "data": [
                    {
                      "fieldName": "data.http.userAgent"
                    }
                  ],
                  "style": {
                    "width": "70%"
                  },
                  "type": "text",
                  "columnNameToDisplay": "SHORTEST USER AGENT"
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
                    "id": "bandwidth",
                    "chartHeight": "75"
                  },
                  "style": {
                    "width": "30%"
                  },
                  "type": "chart",
                  "columnNameToDisplay": "CONNECTIONS"
                }
              ]
            }
          ],
          "nestedResult": true,
          "emptyValueMessage": "(Empty)"
        },
        "id": "shortest-user-agents",
        "type": "Table"
      }
    ]
  ]
};

export default userAgent;