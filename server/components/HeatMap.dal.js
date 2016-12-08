import {getColumnIndex} from '../utils/chartUtils';
import {militaryTimeToNormalTime} from '../utils/utils';

export function getData(data) {
  const {rows, columns} = data,
    yAxis = getColumnIndex(columns, 'minutesOfActivity'),
    dayIndex = getColumnIndex(columns, 'dayOfWeek'),
    hourIndex = getColumnIndex(columns, 'hourOfDay'),
    dataObj = [];

  rows.forEach(row => {
    const yValue = row[yAxis.index],
      rowid = militaryTimeToNormalTime(row[hourIndex.index]),
      columnid = row[dayIndex.index];

    const temp = {
      'rowid': rowid + '',
      'columnid': columnid + '',
      'value': yValue
    };

    dataObj.push(temp);
  });

  return {
    columns: {},
    dataset: [{data: dataObj}]
  };
};


export default async function Heatmap(ctx, next) {
  let parsedData = await ctx.tempData.json();
  if (!parsedData.errorCode) {
    const normalizeData = getData(parsedData);
    parsedData.normalizeData = normalizeData;
    ctx.normalizeData = parsedData;
  }
}
