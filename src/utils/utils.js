import React from 'react';

import moment from 'moment';

// Function to get Country ID by passing Country Code
export function getCountryIDByCountryCode(countryCode) {
  const getCountryIDByCountryCode = {'AG': '01', 'BS': '02', 'BB': '03', 'BZ': '04', 'CA': '05', 'CR': '06',
    'CU': '07', 'DM': '08', 'DO': '09', 'SV': '10', 'GD': '11', 'GT': '12', 'HT': '13', 'HN': '14', 'JM': '15',
    'MX': '16', 'NI': '17', 'PA': '18', 'KN': '19', 'LC': '20', 'VC': '21', 'TT': '22', 'US': '23', 'GL': '24',
    'AR': '25', 'BO': '26', 'BR': '27', 'CL': '28', 'CO': '29', 'EC': '30', 'FK': '31', 'GF': '32', 'GY': '33',
    'PY': '34', 'PE': '35', 'SR': '36', 'UY': '37', 'VE': '38', 'DZ': '39', 'AO': '40', 'BJ': '41', 'BW': '42',
    'BF': '43', 'BI': '44', 'CM': '45', 'CV': '46', 'CP': '47', 'TD': '48', 'KM': '49', 'CI': '50', 'CD': '51',
    'DJ': '52', 'EG': '53', 'GQ': '54', 'ER': '55', 'ET': '56', 'GA': '57', 'GH': '58', 'GN': '59', 'GW': '60',
    'KE': '61', 'LS': '62', 'LI': '63', 'LR': '64', 'MS': '65', 'MW': '66', 'ML': '67', 'MR': '68', 'MA': '69',
    'MZ': '70', 'NA': '71', 'NE': '72', 'NG': '73', 'RW': '74', 'ST': '75', 'SN': '76', 'SC': '77', 'SL': '78',
    'SO': '79', 'ZA': '80', 'SD': '81', 'SZ': '82', 'TZ': '83', 'TG': '84', 'TN': '85', 'UG': '86', 'WA': '87',
    'ZM': '88', 'ZW': '89', 'GM': '90', 'CG': '91', 'MI': '92', 'AF': '93', 'AM': '94', 'AZ': '95', 'BD': '96',
    'BT': '97', 'BN': '98', 'MM': '99', 'KH': '100', 'CN': '101', 'TP': '102', 'GE': '103', 'IN': '104', 'ID': '105',
    'IA': '106', 'JP': '107', 'KZ': '108', 'KP': '109', 'KR': '110', 'KG': '111', 'LA': '112', 'MY': '113',
    'MN': '114', 'NP': '115', 'PK': '116', 'PH': '117', 'RU': '118', 'SG': '119', 'LK': '120', 'TJ': '121',
    'TH': '122', 'TM': '123', 'UZ': '124', 'VN': '125', 'TW': '126', 'HK': '127', 'MO': '128', 'AL': '129',
    'AD': '130', 'AT': '131', 'BY': '132', 'BE': '133', 'BH': '134', 'BG': '135', 'HY': '136', 'CZ': '137',
    'DK': '138', 'EE': '139', 'FI': '140', 'FR': '141', 'DE': '142', 'GR': '143', 'HU': '144', 'IS': '145',
    'IR': '146', 'IT': '147', 'LV': '148', 'LN': '149', 'LT': '150', 'LU': '151', 'MK': '152', 'MT': '153',
    'MV': '154', 'MC': '155', 'MG': '156', 'NL': '157', 'NO': '158', 'PL': '159', 'PT': '160', 'RO': '161',
    'SM': '162', 'CS': '163', 'SK': '164', 'SI': '165', 'ES': '166', 'SE': '167', 'CH': '168', 'UA': '169',
    'UK': '170', 'VA': '171', 'CY': '172', 'TK': '173', 'AU': '175', 'FJ': '176', 'KI': '177', 'MH': '178',
    'FM': '179', 'NR': '180', 'NZ': '181', 'PW': '182', 'PG': '183', 'WS': '184', 'SB': '185', 'TO': '186',
    'TV': '187', 'VU': '188', 'NC': '188', 'BA': '190', 'IZ': '191', 'IE': '192', 'JO': '193', 'KU': '194',
    'LB': '195', 'OM': '196', 'QA': '197', 'SA': '198', 'SY': '199', 'AE': '200', 'YM': '201', 'PR': '202',
    'KY': '203', 'SS': '204', 'KO': '205'};

  const countryID = getCountryIDByCountryCode[countryCode];
  return countryID;
}

