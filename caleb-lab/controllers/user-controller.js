'use strict';

const Promise = require('bluebird');
const User = require('../models/user.js');
const debug = require('debug')('cfgram:user-controller');
const createError = require('http-errors');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};

exports.createUser = function(user, password){
  debug('#createUser');
  if(!user) return Promise.reject(createError(400, '!!No user!!'));
  if(!password) return Promise.reject(createError(400, '!!no password!!'));
  let newUser = new User(user);
  return newUser.generatePasswordHash(password)
    .then(user => user.save())
    .then(user => user.generateToken());
};

exports.fetchUser = function(auth){
  debug('#fetchUser');

  return User.findOne({username: auth.username})
  .then(user => user.comparePasswordHash(auth.password))
  .then(user => user.generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));
};
