'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../model/user');

module.exports = exports = {};

exports.createAccount = function(user, password) {

  if(!user.username) return Promise.reject(createError(400, 'username required'));
  if(!password) return Promise.reject(createError(400, 'password required'));
  if(!user.email) return Promise.reject(createError(400, 'email required'));

  let newUser = new User(user);
  return newUser.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .catch(err => Promise.reject(err));

};

exports.fetchAccount = function(checkUser) {
  return User.findOne({username: checkUser.username})
  .then(user => user.comparePasswordHash(checkUser.password))
  .then(user => user.generateToken())
  .catch(err => Promise.reject(err));

};
