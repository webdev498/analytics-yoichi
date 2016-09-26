import https from 'https';
import fetch from 'node-fetch';

import app from '../main.js';
import koaRouter from 'koa-router';

import {getData} from '../components/paretoChart'

import {serverBaseUrl} from '../../serverEnv';
import layoutRoutes from './layouts';

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

const timeout = 1000 * 60;

router
.get('/store/*', layoutRoutes)
.get('*', async function (ctx, next) {
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

  ctx.set('content-type', res.headers.get('content-type'))
  ctx.body = res.body;
})
.post('*', async function (ctx, next) {
  const url = ctx.request.url;
  console.log('url', url);
  const res = await fetch(serverBaseUrl + ctx.url,
    {
      method: 'POST',
      headers: ctx.headers,
      'rejectUnauthorized': false,
      timeout,
      agent,
      body: JSON.stringify(ctx.request.body)
    }
  );

  ctx.set('content-type', res.headers.get('content-type'))
  ctx.body = res.body;
});

export default router;
