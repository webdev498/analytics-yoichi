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
  });
});
