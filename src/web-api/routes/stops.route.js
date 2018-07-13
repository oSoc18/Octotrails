import express from 'express';

import stopsCtrl from '../controllers/stops.controller';
import inputsCtrl from '../controllers/inputs.controller';

const router = express.Router();

/** GET /api/stops/search - Search by the stop_id or stop_name */
router.get('/search', stopsCtrl.search);

/** GET /api/stops/proximity - Get the surroundings stops of given location */
router.get('/proximity', stopsCtrl.getProximity);

/** GET /api/stops/proximity - Get the surroundings stops of given location */
router.post('/:stop_id/inputs', inputsCtrl.saveInputs);

export default router;
