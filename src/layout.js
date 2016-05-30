const layout = {
  "layout": [
    [
      {
        "id": "1",
        "type": "MetricsCard.component",
        "meta": {
          "showHeader": false,
          "api": "/api/analytics/reporting/execute/taf_alert_count_time_shifted",
          "query": {
            "window": "1h",
            "timeShift": "1h"
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "style": {"backgroundColor": "#d9534f"},
          "title": "High Priority Alerts"
        },
        "children": [{
          "type": "FontIcon",
          "content": "add_alert"
        }]
      },
      {
        "id": "2",
        "type": "MetricsCard.component",
        "meta": {
          "showHeader": false,
          "api": "/api/analytics/reporting/execute/taf_malware_count_time_shifted",
          "query": {
            "window": "1h",
            "timeShift": "1h"
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "style": {"backgroundColor": "#f0ad4e"},
          "title": "High Priority Malware"
        },
        "children": [{
          "type": "FontIcon",
          "content": "bug_report"
        }]
      },
      {
        "id": "3",
        "type": "MetricsCard.component",
        "meta": {
          "showHeader": false,
          "api": "/api/analytics/reporting/execute/taf_event_count_time_shifted",
          "query": {
            "window": "1h",
            "timeShift": "1h"
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "style": {"backgroundColor": "#337ab7"},
          "title": "Events Processed"
        },
        "children": [{
          "type": "FontIcon",
          "content": "bug_report"
        }]
      },
      {
        "id": "4",
        "type": "MetricsCard.component",
        "meta": {
          "showHeader": false,
          "api": "/api/analytics/reporting/execute/taf_asset_count_time_shifted",
          "query": {
            "window": "1h",
            "timeShift": "1h"
          }
        },
        "name": "MetricsCard",
        "attributes": {
          "style": {"backgroundColor": "#5cb85c"},
          "title": "Assets Monitored"
        },
        "children": [{
          "type": "FontIcon",
          "content": "devices_other"
        }]
      }
    ],
    /*[
      {
        id: 5,
        type: 'Table.component',
        meta: {
          showHeader: true,
          "api": "/api/analytics/reporting/execute/taf_alert_highpriority",
          "query": {
            "window": "1h",
            "count":200
          },
          title: 'Recent Alerts',
        },
        name: 'Table',
        attributes: {
          style: {width: '100%'},
          sortable:['Rank Score','Date','Details', 'Source', 'Destination'],
          defaultSort:{column: 'Rank Score', direction: 'desc'},
          filterable:['Date', 'Details', 'Source', 'Destination'],
          filterBy:""
        },
        columns: [
          {
            type: 'chart',
            columnName: 'Rank Score',
            data : {
              chartType: 'angulargauge',
              chartId: 'recentAlert',
              chartWidth: '70',
              chartHeight: '60',
              chartValue: [0,'data','rank_alert','score']
            },
            style: {width: '10%'}
          },
          {
            type: 'text',
            columnName: 'Date',
            data: [
              {
                fieldName: "date",
                fieldValue: [0,'date']
              }
            ],
            style: {width: '20%'}
          },
          {
            type: 'text',
            columnName: 'Details',
            data: [
              {
                fieldValue: [0,'data','rank_alert','description'],
                style: 'bold'
              },
              {
                fieldValue: [0,'data','rank_alert','message']
              }
            ],
            style: {width: '30%'}
          },
          {
            type: 'text',
            columnName: 'Source',
            data: [
              {
                fieldName: "IP",
                fieldValue: [0,'source','ip']
              },
              {
                fieldName: "port",
                fieldValue: [0,'source','port']
              },
              {
                fieldName: "countryFlag",
                fieldValue: [0,'source','country']
              },
              {
                fieldName: "User",
                fieldValue: [0,'source','additionalInfo','user']
              },
              {
                fieldName: "Machine",
                fieldValue: [0,'source','additionalInfo','machine']
              }
            ],
            style: {width: '20%'}
          },
          {
            type: 'text',
            columnName: 'Destination',
            data: [
              {
                fieldName: "IP",
                fieldValue: [0,'destination','ip']
              },
              {
                fieldName: "port",
                fieldValue: [0,'destination','port']
              },
              {
                fieldName: "countryFlag",
                fieldValue: [0,'destination','country']
              },
              {
                fieldName: "User",
                fieldValue: [0,'destination','additionalInfo','user']
              },
              {
                fieldName: "Machine",
                fieldValue: [0,'destination','additionalInfo','machine']
              }
            ],
            style: {width: '20%'}
          }
        ]
      }
    ],
    [
      {
        "id": "6",
        "type": "ParetoChart",
        "meta": {
          "showHeader": true,
          "api": "/api/analytics/reporting/execute/taf_threat_trend",
          "query": {
            "window": "1h"
          },
          "title": "Alert by type",
        },
        "attributes": {
          "style": {"width": "50%", "marginRight": "20px"},
          "id": "chart1",
          "variation": "3d"
        },
        apiFieldMapping: [{
          xAxis: {
            fieldName: 'Alert Types',
            fieldValue: [0]
          },
          yAxis: {
            fieldName: 'Connections',
            fieldValue: [1]
          }
        }]
      },
      {
        "id": "7",
        type: 'MultiSeriesCombiChart',
        meta: {
          showHeader: true,
          api: '/api/analytics/reporting/execute/taf_alert_priority_time',
          query: {
            "window": "1h"
          },
          title: 'Alert priority'
        },
        attributes: {
          style: {width: '50%'},
          id: 'AlertPriorityChart',
          timeWindow: '1h',
          chartOptions: {
            "yAxisName": "Alert Count",
            "drawAnchors": "1",
            "legendPosition": "right",
            "linealpha":"0",
            "paletteColors": "#0505F5, #D93609, #ACF50F,#FCFC0D, #05E9F5"
          },
          series: [
            {
              seriesname: 'Low',
              renderas: "Line",
              lineThickness: "0",
              drawanchors: "1",
              anchorradius: "10",
              anchorBorderColor: '#ff0000',
              anchorbgcolor: '#ED6172',
              anchorsides: '0'
            },
            {
              seriesname: 'Medium',
              renderas: "Line",
              lineThickness: "0",
              drawanchors: "1",
              anchorradius: "10",
              anchorBorderColor: '#0F4D1F',
              anchorbgcolor: '#3DF26A',
              anchorsides: '4'
            },
            {
              seriesname: 'High',
              renderas: "Line",
              lineThickness: "0",
              drawanchors: "1",
              anchorradius: "10",
              anchorBorderColor: '#0000ff',
              anchorbgcolor: '#9F9FF5',
              anchorsides: '3'
            }
          ]
        }
      }
    ],
    [
      {
        type: 'WorldMap',
        meta: {
          showHeader: true,
          apis: [
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_dest_countries?window=1h'
            },
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_dest_countries?window=1h&filter=source.reputation OR destination.reputation'
            }
          ],
          title: 'Outgoing Traffic Heatmap',
        },
        attributes: {
          style: {width: '50%', marginRight: '20px'},
          id: ['OutgoingTrafficHeatmap','OutgoingTopCountries','OutgoingTopBandwidthCountries'],
          variation: '3d',
          mapType: 'Outgoing'
        }
      },
      {
        type: 'WorldMap',
        meta: {
          showHeader: true,
          apis: [
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_source_countries?window=1h'
            },
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_source_countries?window=1h&filter=source.reputation OR destination.reputation'
            }
          ],
          title: 'Incoming Traffic Heatmap',
        },
        attributes: {
          style: {width: '50%', marginRight: '20px'},
          id: ['IncomingTrafficHeatmap','IncomingTopCountries','IncomingTopBandwidthCountries'],
          variation: '3d',
          mapType: 'Incoming'
        }
      }
    ],*/
    [
      {
        type: 'Compound.component',
        name: 'Compound',
        meta: {
          showHeader: true,
          apis: [
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_stats_histogram,taf_connections_by_protocol,taf_top_longest_connections?window=1d'
            }
          ],
          /*api: {
            path:"/api/analytics/reporting/execute/{reportId}",
            queryParams:
            {
              "window":"1h"
            },
            pathParams:
            {
              reportId: "taf_stats_histogram,taf_connections_by_protocol,taf_top_longest_connections",
            },
          },*/
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
              style: {width: '50%'},
              id: 'HistogramChart1'
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
                axis: 'x',
                reportId: 'taf_stats_histogram',
                columns: [
                  'date'
                ]
              },
              {
                seriesname: 'Historical Incoming Bandwidth',
                renderas: "Area",
                reportId: 'taf_stats_histogram',
                columns: [
                  'formula 2'
                ]
              },
              {
                seriesname: 'Current Incoming Bandwidth',
                renderas: "Line",
                reportId: 'taf_stats_histogram',
                columns: [
                  'formula 2'
                ]
              }
            ]
          },
          {
            type: 'MultiSeriesCombiChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Outgoing Bandwidth'
            },
            attributes: {
              style: {width: '50%'},
              id: 'HistogramChart2'
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
            chartData: [
              {
                axis: 'x',
                reportId: 'taf_stats_histogram',
                columns: [
                  'date'
                ]
              },
              {
                seriesname: 'Historical Outgoing Bandwidth',
                renderas: "Area",
                reportId: 'taf_stats_histogram',
                columns: [
                  'formula 3'
                ]
              },
              {
                seriesname: 'Current Outgoing Bandwidth',
                renderas: "Line",
                reportId: 'taf_stats_histogram',
                columns: [
                  'formula 3'
                ]
              }
            ]
          },
          {
            type: 'MultiSeriesCombiChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'No. of Connections'
            },
            attributes: {
              style: {width: '50%'},
              id: 'HistogramChart3'
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
            chartData: [
              {
                axis: 'x',
                reportId: 'taf_stats_histogram',
                columns: [
                  'date'
                ]
              },
              {
                seriesname: 'Historical Connections',
                renderas: "Area",
                reportId: 'taf_stats_histogram',
                columns: [
                  'formula 1'
                ]
              },
              {
                seriesname: 'Current Connections',
                renderas: "Line",
                reportId: 'taf_stats_histogram',
                columns: [
                  'formula 1'
                ]
              }
            ]
          },
          {
            type: 'HorizontalBarChart',
            parent:'Compound',
            meta: {
              showHeader: false,
              title: 'Top Connections By Protocol'
            },
            attributes: {
              style: {width: '50%', marginRight: '20px'},
              id: 'TopConnectionsByProtocol'
            },
            chartOptions: {
            },
            chartData: [
              {
                reportId: 'taf_connections_by_protocol',
                columns: [
                  'protocol.service',
                  'count of date'
                ]
              }
            ]
          },
          {
            type: 'Table.component',
            parent:'Compound',
            name: 'Table',
            meta: {
              showHeader: false,
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
              filterable:['End Date', 'Details', 'Source', 'Destination'],
              filterBy:""
            }
          }
        ]
      }
    ]/*,
    [
      {
        type: 'Compound.component',
        name: 'Compound',
        meta: {
          showHeader: true,
          apis: [
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_asset_count_time_shifted?window=1h&timeShift=1h'
            },
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_total_usage?window=1h'
            },
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_top_talkers_connections?window=1h'
            },
            {
              api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_top_talkers_bandwidth?window=1h'
            }
          ],
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
              id: 'DoughnutChartConnections',
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