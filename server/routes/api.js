import https from 'https';
import fetch from 'node-fetch';
import KoaRouter from 'koa-router';

import {serverBaseUrl, timeoutDuration} from '../../serverEnv';
import layoutRoutes from './layouts';

import timeline from '../components/Timeline';
import anomalyChart from '../components/anomalyChart';
import heatMap from '../components/HeatMap.dal';
import table from '../components/Table.dal';
import userAgent from '../components/UserAgent.dal';
import pieChart from '../components/PieChart.dal';

import {timelineApi} from './api/timeline';
import {tableApi} from './api/table';
import {heatMapApi} from './api/heatMap';
import {userAgentApi} from './api/userAgent';
import {pieChartApi} from './api/pieChart';

import {getUrl} from '../utils/utils';

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
  let url = await getUrl(ctx);
  console.log('proxy url', url);
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
});

timelineApi.forEach((api) => {
  router.get(api.path + api.reportId, timeline);
});

tableApi.forEach((api) => {
  router.get(api.path + api.reportId, table);
});

heatMapApi.forEach((api) => {
  router.get(api.path + api.reportId, heatMap);
});

userAgentApi.forEach((api) => {
  router.get(api.path + api.reportId, userAgent);
});

pieChartApi.forEach((api) => {
  router.get(api.path + api.reportId, pieChart);
});

router
.post('*', async function(ctx, next) {
  let url = serverBaseUrl + ctx.url;
  console.log('proxy url', url);
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
