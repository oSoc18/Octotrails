import express from 'express';
import validate from 'express-validation';

import stopsCtrl from '../controllers/stops.controller';

const router = express.Router();

router
  .route('/:techId')
  /** GET /api/stops/:techId - Get specific line by it number */
  .get(stopsCtrl.get);

/** Load line with techId route parameter is hit */
router.param('techId', stopsCtrl.load);

export default router;
