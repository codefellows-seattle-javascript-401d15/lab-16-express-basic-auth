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

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));
};

exports.authenticateUser = function(auth) {
  debug('authenticateUser');

  return User.findOne({username: auth.username})
  .then(user => user.comparePasswordHash(auth.password))
  .then(user => user.generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));
}
