'use strict';

const debug = require('debug')('cfgram:basic-auth-middleware');
const createError = require('http-errors');

module.exports = function(req, res, next){
  debug('#basic-auth-middleware');

  //we know that the requests that we send are going to be pushed through this method.
  let authHeaders = req.headers.authorization;
  if(!authHeaders) return next(createError(401, 'authorization headers required'));

  let base64String = authHeaders.split('Basic ')[1];
  if(!base64String) return next(createError(401, 'username and password required'));

  let [username, password] = new Buffer(base64String, 'base64').toString().split(':');
  req.auth = {username, password};
  // let utf8String = new Buffer(base64String, 'base64').toString();
  // let authArray = utf8String.split(':');//the utf8 string that gets passed in is a username:password;

  if(!req.auth.username) return next(createError(401, 'Username required'));
  if(!req.auth.password) return next(createError(401, 'Password required'));

  next();
};
