import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';

const options = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
};

/*
 * *****************
 *  LINES Schema
 *******************
 *
 * Each commercial line of the STIB/MIVB network.
 * So, every object of the file represents a network line in one direction.
 *
 * Details :
 * ----------
 *
 * id : Auto Generated ID
 * number : : commercial line number
 * destination.fr : terminus destination stop in French
 * destination.nl : terminus destination stop in Dutch
 * color : official colour code associated to the commercial line
 * text_color: used to specify a legible color to use for text drawn against a background of route_color
 * mode : represents the mode of transport  M => Metro, T => Tram, B => Bus
 *
 */

const LineSchema = new mongoose.Schema(
  {
    id: Number,
    number: String,
    destination: {
      fr: String,
      nl: String
    },
    text_color: String,
    color: String,
    mode: String
  },
  options
);

LineSchema.virtual('stops', {
  ref: 'Stop', // The model to use
  localField: 'number', // Find people where `localField`
  foreignField: 'line_number', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc otherwise an array.
  // `justOne` is false by default.
  justOne: false
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
LineSchema.method({});

/**
 * Statics
 */
LineSchema.statics = {
  list: async function list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * Get lines by the required mode
   * @param {String} number - The number of the this line.
   * @param {Boolean} full - If true, the resuls will contains also the stops of each line
   * @returns {Promise<Line[], APIError>}
   */
  getByNumber: async function get({ number, full = true }) {
    const query = this.find({ number });

    if (full) query.populate('stops');

    const lines = await query;
    if (!lines) {
      throw new APIError('No such line exists!', httpStatus.NOT_FOUND);
    } else {
      return lines;
    }
  },

  /**
   * Get lines by the required mode
   * @param {String} number - The number of the this line.
   * @param {Boolean} full - If true, the resuls will contains also the lines of each stop
   * @returns {Promise<Line[], APIError>}
   */
  getByMode: async function get({ mode, full = true }) {
    const query = this.find({ mode });

    if (full) query.populate('stops');

    const lines = await query;
    if (!lines) {
      throw new APIError('No such line exists!', httpStatus.NOT_FOUND);
    } else {
      return lines;
    }
  }
};

/**
 * @typedef Line
 */
export default mongoose.model('Line', LineSchema);
