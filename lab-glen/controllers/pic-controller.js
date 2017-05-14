'use strict';

const Pic = require('../models/pic');
const debug = require('debug')('cfgram:pic-controller');
const createError = require('http-errors');
const fs = require('fs');
const del = require('del');
const path = require('path');
const dataDir = `${__dirname}/../data`;
const AWS = require('aws-sdk');
const Gallery = require('../models/gallery');
const s3 = new AWS.S3();

module.exports = exports = {};

AWS.config.setPromisesDependency(require('bluebird'));

function s3UploadProm(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      resolve(data);
    });
  });
}

exports.createPic = function(req) {
  debug('create new pic');

  if(!req.file) return createError(400, 'Resource required');
  if(!req.file.path) return createError(500, 'File not saved');

  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  return Gallery.findById(req.params.id)
   .then(() => s3UploadProm(params))
   .then(s3Data => {
     del([`${dataDir}/*`]);
     let picData = {
       name: req.body.name,
       desc: req.body.desc,
       userID: req.user._id,
       galleryID: req.params.id,
       imageURI: s3Data.Location,
       objectKey: s3Data.Key,
     };

     return new Pic(picData).save();
   });
};

exports.fetchPic = function(req) {
  debug('#get pic');

  return Pic.findById(req.params.id)
  .then(image => {
    return Promise.resolve(image);

  })
  .catch(() => Promise.reject(createError(404, 'Image not found')));
};

exports.deletePic = function(req) {
  debug('#deletePic');

  let params = {};

  return Pic.findById(req.params.id)
  .then(image => {

    params = {
      Bucket: process.env.AWS_BUCKET,
      Key: image.objectKey,
    };
  })
  .then(() => s3.deleteObject(params))
  .then(data => {
    console.log(`data ${data}`);
    return Pic.findByIdAndRemove(req.params.id);
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};
