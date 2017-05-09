'use strict';

const debug = require('debug')('cfgram:error-middleware');
const createError = require('http-error');

module.exports = function(err, req, res, next) {
  debug('#error-middleware');





  if(err.status) {
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'ValidarionError') {
    err = createError(400, err.mesasge);
    res.status(err.status).send(err.name);
  }
};
