import express from 'express';
import { checkSchema } from 'express-validator/check';

import asyncHandler from 'express-async-handler';

import { Stops } from '../config/param-validation';

import stopsCtrl from '../controllers/stops.controller';
import inputsCtrl from '../controllers/inputs.controller';

const router = express.Router();

/** GET /api/stops/search - Search by the stop_id or stop_name */
router.get('/search', checkSchema(Stops.getSearch), stopsCtrl.search);

/** GET /api/stops/proximity - Get the surroundings stops of given location */
router.get(
  '/proximity',
  checkSchema(Stops.getProximity),
  stopsCtrl.getProximity
);

/** POST /api/stops/:stop_id/inputs - Post the new update of a stop */
router.post(
  '/:stop_id/inputs',
  checkSchema(Stops.postInputs),
  asyncHandler(inputsCtrl.saveInputs)
);

export default router;
