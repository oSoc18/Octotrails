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

/** GET /api/stops/proximity - Get the surroundings stops of given location */
router.post(
  '/:stop_id/inputs',
  checkSchema(Stops.postInputs),
  asyncHandler(inputsCtrl.saveInputs)
);

/** GET /api/stops/:stop_id/histories - Get All histories of a stop */
router.get('/:stop_id/histor(y|ies)', asyncHandler(stopsCtrl.getHistory));

/** GET /api/stops/:stop_id/histories - Get specific history of a stop */
router.get('/:stop_id/history/:history?', asyncHandler(stopsCtrl.getHistory));

export default router;
