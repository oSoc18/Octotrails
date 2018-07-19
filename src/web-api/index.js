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

let server;
let mongoDB;

const stopMongoDB = function() {
  if (mongoDB && typeof mongoDB.close === 'function') mongoDB.close();
};

mongoose
  .connect(
    mongoUri,
    { keepAlive: 1 , useNewUrlParser: true }
  )
  .then(db => {
    mongoDB = db;
    console.info(`[MONGODB] Connected to database : ${mongoUri}`);
    //TODO Check the collections count. IF count == 0  ==> Populate  DB
    Seeder.populate();
  });

mongoose.connection.on('error', () => {
  throw new Error(`[MONGODB] Unable to connect to database : ${mongoUri}`);
});

// listen on port config.port
server = app.listen(config.port, err => {
  console.info(
    `[SERVER] Server started on port ${config.port} (${config.env})`
  ); // eslint-disable-line no-console
});

// If any error shows up, close every connection before exit;
server.on('error', err => {
  if (err['code'] === 'EADDRINUSE') {
    console.error(`[SERVER] Address in use :${config.port} (${config.env})`);
  }

  if (server && typeof server['close'] == 'function') {
    server.close();
  }
});

// Before closing the server
server.on('close', () => {
  stopMongoDB();
  console.info('[SERVER] Exit now !');
  process.exit();
});

//// If ctrl+c
process.on('SIGINT', code => server.close());
process.on('SIGTERM', code => server.close());
// If Exception
process.on('uncaughtException', err => server.close());

export default app;
