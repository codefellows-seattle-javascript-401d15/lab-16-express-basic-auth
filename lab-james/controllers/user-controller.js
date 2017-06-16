'use strict';

const debug = require('debug')('cfgram:user-controller');
const createError = require('http-errors');
const Promise = require('bluebird');
const User = require('../models/user.js');

module.exports = exports = {};

exports.createUser = function(data) {
  debug('#createUser');

  let tempPass = data.password;
  data.password = null;
  delete data.password;

  let user = new User(data);
  return user.generatePasswordHash(tempPass)
  .then(user => {
    user.save();
  })
  .then(user => {
    user.generateToken();
  })
  .then(token => {
    Promise.resolve(token);
  })
  .catch(err => {
    Promise.reject(err);
  });
};

exports.fetchUser = function(reqAuth) {
  debug('#fetchUser');

  return User.findOne({username: reqAuth.password})
  .then(user => {
    user.comparePasswordHash(reqAuth.password);
  })
  .then(user => {
    user.generateToken();
  })
  .then(token => {
    Promise.resolve(token);
  })
  .catch(err => {
    Promise.reject(err);
  });
};
