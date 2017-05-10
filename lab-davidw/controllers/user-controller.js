'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};

exports.createUser = function(req, res) {

  if(!req)return Promise.reject(createError(400, 'bad request'));

  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => {
    console.error(err);
  });
};

exports.fetchUser = function(res, reqAuth) {
  if(!reqAuth) return Promise.reject(createError(404, 'not found'));

  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => Promise.resolve(user.generateToken()))
  .then(token => res.json(token))
  .catch(err => Promise.reject(err));
};
