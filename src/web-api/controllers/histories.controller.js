import httpStatus from 'http-status';

import APIError from '../helpers/APIError';
import History from '../models/history.model';

/**
 * Get a history by it Id.
 * @throws {APIError} if the history is not found.
 */
async function getById(req, res) {
  const { stop_id, history_id } = req.params;
  const { full } = req.query;
  const history = await History.getById({ _id: history_id });

  if (!history) {
    throw new APIError(
      `No such history(${history_id}) exists!`,
      httpStatus.NOT_FOUND,
      true
    );
  } else {
    res.json({ history });
  }
}

export default {
  getById
};
