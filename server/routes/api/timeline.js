let reportingApiBasePath = '/analytics/reporting/execute/';
export const timelineApi = [
  {
    path: '/alert/traffic',
    reportId: ''
  },
  {
    path: reportingApiBasePath,
    reportId: 'taf_alert_by_asset'
  },
  {
    path: '/anomaly/:anomalyId/events',
    reportId: ''
  },
  {
    path: reportingApiBasePath,
    reportId: 'taf_asset_session_details'
  },
  {
    path: reportingApiBasePath,
    reportId: 'taf_asset_session_event_details'
  },
  {
    path: reportingApiBasePath,
    reportId: 'taf_events_between_source_and_dest_same_type_as_edge'
  },
  {
    path: reportingApiBasePath,
    reportId: 'taf_events_with_protocol'
  },
  {
    path: reportingApiBasePath,
    reportId: 'taf_events_with_country'
  },
  {
    path: reportingApiBasePath,
    reportId: 'taf_events_between_source_and_dest'
  },
  {
    path: '/anomaly/:alertId/timeline',
    reportId: ''
  }
];
