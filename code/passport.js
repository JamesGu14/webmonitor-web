'use strict';

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var sys_user = require('../models/models').sys_user;

passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password'
  }, 
  function(username, password, done) {
    sys_user.findOne({username: username, password: password}, function (err, _user) {
      // TODO: Add login fail handler
      if(err) return done(err);

      if(!_user) {
        return done(null, false, {message: '登录失败'});
      } else {
        // TODO: update last login record for the client
        return done(null, _user);
      }

    })
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
