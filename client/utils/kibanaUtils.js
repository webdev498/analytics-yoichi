import {
  generateQueryParams
} from '../../commons/utils/kibanaUtils';

const kibanaBaseUrl = (window.global && window.global.kibanaBaseUrl) ? window.global.kibanaBaseUrl : '/';

export function generateClickThroughUrl(parameters) {
  let queryParams = generateQueryParams(parameters),
    pathParams = (parameters.pathParams).join('/');
  return kibanaBaseUrl + '/api/kibana/query/' + pathParams + queryParams;
}
