import httpStatus from 'http-status';
import { Result } from 'express-validator/check';

import APIError from './APIError';

/**
 * Check if the validation has generated some errors.
 * @param {Result<any>} errors
 */
export function checkValidationErrors(errors) {
  if (errors.isEmpty()) return;

  errors.array().forEach(e => {
    throw new APIError(e.msg, httpStatus.BAD_REQUEST);
  });
}

/**
 * Options for the Mongoose Schema
 */
export const SchemaOptions = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
      ret.id = ret._id.toHexString();
      delete ret._id;
    }
  }
};
