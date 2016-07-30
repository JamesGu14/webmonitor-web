'use strict';

var express = require('express');
var router = express.Router();
var passport = require('../code/passport');
var pageAuth = require('../code/pageAuth');
var common = require('../code/common');

var mongoose = require('../code/mongoose');
var user_app = require('../models/models').user_app;
var Contact = require('../models/models').contact;

/* GET create web app page */
router.get('/create', function(req, res, next) {
    if (!pageAuth.isSessionAlive(req)) {
        res.redirect('/login');
    } else if (!pageAuth.isAllowToView(req)) {
        res.redirect('/restrict')
    } else {
        res.render('index/create', {
            title: '申请检测 - 网站管家平台',
            user: req.session.passport.user,
            apps: req.session.user_apps
        });
    }
});

/* POST create a web app. Each account maximum 10 web */
router.post('/create', function(req, res, next) {
    if (!pageAuth.isSessionAlive(req)) {
        res.redirect('/login');
    } else if (!pageAuth.isAllowToView(req)) {
        res.redirect('/restrict')
    } else {
        var api_key = common.generateApiKey(req.session.passport.user.username, req.body.app_name);
        var _now = new Date();
        var _app = new user_app({
            userid: req.session.passport.user._id,
            app_name: req.body.app_name,
            app_url: req.body.app_url,
            api_key: api_key,
            start_time: _now,
            end_time: new Date(_now.getFullYear() + 10, _now.getMonth() + 1, _now.getDate()),
            is_canceled: false,
        });

        _app.save(function(err, _app) {
            if (err) {
                console.log(err);
                res.json({
                    success: false
                });
            }
            console.log('Saved successfully');

            res.redirect('/monitor/' + _app._id);
        });
        // TODO: validate object

        // TODO: check maximum amount (10)

        // Save into database

        // return
    }
});

/* GET monitor page */
router.get('/monitor/:id', function(req, res, next) {
    if (!pageAuth.isSessionAlive(req)) {
        res.redirect('/login');
    } else if (!pageAuth.isAllowToView(req)) {
        res.redirect('/restrict')
    } else {
        var _id = req.params.id;
        user_app.findOne({
            '_id': _id
        }, function(err, _curr_app) {

            // TODO: retrieve app_visit_log lists
            res.render('index/monitor', {
                title: _curr_app.app_name + ' - 网站管家平台',
                apps: req.session.user_apps,
                curr_app: _curr_app
            })
        });
    }
});

module.exports = router;