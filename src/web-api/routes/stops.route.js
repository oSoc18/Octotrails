import express from 'express';
import { checkSchema } from 'express-validator/check';

import { Stops } from '../config/param-validation';
import stopsCtrl from '../controllers/stops.controller';

const router = express.Router();

/** GET /api/stops/search - Search by the stop_id or stop_name */
router.get('/search', stopsCtrl.search);

/** GET /api/stops/proximity - Get the surroundings stops of given location */
router.get('/proximity', stopsCtrl.getProximity);

export default router;
