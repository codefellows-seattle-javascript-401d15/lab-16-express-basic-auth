'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../model/user');
// const debug = require('debug')('cfgram:auth-routes');

module.exports = exports = {};

exports.createItem = function(req, res, user) {
  console.log('in controller');

  if(!user) return Promise.reject(createError(400, 'bad request'));

  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(console.log('in controller return'))
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.json(token))
  // .then(token => res.send(token))
  .catch(err => {
    console.log(err);
  });
};

exports.fetchItem = function(res, reqAuth) {

  if(!reqAuth) return Promise.reject(createError(404, 'not found'));

  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => Promise.resolve(user.generateToken()))
  .then(data => res.json(data))
  .catch(err => Promise.reject(err));
};
