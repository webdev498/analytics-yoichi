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

export const networkGraphDefaultOptions = {
  physics: {
    // 'barnesHut': {
    //   'avoidOverlap': 1
    // },
    'stabilization': true
  },
  interaction: {
    navigationButtons: true,
    keyboard: false,
    multiselect: true,
    hover: true,
    selectConnectedEdges: false
  },
  autoResize: true,
  height: '600',
  width: '100%',
  edges: {
    selectionWidth: 1,
    physics: false // ,
    // length: 1000
  },
  layout: {
    improvedLayout: true
  }
};
