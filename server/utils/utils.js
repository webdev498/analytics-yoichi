import {serverBaseUrl} from '../../serverEnv';

const fs = require('fs'),
  path = require('path'),
  dalJsonDir = {
    pieChart: []
  };

export const readFileThunk = function(src) {
  return new Promise(function(resolve, reject) {
    fs.readFile(src, {}, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

export async function readDir(dir) {
  const readDirThunk = function(dirName) {
    const dirPath = path.join(__dirname, '../json/' + dirName);
    return new Promise(function(resolve, reject) {
      fs.readdir(dirPath, {}, function(err, data) {
        if (err) return reject(err);
        dalJsonDir[dirName] = data;
      });
    });
  };
  await readDirThunk(dir);
};

export function getAllFilesOnce() {
  for (let dir in dalJsonDir) {
    readDir(dir);
  }
}

getAllFilesOnce();

export async function getUrl(ctx) {
  let url = serverBaseUrl + ctx.url;

  for (let folder in dalJsonDir) {
    let files = dalJsonDir[folder],
      filePath = '',
      reportId = '';
    files.every(function(file, index) { // here I have used 'every' since I wanted to break the loop.
      file = file.split('/');
      reportId = file[file.length - 1];
      reportId = reportId.replace('.json', '');
      if (url.includes(reportId)) {
        let fileName = `../json/${folder}/${reportId}.json`;
        filePath = path.join(__dirname, fileName);
        return false;
      }
      else {
        return true;
      }
    });
    if (filePath !== '') {
      let dataJson = await readFileThunk(filePath);
      dataJson = JSON.parse(dataJson.toString());
      const tafReportId = dataJson.meta && dataJson.meta.api ? dataJson.meta.api.reportId : '';
      url = url.replace(reportId, tafReportId);
    }
  }

  return url;
}
