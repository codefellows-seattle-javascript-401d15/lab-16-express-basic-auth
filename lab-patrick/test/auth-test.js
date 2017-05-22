'use strict';

const expect= require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../models/user');

mongoose.Promise = Promise;

require('../server');

const url = `http://localhost:${process.env.PORT}`;

const testUser = {
  username: 'testUser',
  password: 'testPassword',
  email: 'test@test.com',
};


describe('User Auth routes', function(){
  describe('POST api/signup', function(){
    describe('post with valid inputs', function(){
      after(done => {
        User.remove({})
        .then(()=> done())
        .catch(done);
      });
      it('should return new token', done=>{
        request.post(`${url}/api/signup`)
        .send(testUser)
        .end((err, res)=>{
          if(err) return done(err);
          console.log(res.text);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
      it('should return 400 status is bad input', done =>{
        request.post(`${url}/api/somethingelse`)
        .end((err, res)=>{
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('GET /api/signin', function() {
    describe('with a valid body', function() {
      before( done => {
        let user = new User(testUser);
        user.generatePasswordHash(testUser.password)
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
        .auth('testUser', 'testPassword')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
      it('should return status 400 with incorrect inputs', done =>{
        request.get(`${url}/api/signin`)
        .auth('notUser')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });
});
