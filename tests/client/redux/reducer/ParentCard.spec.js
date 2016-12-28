import {
  REQUEST_API_DATA,
  RECEIVE_API_DATA,
  ERROR_API_DATA,
  TIME_INTERVAL_UPDATE
} from 'Constants';

import {
  default as parentCardReducer
} from 'redux/reducer/ParentCard';

import {Map, fromJS} from 'immutable';

function initState() {
  const state = fromJS({duration: '1h', components: {}});
  return state;
}

function setAPIData(id, data) {
  let state = parentCardReducer(undefined, {type: REQUEST_API_DATA, id});

  state = parentCardReducer(state, {
    type: RECEIVE_API_DATA,
    id,
    data
  });

  return state;
}

describe('Redux Parent Card Reducer', function() {
  it('Should be a function.', function() {
    expect(parentCardReducer).to.be.a('function');
  });

  it('Should return an immutable.', function() {
    expect(parentCardReducer(undefined, {})).to.equal(initState());
  });

  it('Should initialize with duration 1h, and empty Components map.', function() {
    const state = parentCardReducer(undefined, {});
    expect(state).to.include.keys('duration');
    expect(state).to.include.keys('components');
    expect(state.get('components')).to.equal(Map({}));
  });

  it('Should return the previous state if an action was not matched.', function() {
    let state = parentCardReducer(undefined, {});
    expect(parentCardReducer(undefined, {})).to.equal(initState());

    state = parentCardReducer(state, {type: '@@@@@@@'});
    expect(parentCardReducer(undefined, {})).to.equal(initState());

    const id = '1';

    state = parentCardReducer(state, {type: REQUEST_API_DATA, id});
    expect(state.get('components')).to.have.key(id);
    expect(state.get('components')).to.have.deep.property([id, 'isFetching'], true);
    expect(state.get('components')).to.have.deep.property([id, 'isError'], false);

    state = parentCardReducer(state, {type: '@@@@@@@'});
    expect(state.get('components')).to.have.key(id);
    expect(state.get('components')).to.have.deep.property([id, 'isFetching'], true);
    expect(state.get('components')).to.have.deep.property([id, 'isError'], false);
  });

  it('Should update the state with isFetching for "REQUEST_API_DATA" action.', function() {
    const id = '1',
      state = parentCardReducer(undefined, {type: REQUEST_API_DATA, id}),
      components = state.get('components');

    expect(components).to.have.key(id);
    expect(components).to.have.deep.property([id, 'isFetching'], true);
    expect(components).to.have.deep.property([id, 'isError'], false);
  });

  it('Should remove the api, query and make data null for "REQUEST_API_DATA" action, if already there', function() {
    const id = '1',
      data = {
        json: {},
        api: '/test',
        query: {test: 'test'}
      };

    let state = setAPIData(id, data),
      components = state.get('components');

    expect(components).to.have.key(id);
    expect(components).to.have.deep.property([id, 'data']);
    expect(components).to.have.deep.property([id, 'api']);
    expect(components).to.have.deep.property([id, 'query']);

    state = parentCardReducer(undefined, {type: REQUEST_API_DATA, id});
    components = state.get('components');
    expect(components).to.have.key(id);
    expect(components).to.have.deep.property([id, 'isFetching'], true);
    expect(components).to.have.deep.property([id, 'isError'], false);
    expect(components).to.have.deep.property([id, 'data'], null);
    expect(components).to.not.have.deep.property([id, 'api']);
    expect(components).to.not.have.deep.property([id, 'query']);
  });

  it('Should update the state with layout info for "RECEIVE_API_DATA" action.', function() {
    let id = '1',
      data = {
        json: {},
        api: '/test',
        query: {test: 'test'}
      };

    let state = setAPIData(id, data),
      components = state.get('components');

    expect(components).to.have.property(id);
    expect(components).to.have.deep.property([id, 'isFetching'], false);
    expect(components).to.have.deep.property([id, 'isError'], false);
    expect(components).to.have.deep.property([id, 'data']);
    expect(components).to.have.deep.property([id, 'api']);
    expect(components).to.have.deep.property([id, 'query']);

    id = '2';
    data = {
      json: {},
      api: '/test2',
      query: {test: 'test2'}
    };

    state = parentCardReducer(state, {
      type: RECEIVE_API_DATA,
      id,
      data
    });

    components = state.get('components');
    expect(components).to.have.property(id);
    expect(components).to.have.deep.property([id, 'isFetching'], false);
    expect(components).to.have.deep.property([id, 'isError'], false);
    expect(components).to.have.deep.property([id, 'data']);
    expect(components).to.have.deep.property([id, 'api']);
    expect(components).to.have.deep.property([id, 'query']);
  });

  it('Should update the state with error msg for "ERROR_API_DATA" action.', function() {
    const id = '1',
      errorData = {msg: 'error'},
      state = parentCardReducer(state, {
        type: ERROR_API_DATA,
        id,
        errorData}
      );

    const components = state.get('components');
    expect(components).to.have.property(id);
    expect(components).to.have.deep.property([id, 'isFetching'], false);
    expect(components).to.have.deep.property([id, 'isError'], true);
    expect(components).to.have.deep.property([id, 'errorData']);
  });
});
