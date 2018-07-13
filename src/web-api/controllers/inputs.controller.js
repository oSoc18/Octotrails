import httpStatus from 'http-status';
import { validationResult, Result } from 'express-validator/check';

import APIError from '../helpers/APIError';
import Input from '../models/input.model';

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

function saveInputs(req, res, next) {
  checkValidationErrors(validationResult(req));

  const { stop_id, full } = req.params;
  const { inputs } = req.body;

  // Create Input Documents
  Input.create(inputs).then(inputDocs => {
    const inputIDs = inputDocs.map(n => n._id);
    res.json(inputDocs);
  });
}

export default { saveInputs };
