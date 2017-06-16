'use strict';

const debug = require('debug')('pokegram:auth-controller');
const User = require('../models/user');

module.exports = exports = {};

exports.createNewUser = function(body) {
  debug('#createNewUser');

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

exports.authenticateUser = function(auth) {
  debug('#authenticateUser');

  return User.findOne({username: auth.username})
  .then(user => user.comparePasswordHash(auth.password))
  .then(user => user.generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));
};
