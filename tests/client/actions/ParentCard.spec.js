import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {fakeServer, spy} from 'sinon';
import {Map, fromJS} from 'immutable';

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
  getUrl,
  callApi,
  fetchApiData,
  updateApiData,
  broadcastEvent,
  removeComponent
} from 'actions/ParentCard';

import {baseUrl} from 'config';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

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

  context('getUrl function', () => {
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

  context('callApi function', () => {
    let server, dispatch;

    const api = {
        path: '/api/{reportId}',
        pathParams: { reportId: 'test' },
        queryParams: {}
      },
      params = {},
      json = { total: 0, next: -1, rows: [], columns: [] },
      jsonRes = JSON.stringify(json);

    beforeEach(function() {
      server = fakeServer.create();
      dispatch = spy();
    });

    afterEach(function() {
      server.restore();
    });

    it('should have authorization and other set headers in the request', () => {
      server.respondWith('GET', `${baseUrl}/api/test`, function(req) {
        expect(req).to.have.a.property('errorFlag', false);
        expect(req).to.have.a.property('requestHeaders');

        const headers = req.requestHeaders;
        expect(headers).to.have.a.property('authorization');
        expect(headers.authorization).to.be.a('string');
        expect(headers).to.have.a.property('a', '1');
        expect(headers).to.have.a.property('content-type': 'application/json');

        req.respond(200, { 'Content-Type': 'application/json' }, jsonRes);
      });

      const apiJSON = Object.assign({}, api, {headers: {a: 1}}),
        apiObj = callApi(apiJSON, '1h', params, {}, dispatch);
      server.respond();
      return apiObj;
    });

    it('should make the get request', () => {
      server.respondWith('GET', `${baseUrl}/api/test`, [ 200, { 'Content-Type': 'application/json' }, jsonRes ]);

      const apiObj = callApi(api, '1h', params, {}, dispatch)
        .then(res => {
          expect(res).to.be.an.object;
          expect(res).to.deep.equal(json);
          expect(dispatch.callCount).to.equal(0);
        });

      server.respond();
      return apiObj;
    });

    it('should throw error response for 400 response', () => {
      server.respondWith('GET', `${baseUrl}/api/test`, [ 400, { 'Content-Type': 'application/json' }, jsonRes ]);

      const apiObj = callApi(api, '1h', params, {}, dispatch)
        .then(res => {
          throw new Error({message: 'This should not be called'});
        })
        .catch(ex => {
          expect(ex).to.be.an.object;
          expect(ex.constructor).to.equal(Error);

          const res = ex.response;
          expect(res).to.have.a.property('status', 400);
          expect(res).to.have.a.property('ok', false);
          expect(dispatch.callCount).to.equal(0);
        });

      server.respond();
      return apiObj;
    });

    it('should make POST request', () => {
      server.respondWith('POST', `${baseUrl}/api/test`, [ 200, {'Content-Type': 'application/json'}, jsonRes ]);

      const postApi = Object.assign({}, api, {method: 'POST'});
      const apiObj = callApi(postApi, '1h', params, {body: {a: 1}}, dispatch)
        .then(res => {
          expect(res).to.be.an.object;
          expect(res).to.deep.equal(json);
          expect(dispatch.callCount).to.equal(0);
        });

      server.respond();
      return apiObj;
    });

    it('should call logoutUtil, if the reponse is 401', () => {
      server.respondWith('GET', `${baseUrl}/api/test`, [ 401, { 'Content-Type': 'application/json' }, jsonRes ]);

      const apiObj = callApi(api, '1h', params, {}, dispatch)
        .then(res => {
          expect(dispatch).to.be.called;

          const firstCallArgs = dispatch.firstCall.args[0];
          expect(firstCallArgs).to.have.a.property('type', 'SET_COOKIES');
          expect(firstCallArgs).to.have.a.property('data', null);
        });

      server.respond();
      return apiObj;
    });
  });

  context('fetchApiData function', () => {
    let server, id, apiData, auth, store;

    const api = {
        path: '/api/{reportId}',
        pathParams: { reportId: 'test' },
        queryParams: {}
      },
      params = {},
      json = { total: 0, next: -1, rows: [], columns: [] },
      jsonRes = JSON.stringify(json);

    beforeEach(function() {
      server = fakeServer.create();
      id = 'testId';
      apiData = fromJS({duration: '1h', components: {}});
      auth = { cookies: { access_token: '', token_type: '' } };
      store = mockStore({ apiData, auth });
    });

    afterEach(function() {
      server.restore();
    });

    it('should dispatch REQUEST_API_DATA state', () => {
      server.respondWith('GET', `${baseUrl}/api/test`, [ 200, { 'Content-Type': 'application/json' }, jsonRes ]);

      const dispatchCall = store.dispatch(fetchApiData(id, api, params, {})),
        actions = store.getActions(),
        requestAction = actions[0];

      expect(actions).to.have.length(1);
      expect(requestAction).to.have.a.property('type', REQUEST_API_DATA);
      expect(requestAction).to.have.a.property('id', id);
      expect(requestAction).to.have.a.property('api');

      server.respond();
      return dispatchCall;
    });

    it('should dispatch RECEIVE_API_DATA state, after REQUEST_API_DATA', () => {
      server.respondWith('GET', `${baseUrl}/api/test`, [ 200, { 'Content-Type': 'application/json' }, jsonRes ]);

      const dispatchCall = store.dispatch(fetchApiData(id, api, params, {}))
        .then(res => {
          const actions = store.getActions(),
            requestAction = actions[0],
            responseAction = actions[1];

          expect(actions).to.have.length(2);

          expect(requestAction).to.have.a.property('type', 'REQUEST_API_DATA');
          expect(requestAction).to.have.a.property('id', id);
          expect(requestAction).to.have.a.property('api');

          expect(responseAction).to.have.a.property('type', 'RECEIVE_API_DATA');
          expect(responseAction).to.have.a.property('id', id);
          expect(responseAction).to.have.a.property('data');
        });

      server.respond();
      return dispatchCall;
    });

    it('should dispatch ERROR_API_DATA state, after REQUEST_API_DATA', () => {
      server.respondWith('GET', `${baseUrl}/api/test`, [ 400, { 'Content-Type': 'application/json' }, jsonRes ]);

      const dispatchCall = store.dispatch(fetchApiData(id, api, params, {}))
        .then(res => {
          const actions = store.getActions(),
            requestAction = actions[0],
            errorAction = actions[1];

          expect(actions).to.have.length(2);

          expect(requestAction).to.have.a.property('type', 'REQUEST_API_DATA');
          expect(requestAction).to.have.a.property('id', id);
          expect(requestAction).to.have.a.property('api');

          expect(errorAction).to.have.a.property('type', 'ERROR_API_DATA');
          expect(errorAction).to.have.a.property('id', id);
          expect(errorAction).to.have.a.property('errorData');
          expect(errorAction).to.have.a.property('api');
        });

      server.respond();
      return dispatchCall;
    });
  });

  context('updateApiData function', () => {
    let apiData, auth, store;
    beforeEach(function() {
      apiData = fromJS({duration: '1h', components: {}});
      auth = { cookies: { access_token: '', token_type: '' } };
    });

    it('should do nothing if duration is not updated', () => {
      store = mockStore({ apiData, auth });
      store.dispatch(updateApiData({param: '1h'}, {}));
      const actions = store.getActions();
      expect(actions).to.have.length(0);
    });

    it('should do update duration', () => {
      store = mockStore({ apiData, auth });
      store.dispatch(updateApiData({param: '1d'}, {}));
      const actions = store.getActions();
      expect(actions).to.have.length(1);
      expect(actions[0]).to.have.a.property('type', 'TIME_INTERVAL_UPDATE');
      expect(actions[0]).to.have.a.property('data', '1d');
    });

    it('should request data for all the components with api object', () => {
      const api = { path: '/api/{reportId}', pathParams: { reportId: 'test' }, queryParams: {} },
        id = 'a1',
        id2 = 'a2',
        dataMap1 = Map({ id, data: {}, api }),
        dataMap2 = Map({ id: id2, data: {}, api });

      let data = fromJS({
        duration: '1h',
        components: {}
      });

      data = data.updateIn(['components'], val => val.set(id, dataMap1));
      data = data.updateIn(['components'], val => val.set(id2, dataMap2));

      store = mockStore({ apiData: data, auth });
      store.dispatch(updateApiData({param: '1d'}, {}));

      const actions = store.getActions();
      expect(actions).to.have.length(3);
      expect(actions[1]).to.have.a.property('type', 'REQUEST_API_DATA');
      expect(actions[1]).to.have.a.property('id', id);
      expect(actions[2]).to.have.a.property('type', 'REQUEST_API_DATA');
      expect(actions[2]).to.have.a.property('id', id2);
    });
  });

  context('broadcastEvent function', () => {
    let auth;
    beforeEach(function() {
      auth = { cookies: { access_token: '', token_type: '' } };
    });

    it('should do nothing if there are no components', () => {
      let apiData = fromJS({duration: '1h', components: {}}),
        store = mockStore({ apiData, auth });

      store.dispatch(broadcastEvent('testId', {data: 'test'}));
      const actions = store.getActions();
      expect(actions).to.have.length(0);
    });

    it('should do nothing if the specified id is not in the list of components', () => {
      const api = null, id = 'a1', dataMap = Map({ id, data: {}, api });

      let data = fromJS({ duration: '1h', components: {} });
      data = data.updateIn(['components'], val => val.set(id, dataMap));

      let store = mockStore({ apiData: data, auth });
      store.dispatch(broadcastEvent('testId', {data: 'test'}));

      const actions = store.getActions();
      expect(actions).to.have.length(0);
    });

    it('should dispatch PARENT_CARD_EVENT if the id is available in list of components', () => {
      const api = null, id = 'testId', dataMap = Map({ id, data: {}, api });

      let data = fromJS({ duration: '1h', components: {} });
      data = data.updateIn(['components'], val => val.set(id, dataMap));

      let store = mockStore({ apiData: data, auth });
      store.dispatch(broadcastEvent(id, {data: 'test'}));

      const actions = store.getActions();
      expect(actions).to.have.length(1);
      expect(actions[0]).to.have.a.property('type', PARENT_CARD_EVENT);
      expect(actions[0]).to.have.a.property('id', id);
      expect(actions[0]).to.have.a.property('eventData');
    });
  });

  context('removeComponent function', () => {
    it('should dispatch REMOVE_COMPONENT', () => {
      const apiData = fromJS({duration: '1h', components: {}}),
        auth = { cookies: { access_token: '', token_type: '' } },
        store = mockStore({ apiData, auth }),
        id = 'testId';

      store.dispatch(removeComponent(id));
      const actions = store.getActions();
      expect(actions).to.have.length(1);
      expect(actions[0]).to.have.a.property('type', REMOVE_COMPONENT);
      expect(actions[0]).to.have.a.property('id', id);
    });
  });
});
