import {
  generateQueryParams
} from '../../commons/utils/kibanaUtils';

export function generateClickThroughUrl(parameters) {
  let queryParams = generateQueryParams(parameters),
    pathParams = (parameters.pathParams).join('/');
  return '/api/kibana/query/' + pathParams + queryParams;
}
