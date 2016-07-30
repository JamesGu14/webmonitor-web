'use strict';

var express = require('express');
var util = require('util');
var router = express.Router();
var passport = require('../code/passport');
var pageAuth = require('../code/pageAuth');
var common = require('../code/common');

var mongoose = require('../code/mongoose');
var user_app = require('../models/models').user_app;
var Contact = require('../models/models').contact

/* Dashboard home page */
router.get('/', function(req, res, next) {
    if (!pageAuth.isSessionAlive(req)) {
        res.redirect('/login');
    } else if (!pageAuth.isAllowToView(req)) {
        res.redirect('/restrict')
    } else {
        // retrieve all user apps for the current user, display on the left nav bar
        user_app.find({
            'userid': req.session.passport.user._id
        }, function(err, _apps) {

            if (err) {
                _app = [];
                console.log('Failed to retrieve apps');
            }

            // set the user related apps into session
            req.session.user_apps = _apps;

            res.render('index/dashboard', {
                title: '后台首页 - 网站管家平台',
                user: req.session.passport.user,
                apps: _apps
            });
        });
    }
});

/** Restricted page */
router.get('/restrict', function(req, res, next) {
    res.render('index');
});

/* GET login page */
router.get('/login', function(req, res, next) {
    var message = '';
    if (req.query.cb && req.query.cb == '1043') {
        message = '对不起，登录失败，请确认使用您的注册邮箱和密码登录';
    }
    res.render('login/login', {
        title: '登录 - 网站管家平台',
        message: message
    });
});

/* POST login page */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?cb=1043'
}));

/* GET signup page */
router.get('/signup', function (req, res, next) {
    res.render('index/signup', {
        title: '网站管家 - 注册'
    })
});

/* POST signup page */
router.post('/signup', function (req, res, next) {
    
})

/* GET contact us page */
router.get('/contact', function (req, res, next) {
    if (!pageAuth.isSessionAlive(req)) {
        res.redirect('/login');
    } else if (!pageAuth.isAllowToView(req)) {
        res.redirect('/restrict')
    } else {

        res.render('index/contact', {
            title: '联系我们',
            user: req.session.passport.user,
            apps: req.session.user_apps
        });
    }
});

router.post('/contact', function (req, res, next) {
    if (!pageAuth.isSessionAlive(req)) {
        res.redirect('/login');
    } else if (!pageAuth.isAllowToView(req)) {
        res.redirect('/restrict')
    } else {

        var username = req.session.passport.user.username;
        var isEncourage = req.body.encourage;
        var isSuggestion = req.body.suggestion;
        var isBug = req.body.bug;
        var isOther = req.body.other;
        var reason = '';
        if (isEncourage == 'on') reason += '鼓励';
        if (isSuggestion == 'on') reason += ('|建议');
        if (isBug == 'on') reason += ('|bug');
        if (isOther == 'on') reason += ('|其他');

        var mobile = req.body.mobile;
        var content = req.body.content;

        var _contact = new Contact({
            username: username,
            reason: reason,
            mobile: mobile,
            content: content,
            submit_at: new Date()
        });
        // TODO: validate object

        // TODO: check maximum amount (10)
        _contact.save(function(err, _app) {
            if (err) {
                console.log(err);
                res.json({
                    success: false
                });
            }
            console.log('Saved successfully');

            res.redirect('/');
        });
    }
});

/* Get about us page */
router.get('/aboutus', function (req, res, next) {
    if (!pageAuth.isSessionAlive(req)) {
        res.redirect('/login');
    } else if (!pageAuth.isAllowToView(req)) {
        res.redirect('/restrict')
    } else {

        res.render('index/aboutus', {
            title: '关于我们'
        });
    }
});

/* Logout function, defined by passport dependency. */
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;