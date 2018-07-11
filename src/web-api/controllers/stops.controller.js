import https from 'https';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';
import {
  validateLocaleAndSetLanguage
} from 'typescript';


// function list(req, res, next) {
//   const { limit = 50, skip = 0, name } = req.query;

//   Stop.list({ limit, skip, name })
//     .then(stops => res.json(stops))
//     .catch(e => next(e));
// }

const STIB_API = process.env.STIB_API;

function search(req, res, next) {
  let by = req.query.by;
  let term = req.query.term;
  let url;

  validateSearch(by, term);

  if (by == "name") {
    url = '/stops/name' + term;
  } else if (by == "tech_id") {
    url = '/stops/' + term;
  }

  https.get(STIB_API + url, function (respApi) {
    let apiData = '';

    // A chunk of data has been recieved.
    respApi.on('data', (chunk) => apiData += chunk);

    // The whole response has been received. Print out the result.
    respApi.on('end', () => {
      return res.json(
        JSON.parse(apiData)
      )
    });
  }).on('error', function (error) {
    const err = new APIError('No results for your search!', httpStatus.NOT_FOUND);
    next(error);
  });
}

function validateSearch(by, term) {
  if (!by || by != "name" || by != "tech_id") {
    throw new APIError('"by" can only be "name" or "tech_id"', httpStatus.BAD_REQUEST);
  } else if (!term || term == "") {
    throw new APIError('"term" must be defined', httpStatus.BAD_REQUEST);
  }
}

export default {
  search,
  validateSearch
};
