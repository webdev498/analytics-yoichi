import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import locale from './reducer/locale';
import auth from './reducer/auth';
import layout from './reducer/core';
import parentCard from './reducer/ParentCard';
import actionsList from './reducer/actionsList';

export default combineReducers({
  auth,
  router,
  locale,
  apiData: parentCard,
  layout,
  actions: actionsList
});
