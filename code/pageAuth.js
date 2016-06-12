'use strict';

var passport = require('./passport');
var pageAuth = new Object();
const util = require('util');

pageAuth.isSessionAlive = function(req) {
  if (!('passport' in req.session) || !('user' in req.session.passport) || !req.session.passport.user) {
    return false;
  }
  return true;
};

pageAuth.isAllowToView = function(req) {
    if(1 > 2) {
        return false;
    }
    return true;
};

module.exports = pageAuth;
