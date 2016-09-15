const fs = require('fs');
const path = require('path');

const readFileThunk = function(src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {}, function (err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  });
}

export default async function layoutRoutes (ctx, next) {
  const reqPath = ctx.request.path;
  const layout = reqPath.split('/')[4];

  const fileName = `../json/${layout}.json`,
    filePath = path.join(__dirname, fileName);

  console.log('filePath', filePath);
  const body = await readFileThunk(filePath);

  ctx.set('Content-Type', 'application/json; charset=UTF-8');
  ctx.body = body;
}

