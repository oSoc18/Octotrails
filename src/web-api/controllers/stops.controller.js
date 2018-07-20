import https from 'https';
import httpStatus from 'http-status';
import { validationResult, Result } from 'express-validator/check';

import config from '../config/config';
import APIError from '../helpers/APIError';
import { checkValidationErrors } from '../helpers/utils';

import History from '../models/history.model';

const STIB_API = config.stibApi;

/**
 * Send a HTTP Request to external API
 * @param {string} url - the full URL of the API
 * @param {function} callback - The callback function when done or error.
 */
const sendRequestToAPI = function sendReq(url, errMsg, callback) {
  const sendError = () => callback(new APIError(errMsg, httpStatus.NOT_FOUND));

  // Send
  https.get(url, function(respApi) {
    let apiData = '';

    if (respApi.statusCode !== 200) return sendError();

    // A chunk of data has been recieved.
    respApi.on('data', chunk => (apiData += chunk));

    // The whole response has been received. Send back the result.
    respApi.on('end', () => callback(null, JSON.parse(apiData)));

    respApi.on('error', sendError);
  });
};

/**
 * Send Request to the STIB API to search for a stop by it ID or name
 */
function search(req, res, next) {
  const { by, term } = req.query;
  let url;

  checkValidationErrors(validationResult(req));

  if (by == 'stop_name') {
    url = '/stops/name/' + term;
  } else if (by == 'stop_id') {
    url = '/stops/' + term;
  }

  sendRequestToAPI(
    STIB_API + url,
    'No results for your search!',
    (err, apiData) => (err ? next(err) : res.json(apiData))
  );
}

/**
 * Send Request to the STIB API to get the proximity stop
 */
function getProximity(req, res, next) {
  const { lon, lat } = req.query;

  checkValidationErrors(validationResult(req));

  const url = '/stops/proximity/' + lon + ',' + lat;

  sendRequestToAPI(
    STIB_API + url,
    'No location for your search!',
    (err, apiData) => (err ? next(err) : res.json(apiData))
  );
}

/**
 * Get the full history of  an stop by it stop_id
 */
async function getHistory(req, res) {
  const { stop_id, history_id } = req.params;
  const { full } = req.query;
  let data;

  if (history_id) {
    return res.redirect('/api/histories/' + history_id);
  } else {
    data = await History.getByStopId({ stop_id, full });
    res.json({ histories: data });
  }
}

export default {
  search,
  getProximity,
  getHistory
};
