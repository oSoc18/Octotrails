import httpStatus from 'http-status';
import { validationResult, Result } from 'express-validator/check';

import APIError from '../helpers/APIError';
import Input from '../models/input.model';
import History from '../models/history.model';

/**
 * Check if the validatio has generated some errors.
 * @param {Result<any>} errors
 */
const checkValidationErrors = function check(errors) {
  if (errors.isEmpty()) return;

  errors.array().forEach(e => {
    throw new APIError(e.msg, httpStatus.BAD_REQUEST);
  });
};

async function saveInputs(req, res, next) {
  // Check for errors
  checkValidationErrors(validationResult(req));

  const { stop_id } = req.params;

  try {
    // Create Input Documents
    const inputDocs = await Input.create(req.body.inputs);

    const inputs = inputDocs.map(doc => doc._id);

    const previous = await History.getByStopId({ stop_id });

    // Create new history
    const history = new History({
      stop_id,
      inputs
    });

    // ? Link to the previous history ?
    if (previous) {
      history.set({ previous: previous._id });
    }
    const nHistory = await history.save();

    return res.json({
      message: 'Inputs saved'
    });
  } catch (error) {
    throw new APIError('Operation failed', httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default { saveInputs };