// Function to convert milliseconds to time
export function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  milliseconds = (milliseconds > 0) ? ': ' + milliseconds : '';

  return {
    'timeArray': [hours, minutes, seconds],
    'timeString': hours + ' : ' + minutes + ' : ' + seconds
  };
}

// Function to generate row data
export function generateRawData(fieldMapping, apiData) {
  let rawData = {};
  for (let i = 0; i < fieldMapping.length; i++) {
    let currentChartData = fieldMapping[i];
    if (apiData === null && apiData[currentChartData.reportId] === undefined) {
      return;
    }
    else {
      if (!rawData.hasOwnProperty(currentChartData.reportId)) {
        if (apiData[currentChartData.reportId] !== undefined) {
          rawData[currentChartData.reportId] = apiData[currentChartData.reportId];
        }
        else {
          rawData[currentChartData.reportId] = apiData;
        }
      }
    }
  }
  return rawData;
}

// Function to get index from column name specified in layout JSON
export function getIndexFromColumnName(currentChartDataColumns, columnsArray) {
  let columnIndex = '';
  for (let i = 0; i < currentChartDataColumns.length; i++) {
    for (let j = 0; j < columnsArray.length; j++) {
      if (currentChartDataColumns[i] === columnsArray[j].name) {
        columnIndex = j;
        break;
      }
    }
  }
  return columnIndex;
}

// Function to get column index array from column names specified in layout JSON
export function getColumnIndexArrayFromColumnName(currentChartDataColumns, columnsArray) {
  let columnIndexArray = [];
  for (let a = 0; a < currentChartDataColumns.length; a++) {
    for (let c = 0; c < columnsArray.length; c++) {
      if (currentChartDataColumns[a] === columnsArray[c].name) {
        columnIndexArray[a] = c;
        break;
      }
    }
  }
  return columnIndexArray;
}

// Function to get x and y indexes from column names specified in layout JSON
export function getXYIndexFromColumnNames(currentChartDataColumns, columnsArray) {
  let xColumnIndex = '',
    yColumnIndex = '';
  for (let c = 0; c < columnsArray.length; c++) {
    if (currentChartDataColumns[0] === columnsArray[c].name) {
      xColumnIndex = c;
    }
    if (currentChartDataColumns[1] === columnsArray[c].name) {
      yColumnIndex = c;
    }
  }
  return [xColumnIndex, yColumnIndex];
}

// Function to get index from object name specified in layout JSON
export function getIndexFromObjectName(inputArray) {
  let {fieldName, fieldValueArray, fieldValue, dataArray} = inputArray;
  if (fieldName.indexOf('.') > -1) {
    fieldValueArray = fieldName.split('.');
  }
  else {
    fieldValueArray = [fieldName];
  }

  for (let v = 0; v < fieldValueArray.length; v++) {
    if (v === 0) {
      fieldValue = dataArray[fieldValueArray[v]];
      if (fieldValue === undefined) {
        fieldValue = '';
        break;
      }
    }
    else {
      fieldValue = fieldValue[fieldValueArray[v]];
      if (fieldValue === undefined) {
        fieldValue = '';
        break;
      }
    }
  }
  return fieldValue;
}

// Function to check for undefined chartOption object
export function checkForUndefinedChartOptionObject(chartOptions, objectName, defaultValue) {
  let value = defaultValue;
  if (!isUndefined(chartOptions) && chartOptions[objectName] !== undefined) {
    value = chartOptions[objectName];
  }
  return value;
}

