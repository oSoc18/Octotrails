import mongoose, { SchemaTypes } from 'mongoose';

import APIError from '../helpers/APIError';
import { SchemaOptions } from '../helpers/utils';

/*
 ******************
 *  History Schema
 *******************
 *
 * A History is a record of the updated Input of a Stop.
 * It can be linked to another history.
 * The current history of a stop is the one with the last update datetime.
 *
 * Details :
 * ----------
 *
 * id — The History ID.
 * stop_id - The Stop ID.
 * create_at - The UNIX Date of the update
 * inputs - All inputs related to the update
 * previous - List of previous history of the stop
 *
 */
const HistorySchema = new mongoose.Schema(
  {
    stop_id: String,
    created_at: { type: Date, default: Date.now },
    inputs: [{ type: SchemaTypes.ObjectId, ref: 'Input' }],
    previous: { type: SchemaTypes.ObjectId, ref: 'History', default: null }
  },
  SchemaOptions
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
HistorySchema.method({});

/**
 * Statics
 */
HistorySchema.statics = {
  /**
   * Get stop' histories by the required stop_id in descending order of 'created_at' timestamp
   * @param {String} stop_id - The id of the the stop.
   * @returns {Promise<History, APIError>}
   */
  getByStopId: async function get({
    stop_id,
    full = false,
    skip = 0,
    limit = 50
  }) {
    const query = this.find({ stop_id })
      .sort('-created_at')
      .skip(+skip)
      .limit(+limit);

    if (full) {
      query.populate({
        path: 'inputs',
        // Get the question of the input
        populate: { path: 'question', select: 'type content  num choices' }
      });
      // .populate({ path: 'previous', options: { limit: 5 } });
    }

    return await query;
  },

  /**
   * Get stop' histories by the required stop_id
   * @param {String} stop_id - The id of the the stop.
   * @returns {Promise<History, APIError>}
   */
  getById: async function get({ _id }) {
    const query = this.findOne({ _id });

    query
      .populate({
        path: 'inputs',
        // Get the question of the input
        populate: { path: 'question', select: 'type content num choices' }
      })
      .populate({ path: 'previous', options: { limit: 5 } });

    return await query;
  }
};

/**
 * @typedef History
 */
export default mongoose.model('History', HistorySchema);
