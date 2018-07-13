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

function saveInputs(req, res, next) {
  checkValidationErrors(validationResult(req));

  const { stop_id } = req.params;
  const { inputs } = req.body;

  // Create Input Documents
  Input.create(inputs)
    .then(inputDocs => inputDocs.map(n => n._id))
    .then(inputIDs =>
      History.getByStopId({ stop_id }).then(previous => {
        // Create new history
        const history = new History({
          stop_id,
          inputs: inputIDs
        });

        // ? Link to the previous history ?
        if (previous) {
          history.set({ previous: previous._id });
        }
        return history.save();
      })
    )
    .then(nHistory => {
      return res.json(nHistory);
    })
    .catch(e => new APIError('tet', 500));
}

export default { saveInputs };
