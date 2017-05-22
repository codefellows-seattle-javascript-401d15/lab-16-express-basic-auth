'use strict';

const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const server = require('../server');

mongoose.Promise = Promise;
chai.use(http);

describe('USER ROUTES', function() {
  describe('POST User', function() {
    it('should post a user with 200 success and a token as response', done => {
      chai.request(server)
      .post('/api/user')
      .set('Content-type', 'application/json')
      .send({ emailAddress:'test@moose.com', username: 'moose', password:'123'})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res).to.have.property('text')
          .that.is.a('string')
          .that.matches(/[A-Za-z0-9\-\._~\+\/]+=*/g);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
      .post('/api/foo')
      .set('Content-type', 'application/json')
      .send({ emailAddress:'test@moose.com', username: 'moose', password:'123'})
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 400 with missing username', done => {
      chai.request(server)
      .post('/api/user')
      .set('Content-type', 'application/json')
      .send({password:'123'})
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });

    it('should return a 400 with missing Password', done => {
      chai.request(server)
      .post('/api/user')
      .set('Content-type', 'application/json')
      .send({username: 'moose'})
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });
  });

  describe('GET User', function() {
    it('should get a user with 200 status and return token in response', done => {
      chai.request(server)
      .get('/api/user')
      .auth('moose', '123')
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(200);
        expect(res).to.have.property('text')
          .that.is.a('string')
          .that.matches(/[A-Za-z0-9\-\._~\+\/]+=*/g);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
      .get('/api/foo')
      .auth('moose', '123')
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 401 with no auth header', done => {
      chai.request(server)
      .get('/api/user')
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 401 on bad password', done => {
      chai.request(server)
      .get('/api/user')
      .auth('moose', '321')
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 401 on missing password', done => {
      chai.request(server)
      .get('/api/user')
      .auth('moose', '')
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 401 on invalid username in request', done => {
      chai.request(server)
      .get('/api/user')
      .auth('mouse', '123')
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 401 on missing username in request', done => {
      chai.request(server)
      .get('/api/user')
      .auth('', '123')
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });
  });
});
