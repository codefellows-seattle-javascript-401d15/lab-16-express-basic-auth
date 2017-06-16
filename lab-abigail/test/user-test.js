'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user');

mongoose.Promise = Promise;

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com',
};

const invalidUser = {
  username: 'exampleuser',
  email: 'exampleuser@test.com',
};

describe('Auth Routes', function() {
  describe('POST: /api/signup', function() {
    describe('with a valid body', function() {
      after( done => {
        User.remove({})
        .then( () => done())
        .catch(done);
      });

      it('should return a token', done => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });

      it('should return a 401 on an incomplete request', done => {
        request.post(`${url}/api/signup`)
        .send(invalidUser)
        .end(res => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

  describe('GET: /api/signin', function() {
    describe('with a valid body', function() {
      before( done => {
        let user = new User(exampleUser);
        user.generatePasswordHash(exampleUser.password)
        .then( user => user.save())
        .then( user => {
          this.tempUser = user;
          done();
        })
        .catch(done);
      });

      after( done => {
        User.remove({})
        .then( () => done())
        .catch(done);
      });

      it('should return a token', done => {
        request.get(`${url}/api/signin`)
        .auth('exampleuser', '1234')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should return a 401 for invalid request', done => {
        request.get(`${url}/api/signin`)
        .auth('exampleuser', '123')
        .end(res => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });
});
