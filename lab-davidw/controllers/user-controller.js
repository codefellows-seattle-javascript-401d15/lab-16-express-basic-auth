'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};

let newUser = new User();

exports.createUser = function(req, res, user) {
  console.log('HERE IS MY REQUEST', req.body);

  if(!user)return Promise.reject(createError(400, 'bad request'));

  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => {
    console.log(err);
  });
};

exports.fetchUser = function(res, reqAuth) {
  if(!reqAuth) return Promise.reject(createError(400, 'bad request, id required'));

  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => Promise.resolve(user.generateToken()))
  .then(token => res.json(token))
  .catch(err => Promise.reject(err));
};
