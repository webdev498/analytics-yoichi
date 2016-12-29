import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA,
  ERROR_API_DATA,
  TIME_INTERVAL_UPDATE,
  PARENT_CARD_EVENT,
  REMOVE_COMPONENT
} from 'Constants';

import {
  requestApiData,
  receiveApiData,
  errorApiData,
  changeTimeRange,
  componentEvent,
  removeComponentWithId,
  getUrl
} from 'actions/ParentCard';

import {baseUrl} from 'config';

function getApiObj(path, query, pathParams) {
  return {
    path: path || '/api',
    queryParams: Object.assign({}, query),
    pathParams: Object.assign({}, pathParams)
  };
}

describe('ParentCard Actions', () => {
  it('should return the state for REQUEST_API_DATA', () => {
    const id = 'testId',
      api = {test: 'value'},
      requestApiState = requestApiData(id, api);

    expect(requestApiState).to.be.an.object;
    expect(requestApiState).to.have.a.property('type', REQUEST_API_DATA);
    expect(requestApiState).to.have.a.property('id', id);
    expect(requestApiState).to.have.a.property('api', api);
  });

  it('should return the state for RECEIVE_API_DATA', () => {
    const id = 'testId',
      data = {test: 'value'},
      responseApiState = receiveApiData(id, data);

    expect(responseApiState).to.be.an.object;
    expect(responseApiState).to.have.a.property('type', RECEIVE_API_DATA);
    expect(responseApiState).to.have.a.property('id', id);
    expect(responseApiState).to.have.a.property('data', data);
  });

  it('should return the state for ERROR_API_DATA', () => {
    const id = 'testId',
      errorData = {test: 'value'},
      api = {test2: 'value2'},
      errorApiState = errorApiData(id, errorData, api);

    expect(errorApiState).to.be.an.object;
    expect(errorApiState).to.have.a.property('type', ERROR_API_DATA);
    expect(errorApiState).to.have.a.property('id', id);
    expect(errorApiState).to.have.a.property('errorData', errorData);
  });

  it('should return the state for TIME_INTERVAL_UPDATE', () => {
    const data = {duration: '1d'},
      changeTimeState = changeTimeRange(data);

    expect(changeTimeState).to.be.an.object;
    expect(changeTimeState).to.have.a.property('type', TIME_INTERVAL_UPDATE);
    expect(changeTimeState).to.have.a.property('data', data);
  });

  it('should return the state for PARENT_CARD_EVENT', () => {
    const id = 'testId',
      data = {test: 'value'},
      parentCardEventState = componentEvent(id, data);

    expect(parentCardEventState).to.be.an.object;
    expect(parentCardEventState).to.have.a.property('id', id);
    expect(parentCardEventState).to.have.a.property('type', PARENT_CARD_EVENT);
    expect(parentCardEventState).to.have.a.property('eventData', data);
  });

  it('should return the state for REMOVE_COMPONENT', () => {
    const id = 'testId',
      data = {test: 'value'},
      removeComponentState = removeComponentWithId(id, data);

    expect(removeComponentState).to.be.an.object;
    expect(removeComponentState).to.have.a.property('id', id);
    expect(removeComponentState).to.have.a.property('type', REMOVE_COMPONENT);
  });

  describe('getUrl function', () => {
    it('should throw an error if api param is not passed', () => {
      try { getUrl(); }
      catch (ex) {
        expect(ex).to.be.an.object;
      }
    });

    it('should return empty string if api object does not have either of queryParams, path, or pathParams', () => {
      const api = {},
        url = getUrl(api);

      expect(url).to.be.equal('');
    });

    it('should return the path string as url, if queryParams, and pathParams are empty object', () => {
      const api = getApiObj(),
        url = getUrl(api);

      expect(url).to.be.a('string');
      expect(url).to.equal(baseUrl + api.path);
    });

    it('should return url with string substitutions by pathParams value', () => {
      const api = getApiObj('/api/{placeholder}', null, {placeholder: 'test'}),
        url = getUrl(api);

      expect(url).to.be.a('string');
      expect(url).to.equal(baseUrl + '/api/test');
    });

    it('should use routerParams for string substitutions', () => {
      const api = getApiObj('/api/alert/{alertId}', null, {alertId: ':pathParam'}),
        routerParams = {alertId: 'alertId'},
        url = getUrl(api, null, routerParams);

      expect(url).to.equal(`${baseUrl}/api/alert/${routerParams.alertId}`);
    });

    it('should use both routerParams and pathParams for string substitutions in path string', () => {
      const api = getApiObj('/api/alert/{alertId}/{other}', null, {alertId: ':pathParam', other: 'test'}),
        routerParams = {alertId: 'alertId'},
        url = getUrl(api, null, routerParams);

      expect(url).to.equal(`${baseUrl}/api/alert/${routerParams.alertId}/test`);
    });

    it('should add query string as provided by queryParams', () => {
      const api = getApiObj('/api/alert', {a: '1', b: '2'}),
        url = getUrl(api);

      expect(url).to.equal(`${baseUrl}/api/alert?a=1&b=2`);
    });

    it('should add query to url with string substitutions for query keys using routerParams', () => {
      const query = {'type:pathParam': 'assetId:pathParam', a: 1},
        routerParams = {type: 'test', assetId: 'testId'},
        api = getApiObj('/api/alert', query),
        url = getUrl(api, '1h', routerParams);

      expect(url).to.equal(`${baseUrl}/api/alert?${routerParams.type}=${routerParams.assetId}&a=1`);
    });

    it('should add duration of 1d for query window and timeShift', () => {
      const query = {window: '', timeShift: ''},
        api = getApiObj('/api/alert', query),
        url = getUrl(api, '1d');

      expect(url).to.equal(`${baseUrl}/api/alert?window=1d&timeShift=1d`);
    });

    it('should add query string with string substitutions for query values using routerParams', () => {
      const query = { date: 'date:pathParam', window: '' },
        routerParams = {date: '12/11/2006'},
        api = getApiObj('/api/alert', query),
        url = getUrl(api, '1d', routerParams);

      expect(url).to.equal(`${baseUrl}/api/alert?date=${routerParams.date}&window=1d`);
    });

    it('should return url with path substitutions, query substitutions, and window duration', () => {
      const query = { date: 'date:pathParam', window: '', 'type:pathParam': 'assetId:pathParam' },
        routerParams = {date: '12/11/2006', type: 'test', assetId: 'testId'},
        api = getApiObj('/api/alert', query),
        url = getUrl(api, '1d', routerParams),
        str = `${baseUrl}/api/alert?date=${routerParams.date}&window=1d&${routerParams.type}=${routerParams.assetId}`;

      expect(url).to.equal(str);
    });
  });
});