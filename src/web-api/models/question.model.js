import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';

/**
 * Question Schema
 *
 * id — [string] ID of the question.
 * num - [string] The number of the question
 * content — [string] The question.
 * type — [enum(boolean, number, multiple, text)] Which kind of question is it.
 * hint — [string] The hint for the question.
 * choices — [Array<string>] Contains all correct answers for the question of type multiple
 * categorie_id — [string] The [Category][] ID of the question.
 */
const QuestionSchema = new mongoose.Schema({
  id: String,
  num: String,
  content: String,
  type: String,
  hint: String,
  choices: [String],
  categorie_id: String
});

/**
 * Methods
 */
QuestionSchema.method({});

/**
 * Statics
 */
QuestionSchema.statics = {
  /**
   * Get question
   * @param {ObjectId} id - The objectId of question.
   * @returns {Promise<Question, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then(question => {
        if (question) {
          return question;
        }
        const err = new APIError(
          'No such question exists!',
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },

  /**
   * List questions in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of questions to be skipped.
   * @param {number} limit - Limit number of questions to be returned.
   * @returns {Promise<Question[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({
        createdAt: -1
      })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Question
 */
export default mongoose.model('questions', QuestionSchema);
