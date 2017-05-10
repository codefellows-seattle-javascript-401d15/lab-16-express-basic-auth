'use strict';

const debug = require('debug')('cfgram: auth-controller');
const User = require('../models/user');

module.exports = exports = {};

exports.createNewUserPass = function(body) {
  debug('#createNewUserPass');

  let tempPassword = body.password;
  body.password = null;
  delete body.password;

  let newUser = new User(body);
  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));
};

exports.authUser = function(auth) {
  debug('#authUser');

  return User.findOne({username: auth.username})
  .then(user => user.comparePasswordHash(auth.password))
  .then(user => user.generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));
};
