'use strict';

const debug = require('debug')('cfgram: auth-middleware');
const createError = require('http-errors');

module.exports = function(req, res, next){
  debug('#auth-middleware');

  let authHeaders = req.headers.authorization;
  if(!authHeaders) return next(createError(401, 'Auth headers required'));

  let base64str = authHeaders.split('Basic ')[1];
  if(!base64str) return next(createError(401, 'Username and Password required'));

  let [username, password] = new Buffer(base64str, 'base64').toString().split(':');
  req.auth = {username, password};

  if(!req.auth.username) return next(createError(401, 'Username required'));
  if(!req.auth.password) return next(createError(401, 'Password required'));

  next();
};
