import {serverBaseUrl} from '../../serverEnv';

const fs = require('fs'),
  path = require('path'),
  jsonFolders = ['pieChart'];

export let getAllFilesFromFolder = function(dir) {
  let files = [];

  fs.readdirSync(dir).forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      files = files.concat(getAllFilesFromFolder(file));
    }
    else {
      files.push(file);
    }
  });

  return files;
};

export function getUrl(ctx) {
  let url = serverBaseUrl + ctx.url;

  jsonFolders.forEach((folder) => {
    let files = getAllFilesFromFolder(path.join(__dirname, '../json/' + folder));
    files.forEach((file) => {
      file = file.split('/');
      let reportId = file[file.length - 1];
      reportId = reportId.replace('.json', '');
      if (url.includes(reportId)) {
        let fileName = `../json/${folder}/${reportId}.json`,
          filePath = path.join(__dirname, fileName),
          dataJson = JSON.parse(fs.readFileSync(filePath, 'utf8')),
          tafReportId = dataJson.meta && dataJson.meta.api ? dataJson.meta.api.reportId : '';
        url = url.replace(reportId, tafReportId);
      }
    });
  });

  return url;
}
