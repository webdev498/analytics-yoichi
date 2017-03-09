import {
  getColumnIndexOrValue,
  generateRawData
} from '../../commons/utils/utils';
import {Colors} from '../../commons/colors';

const fs = require('fs'),
  path = require('path');

function getPieJson(url) { // This url is a proxy server url.
  let reportId = url.split('?');
  reportId = reportId[0];
  reportId = reportId.split('/');
  reportId = reportId[reportId.length - 1];

  const fileName = `../json/pieChart/${reportId}.json`,
    filePath = path.join(__dirname, fileName),
    json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return json;
}

function processData(rawData, url) {
  const json = getPieJson(url),
    fieldMapping = json.chart.data.fieldMapping,
    options = json.chart.options,
    data = generateRawData(fieldMapping, rawData);

  let values = {
    default: {
      count: 0,
      total: 0
    },
    top: {
      count: 0,
      total: 0
    }
  };

  fieldMapping.forEach((api) => {
    let {rows, columns} = data[api.reportId];
    values.top = {
      count: 0,
      total: 0
    };

    rows.forEach((row) => {
      let index = getColumnIndexOrValue(api.columns, columns, row),
        value = getValue(api.columns[0].type, index, row);
      if (api.returnValueIs === 'countValue') {
        values.default.count = value;
      }
      else if (api.returnValueIs === 'totalValue') {
        values.default.total = value;
      }
      else if (api.returnValueIs === 'topValue') {
        let total = Math.round(((value * 100) / values.default.total), 2);
        if (total > 0) {
          values.top.count++;
          values.top.total += parseInt(value);
        }
      }
    });
  });

  console.log(values);

  return {
    pieJson: json,
    pieProps: generatePieProps(values, options)
  };
}

function getValue(columnType, index, data) {
  let value = 0;
  if (columnType === 'name') {
    value = data[index];
  }
  else if (columnType === 'index') {
    value = index;
  }
  return value;
}

export function generatePieProps(values, options) {
  let pieProps = {};
  let input = {
      count: values.default.total,
      total: values.top.total
    },
    styles = getPieStyles(input, options),
    assetPercentage = Math.round((values.top.count / parseInt(values.default.count)) * 100, 2),
    piePercentage = Math.round((values.top.total / parseInt(values.default.total)) * 100, 2),
    percentageText = {};

  if (piePercentage === 100 || isNaN(piePercentage)) {
    percentageText = {
      paddingLeft: '0px'
    };
  }

  assetPercentage = isNaN(assetPercentage) ? '0' : assetPercentage.toString();
  piePercentage = isNaN(piePercentage) ? '0' : piePercentage.toString();

  pieProps = {
    styles: Object.assign({}, styles, percentageText),
    assetPercentage,
    piePercentage
  };
  return pieProps;
}

export function getPieStyles(input, options) {
  let {count, total} = input,
    {highlightedColor, nonHighlightedColor} = options,
    percentage = Math.round((total / parseInt(count)) * 100, 2);

  if (percentage === 0) {
    percentage = Math.round((total / parseInt(count)) * 100, 4);
  }
  else if (percentage > 100) {
    percentage = 100;
  }

  highlightedColor = highlightedColor || Colors.bar;
  nonHighlightedColor = nonHighlightedColor || Colors.cloud;
  let sliceOneBg = highlightedColor,
    sliceTwoBg = highlightedColor,
    sliceOneTempBg = nonHighlightedColor,
    sliceTwoTempBg = nonHighlightedColor,
    sliceOneTransform = 'rotate(90deg)',
    sliceOneCalculatedTransform = 0,
    sliceTwoCalculatedTransform = (percentage / 100 * 360),
    sliceTwoTransform = 'rotate(' + sliceTwoCalculatedTransform + 'deg)';

  if (percentage < 50) {
    sliceOneTempBg = sliceOneBg;
    sliceOneBg = sliceTwoTempBg;
    sliceTwoBg = sliceTwoTempBg;
    sliceOneCalculatedTransform = (percentage / 100 * 360 + 90);
    sliceOneTransform = 'rotate(' + sliceOneCalculatedTransform + 'deg)';
    sliceTwoTransform = 'rotate(0deg)';
  }

  const background = {background: sliceOneTempBg},
    sliceOne = {
      transform: sliceOneTransform,
      WebkitTransform: sliceOneTransform,
      background: sliceOneBg
    },
    sliceTwo = {
      transform: sliceTwoTransform,
      WebkitTransform: sliceTwoTransform,
      background: sliceTwoBg
    };

  return {
    background,
    sliceOne,
    sliceTwo
  };
}

export default async function PieChart(ctx, next) {
  let rawData;
  try {
    rawData = await ctx.tempData.json();
  }
  catch (error) {
    const obj = {
      errorCode: 400,
      errorMessage: 'api error',
      errorDetails: error
    };

    ctx.throw('api response error', 400, obj);
  }

  if (rawData && !rawData.errorCode) {
    const dataObj = processData(rawData, ctx.request.url);
    ctx.normalizeData = Object.assign({}, rawData, {
      pieProps: dataObj.pieProps,
      pieJson: dataObj.pieJson
    });
  }
};
