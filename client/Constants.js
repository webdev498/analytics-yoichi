import {baseUrl} from './config';
import { Colors } from '../commons/colors';

export const REQUEST_API_DATA = 'REQUEST_API_DATA';
export const RECEIVE_API_DATA = 'RECEIVE_API_DATA';
export const ERROR_API_DATA = 'ERROR_API_DATA';
export const PARENT_CARD_EVENT = 'PARENT_CARD_EVENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';

export const REQUEST_DETAILS_API_DATA = 'REQUEST_DETAILS_API_DATA';
export const RECEIVE_DETAILS_API_DATA = 'RECEIVE_DETAILS_API_DATA';
export const ERROR_DETAILS_API_DATA = 'ERROR_DETAILS_API_DATA';
export const REMOVE_DETAILS_COMPONENT = 'REMOVE_DETAILS_COMPONENT';

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
export const defaultLayoutPath = `${baseUrl}/api/layout/summary-page`;

export const DETAILS_BASE_URL = `/api/analytics/reporting/details`;

export const DEFAULT_FONT = 'Roboto, sans-serif';

export const DEFAULT_CHART_OPTIONS = Object.freeze({
  theme: 'zune',
  lineColor: Colors.coral,
  showBorder: 0,
  chartTopMargin: 0,
  chartBottomMargin: 0,
  chartLeftMargin: 0,
  chartRightMargin: 0,
  baseFont: DEFAULT_FONT,
  baseFontColor: Colors.grape,
  paletteColors: Colors.defaultGraphPalette,
  slantLabels: 1,
  toolTipSepChar: ' | '
});
