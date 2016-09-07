const alert = {
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
        "meta": {
          "showHeader": true,
          "showRefresh": false,
          "api": {
            "path": "/api/alert/{alertId}",
            "queryParams": {
              "window": ""
            }
          },
          "title": "Alert Details",
          "fetchDataFor": {
            "id": "malware-traffic-details",
            "api": {
              "path": "/api/alert/traffic",
              "pathParams": {},
              "queryParams": {
                "count": 200,
                "from": 0,
                "window": "1w"
              }
            }
          }
        },
        "name": "AlertDetails",
        "attributes": {
          "style": {
            "width": "100%"
          }
        },
        "id": "alert-details",
        "type": "AlertDetails"
      }
    ],
    [
      {
        "meta": {
          "showHeader": true,
          "showRefresh": false,
          "api": null,
          "title": "Malware Details"
        },
        "attributes": {
          "style": {
            "display": "none",
            "width": "100%"
          },
          "id": "malware-details"
        },
        "id": "malware-traffic-details",
        "type": "MalwareDetails"
      }
    ],
    [
      {
        "meta": {
          "showHeader": true,
          "showRefresh": false,
          "api": null,
          "title": "Traffic Details"
        },
        "name": "Table",
        "attributes": {
          "style": {
            "width": "100%"
          },
          "id": "malware-traffic-details"
        },
        "id": "malware-traffic-details",
        "type": "TrafficTable"
      }
    ]
  ]
};

export default alert;
