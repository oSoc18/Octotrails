import Questions from '../models/question.model';
import Categories from '../models/category.model';

function list(req, res, next) {
  const { limit, skip } = req.query;

  Categories.list({
    limit,
    skip
  })
    .then(categories => res.json({ categories }))
    .catch(e => next(e));
}

async function getById(req, res) {
  const id = req.params.caterogie_id;
  const categorie = Categories.findById(id).populate('parent_num');
  return res.json({ categorie });
}

async function getByNum(req, res) {
  const num = req.params.category_num;
  const categorie = Categories.find({ num }).populate('parent_num');
  return res.json({ categorie });
}

async function getQuestions(req, res) {
  const category_num = req.params.category_num;
  const questions = await Questions.find({ category_num });
  return res.json({ questions });
}

export default {
  list,
  getById,
  getByNum,
  getQuestions
};
