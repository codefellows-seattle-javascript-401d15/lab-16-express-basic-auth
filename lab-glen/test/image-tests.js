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

const url = `http://localhost:${process.env.PORT}`;

mongoose.Promise = Promise;

describe('Testing pic-router /api/gallery/:id/pic', function() {

  before(serverCtrl.start);
  after(serverCtrl.close);

  after(done => {
    Promise.all([
      User.remove({}),
      Gallery.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });

  describe('###POST### /api/gallery/:id/pic', function() {
    beforeEach(userTestData.bind(this));
    beforeEach(galleryTestData.bind(this));

    it('should return a photo model', (done) => {
      superagent.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
      .set({Authorization: `Bearer ${this.tempToken}`})
      .field('galleryID', this.tempGallery._id.toString())
      .field('name', 'glen')
      .field('desc', 'random')
      .attach('image', `${__dirname}/lib/charmander.jpg`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
});
