import Stop from '../models/stop.model';

function load(req, res, next, tech_id) {
  Stop.getByTechId({ tech_id })
    .then(stop => {
      req.stops = stop; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.stops);
}

// function list(req, res, next) {
//   const { limit = 50, skip = 0, name } = req.query;

//   Stop.list({ limit, skip, name })
//     .then(stops => res.json(stops))
//     .catch(e => next(e));
// }

export default { load, get };