// Function to translate time window
export function translateTimeWindow(window) {
  if (window === '1 hour') return '1h';
  if (window === '6 hour') return '6h';
  if (window === '12 hour') return '12h';
  if (window === '1 day') return '1d';
  if (window === '1 week') return '1w';
  if (window === '1 month') return '1mo';
  if (window === '1h') return '1 hour';
  if (window === '6h') return '6 hour';
  if (window === '12h') return '12 hour';
  if (window === '1d') return '1 day';
  if (window === '1w') return '1 week';
  if (window === '1mo') return '1 month';
  return window;
}

export function isUndefined(value) {
  if (value === undefined) {
    return true;
  }
  else {
    return false;
  }
}

function addZero(x, n) {
  while (x.toString().length < n) {
    x = '0' + x;
  }
  return x;
}

// Format Date in YYYY-MM-DDThh:mm:ss format
export function formatDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;// January is 0!
  let yyyy = (date.getFullYear());
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  let hh = addZero(date.getHours(), 2);
  let min = addZero(date.getMinutes(), 2);
  let ss = addZero(date.getSeconds(), 2);
  let milisec = addZero(date.getMilliseconds(), 3);
  if (milisec !== '' || milisec !== 0 || milisec !== '0') milisec = '.' + milisec;

  let formattedDateString = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min + ':' + ss + milisec;

  return formattedDateString;
}

// function to format Date In Local TimeZone
export function formatDateInLocalTimeZone(value) {
  let value1 = moment.utc(value).format('YYYY-MM-DD HH:mm:ss.SSS'),
    localDateTime = moment.utc(value1).toDate(),
    localDate = moment(localDateTime).format('DD MMM YYYY'),
    localTime = moment(localDateTime).format('HH:mm:ss.SSS');
  return {
    date: localDate,
    time: localTime
  };
}

// Function to get from and to dates for the specific time window
export function getTimePairFromWindow(timeWindow, dateString) {
  let dateString1 = '',
    dateString2 = '';

  if (dateString !== '') {
    dateString = dateString.replace(/-/g, '/');
    let dateParameter = new Date(Date.parse((dateString).toString()));
    dateString1 = formatDate(dateParameter);

    let timeDifference = 5;// default 5 minutes time difference
    if (timeWindow === '1h') {
      timeDifference = 5;// i.e. 5 minutes difference
    }
    if (timeWindow === '6h') {
      timeDifference = 15;// i.e. 15 minutes difference
    }
    if (timeWindow === '12h') {
      timeDifference = 30;// i.e. 30 minutes difference
    }
    if (timeWindow === '1d') {
      timeDifference = 60;// i.e. 1 hour difference
    }
    if (timeWindow === '1w') {
      timeDifference = 1440;// i.e. 1 day difference
    }
    if (timeWindow === '1mo') {
      timeDifference = 10080;// i.e. 1 week difference
    }

    let toDate = dateParameter;
    toDate.setMinutes(toDate.getMinutes() + timeDifference);
    dateString2 = formatDate(toDate);

    let dateTimePair = {fromDate: dateString1, toDate: dateString2};
    return dateTimePair;
  }
  else {
    let todayDate = new Date();
    dateString1 = formatDate(todayDate);
    let fromDate = todayDate;

    if (timeWindow === '1h') {
      fromDate.setHours(todayDate.getHours() - 1);
    }
    if (timeWindow === '6h') {
      fromDate.setHours(todayDate.getHours() - 6);
    }
    if (timeWindow === '12h') {
      fromDate.setHours(todayDate.getHours() - 12);
    }
    if (timeWindow === '1d') {
      fromDate.setDate(todayDate.getDate() - 1);
    }
    if (timeWindow === '1w') {
      fromDate.setDate(todayDate.getDate() - 7);
    }
    if (timeWindow === '1mo') {
      fromDate.setMonth(todayDate.getMonth() - 1);
    }

    dateString2 = formatDate(fromDate);

    let dateTimePair = {fromDate: dateString2, toDate: dateString1};
    return dateTimePair;
  }
}

