import moment from 'moment';

export function calculateDateDisplayFormat(timeWindow) {
  let dateDisplayFormat = 'D MMM YYYY, HH:mm';

  if (timeWindow === '1h' || timeWindow === '1d') {
    dateDisplayFormat = 'HH:mm';
  }
  else if (timeWindow === '1w' || timeWindow === '1mo') {
    dateDisplayFormat = 'ddd, D MMM';
  }
  return dateDisplayFormat;
}

export function calculateDateDisplayFormatForHistogram(timeWindow) {
  var dateDisplayFormat = 'D MMM YYYY, HH:mm';
  if (timeWindow === '1h' || timeWindow === '6h' || timeWindow === '12h' || timeWindow === '1d') {
    dateDisplayFormat = 'ddd, D HH:mm';
  }
  else if (timeWindow === '1w' || timeWindow === '1mo') {
    dateDisplayFormat = 'ddd, D MMM HH:mm';
  }
  return dateDisplayFormat;
}

export function formatDate(date, duration) {
  const dateDisplayFormat = calculateDateDisplayFormat(duration);
  let localTimeNew = moment.utc(date).toDate();
  return moment(localTimeNew).format(dateDisplayFormat);
}
