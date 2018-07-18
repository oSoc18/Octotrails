import Categories from '../models/categories.model';

function get(req, res, next) {
  const {
    limit = 50, skip = 0, name
  } = req.query;

  Categories.get({
      limit,
      skip,
      name
    })
    .then(categories => res.json(categories))
    .catch(e => next(e));
}

export default {
  list
};
