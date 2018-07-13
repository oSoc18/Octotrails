import https from 'https';
import httpStatus from 'http-status';
import { check, validationResult, Result } from 'express-validator/check';

import APIError from '../helpers/APIError';

// function list(req, res, next) {
//   const { limit = 50, skip = 0, name } = req.query;

//   Stop.list({ limit, skip, name })
//     .then(stops => res.json(stops))
//     .catch(e => next(e));
// }

const STIB_API = process.env.STIB_API;

/**
 * Check if the validatio has generated some errors.
 *
 * @param {Result<any>} errors
 */
const checkValidationErrors = function check(errors) {
  if (errors.isEmpty()) return;

  errors.array().forEach(e => {
    throw new APIError(e.msg, httpStatus.BAD_REQUEST);
  });
};

function search(req, res, next) {
  let by = req.query.by;
  let term = req.query.term;
  let url;

  checkValidationErrors(validationResult(req));

  if (by == 'stop_name') {
    url = '/stops/name/' + term;
  } else if (by == 'stop_id') {
    url = '/stops/' + term;
  }

  https
    .get(STIB_API + url, function(respApi) {
      let apiData = '';

      // A chunk of data has been recieved.
      respApi.on('data', chunk => (apiData += chunk));

      // The whole response has been received. Print out the result.
      respApi.on('end', () => {
        return res.json(JSON.parse(apiData));
      });
    })
    .on('error', function(error) {
      const err = new APIError(
        'No results for your search!',
        httpStatus.NOT_FOUND
      );
      next(error);
    });
}

function getProximity(req, res, next) {
  let lon = req.query.lon;
  let lat = req.query.lat;

  checkValidationErrors(validationResult(req));

  let url = '/stops/proximity/' + lon + ',' + lat;

  https
    .get(STIB_API + url, function(respApi) {
      let apiData = '';

      // A chunk of data has been recieved.
      respApi.on('data', chunk => (apiData += chunk));

      // The whole response has been received. Print out the result.
      respApi.on('end', () => {
        return res.json(JSON.parse(apiData));
      });
    })
    .on('error', function(error) {
      const err = new APIError(
        'No location for your search!',
        httpStatus.NOT_FOUND
      );
      next(error);
    });
}

export default {
  search,
  getProximity
};
