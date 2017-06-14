'use strict';

const Pic = require('../../models/pic');

module.exports = function(done) {

  new Pic({
    name: 'New Pic',
    desc: 'Random pic',
    userID: this.tempUser._id.toString(),
    galleryID: this.tempGallery._id.toString(),
    imageURI: Math.random().toString(),
    objectKey: Math.random().toString(),

  }).save()
  .then(image => {
    this.tempImage = image;
    done();
  })
  .catch(done);
};
