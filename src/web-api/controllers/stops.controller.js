import https from 'https';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';

const { STIB_API } = process.env;

/**
 * Send a HTTP Request to external API
 * @param {string} url - the full URL of the API
 * @param {function} callback - The callback function when done or error.
 */
const sendRequestToAPI = function sendReq(url, callback) {
  const sendError = () =>
    callback(new APIError('No results for your search!', httpStatus.NOT_FOUND));

  https.get(url, function(respApi) {
    let apiData = '';

    if (respApi.statusCode !== 200) return sendError();

    // A chunk of data has been recieved.
    respApi.on('data', chunk => (apiData += chunk));

    // The whole response has been received. Print out the result.
    respApi.on('end', () => callback(null, JSON.parse(apiData)));

    respApi.on('error', sendError);
  });
};

function search(req, res, next) {
  let by = req.query.by;
  let term = req.query.term;
  let url;

  validateSearch(by, term);

  if (by == 'stop_name') {
    url = '/stops/name/' + term;
  } else if (by == 'stop_id') {
    url = '/stops/' + term;
  }

  sendRequestToAPI(STIB_API + url, (err, apiData) => {
    if (err) {
      next(err);
    } else {
      return res.json(apiData);
    }
  });
}

function validateSearch(by, term) {
  if (!by || (by != 'stop_name' && by != 'stop_id')) {
    throw new APIError(
      '"by" can only be "stop_name" or "stop_id"',
      httpStatus.BAD_REQUEST
    );
  } else if (!term || term == '') {
    throw new APIError('"term" must be defined', httpStatus.BAD_REQUEST);
  }
}

function getProximity(req, res, next) {
  let lon = req.query.lon;
  let lat = req.query.lat;

  validateProximity(lon, lat);

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

function validateProximity(lon, lat) {
  if (!lon || isNaN(lon)) {
    throw new APIError(
      'The value of the longitude must be a number!',
      httpStatus.BAD_REQUEST
    );
  } else if (!lat || isNaN(lat)) {
    throw new APIError(
      'The value of the latitude must be a number!',
      httpStatus.BAD_REQUEST
    );
  }
}

export default {
  search,
  validateSearch,
  getProximity
};
