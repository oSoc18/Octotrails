// config should be imported before importing any other file
const mongoose = require('mongoose');
import config from './config/config';
import app from './config/express';
import Seeder from '../web-api/models/seeds';
//const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
const Bluebird = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Bluebird;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose
  .connect(
    mongoUri,
    { keepAlive: 1 }
  )
  .then(_ => {
    console.info(`[MONGODB] Connected to database : ${mongoUri}`);
    //TODO Check the collections count. IF count == 0  ==> Populate  DB
  });

mongoose.connection.on('error', () => {
  throw new Error(`[MONGODB] Unable to connect to database : ${mongoUri}`);
});

// listen on port config.port
app.listen(config.port, () => {
  console.info(
    `[SERVER] Server started on port ${config.port} (${config.env})`
  ); // eslint-disable-line no-console
});

export default app;
