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
    [
      {
        id: 5,
        type: 'Table.component',
        meta: {
          showHeader: true,
          "api": "/api/analytics/reporting/execute/taf_alert_count_time_shifted",
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
        "type": "MSCombiChart",
        "meta": {
          "showHeader": true,
          "api": "/api/analytics/reporting/execute/taf_alert_priority_time",
          "query": {
            "window": "1h"
          },
          "title": "Alert priority"
        },
        "attributes": {
          "style": {"width": "50%"},
          "id": "chart2",
          "variation": "3d"
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
    ],
    [
      {
        type: 'Table.component',
        meta: {
          showHeader: true,
          "api": "/api/analytics/reporting/execute/taf_top_longest_connections",
          "query": {
            "window": "1h",
          },
          title: 'Longest Connections',
        },
        name: 'Table',
        attributes: {
          style: {width: '100%'},
          sortable:['End Date','Duration','Details', 'Source', 'Destination'],
          defaultSort:{column: 'Duration', direction: 'asc'},
          filterable:['End Date', 'Details', 'Source', 'Destination'],
          filterBy:""
        },
        columns: [
          {
            type: 'text',
            columnName: 'End Date',
            data: [
              {
                fieldName: "date",
                fieldValue: [0]
              }
            ],
            style: {width: '20%'}
          },
          {
            type: 'text',
            columnName: 'Duration',
            data: [
              {
                fieldName: "duration",
                fieldValue: [1]
              }
            ],
            style: {width: '20%'}
          },
          {
            type: 'text',
            columnName: 'Details',
            data: [
              {
                fieldValue: [2]
              },
              {
                fieldName: "Incoming bytes",
                fieldValue: [17]
              },
              {
                fieldName: "Outcoming bytes",
                fieldValue: [18]
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
                fieldValue: [3]
              },
              {
                fieldName: "port",
                fieldValue: [4]
              },
              {
                fieldName: "countryFlag",
                fieldValue: [8]
              },
              {
                fieldName: "User",
                fieldValue: [6]
              },
              {
                fieldName: "Machine",
                fieldValue: [5]
              },
              {
                fieldName: "Owner",
                fieldValue: [7]
              },
              {
                fieldName: "ASN",
                fieldValue: [9]
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
                fieldValue: [10]
              },
              {
                fieldName: "port",
                fieldValue: [11]
              },
              {
                fieldName: "countryFlag",
                fieldValue: [15]
              },
              {
                fieldName: "User",
                fieldValue: [13]
              },
              {
                fieldName: "Machine",
                fieldValue: [12]
              },
              {
                fieldName: "Owner",
                fieldValue: [14]
              },
              {
                fieldName: "ASN",
                fieldValue: [16]
              }
            ],
            style: {width: '20%'}
          }
        ]
      }
    ],
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
    ]
  ]
};

export default layout;