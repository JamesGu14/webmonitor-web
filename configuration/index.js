'use strict';

const Confidence = require('confidence');
const Pkg = require('../package.json');

/**
 * Criteria is passed to the document and can be used to select the correct
 * value from the options. See: https://github.com/hapijs/confidence#filters
 * @type {Object}
 */
const criteria = {
  env: process.env.NODE_ENV
};

/**
 * Our configuration document for this application
 * @type {Object}
 */
const config = {
  $meta: 'This document contains application level configuration.',
  projectName: Pkg.name,
  version: Pkg.version,
  redis: {
    $filter: 'env',
    dev: {
      url: process.env.REDIS_URL
    },
    stage: {
      url: process.env.REDIS_URL
    },
    $default: {
      url: '' // local defaults
    }
  },
  database: {
    $filter: 'env',
    $default: {
      mongo: {
        url: 'mongodb://localhost/webmonitor',
        
      }
    },
    dev: {
    },
    stage: {
    },
    test: {
    }
  },
  port: {
    web: {
      $filter: 'env',
      dev: 3000,
      stage: 3000,
      test: 3000,
      $default: 3000
    }
  }
};


const store = new Confidence.Store(config);

/**
 * External method for fetching an item from the document. Combines
 * the request with our criteria document.
 * @param  {string} key Item being requested
 */
exports.get = function(key) {

  return store.get(key, criteria);
};

/**
 * Retrieves meta information where document contains. Combines the request
 * with our predefined criteria.
 * @param  {string} key Item being requested
 */
exports.meta = function(key) {

  return store.meta(key, criteria);
};
