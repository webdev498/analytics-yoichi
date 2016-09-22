const global = window.global || {};

export const baseUrl = (global.baseUrl !== undefined) ? global.baseUrl : 'https://demo.ranksoftwareinc.com';
export const loginUrl = global.loginUrl || (baseUrl + '/oauth/authorize');
export const responseType = 'token';
export const clientId = 'taf_dashboard';
export const redirectUri = global.redirectUri || 'http://localhost:3000/#/dashboard?';
export const defaultRoute = global.defaultRoute || '/';

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
