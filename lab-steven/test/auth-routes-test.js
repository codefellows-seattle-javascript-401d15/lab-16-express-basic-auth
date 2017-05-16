'use strict';

const chai = require('chai');
const http = require('chai-http');
chai.use(http);
const expect = chai.expect;
const User = require('../model/user.js');
const server = require('../server');
const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const testUser = {
  username: 'test-un',
  email: 'test@email.com',
  password: 'test-pw',
};

describe('auth-routes.js', function(){

  describe('#POST /api/signup', function(){
    afterEach(function(done){
      User.remove({})
      .then(() => done())
      .catch(err => done(err));
    });

    it('404 on bad route', done => {
      chai.request(server)
      .post('/api/badroute')
      .send(testUser)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
    it('400 on bad request', done => {
      chai.request(server)
      .post('/api/signup')
      .send('badreq')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('200 on created user', done => {
      chai.request(server)
      .post('/api/signup')
      .send(testUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        done();
      });
    });

  });

  describe('#GET /api/signin', function(){

    before(function(done){
      let user = new User(testUser);
      user.genPassHash(testUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempUser = user;
        done();
      })
      .catch(done);
    });

    after(function(done){
      User.remove({})
      .then(() => done())
      .catch(err => done(err));
    });

    it('404 on bad route', done => {
      chai.request(server)
      .get('/api/badroute')
      .auth('test-un', 'test-pw')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
    it('401 on bad request', done => {
      chai.request(server)
      .get('/api/signin')
      .auth('test-un', 'wrong-pw')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
    });
    it('200 on successful request', done => {
      chai.request(server)
      .get('/api/signin')
      .auth('test-un', 'test-pw')
      .end((err, res) => {
        if(err) return done(err);
        expect(res).to.have.status(200);
        done();
      });
    });
  });

});
