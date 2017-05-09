'use strict';

const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const server = require('../server');

chai.use(http);

describe('server', function(){
  before(function(done){
    server.listen(3000);
    done();
  });

  describe('POST /api/signup', function(){
    it('responds with 404 for bad routes', done => {
      chai.request()

      expect()
      done();
    });
    it('responds with 400 status for bad request', done => {

      done();
    });
    it('responds 200 for successful signup', done => {

      done();
    });
  });

  describe('GET /api/signin', function(){
    it('responds with 404 for bad routes', done => {

      done();
    });
    it('responds with 401 status for failed auth', done => {

      done();
    });
    it('responds with 200 for successful signin', done => {

      done();
    });
  });

  after(function(done){
    server.close();
    done();
  });
});
