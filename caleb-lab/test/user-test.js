'use strict';

const debug = require('debug');
const chai = require('chai');
const http = require('chai-http');
const User = require('../models/user.js');
const Promise = require('bluebird');
const errorHandler = require('../lib/error-middlewarel.js');
const bodyParser = require('body-parser');
const express = require('express');
const server = require('../server.js');

const expect = chai.expect;
chai.use(http);

describe('server module', function(){
  let app;
  before(done => {
    app = server.listen(4000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('GET request. this should GET a pre-made user, and return a 200.', done => {

  });





});

// after(done => {
//       User.findOne({username: 'cameron'})
//       .then(user => {
//         User.findByIdAndRemove(user._id)
//         .then(() => done());
//       });
//     });
