import Categories from '../models/category.model';

function list(req, res, next) {
  const { limit = 50, skip = 0, name } = req.query;

  Categories.list({
    limit,
    skip,
    name
  })
    .then(categories => res.json({ categories }))
    .catch(e => next(e));
}
 
export default {
  list
};
