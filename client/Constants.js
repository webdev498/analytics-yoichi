import {baseUrl} from 'config';

export const REQUEST_API_DATA = 'REQUEST_API_DATA';
export const RECEIVE_API_DATA = 'RECEIVE_API_DATA';
export const ERROR_API_DATA = 'ERROR_API_DATA';
export const UPDATE_API_DATA = 'UPDATE_API_DATA';
export const PARENT_CARD_EVENT = 'PARENT_CARD_EVENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';

export const TIME_INTERVAL_UPDATE = 'TIME_INTERVAL_UPDATE';

export const USER_DETAILS_LOADING = 'USER_DETAILS_LOADING';
export const USER_DETAILS_LOADED = 'USER_DETAILS_LOADED';
export const USER_DETAILS_ERROR = 'USER_DETAILS_ERROR';

export const SET_COOKIES = 'SET_COOKIES';

export const REQUEST_LAYOUT_DATA = 'REQUEST_LAYOUT_DATA';
export const RECEIVE_LAYOUT_DATA = 'RECEIVE_LAYOUT_DATA';
export const ERROR_LAYOUT_DATA = 'ERROR_LAYOUT_DATA';

export const REQUEST_ACTIONS_LIST = 'REQUEST_ACTIONS_LIST';
export const RECEIVE_ACTIONS_LIST = 'RECEIVE_ACTIONS_LIST';
export const ERROR_ACTIONS_LIST = 'ERROR_ACTIONS_LIST';

export const TIMELINE_CARD = 'TIMELINE_CARD';
export const CONTEXTUAL_MENU_CARD = 'CONTEXTUAL_MENU_CARD';

export const LOW_SCORE_RANGE = [1, 34];
export const MEDIUM_SCORE_RANGE = [35, 64];
export const HIGH_SCORE_RANGE = [65, 100];

export const profileUrl = `${baseUrl}/api/user/profile`;

export const CHART_COLORS = [
  '2BD8D0',
  '6CD3B4',
  'B6CD94',
  'FCC875',
  '05E9F5',
  '003300',
  'FF66FF',
  '999999',
  '009999',
  '66CDAA'
];
