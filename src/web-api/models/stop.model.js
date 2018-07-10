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
 *  STOPS Schema
 *******************
 *
 * All the stops for each commercial line of the STIB/MIVB network and for both directions.
 * This means that each stop is multiplied according to the number of lines serving this stop.
 *
 * Details :
 * ----------
 *
 * id : Auto Generated ID
 * tech_id : : identifier stop number (internal identifier, 5 characters)
 * descr.fr : the functional name of the stop in capitals and in French
 * descr.nl : the functional name of the stop in capitals and in Dutch
 * alpha.fr : the official name of the stop in small letters and in French
 * alpha.nl : the official name of the stop in small letters and in Dutch
 * type : {
 *  0 => Stop.      A location where passengers board or disembark from a transit vehicle,
 *  1 => Station.   A physical structure or area that contains one or more stop.
 *  2 => Station Entrance/Exit. A location where passengers can enter or exit a station from the street.
 *          The stop entry must also specify a parent_station value referencing the stop ID of the parent station for the entrance.}
 * line_number :  line number of the destination
 * succession: the stop position in the succession order of the stops along the itinerary
 * is_active :  if the stop is used
 * parent_station : For stops that are physically located inside stations, the parent_station field identifies the station associated with the stop
 *
 */

const StopSchema = new mongoose.Schema({
  id: Number,
  tech_id: String,
  line_number: String,
  succession: Number,
  is_active: { type: Boolean, default: true },
  type: Number,
  descr: {
    fr: String,
    nl: String
  },
  alpha: {
    fr: String,
    nl: String
  }
});

StopSchema.virtual('lines', {
  ref: 'Line', // The model to use
  localField: 'tech_id', // Find people where `localField`
  foreignField: 'stop', // is equal to `foreignField`
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
StopSchema.method({});

/**
 * Statics
 */
StopSchema.statics = {
  /**
   * Get stops by the required tech_id
   * @param {String} tech_id - The tech id of the the stop.
   * @returns {Promise<Stop, APIError>}
   */
  getByTechId: async function get({ tech_id }) {
    const query = this.find({ tech_id });

    const stop = await query;

    if (!stop) {
      throw new APIError('No such stop exists!', httpStatus.NOT_FOUND);
    } else {
      return stop;
    }
  },

  getByName: async function get({ name }) {
    const query = this.find({ name });
  },

  /**
   * Get stops by the required stop.tech_id
   * @param {Array} long_lat - The longitude and latitude of stop
   * @returns {Promise<Stop[], APIError>}
   */
  near: async function near([long, lat]) {}
};

/**
 * @typedef Line
 */
export default mongoose.model('Stop', StopSchema);
