'use strict';

const debug = require('debug')('cfgram:auth-controller');
const User = require('../models/user');

module.exports = exports = {}; //assigning an alias--storing in an empty object

exports.createNewUser = function(body) {
  dubug('#createNewUser');

  let tempPassword = body.password;
  body.password = null;
  delete body.password;

  let newUser = new User(body);
};
