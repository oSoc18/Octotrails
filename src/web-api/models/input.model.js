import mongoose, { SchemaTypes } from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';
import { SchemaOptions } from '../helpers/utils';

/*
 * *****************
 *  Inputs Schema
 *******************
 *
 * An Input is a given response to a question
 *
 * Details :
 * ----------
 *
 * question_id — The Question ID.
 * answer -  The answer to the Question
 *
 */
const InputSchema = new mongoose.Schema(
  {
    question_num: { type: String, ref: 'Question' },
    answer: SchemaTypes.Mixed
  },
  SchemaOptions
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
InputSchema.virtual('question', {
  ref: 'Question', // The model to use
  localField: 'question_num', // Find people where `localField`
  foreignField: 'num', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc otherwise an array.
  // `justOne` is false by default.
  justOne: true
});

/**
 * Methods
 */
InputSchema.method({});

/**
 * Statics
 */
InputSchema.statics = {
  /**
   * Get the inputs by the question_num
   * @param {String} question_num - The question Num.
   * @param {boolean} full - If the document should be populated.
   * @returns {Promise<Input, APIError>}
   */
  getByQuestionNum: async function get({ question_num, full }) {
    const query = this.find({ question_num });

    if (full) query.populate('question');

    const input = await query;

    if (!input) {
      throw new APIError('No such input exists!', httpStatus.NOT_FOUND, true);
    } else {
      return input;
    }
  }
};

/**
 * @typedef Input
 */
export default mongoose.model('Input', InputSchema);
