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
        // if dirName key is exists in 'dalJsonDir' object then only, it assigns the list of files.
        if (dalJsonDir[dirName]) {
          dalJsonDir[dirName] = data;
        }
      });
    });
  };
  await readDirThunk(dir);
};

export function getDalJsonFileNamesOnce() {
  for (let dir in dalJsonDir) {
    readDir(dir);
  }
}

getDalJsonFileNamesOnce();

export async function getUrl(ctx) {
  let url = serverBaseUrl + ctx.url;

  // This 'if' condition is added becasue it replaces the report id only if we used 'dash_' reportId.
  // For example: in piechart, we need more than one taf report ids,
  // hence we cannot give dal json file name to all these three reportids like we had created table dal jsons.
  // Hence, for pie chart, we have created report ids starting with 'dash_' word.
  // So, while calling the proxy URL, we needed to replace that dash report id with taf report id.
  // So, for this reason, I have created this function.
  if (url.includes('dash_')) {
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
  }

  return url;
}
