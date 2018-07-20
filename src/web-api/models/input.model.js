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
    question_id: { type: SchemaTypes.ObjectId, ref: 'Question' },
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
  localField: 'question_id', // Find people where `localField`
  foreignField: '_id', // is equal to `foreignField`
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
   * Get the inputs by the question_id
   * @param {String} question_id - The question Id.
   * @param {boolean} full - If the document should be populated.
   * @returns {Promise<Input, APIError>}
   */
  getByQuestionId: async function get({ question_id, full }) {
    const query = this.find({ question_id });

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
