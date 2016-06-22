window.global = window.global || {};

export const baseUrl = window.global.baseUrl || 'https://demo.ranksoftwareinc.com';
export const loginUrl = baseUrl + '/oauth/authorize';
export const responseType = 'token';
export const clientId = 'taf_dashboard';
export const redirectUri = window.global.redirectUri || 'http://localhost:3000/#/dashboard?';

export const defaultRoute = window.global.defaultRoute || '/alert';
