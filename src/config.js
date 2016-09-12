import {
  clientLoginUrl,
  clientBaseUrl,
  clientRedirectUri,
  clientDefaultRoute
} from '../env.js';

export const baseUrl = (clientBaseUrl !== undefined) ? clientBaseUrl : 'https://demo.ranksoftwareinc.com';
export const loginUrl = clientLoginUrl || (baseUrl + '/oauth/authorize');
export const responseType = 'token';
export const clientId = 'taf_dashboard';
export const redirectUri = clientRedirectUri || 'http://localhost:3000/#/dashboard?';

export const defaultRoute = clientDefaultRoute || '/';
