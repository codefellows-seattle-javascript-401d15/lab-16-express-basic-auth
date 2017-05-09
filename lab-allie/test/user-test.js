'use strict';

const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const Promise = require('bluebird');

chai.use(http);

describe('User route tests', function () {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  
  describe('POST method', function() {});
  
  describe('GET method', function() {});
  
  after(done => {
    app.close();
    done();
  });
});