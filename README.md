Add env.js to the project at root level.
```
export const serverBaseUrl = 'https://demo.ranksoftwareinc.com';
```

Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`

Features
--------

* [React](https://github.com/facebook/react) (`^15.0.0`)
* [Redux](https://github.com/rackt/redux) (`^3.0.0`)
  * react-redux (`^4.0.0`)
  * redux-thunk middleware
* [react-router](https://github.com/rackt/react-router) (`^2.0.0`)
  * Asynchronous routes configured with dependencies and reducers
* [react-router-redux](https://github.com/rackt/react-router-redux) (`^4.0.0`)
* [Webpack](https://github.com/webpack/webpack)
  * Vanilla HMR using `module.hot` and `webpack-dev-middleware`
  * Code-splitting using `react-router` route configuration
  * Bundle splitting and CSS extraction
  * Sass w/ CSS modules, autoprefixer, and minification
* [Koa](https://github.com/koajs/koa) (`^2.0.0-alpha`)
* [Karma](https://github.com/karma-runner/karma)
  * Mocha w/ chai, sinon-chai, and chai-as-promised, and [chai-enzyme](https://github.com/producthunt/chai-enzyme)
  * PhantomJS
  * Code coverage reports/instrumentation with [isparta](https://github.com/deepsweet/isparta-loader)
* [Flow](http://flowtype.org/) (`^0.22.0`)
* [Babel](https://github.com/babel/babel) (`^6.3.0`)
  * [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined
  * [react-optimize](https://github.com/thejameskyle/babel-react-optimize) for performance optimizations in production
* [ESLint](http://eslint.org)
  * Uses [Standard Style](https://github.com/feross/standard) by default, but you're welcome to change this.

Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell

$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch
```


### DevTools

Using these chrome extension allows to monitor your react application structure and state.

* React Developer Tools
```
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
```

* Redux DevTools
```
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
```

* Style guide and Best Practices for JS
```
https://github.com/airbnb/javascript
```
