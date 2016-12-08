import https from 'https';
import fetch from 'node-fetch';
import KoaRouter from 'koa-router';

import {serverBaseUrl, timeoutDuration} from '../../serverEnv';
import layoutRoutes from './layouts';

import timeline from '../components/Timeline';
import anomalyChart from '../components/anomalyChart';
import HeatMap from '../components/HeatMap.dal.js';

const router = new KoaRouter({
  prefix: '/api'
});

const agentOptions = {
  rejectUnauthorized: false
};

const agent = new https.Agent(agentOptions),
  timeout = timeoutDuration || 1000 * 60;

router
.get('/layout/*', layoutRoutes)
.get('*', async function(ctx, next) {
  const url = ctx.request.url;
  console.log('url', url);
  const res = await fetch(serverBaseUrl + ctx.url,
    {
      method: 'GET',
      headers: ctx.headers,
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
.get('/analytics/reporting/execute/taf_alert_by_asset', timeline)
.get('/anomaly/:anomalyId/events', timeline)
.get('/analytics/reporting/execute/taf_asset_session_details', timeline)
.get('/analytics/reporting/execute/taf_asset_session_event_details', timeline)
.get('/analytics/reporting/execute/taf_events_between_source_and_dest_same_type_as_edge', timeline)
.get('/session/activity/live/:type/:assetId', HeatMap)
.post('*', async function(ctx, next) {
  const url = ctx.request.url;
  console.log('url', url);
  const res = fetch(serverBaseUrl + ctx.url,
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
