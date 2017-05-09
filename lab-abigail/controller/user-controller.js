'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../model/user');

module.exports = exports = {};

exports.createItem = function(req, res, user) {

  if(!user) return Promise.reject(createError(400, 'bad request'));

  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => {
    console.log(err);
  });
};

exports.fetchItem = function(res, reqAuth) {

  if(!reqAuth) return Promise.reject(createError(404, 'not found'));

  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => user.generateToken())
  .then(data => res.json(data))
  .catch(err => Promise.reject(err));
};
