import Questions from '../models/question.model';

function list(req, res, next) {
  const { limit = 50, skip = 0, name } = req.query;

  Questions.list({
    limit,
    skip,
    name
  })
    .then(questions => res.json(questions))
    .catch(e => next(e));
}

export default {
  list
};
