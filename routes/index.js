'use strict';

var express = require('express');
const util = require('util');
var router = express.Router();
var passport = require('../code/passport');
var pageAuth = require('../code/pageAuth');
const common = require('../code/common');

var mongoose = require('../code/mongoose');


/* GET home page. */
router.get('/test', function(req, res, next) {
  // =========create user
  // var sys_user = require('../models/models').sys_user;
  // var user = new sys_user({
  //   username: 'test@test.com',
  //   password: '123',
  //   source: '',
  //   reg_time: new Date(),
  //   user_rating: 5
  // });

  // user.save(function(err, user) {
  //   if(err) return console.log(err);
  //   console.log('Saved successfully');
  // }); 

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

  res.render('index', { title: 'Express' });
});

/* Dashboard home page */
router.get('/', function(req, res, next) {
  if (!pageAuth.isSessionAlive(req)) {
    res.redirect('/login');
  } else if(!pageAuth.isAllowToView(req)) {
    res.redirect('/restrict')
  } else {
    res.render('dashboard', { 
      title: '后台首页 - 网站管家平台',
      user: req.session.passport.user
    });
  }
  
})

/** Restricted page */
router.get('/restrict', function(req, res, next) {
    res.render('index');
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login/login', { title: 'Login' });
});

/* POST login page */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?cb=1043'
  })
);

/* GET contact us page */


/* Logout function, defined by passport dependency. */
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
