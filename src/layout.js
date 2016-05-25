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
        "id": "5",
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
        }
      },
      {
        "id": "6",
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
    ]
    ]
};

export default layout;