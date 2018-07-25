import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import helmet from 'helmet';
import path from 'path';
import appRoot from 'app-root-path';

import routes from '../routes/index.route';
import APIError from '../helpers/APIError';
import config from './config';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Prefix all API request
app.use('/api', routes);

app.use(express.static(path.join(__dirname, '..', 'public')));

// redirect all request to public except /api to the angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API ressource not found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send  error message ( with  stacktrace only during development)
app.use((
  err,
  req,
  res,
  next // eslint-disable-line no-unused-vars
) =>
  res.status(err.status).json({
    status: err.status,
    message: err.isPublic ? err.message : undefined,
    stack: config.env === 'development' ? err.stack : undefined
  })
);

export default app;
