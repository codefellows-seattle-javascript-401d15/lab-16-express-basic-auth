'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = require('chai').expect;

chai.use(http);

describe('Server module tests', () => {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  after(done => {
    app.close();
    done();
  });
// ====POST====
  describe('POST method', () => {
    describe('request made to /api/signup endpoint', () => {


    });
  });

// ====GET====
  describe('GET method', () => {
    describe('requests made to /api/signin endpoint', () => {

    });
  });




});
