import https from 'https';
import fetch from 'node-fetch';

import app from './main.js';
import koaRouter from 'koa-router';

import {getData} from './components/paretoChart'

import {serverBaseUrl} from '../env';

const router = new koaRouter({
  prefix: '/api'
});

const agentOptions = {
  rejectUnauthorized: false
};

const agent = new https.Agent(agentOptions);

const reportId = new koaRouter();

// reportId
// .get('/taf_threat_trend', async function(ctx, next) {
//   const url = ctx.request.url;

//   const res = await fetch(serverBaseUrl + ctx.url,
//     {
//       method: 'GET',
//       headers: ctx.headers,
//       agent
//     }
//   )
//   .then((response) => {
//     return response.json().then((json) => {
//       ctx.set('content-type', response.headers.get('content-type'));
//       json.graphBars = getData(json);
//       console.log(json);
//       ctx.body = json;
//       return next();
//     });
//   })

//   return res;
// }, async function(ctx, next) {})

router.get('/analytics/reporting/execute', reportId.routes(), reportId.allowedMethods())
.get('*', async function (ctx, next) {
  const url = ctx.request.url;
  console.log('url', url);
  const res = await fetch(serverBaseUrl + ctx.url,
    {
      method: 'GET',
      headers: ctx.headers,
      agent
    }
  );

  ctx.set('content-type', res.headers.get('content-type'));
  ctx.body = res.body;
});

export default router;
