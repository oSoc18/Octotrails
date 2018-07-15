import Line from '../models/line.model';

function load(req, res, next, number) {
  Line.getByNumber({ number })
    .then(list => {
      req.lines = list; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.lines);
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;

  Line.list({ limit, skip })
    .then(lines => res.json(lines))
    .catch(e => next(e));
}

export default { load, get, list };