export const getCountryCodeByCountryName = {'Antigua and Barbuda': 'AG', 'Bahamas': 'BS', 'Barbados': 'BB',
  'Belize': 'BZ', 'Canada': 'CA', 'Costa Rica': 'CR', 'Cuba': 'CU', 'Dominica': 'DM', 'DominicanRep.': 'DO',
  'El Salvador': 'SV', 'Grenada': 'GD', 'Guatemala': 'GT', 'Haiti': 'HT', 'Honduras': 'HN', 'Jamaica': 'JM',
  'Mexico': 'MX', 'Nicaragua': 'NI', 'Panama': 'PA', 'St. Kitts &Nevis': 'KN', 'St. Lucia': 'LC',
  'St. Vincent & the Grenadines': 'VC', 'Trinidad & Tobago': 'TT', 'United States': 'US', 'Greenland': 'GL',
  'Argentina': 'AR', 'Bolivia': 'BO', 'Brazil': 'BR', 'Chile': 'CL', 'Colombia': 'CO', 'Ecuador': 'EC',
  'Falkland Islands': 'FK', 'French Guiana': 'GF', 'Guyana': 'GY', 'Paraguay': 'PY', 'Peru': 'PE',
  'Suriname': 'SR', 'Uruguay': 'UY', 'Venezuela': 'VE', 'Algeria': 'DZ', 'Angola': 'AO', 'Benin': 'BJ',
  'Botswna': 'BW', 'Burkina Faso': 'BF', 'Burundi': 'BI',
  'Cameroon': 'CM', 'Cape Verde': 'CV', 'Central African Republic': 'CP', 'Chad': 'TD', 'Comoros': 'KM',
  'Cote dIvoire': 'CI', 'Democratic Republic of the Congo': 'CD', 'Djibouti': 'DJ', 'Egypt': 'EG',
  'Equatorial Guinea': 'GQ', 'Eritrea': 'ER', 'Ethiopia': 'ET', 'Gabon': 'GA', 'Ghana': 'GH', 'Guinea': 'GN',
  'Guinea-Bissau': 'GW', 'Kenya': 'KE', 'Lesotho': 'LS', 'Liberia': 'LI', 'Liya': 'LR', 'Madagascar': 'MS',
  'Malawi': 'MW', 'Mali': 'ML', 'Mauritania': 'MR', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Namibia': 'NA',
  'Niger': 'NE', 'Nigeria': 'NG', 'Rwana': 'RW', 'Sao Tome and Principe': 'ST', 'Senegal': 'SN', 'Seychelles': 'SC',
  'Sierra Leone': 'SL', 'Somalia': 'SO', 'South Africa': 'ZA', 'Sudan': 'SD', 'Swaziland': 'SZ', 'Tanzania': 'TZ',
  'Togo': 'TG', 'Tunisia': 'TN', 'Uganda': 'UG', 'Western Sahara': 'WA', 'Zambia': 'ZM', 'Zimbabwe': 'ZW',
  'Gambia': 'GM', 'Congo': 'CG', 'Mauritius': 'MI', 'Afghanistan': 'AF', 'Armenia': 'AM', 'Azerbaijan': 'AZ',
  'Bangladesh': 'BD', 'Bhutan': 'BT', 'Brunei': 'BN', 'Burma (Myanmar)': 'MM', 'Cambodia': 'KH', 'China': 'CN',
  'East Timor': 'TP', 'Georgia': 'GE', 'India': 'IN', 'Indonesia': 'ID', 'Iran': 'IA', 'Japan': 'JP',
  'Kazakhstan': 'KZ', 'Korea (north)': 'KP', 'Korea (south)': 'KR', 'Kyrgyzstan': 'KG', 'Laos': 'LA',
  'Malaysia': 'MY', 'Mongolia': 'MN', 'Nepal': 'NP', 'Pakistan': 'PK', 'Philippines': 'PH', 'Russia': 'RU',
  'Singapore': 'G', 'Sri Lanka': 'LK', 'Tajikistan': 'TJ', 'Thailand': 'TH', 'Turkmenistan': 'TM', 'Uzbekistan': 'UZ',
  'Vietnam': 'VN', 'Taiwan': 'TW', 'Hong Kong': 'HK', 'Macau': 'MO', 'Albania': 'AL', 'Andorra': 'AD',
  'Austria': 'AT', 'Belarus': 'BY', 'Belgium': 'BE', 'Bosnia and Herzegovina': 'BH', 'Bulgaria': 'BG',
  'Croatia': 'HY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Estonia': 'EE', 'Finland': 'FI', 'France': 'FR',
  'Germany': 'DE', 'Greece': 'GR', 'Hungary': 'HU', 'Iceland': 'IS', 'Ireland': 'IR', 'Itly': 'IT', 'Latvia': 'LV',
  'Liechtenstein': 'LN', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Macedonia': 'MK', 'Malta': 'MT', 'Moldova': 'MV',
  'Monaco': 'MC', 'Montenegro': 'G', 'Netherlands': 'NL', 'Norway': 'NO', 'Poland': 'PL', 'Portugal': 'PT',
  'Romania': 'RO', 'San Marino': 'SM', 'Serbia': 'CS', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Spain': 'ES',
  'Sweden': 'SE', 'Switzerland': 'CH', 'Ukraine': 'UA', 'United Kingdom': 'UK', 'VaticanCity ': 'VA', 'Cyprus': 'CY',
  'Turkey': 'TK', 'Australia': 'AU', 'Fiji': 'FJ', 'Kiribati': 'KI', 'Marshall Islands': 'MH', 'Micronesia': 'FM',
  'Nauru': 'NR', 'New Zealand': 'NZ', 'Palau': 'PW', 'Papua New Guinea': 'PG', 'Samoa': 'WS', 'Solomon Islands': 'SB',
  'Tonga': 'TO', 'Tuvalu': 'TV', 'Vanuatu': 'VU', 'New Caledonia': 'NC', 'Bahrain': 'BA', 'Iraq': 'IZ', 'Israel': 'IE',
  'Jordan': 'JO', 'Kuwait': 'KU', 'Lebanon': 'LB', 'Oman': 'OM', 'Qatar': 'QA', 'Saudi Arabia': 'SA', 'Syria': 'SY',
  'UnitedArabEmirates': 'AE', 'Yemen': 'YM', 'Puerto Rico': 'PR', 'Cayman Islands': 'KY', 'South Sudan': 'SS',
  'Kosovo': 'KO'};

