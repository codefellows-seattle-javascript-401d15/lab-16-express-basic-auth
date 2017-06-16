'use strict';

const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const http = require('chai-http');
const Promise = require('bluebird');

const User = require('../models/user.js');

const server = require('../server.js');
chai.use(http);

const testUser = {
  username: 'testy',
  password: 'abc123',
  email: 'fake@fake.com',
};

mongoose.Promise = Promise;

describe('User auth routes', function() {
  afterEach(done => {
    Promise.all([
      User.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });
  
  describe('Unregistered route', function() {
    it('should throw a 404 error', done => {
      chai.request(server)
      .post('/api')
      .send(testUser)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  
  describe('POST tests', function() {
    it('should create a new user', done => {
      chai.request(server)
      .post('/api/signup')
      .send(testUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  
  describe('GET tests', function() {
    before(done => {
      chai.request(server)
      .post('/api/signup')
      .send(testUser)
      .end(() => done());
    });
    
    
    it('should return the user if given the correct credentials', done => {
      chai.request(server)
      .get('/api/signin')
      .auth(testUser.username, testUser.password)
      .end(() => {        
        done();
      });
    });
    
    it('should return the user if given the correct credentials', done => {
      chai.request(server)
      .get('/api/signin')
      .auth('')
      .end((err, res) => {        
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
});