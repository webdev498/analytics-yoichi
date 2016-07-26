export function calculateDateDisplayFormat(timeWindow) {
  let dateDisplayFormat = 'D MMM YYYY, HH:mm';
  switch (timeWindow) {
    case '1h':
      dateDisplayFormat = 'HH:mm';
      break;
    case '1d':
      dateDisplayFormat = 'HH:mm';
      break;
    case '1w':
      dateDisplayFormat = 'ddd, D MMM';
      break;
    case '1mo':
      dateDisplayFormat = 'ddd, D MMM';
      break;
    default:
      break;
  }
  return dateDisplayFormat;
}

export function calculateDateDisplayFormatForHistogram(timeWindow) {
  var dateDisplayFormat = "D MMM YYYY, HH:mm";
  switch (timeWindow) {
    case "1h":
      dateDisplayFormat = "ddd, D HH:mm";
      break;
    case "6h":
      dateDisplayFormat = "ddd, D HH:mm";
      break;
    case "12h":
      dateDisplayFormat = "ddd, D HH:mm";
      break;
    case "1d":
      dateDisplayFormat = "ddd, D HH:mm";
      break;
    case "1w":
      dateDisplayFormat = "ddd, D MMM HH:mm";
      break;
    case "1mo":
      dateDisplayFormat = "ddd, D MMM HH:mm";
      break;
    default:
      break;
  }
  return dateDisplayFormat;
}
