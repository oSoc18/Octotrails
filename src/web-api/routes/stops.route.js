import express from 'express';
import { checkSchema } from 'express-validator/check';

import { Stops } from '../config/param-validation';
import stopsCtrl from '../controllers/stops.controller';

const router = express.Router();

/** GET /api/stops/search - Get specific line by it number */
router.get('/search', checkSchema(Stops.getSearch), stopsCtrl.search);

router.get('/proximity', stopsCtrl.getProximity);

export default router;
