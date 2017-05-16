'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server - test', function() {
  let app,
    userObj = [];

  before(done => {
    app = server.listen(8000);
    done();
  });

  describe('/wrong endpoint', function() {
    it('should respond with a 404 on bad request', done => {
      chai.request(server)
      .post('/')
      .send({})
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('POST || signup method', function() {

    describe('/signup endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/api/signup')
        .send({username:'chris', email:'c@c.com', password:'epojwef'})
        .end((err, res) => {
          // console.log(res);

          userObj.push(res.request._data);
          // expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('GET || signin method', function() {

    describe('/signup endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/api/signin chris:1234')
        // .send({`{${userObj.username}:${userObj.password}}`})
        .end((err, res) => {
          console.log(res);
          done();
        });
      });
    });
  });

  after(done => {
    app.close();
    done();
  });

});