export const getCountryNameByCountryCode = {'AD': 'Andorra', 'AE': 'United Arab Emirates', 'AF': 'Afghanistan',
  'AG': 'Antigua and Barbuda', 'AI': 'Anguilla', 'AL': 'Albania', 'AM': 'Armenia', 'AN': 'Netherland Antilles',
  'AO': 'Angola', 'AQ': 'Antarctica', 'AR': 'Argentina', 'AS': 'American Samoa', 'AT': 'Austria', 'AU': 'Australia',
  'AW': 'Aruba', 'AZ': 'Azerbaidjan', 'BA': 'Bosnia-Herzegovina', 'BB': 'Barbados', 'BD': 'Banglades', 'BE': 'Belgium',
  'BF': 'Burkina Faso', 'BG': 'Bulgaria', 'BH': 'Bahrain', 'BI': 'Burundi', 'BJ': 'Benin', 'BM': 'Bermuda',
  'BN': 'Brunei Darussalam', 'BO': 'Bolivia', 'BR': 'Brazil', 'BS': 'Bahamas', 'BT': 'Buthan', 'BV': 'Bouvet Island',
  'BW': 'Botswana', 'BY': 'Belarus', 'BZ': 'Belize', 'CA': 'Canada', 'CC': 'Cocos (Keeling) Isl.',
  'CF': 'Central African Rep.', 'CG': 'Congo', 'CH': 'Switzerland', 'CI': 'Ivory Coast', 'CK': 'Cook Islands',
  'CL': 'Chile', 'CM': 'Cameroon', 'CN': 'China', 'CO': 'Colombia', 'CR': 'Costa Rica', 'CS': 'Czechoslovakia',
  'CU': 'Cuba', 'CV': 'Cape Verde', 'CX': 'Christmas Island', 'CY': 'Cyprus', 'CZ': 'Czech Republic', 'DE': 'Germany',
  'DJ': 'Djibouti', 'DK': 'Denmark', 'DM': 'Dominica', 'DO': 'Dominican Republic', 'DZ': 'Algeria', 'EC': 'Ecuador',
  'EE': 'Estonia', 'EG': 'Egypt', 'EH': 'Western Sahara', 'ES': 'Spain', 'ET': 'Ethiopia', 'FI': 'Finland',
  'FJ': 'Fiji', 'FK': 'Falkland Isl.(Malvinas)', 'FM': 'Micronesia', 'FO': 'Faroe Islands', 'FR': 'France',
  'FX': 'France (European Ter.)', 'GA': 'Gabon', 'GB': 'Great Britain (UK)', 'GD': 'Grenada', 'GE': 'Georgia',
  'GH': 'Ghana', 'GI': 'Gibraltar', 'GL': 'Greenland', 'GP': 'Guadeloupe (Fr.)', 'GQ': 'Equatorial Guinea',
  'GF': 'Guyana (Fr.)', 'GM': 'Gambia', 'GN': 'Guinea', 'GR': 'Greece', 'GT': 'Guatemala', 'GU': 'Guam (US)',
  'GW': 'Guinea Bissau', 'GY': 'Guyana', 'HK': 'Hong Kong', 'HM': 'Heard', '': 'amp; McDonald Isl.', 'HN': 'Honduras',
  'HR': 'Croatia', 'HT': 'Haiti', 'HU': 'Hungary', 'ID': 'Indonesia', 'IE': 'Ireland', 'IL': 'Israel', 'IN': 'India',
  'IO': 'British Indian O.', 'Ter': '.', 'IQ': 'Iraq', 'IR': 'Iran', 'IS': 'Iceland', 'IT': 'Italy', 'JM': 'Jamaica',
  'JO': 'Jordan', 'JP': 'Japan', 'KE': 'Kenya', 'KG': 'Kirgistan', 'KH': 'Cambodia', 'KI': 'Kiribati', 'KM': 'Comoros',
  'KN': 'St.Kitts Nevis Anguilla', 'KP': 'Korea (North)', 'KR': 'Korea (South)', 'KW': 'Kuwait',
  'KY': 'Cayman Islands', 'KZ': 'Kazachstan', 'LA': 'Laos', 'LB': 'Lebanon', 'LC': 'Saint Lucia',
  'LI': 'Liechtenstein', 'LK': 'Sri Lanka', 'LR': 'Liberia', 'LS': 'Lesotho', 'LT': 'Lithuania', 'LU': 'Luxembourg',
  'LV': 'Latvia', 'LY': 'Libya', 'MA': 'Morocco', 'MC': 'Monaco', 'MD': 'Moldavia', 'MG': 'M', 'dagasca': '',
  'MH': 'Marshall Islands', 'ML': 'Mali', 'MM': 'Myanmar', 'MN': 'Mongolia', 'MO': 'Macau',
  'MP': 'Northern Mariana Isl.', 'MQ': 'Martinique (Fr.)', 'MR': 'Mauritania', 'MS': 'Montserrat', 'MT': 'Malta',
  'MU': 'Mauritius', 'MV': 'Maldives', 'MW': 'Malawi', 'MX': 'Mexico', 'MY': 'Malaysia', 'MZ': 'Mozambique',
  'NA': 'Namibia', 'NC': 'New Caledonia (Fr.)', 'NE': 'Niger', 'NF': 'Norfolk Island', 'NG': 'Nigeria',
  'NI': 'Nicaragua', 'NL': 'Netherlands', 'NO': 'Norway', 'NP': 'Nepal', 'NR': 'Nauru', 'NT': 'Neutral Zone',
  'NU': 'Niue', 'NZ': 'New Zealand', 'OM': 'Oman', 'PA': 'Panama', 'PE': 'Peru', 'PF': 'Polynesia (Fr.)',
  'PG': 'Papua New', 'PH': 'Philippines', 'PK': 'Pakistan', 'PL': 'Poland', 'PM': 'St.', 'Pierre': '&amp; Miquelon',
  'PN': 'Pitcairn', 'PT': 'Portugal', 'PR': 'Puerto Rico (US)', 'PW': 'Palau', 'PY': 'Paraguay', 'QA': 'Qatar',
  'RE': 'Reunion (Fr.)', 'RO': 'Romania', 'RU': 'Russian Federation', 'RW': 'Rwanda', 'SA': 'Saudi Arabia',
  'SB': 'Solomon Islands', 'SC': 'Seychelles', 'SD': 'Sudan', 'SE': 'Sweden', 'SG': 'Singapore', 'SH': 'St. Helena',
  'SI': 'Slovenia', 'SJ': 'Svalbard &amp;', 'Jan': 'Mayen Is', 'SK': 'Slovak Republic',
  'SL': 'Sierra Leone', 'SM': 'San Marino', 'SN': 'Senegal', 'SO': 'Somalia', 'SR': 'Suriname', 'ST': 'St. Tome and',
  'Princip': '', 'SU': 'Soviet Union', 'SV': 'El Salvador', 'SY': 'Syria', 'SZ': 'Swaziland',
  'TC': 'Turks &amp; Caicos Islands', 'TD': 'Chad', 'TF': 'French', 'Southern': 'Terr.', 'TG': 'Togo',
  'TH': 'Thailand', 'TJ': 'Tadjikistan', 'TK': 'Tokelau', 'TM': 'Turkmenistan', 'TN': 'Tunisia', 'TO': 'Tonga',
  'TP': 'East Timor', 'TR': 'Turkey', 'TT': 'Trinidad &amp; Tobago', 'TV': 'Tuvalu', 'TW': 'Taiwan', 'TZ': 'Tanzania',
  'UA': 'Ukraine', 'UG': 'Uganda', 'UK': 'United Kingdom', 'UM': 'US Minor outlying Isl.', 'US': 'United States',
  'UY': 'Uruguay', 'UZ': 'Uzbekistan', 'VA': 'Vatican City State', 'VC': 'St.Vincent &amp; Grenadines',
  'VE': 'Venezuela', 'VG': 'Virgin Islands (British)', 'VI': 'Virgin Islands (US)', 'VN': 'Vietnam', 'VU': 'Vanuatu',
  'WF': 'Wallis &amp; Futuna Islands', 'WS': 'Samoa', 'YE': 'Yemen', 'YU': 'Yugoslavia', 'ZA': 'South Africa',
  'ZM': 'Zambia', 'ZR': 'Zaire', 'ZW': 'Zimbabwe'};

