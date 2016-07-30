'use strict';

var crypto = require('crypto');

// Generate Api Key function
module.exports.generateApiKey = function(email, app_name, callback) {
  var hash = crypto.createHmac('sha256', email)
                      .update(app_name)
                      .digest('hex');
  return hash;
}

// Get Device information - not in use yet
// module.exports.getDevice = new function(req) {
//   var ua = req.headers['user-agent'],
//     $ = {};

//   if (/mobile/i.test(ua))
//     $.Mobile = true;

//   if (/like Mac OS X/.test(ua)) {
//     $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
//     $.iPhone = /iPhone/.test(ua);
//     $.iPad = /iPad/.test(ua);
//   }

//   if (/Android/.test(ua))
//     $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

//   if (/webOS\//.test(ua))
//     $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

//   if (/(Intel|PPC) Mac OS X/.test(ua))
//     $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

//   if (/Windows NT/.test(ua))
//     $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
// };