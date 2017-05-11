






'use strict';

const fs = require('fs');
const del = require('del');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir}); //temp storage until data can go into bucket
const createError = require('http-errors');
const debug = require('debug')('cfgram:pic-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');

const Pic = require('../models/pic');
const Gallery = require('../models/gallery');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();

function s3UploadProm(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      resolve(data);
    });
  });
}

module.exports = function(router) {

  router.post('/gallery/:id/pic', bearerAuth, upload.single('image'), (req, res) => {
    debug('#POST gallery/:id/pic');

    if(!req.file) return createError(400, 'You didnt pass in a resource stupid');
    if(!req.file.path) return createError(500, 'File not saved');

    let ext = path.extname(req.file.originalname);

    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET ,
      Key: `${req.file.filename}${ext}`,
      Body: fs.createReadStream(req.file.path), //data that will be stored
    };

    return Gallery.findById(req.params.id)  //returns a promise
    .then(() => s3UploadProm(params)) //puting data in bucket, hands to S3, attach info to model in database
    .then(s3Data => {
      del([`${dataDir}/*`]); //delete everything in data dir
      let picData = {
        name: req.body.name,
        desc: req.body.desc,
        userID: req.user_id,
        galleryID: req.params.id,
        imageURI: s3Data.Location,
        objectKey: s3Data.Key,
      };
      return new Pic(picData).save();
    })
    .then(pic => res.json(pic))
    .catch(err => res.send(err));
  });

  router.get('/pic/:id', (req, res) => {
    debug('#GET /pic/:id');



  });

  router.delete('/pic/:id', (req, res) => {
    debug('#DELETE /pic/:id');


  });


  return router;
};
