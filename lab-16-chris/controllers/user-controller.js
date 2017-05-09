'use strict';

const debug = require('debug')('http:controller');
const User = require('../models/user');

module.exports = exports = {};

exports.createUser = function(user) {
  debug('user-controller.createUser()');

  let tempPassword = user.password;
  user.password = null;
  delete user.password;

  let newUser = new User(user);

  return newUser.generatePasswordHash(tempPassword);
};

exports.userSignin = function(user) {
  debug('user-controller.userSignin()');

  console.log('user obj: ', user);

  return User.findOne({username: user.username});
};
