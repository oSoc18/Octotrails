import httpStatus from 'http-status';
import { validationResult } from 'express-validator/check';

import APIError from '../helpers/APIError';
import { checkValidationErrors } from '../helpers/utils';
import Input from '../models/input.model';
import History from '../models/history.model';

/**
 * Save the received inputs into DB
 */
async function saveInputs(req, res) {
  // Check for errors
  checkValidationErrors(validationResult(req));

  const { stop_id } = req.params;

  try {
    // Create Input Documents
    const inputDocs = await Input.create(req.body.inputs);
    // Get the IDs of the created input
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
