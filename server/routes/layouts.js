import https from 'https';
import fetch from 'node-fetch';
import {serverBaseUrl} from '../../serverEnv';

const fs = require('fs');
const path = require('path');

const readFileThunk = function(src) {
  return new Promise(function(resolve, reject) {
    fs.readFile(src, {}, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const agent = new https.Agent({ rejectUnauthorized: false });

export default async function layoutRoutes(ctx, next) {
  const reqPath = ctx.request.path;
  const layoutPath = reqPath.split('/')[3];

  // First try and get layout json from the server,
  // if it fails then use the local layout json file
  try {
    const response = await fetch(serverBaseUrl + `/api/store/dashboard/${layoutPath}`,
      {
        method: 'GET',
        headers: ctx.headers,
        agent
      }
    );

    const data = await response.json();
    ctx.set('Content-Type', 'application/json; charset=UTF-8');
    ctx.body = data;
  }
  catch (ex) {
    try {
      const fileName = `../json/${layoutPath}.json`,
        filePath = path.join(__dirname, fileName);

      console.log('filePath', filePath);
      const body = await readFileThunk(filePath);
      ctx.set('Content-Type', 'application/json; charset=UTF-8');
      ctx.body = body;
    }
    catch (ex) {
      ctx.status = 404;
      ctx.message = 'Layout not found';
      ctx.body = {
        'timeStamp': (new Date()).getTime(),
        'errorCode': 404,
        'details': 'Layout not found'
      };
    }
  }
}
