window.global = window.global || {};

const global = window.global;

export const baseUrl = (global.baseUrl !== undefined) ? global.baseUrl : 'https://demo.ranksoftwareinc.com';
export const loginUrl = global.loginUrl || (baseUrl + '/oauth/authorize');
export const responseType = 'token';
export const clientId = 'taf_dashboard';
export const redirectUri = global.redirectUri || 'http://localhost:3000/#/dashboard?';

export const defaultRoute = global.defaultRoute || '/';
