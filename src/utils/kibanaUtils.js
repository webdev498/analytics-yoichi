import {baseUrl} from 'config';
import moment from 'moment';
import {
  LOW_SCORE_RANGE,
  MEDIUM_SCORE_RANGE,
  HIGH_SCORE_RANGE
} from 'Constants';
import {isUndefined,
  getTimePairFromWindow,
  getCountryCodeByCountryName
} from 'utils/utils';

export function generatePathParams(pathParamArray) {
  let pathParams = '';
  for (let i = 0; i < pathParamArray.length; i++) {
    if (pathParams === '') {
      pathParams = pathParamArray[i];
    }
    else {
      pathParams += '/' + pathParamArray[i];
    }
  }
  return pathParams;
}

export function generateQueryParams(parameters) {
  let {data, duration, dataObj, queryParamsArray, currentRowNumber, nestedResult} = parameters,
    queryParams = '';
  for (let key in queryParamsArray) {
    if (!isUndefined(key)) {
      if (queryParams === '') {
        queryParams = '?' + generateQueryParam(data, duration, dataObj, key, queryParamsArray[key], currentRowNumber,
          nestedResult);
      }
      else {
        queryParams += '&' + generateQueryParam(data, duration, dataObj, key, queryParamsArray[key], currentRowNumber,
          nestedResult);
      }
    }
  }
  return queryParams;
}

export function generateQueryParam(data, duration, dataObj, key, value, currentRowNumber, nestedResult) {
  let queryParam = '',
    fromAPIResponse = true;

  if (value === 'success' || value === 'fail') {
    fromAPIResponse = false;
  }

  if (value !== '' && fromAPIResponse) {
    const {rows, columns} = data;

    if (nestedResult) {
      let columnIndex = '',
        fieldValue = '';
      for (let c = 0; c < columns.length; c++) {
        if (value === columns[c].name) {
          columnIndex = c;
          break;
        }
      }

      for (let nestedKey in rows[currentRowNumber]) {
        if (!isUndefined(nestedKey)) {
          if (columnIndex === 0) {
            fieldValue = (nestedKey !== '') ? nestedKey : '';
            break;
          }
        }
      }
      queryParam = key + '=' + fieldValue;
    }
    else {
      let columnIndex = '';
      for (let c = 0; c < columns.length; c++) {
        if (key === columns[c].name) {
          columnIndex = c;
          break;
        }
      }
      queryParam = key + '=' + rows[currentRowNumber][columnIndex];
    }
  }
  else {
    switch (key) {
      case 'window':
        queryParam = key + '=' + duration;
        break;
      case 'fromAndToBasedOnToday':
        let pair = getTimePairFromWindow(duration, ''),
          dateTime1 = pair.fromDate,
          dateTime2 = pair.toDate;
        queryParam = 'from=' + dateTime1 + '&to=' + dateTime2;
        break;
      case 'fromAndToBasedOnClickedDate':
        let toolText = dataObj.toolText,
          dateStringArray = toolText.split(','),
          dateString = dateStringArray[1];
        dateString = dateString.trim();

        let localTime = moment.utc(dateString).format('YYYY-MM-DD HH:mm:ss'),
          d = new Date(localTime),
          dateInUTCFormat = moment.utc(d.toUTCString()).format('YYYY-MM-DD HH:mm:ss');

        pair = getTimePairFromWindow(duration, dateInUTCFormat);
        dateTime1 = pair.fromDate;
        dateTime2 = pair.toDate;
        queryParam = 'from=' + dateTime1 + '&to=' + dateTime2;
        break;
      case 'type':
        toolText = dataObj.toolText;
        const sectionName = toolText.split(',');
        queryParam = key + '=' + (sectionName[0]).toLowerCase();
        break;
      case 'ip':
        toolText = dataObj.toolText;
        const IP = toolText.split(',');
        queryParam = key + '=' + IP[0];
        break;
      case 'country':
        let label = dataObj.label,
          countryName = label.split(','),
          countryCode = getCountryCodeByCountryName[countryName[0]];
        queryParam = key + '=' + countryCode;
        break;
      case 'scoreRange':
        if ((dataObj.datasetName).toLowerCase() === 'low') {
          queryParam = 'lowScore=' + LOW_SCORE_RANGE[0] + '&highScore=' + LOW_SCORE_RANGE[1];
        }
        else if ((dataObj.datasetName).toLowerCase() === 'medium') {
          queryParam = 'lowScore=' + MEDIUM_SCORE_RANGE[0] + '&highScore=' + MEDIUM_SCORE_RANGE[1];
        }
        else if ((dataObj.datasetName).toLowerCase() === 'high') {
          queryParam = 'lowScore=' + HIGH_SCORE_RANGE[0] + '&highScore=' + HIGH_SCORE_RANGE[1];
        }
        break;
      case 'status':
        queryParam = key + '=' + value;
        break;
      default:
        break;
    }
  }
  return queryParam;
}

export function generateClickThroughUrl(pathParams, queryParams) {
  return baseUrl + '/api/kibana/query/' + pathParams + queryParams;
}
