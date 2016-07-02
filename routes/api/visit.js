'use strict';

var express = require('express');
var util = require('util');
var router = express.Router();
var passport = require('../../code/passport');
var pageAuth = require('../../code/pageAuth');
var common = require('../../code/common');
var _ = require('lodash');

var mongoose = require('../../code/mongoose');
var app_visit = require('../../models/models').app_visit;

/**
 * Get current online user count
 */
router.get('/curr', function(req, res, next) {
  
  var _app_id = req.query.appid; 
  app_visit.find({ 'appid' : _app_id }, 'action', function(err, data) {
    
    console.log('CurrUser API is called');
    
    if(err) {
      console.log('database connection issue');
      res.json({ count : 0 });
    } else {
      
      var openCount = _.filter(data, function(o) { return o.action == 'open'; }).length;
      var leaveCount = _.filter(data, function(o) { return o.action == 'leave'; }).length;
      res.json({ count : Math.max(openCount - leaveCount, 0) });
    }
  });
});


module.exports = router;