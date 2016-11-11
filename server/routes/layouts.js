import https from 'https';
import fetch from 'node-fetch';
import {layoutBaseUrl} from '../../serverEnv';

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
  const layout = reqPath.split('/')[4];

  const fileName = `../json/${layout}.json`,
    filePath = path.join(__dirname, fileName);

  console.log('filePath', filePath);

  // First try and get layout json from the server,
  // if it fails then use the local layout json file
  try {
    console.log(layoutBaseUrl + reqPath);
    const response = await fetch(layoutBaseUrl + reqPath,
      {
        method: 'GET',
        headers: ctx.headers,
        agent
      }
    );

    const data = await response.json();
    console.log('yo yo', data);
    ctx.set('Content-Type', 'application/json; charset=UTF-8');
    ctx.body = data;
  }
  catch (ex) {
    console.log('here');
    try {
      const body = await readFileThunk(filePath);
      ctx.set('Content-Type', 'application/json; charset=UTF-8');
      ctx.body = body;
    }
    catch (ex) {
      console.log('File loading failed');
    }
  }
}

