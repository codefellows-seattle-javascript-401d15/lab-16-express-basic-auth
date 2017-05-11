'use strict';

const debug = require('debug')('cfgram:pic-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');
const picController = require('../controllers/pic-controller');
const dataDir = `${__dirname}/../data`;
const multer = require('multer');
const upload = multer({dest: dataDir});

module.exports = function(router) {
  debug('#POST /gallery/:id/pic');
  router.post('/gallery/:id/pic', bearerAuth, upload.single('image'), (req, res) => {
    picController.createPic(req)

    .then(pic => res.json(pic))
    .catch(err => res.send(err));
  });

  router.delete('/pic/:id', bearerAuth, (req, res) => {
    debug('#route delete pic');

    picController.deletePic(req.params.id)
    .then(() => res.sendStatus(204), console.log('Pic Delete successful'))
    .catch(err => res.status(err.status).send(err.message));
  });
  return router;
};
