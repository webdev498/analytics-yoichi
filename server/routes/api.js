import https from 'https';
import fetch from 'node-fetch';
import KoaRouter from 'koa-router';

import {serverBaseUrl, timeoutDuration} from '../../serverEnv';
import layoutRoutes from './layouts';

import timeline from '../components/Timeline';
import anomalyChart from '../components/anomalyChart';
import HeatMap from '../components/HeatMap.dal.js';
import table from '../components/Table.dal';
import userAgent from '../components/UserAgent.dal.js';
import PieChart from '../components/PieChart.dal.js';

const router = new KoaRouter({
  prefix: '/api'
});

const agentOptions = {
  rejectUnauthorized: false
};

const agent = new https.Agent(agentOptions),
  timeout = timeoutDuration || 1000 * 60,
  reportingApiBasePath = '/analytics/reporting/execute/';

router
.get('/layout/*', layoutRoutes)
.get('*', async function(ctx, next) {
  let url = serverBaseUrl + ctx.url;
  console.log('proxy url1', url);
  if (url.includes('dash_top_connections')) {
    url = url.replace('dash_top_connections', 'taf_total_usage,taf_top_talkers_connections,taf_asset_count_time_shifted');
    console.log('test1', url);
  }
  const res = await fetch(url,
    {
      method: 'GET',
      headers: {...ctx.headers, 'Content-Type': 'application/json'},
      timeout,
      agent
    }
  );

  ctx.tempData = res;
  await next();

  ctx.set('content-type', res.headers.get('content-type'));
  ctx.status = res.status;
  ctx.statusText = res.statusText;
  ctx.body = ctx.normalizeData || res.body;
})
.get('/alert/traffic', timeline)
.get(reportingApiBasePath + 'taf_alert_by_asset', timeline)
.get('/anomaly/:anomalyId/events', timeline)
.get(reportingApiBasePath + 'taf_asset_session_details', timeline)
.get(reportingApiBasePath + 'taf_asset_session_event_details', timeline)
.get(reportingApiBasePath + 'taf_events_between_source_and_dest_same_type_as_edge', timeline)
.get(reportingApiBasePath + 'taf_events_with_protocol', timeline)
.get(reportingApiBasePath + 'taf_events_with_country', timeline)
.get(reportingApiBasePath + 'taf_events_between_source_and_dest', timeline)
.get('/anomaly/:alertId/timeline', timeline)
.get('/session/activity/live/:type/:assetId', HeatMap)
.get(reportingApiBasePath + 'taf_alert_highpriority', table)
.get(reportingApiBasePath + 'taf_top_longest_connections', table)
.get(reportingApiBasePath + 'taf_top_longest_user_agents', table)
.get(reportingApiBasePath + 'taf_top_shortest_user_agents', table)
.get(reportingApiBasePath + 'taf_least_used_software', table)
.get(reportingApiBasePath + 'taf_top_successful_logins', table)
.get(reportingApiBasePath + 'taf_top_failed_logins', table)
.get(reportingApiBasePath + 'taf_top_at_risk_assets', table)
.get(reportingApiBasePath + 'taf_s3_most_access_by_active_user', table)
.get(reportingApiBasePath + 'taf_s3_most_accessed', table)
.get(reportingApiBasePath + 'taf_s3_least_accessed', table)
.get(reportingApiBasePath + 'taf_most_launched_processes', table)
.get(reportingApiBasePath + 'taf_least_launched_processes', table)
.get(reportingApiBasePath + 'taf_most_used_parent_processes', table)
.get(reportingApiBasePath + 'taf_least_used_parent_processes', table)
.get(reportingApiBasePath + 'taf_ct_event_by_ua', table)
.get(reportingApiBasePath + 'taf_ct_event_by_region', table)
.get(reportingApiBasePath + 'taf_ct_failed_events_by_type', table)
.get(reportingApiBasePath + 'taf_ct_ec2_top_type', table)
.get(reportingApiBasePath + 'taf_ct_ec2_bottom_type', table)
.get(reportingApiBasePath + 'taf_ct_ec2_top_user', table)
.get(reportingApiBasePath + 'taf_ct_ec2_bottom_user', table)
.get(reportingApiBasePath + 'taf_ct_iam_top_success_login', table)
.get(reportingApiBasePath + 'taf_ct_iam_bottom_success_login', table)
.get(reportingApiBasePath + 'taf_ct_iam_top_success_login_region', table)
.get(reportingApiBasePath + 'taf_ct_iam_top_failed_login', table)
.get(reportingApiBasePath + 'taf_ct_iam_top_failed_login_region', table)
.get(reportingApiBasePath + 'taf_user_agent_unique_with_name', userAgent)
.get(reportingApiBasePath + 'taf_total_usage,taf_top_talkers_connections,taf_asset_count_time_shifted', PieChart)
.post('*', async function(ctx, next) {
  let url = serverBaseUrl + ctx.url;
  console.log('proxy url2', url);
  if (url.includes('dash_top_connections')) {
    url = url.replace('dash_top_connections', 'dash_top_connections2');
  }
  const res = fetch(url,
    {
      method: 'POST',
      headers: ctx.headers,
      rejectUnauthorized: false,
      timeout,
      agent,
      body: JSON.stringify(ctx.request.body)
    }
  );

  await res.then(response => {
    ctx.set('content-type', response.headers.get('content-type'));
    ctx.status = response.status;
    ctx.statusText = response.statusText;
    return response.json();
  }).then(json => {
    if (url.includes('/analytics/reporting/executeById')) {
      const normalizeData = anomalyChart(json);
      if (normalizeData) {
        json.normalizeData = normalizeData;
      }
    }

    ctx.body = json;
  });
});

export default router;
