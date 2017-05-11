'use strict';

const Gallery = require('../../models/gallery');
const debug = require('debug')('cfgram:gallery-testdata');

module.exports = function(done) {
  debug('gallery-test');

  new Gallery({
    name: 'Shirtless pics of Glen',
    desc: 'Damn look at those abdominals',
    userId: this.tempUser._id.toString(),
  }).save()
  .then(gallery => {
    this.tempGallery = gallery;
    done();
  })
  .catch(done);
};
