'use strict';

const User = require('../models/user');
const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const sampleUser = {
  username: 'testUser',
  password: '1234',
  email: 'test@test.com',
};

chai.use(http);

describe('Auth Routes', function() {
  describe('POST: /api/signup', function() {
    describe('with a valid body', function() {
      after( done => {
        User.remove({})
        .then( () => done())
        .catch(done);
      });

      it('should return a token', done => {
        chai.request(server)
        .post('/api/signup')
        .send(sampleUser)
        .end((err, res) => {
          if (err) return done(err);
          console.log('\ntoken:', res.text, '\n');
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    });
  });

  describe('GET: /api/signin', function() {
    describe('with a valid body', function() {
      before( done => {
        let user = new User(sampleUser);
        user.generatePasswordHash(sampleUser.password)
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
        chai.request(server)
        .get('/api/signin')
        .auth('sampleUser', '1234')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });
});
