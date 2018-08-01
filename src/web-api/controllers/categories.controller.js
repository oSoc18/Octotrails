import Questions from '../models/question.model';
import Categories from '../models/category.model';
import APIError from '../helpers/APIError';

/**
 * List all categories
 */
function list(req, res, next) {
  const { limit, skip } = req.query;

  Categories.list({
    limit,
    skip
  })
    .then(categories => res.json({ categories }))
    .catch(e => next(e));
}

/**
 * Get the category by it ID
 */
async function getById(req, res) {
  const id = req.params.caterogie_id;
  const category = Categories.findById(id).populate('parent');
  if (!category) {
    throw new APIError(
      `No such category with id=(${id}) exists!`,
      httpStatus.NOT_FOUND,
      true
    );
  } else {
    return res.json({ category });
  }
}

/**
 * Get the category by it Num
 */
async function getByNum(req, res) {
  const num = req.params.category_num;
  const category = await Categories.findOne({ num }).populate('parent');
  if (!category) {
    throw new APIError(
      `No such category with num=(${num}) exists!`,
      httpStatus.NOT_FOUND,
      true
    );
  } else {
    return res.json({ category });
  }
}

/**
 * Get the questions of a specific category by it num
 */
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
