'use strict';

const debug = require('debug')('pokegram:basic-auth-middleware');
const createError = require('http-errors');

module.exports = function(req, res, next) {
  debug('#basic-auth-middleware');

  let authHeaders = req.headers.authorization;
  if (!authHeaders) return next(createError(401, 'authorization headers required'));

  let base64Str = authHeaders.split('Basic ')[1];
  if (!base64Str) return next(createError(401, 'username and password required'));

  let [username, password] = new Buffer(base64Str, 'base64').toString().split(':');
  req.auth = {username, password};

  if (!req.auth.username) return next(createError(401, 'username required'));
  if (!req.auth.password) return next(createError(401, 'password required'));
  next();
};
