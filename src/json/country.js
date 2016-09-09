const country = {
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
        "children": [
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
              "showHeader": false,
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
              "loaderStyle": {
                "marginTop": "-30px"
              },
              "style": {
                "marginRight": "33px",
                "width": "70%"
              },
              "legendStyle": {
                "width": "10%",
                "marginLeft": "-10%"
              },
              "id": "OutgoingTrafficWorldMap",
              "chartHeight": "450"
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
            "innerStyle": {
              "flexWrap": "wrap",
              "flexDirection": "column"
            },
            "children": [
              {
                "chartOptions": {},
                "chartData": {
                  "displayTopFive": true,
                  "showTrendLines": false,
                  "fieldMapping": [
                    {
                      "reportId": "taf_dest_bad_reputation_countries",
                      "columns": [
                        "country_name",
                        "connections"
                      ],
                      "connection": "malicious"
                    },
                    {
                      "reportId": "taf_dest_countries",
                      "columns": [
                        "country_name",
                        "connections"
                      ],
                      "connection": "secure"
                    }
                  ],
                  "multipleReportIds": false
                },
                "meta": {
                  "showHeader": false,
                  "title": "TOP 5 CONNECTIONS",
                  "parentWrap": false
                },
                "attributes": {
                  "chartCaption": {
                    "position": "absolute"
                  },
                  "chartWidth": "100%",
                  "chartBorder": {},
                  "style": {
                    "marginTop": "35px"
                  },
                  "id": "OutgoingTopCountries",
                  "chartHeight": "200"
                },
                "type": "HorizontalBarChart"
              },
              {
                "chartOptions": {},
                "chartData": {
                  "displayTopFive": true,
                  "showTrendLines": false,
                  "fieldMapping": [
                    {
                      "reportId": "taf_dest_bad_reputation_countries",
                      "columns": [
                        "country_name",
                        "bandwidth"
                      ],
                      "connection": "malicious"
                    },
                    {
                      "reportId": "taf_dest_countries",
                      "columns": [
                        "country_name",
                        "bandwidth"
                      ],
                      "connection": "secure"
                    }
                  ],
                  "multipleReportIds": false
                },
                "meta": {
                  "subTitle": "(in bytes)",
                  "showHeader": false,
                  "title": "TOP 5 BANDWIDTH",
                  "parentWrap": false
                },
                "attributes": {
                  "chartCaption": {
                    "position": "absolute"
                  },
                  "chartWidth": "100%",
                  "style": {
                    "marginTop": "35px"
                  },
                  "id": "OutgoingTopBandwidth",
                  "chartHeight": "200"
                },
                "type": "HorizontalBarChart"
              }
            ],
            "meta": {
              "showHeader": false,
              "api": {
                "path": "/api/analytics/reporting/execute/{reportId}",
                "pathParams": {
                  "reportId": "taf_dest_countries,taf_dest_bad_reputation_countries"
                },
                "queryParams": {
                  "window": ""
                }
              }
            },
            "name": "Compound",
            "attributes": {
              "style": {
                "width": "30%",
                "marginTop": "-30px"
              },
              "id": "OutgoingTrafficHeatMapLegends"
            },
            "id": "OutgoingTrafficHeatMapLegends",
            "type": "Compound"
          }
        ],
        "meta": {
          "showHeader": true,
          "title": "Outgoing Traffic HeatMap"
        },
        "name": "Compound",
        "attributes": {
          "style": {
            "width": "100%"
          },
          "id": "OutgoingTrafficHeatMap"
        },
        "id": "outgoing-traffic-heatMap",
        "type": "Compound"
      }
    ],
    [
      {
        "children": [
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
              "showHeader": false,
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
              "loaderStyle": {
                "marginTop": "-30px"
              },
              "style": {
                "marginRight": "33px",
                "width": "70%"
              },
              "legendStyle": {
                "width": "10%",
                "marginLeft": "-10%"
              },
              "id": "IncomingTrafficWorldMap",
              "chartHeight": "450"
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
          },
          {
            "innerStyle": {
              "flexWrap": "wrap",
              "flexDirection": "column"
            },
            "children": [
              {
                "chartOptions": {},
                "chartData": {
                  "displayTopFive": true,
                  "showTrendLines": false,
                  "fieldMapping": [
                    {
                      "reportId": "taf_source_bad_reputation_countries",
                      "columns": [
                        "country_name",
                        "connections"
                      ],
                      "connection": "malicious"
                    },
                    {
                      "reportId": "taf_source_countries",
                      "columns": [
                        "country_name",
                        "connections"
                      ],
                      "connection": "secure"
                    }
                  ],
                  "multipleReportIds": false
                },
                "meta": {
                  "showHeader": false,
                  "title": "TOP 5 CONNECTIONS",
                  "parentWrap": false
                },
                "attributes": {
                  "chartCaption": {
                    "position": "absolute"
                  },
                  "chartWidth": "100%",
                  "chartBorder": {},
                  "style": {
                    "marginTop": "35px"
                  },
                  "id": "IncomingTopCountries",
                  "chartHeight": "200"
                },
                "type": "HorizontalBarChart"
              },
              {
                "chartOptions": {},
                "chartData": {
                  "displayTopFive": true,
                  "showTrendLines": false,
                  "fieldMapping": [
                    {
                      "reportId": "taf_source_bad_reputation_countries",
                      "columns": [
                        "country_name",
                        "bandwidth"
                      ],
                      "connection": "malicious"
                    },
                    {
                      "reportId": "taf_source_countries",
                      "columns": [
                        "country_name",
                        "bandwidth"
                      ],
                      "connection": "secure"
                    }
                  ],
                  "multipleReportIds": false
                },
                "meta": {
                  "subTitle": "(in bytes)",
                  "showHeader": false,
                  "title": "TOP 5 BANDWIDTH",
                  "parentWrap": false
                },
                "attributes": {
                  "chartCaption": {
                    "position": "absolute"
                  },
                  "chartWidth": "100%",
                  "style": {
                    "marginTop": "35px"
                  },
                  "id": "IncomingTopBandwidth",
                  "chartHeight": "200"
                },
                "type": "HorizontalBarChart"
              }
            ],
            "meta": {
              "showHeader": false,
              "api": {
                "path": "/api/analytics/reporting/execute/{reportId}",
                "pathParams": {
                  "reportId": "taf_source_countries,taf_source_bad_reputation_countries"
                },
                "queryParams": {
                  "window": ""
                }
              }
            },
            "name": "Compound",
            "attributes": {
              "style": {
                "width": "30%",
                "marginTop": "-30px"
              },
              "id": "IncomingTrafficHeatMapLegends"
            },
            "id": "IncomingTrafficHeatMapLegends",
            "type": "Compound"
          }
        ],
        "meta": {
          "showHeader": true,
          "title": "Incoming Traffic HeatMap"
        },
        "name": "Compound",
        "attributes": {
          "style": {
            "width": "100%"
          },
          "id": "IncomingTrafficHeatMap"
        },
        "id": "incoming-traffic-heatMap",
        "type": "Compound"
      }
    ]
  ]
};

export default country;