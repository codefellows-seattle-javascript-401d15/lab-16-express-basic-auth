'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../model/user');

module.exports = exports = {};

exports.createItem = function(req, user) {

  if(!user) return Promise.reject(createError(400, 'Bad Request'));

  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken());
};

exports.fetchItem = function(reqAuth) {

  if(!reqAuth) return Promise.reject(createError(404, 'User not found'));

  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => Promise.resolve(user.generateToken()));
};
