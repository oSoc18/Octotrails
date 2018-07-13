import bluebird from 'bluebird';
import mongoose, { SchemaTypes } from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';

const options = {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id.toHexString();
      delete ret._id;
      delete ret._v;
    }
  }
};

/*
 * *****************
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
  options
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
   * Get stops by the required tech_id
   * @param {String} stop_id - The tech id of the the stop.
   * @param {boolean} full - If the document should be populated.
   * @returns {Promise<History, APIError>}
   */
  getByStopId: async function get({ stop_id, full = false, full_history }) {
    const query = this.find({ stop_id })
      .sort('-created_at')
      .limit(1);

    if (full || full_history) {
      query.populate('inputs').populate('history');
    }

    const history = await query;

    if (!history) {
      throw new APIError('No history exists!', httpStatus.NOT_FOUND, true);
    } else {
      return history.pop();
    }
  }
};

/**
 * @typedef History
 */
export default mongoose.model('History', HistorySchema);
