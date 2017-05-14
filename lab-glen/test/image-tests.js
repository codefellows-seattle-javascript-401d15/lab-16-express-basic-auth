'use strict';

const expect = require('chai').expect;
const mongoose = require('mongoose');
const Promise = require('bluebird');
const serverCtrl = require('./lib/server-controller');
const superagent = require('superagent');
const User = require('../models/user');
const Gallery = require('../models/gallery');
const userTestData = require('./lib/user-testdata');
const galleryTestData = require('./lib/gallery-testdata');
const picTestData = require('./lib/pic-test');
const Pic = require('./models/pic');

const url = `http://localhost:${process.env.PORT}`;

mongoose.Promise = Promise;

describe('Testing pic-router /api/gallery/:id/pic', function() {

  before(serverCtrl.start);
  after(serverCtrl.close);

  describe('###POST### /api/gallery/:id/pic', function() {

    before(userTestData.bind(this));
    before(galleryTestData.bind(this));
    after(done => {
      Promise.all([
        User.remove({}),
        Gallery.remove({}),
      ])
      .then(() => done())
      .catch(done);
    });

    it('should return a photo model', (done) => {
      superagent.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
      .set({Authorization: `Bearer ${this.tempToken}`})
      .field('galleryID', this.tempGallery._id.toString())
      .field('name', 'glen')
      .field('desc', 'random')
      .attach('image', `${__dirname}/lib/charmander.jpg`)
      .then(res => {
        expect(res.status).to.equal(200);
      });
      done();
    });
  });

  describe('###DELETE### /api/gallery/:id/pic', function() {

    before(userTestData.bind(this));
    before(galleryTestData.bind(this));
    before(picTestData.bind(this));
    after(done => {
      Promise.all([
        User.remove({}),
        Gallery.remove({}),
        Pic.remove({}),
      ])
      .then(() => done())
      .catch(done);
    });

    it('should delete a photo model', (done) => {
      superagent.delete(`${url}/api/pic/${this.tempImage._id}`)
      .set({Authorization: `Bearer ${this.tempToken}`})
      .then(res => {
        expect(res.status).to.equal(204);
      });
      done();
    });
  });
});
