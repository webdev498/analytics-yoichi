import https from 'https';
import fetch from 'node-fetch';

import app from './main.js';
import koaRouter from 'koa-router';

const router = new koaRouter({
  prefix: '/api'
});

const agentOptions = {
  rejectUnauthorized: false
};

const agent = new https.Agent(agentOptions);

router
.get('/analytics/reporting/execute/taf_threat_trend', async function(ctx, next) {
  const url = ctx.request.url;
  console.log(url);
  const res = await fetch('https://demo.ranksoftwareinc.com' + ctx.url,
    {
      method: 'GET',
      headers: ctx.headers,
      agent
    }
  );

  ctx.set('content-type', res.headers.get('content-type'));
  ctx.body = res.body;
})
.get('*', async function (ctx, next) {
  const url = ctx.request.url;
  const res = await fetch('https://demo.ranksoftwareinc.com' + ctx.url,
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
