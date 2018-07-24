import Promise from 'bluebird';
import mongoose, { SchemaTypes } from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';

const options = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
      ret.id = ret._id.toHexString();
      delete ret._id;
    }
  }
};

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
const QuestionSchema = new mongoose.Schema(
  {
    num: String,
    content: String,
    type: { type: String, lowercase: true, trim: true },
    hint: { type: String, default: null },
    choices: [String],
    category_num: String
  },
  options
);

QuestionSchema.virtual('category', {
  ref: 'Category', // The model to use
  localField: 'category_num', // Find people where `localField`
  foreignField: 'num', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc otherwise an array.
  // `justOne` is false by default.
  justOne: true
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
   * Get question by it ID
   * @param {ObjectId} id - The objectId of question.
   * @returns {Promise<Question, APIError>}
   */
  get(id) {
    return this.find({ id })
      .populate({ path: 'category', select: 'num name', populate: 'category' })
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
   * List questions.
   * @param {number} skip - Number of questions to be skipped.
   * @param {number} limit - Limit number of questions to be returned.
   * @returns {Promise<Question[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({})
      .populate('category', 'num name')
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Question
 */
export default mongoose.model('Question', QuestionSchema);