export function getColorRanges(secureConnectionsValues, maliciousConnectionsValues) {
  const secureColors = [
      '#2BD8D0',
      '#51DFD8',
      '#71E5DF',
      '#97ECE8',
      '#BAF2F0',
      '#DBF8F7'
    ],
    maliciousColors = [
      '#F69275',
      '#F7A48B',
      '#F9B6A2',
      '#F8CABB',
      '#FCDBD2',
      '#FEEDE8'
    ];
  let secureMaxValue = Math.max.apply(Math, secureConnectionsValues),
    maliciousMaxValue = Math.max.apply(Math, maliciousConnectionsValues),
    secureMidValue = parseInt(secureMaxValue / 6) + 1,
    maliciousMidValue = parseInt(maliciousMaxValue / 6) + 1,
    minSecureRange = 1,
    minMaliciousRange = 1,
    colorIndex = 5,
    secureColorRanges = [],
    maliciousColorRanges = [];

  for (let m = 0; m < 6; m++) {
    let tempColorObj = {};
    if (m === 0) {
      tempColorObj.min = minSecureRange;
    }
    else {
      tempColorObj.min = minSecureRange + 1;
    }
    tempColorObj.max = minSecureRange + secureMidValue;
    minSecureRange = tempColorObj.max;
    tempColorObj.color = secureColors[colorIndex];
    secureColorRanges.push(tempColorObj);

    tempColorObj = {};
    if (m === 0) {
      tempColorObj.min = minMaliciousRange;
    }
    else {
      tempColorObj.min = minMaliciousRange + 1;
    }
    tempColorObj.max = minMaliciousRange + maliciousMidValue;
    minMaliciousRange = tempColorObj.max;
    tempColorObj.color = maliciousColors[colorIndex];
    maliciousColorRanges.push(tempColorObj);

    colorIndex--;
  }
  return {
    secure: secureColorRanges,
    malicious: maliciousColorRanges
  };
}

