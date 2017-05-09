'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../model/user');
// const error = require('../lib/error-middleware');

module.exports = exports = {};

//POST
exports.createAccount = function(user, password) {

  if(!user.username) return Promise.reject(createError(400, 'username required'));
  if(!password) return Promise.reject(createError(400, 'password required'));
  if(!user.email) return Promise.reject(createError(400, 'email required'));

  let newUser = new User(user);
  console.log('new user???', newUser);
  return newUser.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken());


};


//GET
exports.fetchAccount = function() {


};
