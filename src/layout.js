const layout = {
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
              "window":"1h"
            },
            "pathParams": {
              "reportId": "taf_alert_count_time_shifted",
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
        "children": [{
          "type": "FontIcon",
          "content": "add_alert"
        }]
      },
      {
        "id": "2",
        "type": "MetricsCard",
        "meta": {
          "showHeader": false,
          // "api": "/api/analytics/reporting/execute/taf_malware_count_time_shifted",
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window":"1h"
            },
            "pathParams": {
              "reportId": "taf_malware_count_time_shifted",
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
        "children": [{
          "type": "FontIcon",
          "content": "bug_report"
        }]
      },
      {
        "id": "3",
        "type": "MetricsCard",
        "meta": {
          "showHeader": false,
          // "api": "/api/analytics/reporting/execute/taf_event_count_time_shifted",
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window":"1h"
            },
            "pathParams": {
              "reportId": "taf_event_count_time_shifted",
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
        "children": [{
          "type": "FontIcon",
          "content": "bug_report"
        }]
      },
      {
        "id": "4",
        "type": "MetricsCard",
        "meta": {
          "showHeader": false,
          // "api": "/api/analytics/reporting/execute/taf_asset_count_time_shifted",
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window":"1h"
            },
            "pathParams": {
              "reportId": "taf_asset_count_time_shifted",
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
        "children": [{
          "type": "FontIcon",
          "content": "devices_other"
        }]
      }
    ],
    [
      {
        id: '56',
        type: 'Table',
        name: 'Table',
        meta: {
          showHeader: true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h",
              "count":200
            },
            "pathParams": {
              "reportId": "taf_alert_highpriority",
            }
          },
          title: 'Recent Alerts',
        },
        attributes: {
          style: {width: '100%'},
          id: 'RecentAlerts'
        },
        tableData: [
          {
            reportId: 'taf_alert_highpriority',
            columns: [
              {
                type: 'chart',
                columnNameToDisplay: 'Rank Score',
                chartType: 'angulargauge',
                chartId: 'recentAlert',
                chartWidth: '70',
                chartHeight: '60',
                data: [
                  {
                    fieldName: "data.rank_alert.score"
                  }
                ],
                style: {width: '10%'}
              },
              {
                type: 'text',
                columnNameToDisplay: 'Date',
                data: [
                  {
                    fieldName: "date",
                    displayName: 'date'
                  }
                ],
                style: {width: '15%'}
              },
              {
                type: 'text',
                columnNameToDisplay: 'Details',
                data: [
                  {
                    fieldName: "data.rank_alert.description",
                    displayName: ''
                  },
                  {
                    fieldName: "data.rank_alert.message",
                    displayName: ''
                  }
                ],
                style: {width: '30%'}
              },
              {
                type: 'text',
                columnNameToDisplay: 'Source',
                data: [
                  {
                    fieldName: "source.ip",
                    displayName: 'IP'
                  },
                  {
                    fieldName: "source.port",
                    displayName: 'port'
                  },
                  {
                    fieldName: "source.country",
                    displayName: 'countryFlag'
                  },
                  {
                    fieldName: "source.additionalInfo.user",
                    displayName: 'User'
                  },
                  {
                    fieldName: "source.additionalInfo.machine",
                    displayName: 'Machine'
                  }
                ],
                style: {width: '20%'}
              },
              {
                type: 'text',
                columnNameToDisplay: 'Destination',
                data: [
                  {
                    fieldName: "destination.ip",
                    displayName: 'IP'
                  },
                  {
                    fieldName: "destination.port",
                    displayName: 'port'
                  },
                  {
                    fieldName: "destination.country",
                    displayName: 'countryFlag'
                  },
                  {
                    fieldName: "destination.additionalInfo.user",
                    displayName: 'User'
                  },
                  {
                    fieldName: "destination.additionalInfo.machine",
                    displayName: 'Machine'
                  }
                ],
                style: {width: '20%'}
              }
            ]
          }
        ],
        tableOptions: {
          sortable:['Rank Score','Date','Details', 'Source', 'Destination'],
          defaultSort:{column: 'Rank Score', direction: 'desc'},
          filterable:['Date', 'Details', 'Source', 'Destination'],
          filterBy:"connection"
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
              "reportId": "taf_threat_trend",
            }
          },
          "title": "Alert by type",
        },
        "attributes": {
          "style": {"width": "50%", "marginRight": "20px"},
          "id": "AlertByType",
          "chartWidth": "100%",
          "chartHeight": "400"
        },
        chartOptions: {
          pYAxisname: "Connections",
          xAxisname: "Alert Types"
        },
        chartData: {
          fieldMapping: [
            {
              axis: 'x',
              reportId: 'taf_threat_trend',
              columns: [
                'data.rank_alert.category'
              ]
            },
            {
              axis: 'y',
              reportId: 'taf_threat_trend',
              columns: [
                'date'
              ]
            }
          ]
        }
      },
      {
        "id": "71",
        type: 'MultiSeriesCombiChart',
        meta: {
          showHeader: true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_alert_priority_time",
            }
          },
          title: 'Alert priority'
        },
        attributes: {
          style: {width: '50%'},
          id: 'AlertPriorityChart',
          chartBorder: {},
          chartCaption: {display:'none'}
        },
        chartOptions: {
          "yAxisName": "Alert Count",
          "drawAnchors": "1",
          "legendPosition": "right",
          "linealpha":"0",
          "paletteColors": "#0505F5, #D93609, #ACF50F,#FCFC0D, #05E9F5"
        },
        chartData: {
          combinedResult: false,
          fieldMapping: [
            {
              axis: 'x',
              reportId: 'taf_alert_priority_time',
              columns: [
                'date'
              ]
            },
            {
              axis: 'y',
              seriesOptions: {
                renderas: "Line",
                lineThickness: "0",
                drawanchors: "1",
                anchorradius: "10",
                anchorsides: '0',
                anchorBorderColor: ['#ff0000','#0F4D1F','#0000ff'],
                anchorbgcolor: ['#ff0000','#0F4D1F','#0000ff']
              },
              reportId: 'taf_alert_priority_time',
              columns: [
                'data.rank_alert.score',
                'count'
              ]
            }
          ]
        }
      }
    ],
    [
      {
        id: "12",
        type: 'WorldMap',
        meta: {
          showHeader: true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_dest_countries,taf_dest_bad_reputation_countries",
            }
          },
          title: 'Outgoing Traffic Heatmap',
          subTitle: 'Number of Outgoing Connections By Country'
        },
        attributes: {
          style: {width: '50%', marginRight: '20px'},
          id: ['OutgoingTrafficHeatmap','OutgoingTopCountries','OutgoingTopBandwidthCountries']
        },
        chartOptions: {
        },
        chartData: [
          {
            reportId: 'taf_dest_countries',
            columns: [
            ],
            shapeid: 'circle',
            alpha: '60'
          },
          {
            reportId: 'taf_dest_bad_reputation_countries',
            columns: [
            ],
            shapeid: 'maliciousIcon',
            alpha: '100'
          }
        ]
      },
      {
        id: "13",
        type: 'WorldMap',
        meta: {
          showHeader: true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_source_countries,taf_source_bad_reputation_countries",
            }
          },
          title: 'Incoming Traffic Heatmap',
          subTitle: 'Number of Incoming Connections By Country'
        },
        attributes: {
          style: {width: '50%', marginRight: '20px'},
          id: ['IncomingTrafficHeatmap','IncomingTopCountries','IncomingTopBandwidthCountries']
        },
        chartOptions: {
        },
        chartData: [
          {
            reportId: 'taf_source_countries',
            columns: [
            ],
            shapeid: 'circle',
            alpha: '60'
          },
          {
            reportId: 'taf_source_bad_reputation_countries',
            columns: [
            ],
            shapeid: 'maliciousIcon',
            alpha: '100'
          }
        ]
      }
    ],
    [
      {
        id: '21',
        type: 'Compound',
        name: 'Compound',
        meta: {
          showHeader: true,
          api: {
            path:"/api/analytics/reporting/execute/{reportId}",
            queryParams:
            {
              "window":"1d"
            },
            pathParams:
            {
              reportId: "taf_stats_histogram,taf_connections_by_protocol",
            },
          },
          title: 'Traffic Details'
        },
        attributes: {
          style: {width: '100%', marginRight: '20px'},
          id: 'TrafficDetails'
        },
        children: [
          {
            type: 'MultiSeriesCombiChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Incoming Bandwidth'
            },
            attributes: {
              style: {width: '48%'},
              id: 'HistogramChart1',
              chartBorder: {border:'3px solid #BBBABA',float:'left',width:'48%',margin:'1%'},
              chartCaption: {width:'100%',color: '#555555',fontFamily: 'Verdana,sans',fontSize: '14px',fontWeight: 'bold',textAlign: 'center',paddingTop:'10px'}
            },
            chartOptions: {
              "xAxisName": "Time",
              "yAxisName": "Incoming Bandwidth",
              "lineThickness":"5",
              "paletteColors": "#d3d3d3, #D93609, #0505F5, #ACF50F,#FCFC0D, #05E9F5",
              "drawAnchors":"0",
              "usePlotGradientColor": "1",
              "plotGradientColor": "#887788"
            },
            chartData: {
              combinedResult: true,
              fieldMapping: [
                {
                  axis: 'x',
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'date'
                  ]
                },
                {
                  axis: 'y',
                  seriesname: 'Historical Incoming Bandwidth',
                  renderas: "Area",
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'bytes_in'
                  ]
                },
                {
                  axis: 'y',
                  seriesname: 'Current Incoming Bandwidth',
                  renderas: "Line",
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'bytes_in'
                  ]
                }
              ]
            }
          },
          {
            type: 'MultiSeriesCombiChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Outgoing Bandwidth'
            },
            attributes: {
              style: {width: '48%'},
              id: 'HistogramChart2',
              chartBorder: {border:'3px solid #BBBABA',float:'left',width:'48%',margin:'1%'},
              chartCaption: {width:'100%',color: '#555555',fontFamily: 'Verdana,sans',fontSize: '14px',fontWeight: 'bold',textAlign: 'center',paddingTop:'10px'}
            },
            chartOptions: {
              "xAxisName": "Time",
              "yAxisName": "Outgoing Bandwidth",
              "lineThickness":"5",
              "paletteColors": "#d3d3d3, #D93609, #0505F5, #ACF50F,#FCFC0D, #05E9F5",
              "drawAnchors":"0",
              "usePlotGradientColor": "1",
              "plotGradientColor": "#887788"
            },
            chartData: {
              combinedResult: true,
              fieldMapping: [
                {
                  axis: 'x',
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'date'
                  ]
                },
                {
                  axis: 'y',
                  seriesname: 'Historical Outgoing Bandwidth',
                  renderas: "Area",
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'bytes_out'
                  ]
                },
                {
                  axis: 'y',
                  seriesname: 'Current Outgoing Bandwidth',
                  renderas: "Line",
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'bytes_out'
                  ]
                }
              ]
            }
          },
          {
            type: 'MultiSeriesCombiChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'No. of Connections'
            },
            attributes: {
              style: {width: '48%'},
              id: 'HistogramChart3',
              chartBorder: {border:'3px solid #BBBABA',float:'left',width:'48%',margin:'1%'},
              chartCaption: {width:'100%',color: '#555555',fontFamily: 'Verdana,sans',fontSize: '14px',fontWeight: 'bold',textAlign: 'center',paddingTop:'10px'}
            },
            chartOptions: {
              "xAxisName": "Time",
              "yAxisName": "No. of Connections",
              "lineThickness":"5",
              "paletteColors": "#d3d3d3, #D93609, #0505F5, #ACF50F,#FCFC0D, #05E9F5",
              "drawAnchors":"0",
              "usePlotGradientColor": "1",
              "plotGradientColor": "#887788"
            },
            chartData: {
              combinedResult: true,
              fieldMapping: [
                {
                  axis: 'x',
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'date'
                  ]
                },
                {
                  axis: 'y',
                  seriesname: 'Historical Connections',
                  renderas: "Area",
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'conn'
                  ]
                },
                {
                  axis: 'y',
                  seriesname: 'Current Connections',
                  renderas: "Line",
                  reportId: 'taf_stats_histogram',
                  columns: [
                    'conn'
                  ]
                }
              ]
            }
          },
          {
            type: 'HorizontalBarChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Top Connections By Protocol'
            },
            attributes: {
              style: {width: '48%', marginRight: '20px'},
              id: 'TopConnectionsByProtocol'
            },
            chartOptions: {
            },
            chartData: [
              {
                reportId: 'taf_connections_by_protocol',
                columns: [
                  'protocol.service',
                  'date'
                ]
              }
            ]
          }
        ]
      }
    ],
    [
      {
        "id": "22",
        type: 'Table',
        name: 'Table',
        meta: {
          showHeader: true,
          "api": {
            "path": "/api/analytics/reporting/execute/{reportId}",
            "queryParams": {
              "window": "1h"
            },
            "pathParams": {
              "reportId": "taf_top_longest_connections",
            }
          },
          title: 'Longest Connections',
        },
        attributes: {
          style: {width: '100%'},
          id: 'LongestConnections'
        },
        tableData: [
          {
            reportId: 'taf_top_longest_connections',
            columns: [
              {
                type: 'text',
                columnNameToDisplay: 'End Date',
                data: [
                  {
                    fieldName: "date",
                    displayName: 'date'
                  }
                ],
                style: {width: '15%'}
              },
              {
                type: 'text',
                columnNameToDisplay: 'Duration',
                data: [
                  {
                    fieldName: "data.conn.duration",
                    displayName: 'duration'
                  }
                ],
                style: {width: '15%'}
              },
              {
                type: 'text',
                columnNameToDisplay: 'Details',
                data: [
                  {
                    fieldName: "protocol.service",
                    displayName: ''
                  },
                  {
                    fieldName: "data.conn.reqBytes",
                    displayName: "Incoming bytes"
                  },
                  {
                    fieldName: "data.conn.respBytes",
                    displayName: "Outcoming bytes"
                  }
                ],
                style: {width: '30%'}
              },
              {
                type: 'text',
                columnNameToDisplay: 'Source',
                data: [
                  {
                    fieldName: "source.ip",
                    displayName: 'IP'
                  },
                  {
                    fieldName: "source.port",
                    displayName: "port"
                  },
                  {
                    fieldName: "source.country",
                    displayName: "countryFlag"
                  },
                  {
                    fieldName: "source.additionalInfo.user",
                    displayName: "User"
                  },
                  {
                    fieldName: "source.additionalInfo.machine",
                    displayName: "Machine"
                  },
                  {
                    fieldName: "source.owner",
                    displayName: "Owner"
                  },
                  {
                    fieldName: "source.asn",
                    displayName: "ASN"
                  }
                ],
                style: {width: '20%'}
              },
              {
                type: 'text',
                columnNameToDisplay: 'Destination',
                data: [
                  {
                    fieldName: "destination.ip",
                    displayName: 'IP'
                  },
                  {
                    fieldName: "destination.port",
                    displayName: "port"
                  },
                  {
                    fieldName: "destination.country",
                    displayName: "countryFlag"
                  },
                  {
                    fieldName: "destination.additionalInfo.user",
                    displayName: "User"
                  },
                  {
                    fieldName: "destination.additionalInfo.machine",
                    displayName: "Machine"
                  },
                  {
                    fieldName: "destination.owner",
                    displayName: "Owner"
                  },
                  {
                    fieldName: "destination.asn",
                    displayName: "ASN"
                  }
                ],
                style: {width: '20%'}
              }
            ]
          }
        ],
        tableOptions: {
          sortable:['End Date','Duration','Details', 'Source', 'Destination'],
          defaultSort:{column: 'Duration', direction: 'asc'},
          filterable:false,
          filterBy:""
        }
      }
    ]/*,
    [
      {
        id:'85',
        type: 'Compound',
        name: 'Compound',
        meta: {
          showHeader: true,
          api: {
            path:"/api/analytics/reporting/execute/{reportId}",
            queryParams:
            {
              "window":"1d",
              "timeShift":"1d"
            },
            pathParams:
            {
              reportId: "taf_total_usage,taf_top_talkers_connections,taf_top_talkers_bandwidth,taf_asset_count_time_shifted"
            },
          },
          title: 'Asset Details'
        },
        attributes: {
          style: {width: '100%', marginRight: '20px'},
          id: 'AssetDetails',
          variation: '3d'
        },
        children: [
          {
            type: 'DoughnutChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Top Connections',
              legend: ['of connections are used by ', 'of assets']
            },
            attributes: {
              style: {width: '50%', marginRight: '20px'},
              id: 'DoughnutChartConnections'
            },
            chartOptions: {
              "xAxisName": "Time",
              "yAxisName": "Incoming Bandwidth",
              "lineThickness":"5",
              "paletteColors": "#d3d3d3, #D93609, #0505F5, #ACF50F,#FCFC0D, #05E9F5",
              "drawAnchors":"0",
              "usePlotGradientColor": "1",
              "plotGradientColor": "#887788"
            },
            chartData: [
              {
                reportId: 'taf_asset_count_time_shifted',
                columns: [
                  '0.0'
                ]
              },
              {
                reportId: 'taf_total_usage',
                columns: [
                  'count of date'
                ]
              },
              {
                reportId: 'taf_top_talkers_connections',
                columns: [
                  'count of date'
                ]
              }
            ]
          },
          {
            type: 'DoughnutChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Top Bandwidth',
              legend: ['of bandwidth are used by ', 'of assets']
            },
            attributes: {
              style: {width: '50%', marginRight: '20px'},
              id: 'DoughnutChartBandwidth',
              variation: '3d'
            },
            apiFieldMapping: [
              {
                api: 0,
                fieldName: 'assetCount',
                fieldValue: [0,0,0]
              },
              {
                api: 1,
                fieldName: 'totalBandwidth',
                fieldValue: [0,1]
              },
              {
                api: 3,
                fieldName: 'top10Bandwidth',
                fieldValue: [1]
              }
            ]
          },
          {
            type: 'HorizontalBarChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Top IPs using the highest number of connections',
              chartOptions: {
                'numberSuffix': '%'
              }
            },
            attributes: {
              style: {width: '50%', marginRight: '20px'},
              id: 'HorizontalBarChartConnections',
              variation: '3d'
            },
            apiFieldMapping: [
              {
                api: 0,
                fieldName: 'assetCount',
                fieldValue: [0,0,0]
              },
              {
                api: 1,
                fieldName: 'totalConnections',
                fieldValue: [0,0]
              },
              {
                api: 2,
                fieldName: 'top10Connections',
                fieldValue: [1]
              }
            ]
          },
          {
            type: 'HorizontalBarChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Top IPs using the highest bandwidth',
              chartOptions: {
                'numberSuffix': '%'
              }
            },
            attributes: {
              style: {width: '50%', marginRight: '20px'},
              id: 'HorizontalBarChartBandwidth',
              variation: '3d'
            },
            apiFieldMapping: [
              {
                api: 0,
                fieldName: 'assetCount',
                fieldValue: [0,0,0]
              },
              {
                api: 1,
                fieldName: 'totalBandwidth',
                fieldValue: [0,1]
              },
              {
                api: 3,
                fieldName: 'top10Bandwidth',
                fieldValue: [1]
              }
            ]
          }
        ]
      }
    ]*/
  ]
};

export default layout;