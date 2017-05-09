'use strict';

const expect = require('chai').expect;
const Promise = require('bluebird');
const mongoose = require('mongoose');
const User = require('../models/user');
const superagent = require('superagent');
const url = `http://localhost:3000`;
const serverCtrl = require('./lib/server-controller');

mongoose.Promise = Promise;

const testUser = {
  username: 'fuckstick',
  password: 'imsostupid',
  email: 'shithead@douchemail.com',
};

describe('Server Function Test', function () {

  before(serverCtrl.start);

  after(serverCtrl.close);

  after((done) => {
    User.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('***POST*** /api/signup route', function() {

    describe('A post with valid parameters', function() {
      it('should return a user and status 200', (done) => {
        superagent.post(`${url}/api/signup`)
        .send(testUser)
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
        });
        done();
      });
    });

    describe('A post with invalid parameters', function() {

      it('should return a status 404 for invalid route', done => {
        superagent.post(`${url}/api/signwrong`)
        .send(testUser)
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(404);
        });
        done();
      });

      it('should return a status 400 for no body provided', done => {
        superagent.post(`${url}/api/signup`)
        .send({
        })
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(400);
        });
        done();
      });
    });
  });

  describe('***GET*** /api/signin route', function () {

    before(done => {
      superagent.post(`${url}/api/signup`)
      .send(testUser)
      .end(() => done());
    });

    after(done => {
      User.findOne({username: 'fuckstick'})
      .then(user => {
        User.findByIdAndRemove(user._id)
        .then(() => done());
      });
    });

    describe('requests with valid inputs', function() {

      it('should return a status 200 for valid request', (done) => {
        superagent.get(`${url}/api/signin`)
        .auth('fuckstick', 'imsostupid')
        .end((err, res) => {
          if (err) console.error(err.message);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('requests with INVALID inputs', function() {

      it('should return a status 400 for invalid url', done => {
        superagent.get(`${url}/api/badurl`)
        .auth('fuckstick', 'imsostupid')
        .end((err, res) => {
          if (err) console.error(err.message);
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return a status 400 for invalid password', done => {
        superagent.get(`${url}/api/signin`)
        .auth('fuckstick', 'wrong password')
        .end((err, res) => {
          if (err) console.error(err.message);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
