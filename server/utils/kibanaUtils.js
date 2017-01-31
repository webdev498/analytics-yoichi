import {
  generateQueryParams
} from '../../commons/utils/kibanaUtils';

export function generateClickThroughUrl(parameters) {
  let queryParams = generateQueryParams(parameters),
    pathParams = (parameters.pathParams).join('/');
  return '/api/kibana/query/' + pathParams + queryParams;
}

export function generateKibanaParameters(parameters) {
  let queryParams = {},
    tempQueryParams = generateQueryParams(parameters);
  tempQueryParams = tempQueryParams.replace('?', '');
  tempQueryParams = tempQueryParams.split('&');
  tempQueryParams.forEach((queryParam, index) => {
    index++;
    queryParam = queryParam.split('=');
    queryParams['detailsField' + index] = queryParam[0];
    queryParams['detailsValue' + index] = queryParam[1];
  });

  return queryParams;
}
