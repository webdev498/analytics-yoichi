// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import chaiImmutable from 'chai-immutable';

function FusionCharts() {
  this.render = function() {};
}
FusionCharts.ready = function() {};

chai.use(chaiImmutable);
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();
global.FusionCharts = FusionCharts;

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) { // eslint-disable-line
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    }
    else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) { // eslint-disable-line
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    }
    else {
      k = len + n;
      if (k < 0) { k = 0; }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      // NaN !== NaN
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // eslint-disable-line
        return true;
      }
      k++;
    }
    return false;
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) { // eslint-disable-line
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) { // eslint-disable-line
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) ||
        Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = [] // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/);

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest);
(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext);

// require all `client/**/*.js` except for `main.js` (for isparta coverage reporting)
// const componentsContext = require.context('../client/', true, /^((?!main).)*\.js$/);
const componentsContext = require.context('../client/', true, /^static/);

componentsContext.keys().forEach(componentsContext);
