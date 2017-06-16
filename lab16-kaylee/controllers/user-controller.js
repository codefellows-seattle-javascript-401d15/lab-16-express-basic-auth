'use strict';

const Promise = require('bluebird');
const User = require('../models/user');

module.exports = exports = {};

exports.createUser = function(user) {
  let tempPassword = user.password;
  user.password = null;
  delete user.password;

  let newUser = new User(user);
  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(userToken => Promise.resolve(userToken))
  .catch(err => Promise.reject(err));
};

exports.fetchUser = function (reqAuth) {
  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => user.generateToken())
  .then(userToken => Promise.resolve(userToken))
  .catch(err => Promise.reject(err));
};
