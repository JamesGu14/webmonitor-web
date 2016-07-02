'use strict';

var express = require('express');
var util = require('util');
var router = express.Router();
var passport = require('../code/passport');
var pageAuth = require('../code/pageAuth');
var common = require('../code/common');

var mongoose = require('../code/mongoose');

router.get('/test', function(req, res, next) {
    console.log('=====' + req.headers['user-agent']);
    res.render('index', {
        title: 'Express'
    });
});

router.get('/create_user', function(req, res, next) {
    // =========create user
    // var sys_user = require('../models/models').sys_user;
    // var user = new sys_user({
    //   username: 'admin@admin.com',
    //   password: '123',
    //   source: '',
    //   reg_time: new Date(),
    //   user_rating: 5
    // });

    // user.save(function(err, user) {
    //   if(err) return console.log(err);
    //   console.log('Saved successfully');
    // }); 

    res.render('index', {
        title: 'Express'
    });
});

router.get('/create_app', function(req, res, next) {
  // ============create app
    // var user_app = require('../models/models').user_app;
    // var _now = new Date();
    // var api_key = common.generateApiKey('admin@admin.com', "鞋柜网");
    // var _app = new user_app({
    //   userid: mongoose.Types.ObjectId("575d41eb51b2bc1230d553d7"),
    //   app_name: "鞋柜网",
    //   app_url: "http://www.maixiegui.com",
    //   api_key: api_key,
    //   start_time: _now,
    //   end_time: new Date(_now.getFullYear() + 10, _now.getMonth() + 1, _now.getDate())
    // });

    // _app.save(function(err, _app) {
    //   if(err) return console.log(err);
    //   console.log('Saved successfully');
    // })
    res.render('index', {
        title: 'Express'
    });
});

router.get('/create_visit', function(req, res, next) {
  // ============create visit history
  var app_visit = require('../models/models').app_visit;
  var _now = new Date();
  
  var _visit = new app_visit({
    appid: mongoose.Types.ObjectId("575e40fb48ecb35278f4d34a"),
    rand_uuid: 'f22aa065-f8d0-4cdd-aa30-6f394ba725e2',
    user_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    url: req.protocol + '://' + req.get('Host') + req.url,
    device: req.headers['user-agent'],
    broswer: '',
    action: 'open',
    time: _now,
    api_key: '23d6bb71f4c85597cc2a33b6491f276543db2e7d9b17f3056965dd9ffcb78f00' 
  });
    
  _visit.save(function(err, _visit) {
    if(err) return console.log(err);
    console.log('Saved successfully');
  })
  
  res.render('index', {
    title: 'Save app_visit'
  });
});

module.exports = router;