function numberToReactElm(val, text, {numberStyle, textStyle} = {}) {
  return (
    <span>
      <span style={numberStyle}>{val}</span>
      <span style={textStyle}>{text}</span>
    </span>
  );
}

export function formatBytes(bytes, decimals, {numberStyle, textStyle} = {}) {
  if (bytes === '' || bytes === undefined) return '-';

  if (bytes === 0) {
    if (numberStyle) {
      return numberToReactElm(0, 'Byte', {numberStyle, textStyle});
    }
    else {
      return '0 Byte';
    }
  }

  const k = 1000,
    dm = decimals + 1 || 3,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  const val = (bytes / Math.pow(k, i)).toPrecision(dm),
    text = sizes[i];

  // if custom sytles are provided then return React Element.
  if (numberStyle) {
    return numberToReactElm(val, text, {numberStyle, textStyle});
  }
  return val + ' ' + text;
};

export function formatMicroseconds(miliseconds) {
  if (miliseconds === 0) return 0;

  var seconds = Math.floor(miliseconds / 1000);
  var days = Math.floor(seconds / 86400);
  var hours = Math.floor((seconds % 86400) / 3600);
  var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
  var timeString = '';
  if (days > 0) timeString += (days > 1) ? (days + ' days ') : (days + ' day ');
  if (hours > 0) timeString += (hours > 1) ? (hours + ' hours ') : (hours + ' hour ');
  if (minutes > 0) timeString += (minutes > 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
  if (seconds > 0) timeString += (seconds > 1) ? (seconds + ' seconds ') : (seconds + ' second ');
  var ms = miliseconds % 1000;
  if (ms >= 0) timeString += (ms + ' ms');

  return timeString;// Math.floor(timeString / 1000);
}

export function kFormatter(num) {
  return num > 999 ? (num / 1000).toFixed(2) + 'k' : num;
}

export function firstCharCapitalize(string) {
  if (string === undefined) {
    return string;
  }
  if (string !== undefined && string.toLowerCase() === 'ip') {
    return string.toUpperCase();
  }
  if (string.indexOf('_') > -1) {
    string = string.replace('_', ' ');
  }

  string = string.toLowerCase().replace(/\b\w/g, function(m) {
    return m.toUpperCase();
  });

  if (string.indexOf(' Ip') > -1) {
    string = string.replace(' Ip', ' IP');
  }
  return string;
};

export function nFormatter(num, digits, {numberStyle, textStyle}) {
  const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'k' }
    ],
    rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      const digits = (num / si[i].value).toFixed(digits).replace(rx, '$1'),
        text = si[i].symbol;
      if (numberStyle) {
        return numberToReactElm(digits, text);
      }
      else {
        return digits + text;
      }
    }
  }

  return num.toFixed(digits).replace(rx, '$1');
}

export function parseQuery(qstr) {
  const query = {},
    arr = qstr.substr(1).split('&');

  arr.forEach((val) => {
    const b = val.split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  });

  return query;
}

export function getEventTypeString(typeName) {
  var typeString = '';
  if (typeName.indexOf('conn') > -1) typeString = 'Connection';
  else if (typeName.indexOf('ssh') > -1) typeString = 'SSH';
  else if (typeName.indexOf('dns') > -1) typeString = 'DNS';
  else if (typeName.indexOf('http') > -1) typeString = 'HTTP';
  else if (typeName.indexOf('ssl') > -1) typeString = 'SSL';
  else if (typeName.indexOf('files') > -1) typeString = 'File';
  else if (typeName.indexOf('rank_alert') > -1) typeString = 'Rank Alert';
  else if (typeName.indexOf('alert') > -1) typeString = 'Alert';
  else if (typeName.indexOf('sysmon') > -1) typeString = 'Sysmon';
  else if (typeName.indexOf('report') > -1) typeString = 'Report';
  else typeString = 'Other';
  return typeString;
}
