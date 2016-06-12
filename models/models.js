var mongoose = require('../code/mongoose');

/**
 * sys_user model, dashboard users
 * registered accounts or OAuth accounts
 */
var sys_userSchema = mongoose.Schema({
    username: String,
    password: String,
    source: String,
    reg_time: Date,
    user_rating: { type: Number, min: 0, max: 10 }
});

module.exports.sys_user = mongoose.model('sys_user', sys_userSchema);

/**
 * user_app model, one sys_user may have 0 - * apps
 * each app has a unique key
 */
var user_appSchema = mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    app_name: String,
    app_url: String,
    api_key: String,
    start_time: Date,
    end_time: Date
});

module.exports.user_app = mongoose.model('user_app', user_appSchema);

/**
 * app_log model
 */

