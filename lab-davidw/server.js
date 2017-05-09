'use strict';
// TODO: Demo code review
const express = require('express');
const cors = require('cors');
const debug = require('debug')('cfgram:server');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();
const authRoutes = require('auth-routes');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const PORT =

mongoose.Promise = Promise_URI = porcess.env.MONGODB_URI||'mongodb://localhost/cfgram-dev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(errorHandler);
app.use(cors());
app.use(bodyParser);
app.use('/api', require('./routes/auth-routes'));

app.listen(PORT, () => )
