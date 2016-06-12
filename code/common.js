var crypto = require('crypto');

module.exports.generateApiKey = function(email, app_name, callback) {
  const hash = crypto.createHmac('sha256', email)
                      .update(app_name)
                      .digest('hex');
  return hash;
}