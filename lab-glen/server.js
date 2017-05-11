'use strict';

require('dotenv').load();

const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const debug = require('debug')('cfgram:server');
const Promise = require('bluebird');
const errorHandler = require('./lib/error-middleware');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth-routes');
const galleryRoutes = require('./routes/gallery-routes');
const picRoutes = require('./routes/pic-routes');

const app = express();
const router= express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cfgram-dev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(errorHandler);
app.use(bodyParser);

app.use('/api', authRoutes(router));
app.use('/api', galleryRoutes(router));
app.use('/api', picRoutes(router));

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
server.isRunning = true;

module.exports = server;
