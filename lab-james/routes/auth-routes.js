'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('basic-auth-middleware');
const User = require('../models/user.js');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    
  })
}
