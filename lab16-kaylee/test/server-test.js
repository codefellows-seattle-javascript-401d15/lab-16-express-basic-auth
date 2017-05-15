'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(5000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('GET method', function() {
    let getDogResource;
    before(done => {
      chai.request(server)
      .post('/api/dog')
      .send({name: 'Fido', breed: 'bulldog'})
      .end((err, res) => {
        getDogResource = JSON.parse(res.text.toString());
        done();
      });
      after(done => {
        chai.request(server)
        .delete(`/api/dog/${getDogResource._id}`)
        .end(() => {
          done();
        });
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid id', done => {
        chai.request(server)
        .get(`/api/dog/${getDogResource._id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 404 status code given an invalid id', done => {
        chai.request(server)
        .get('/api/dog/badId')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST dog method', function() {
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid body', done => {
        chai.request(server)
        .post('/api/dog')
        .send({name: 'Joey', breed: 'bichon'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 400 status code if given an invalid body or no body provided', done => {
        chai.request(server)
        .post('/api/dog')
        .send({})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('PUT method', function() {
    let putResource;
    before(done => {
      chai.request(server)
      .post('/api/dog/')
      .send({name: 'Bruce', breed: 'doberman'})
      .end((err, res) => {
        putResource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete(`/api/dog/${putResource._id}`)
      .end(() => {
        done();
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid id', done => {
        chai.request(server)
        .put(`/api/dog/${putResource._id}`)
        .send({name: 'Skip', breed: 'dauchsund'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 404 status code if given an invalid id', done => {
        chai.request(server)
        .put(`/api/dog/badId`)
        .send({name: 'Buddy', breed: 'lab'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe ('DELETE method', function() {
    let deleteResource;
    before(done => {
      chai.request(server)
      .post('/api/dog')
      .send({name: 'Max', breed: 'westie'})
      .end((err, res) => {
        deleteResource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete(`/api/dog/${deleteResource._id}`)
      .end(() => {
        done();
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a proper id', done => {
        chai.request(server)
        .delete(`/api/dog/${deleteResource._id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 404 status code given an invalid id', done => {
        chai.request(server)
        .delete('/api/dog/badId')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
