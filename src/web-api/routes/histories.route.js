import express from 'express';

import asyncHandler from 'express-async-handler';
import hitsoryCtrl from '../controllers/histories.controller';

const router = express.Router();

/** GET /api/histories - Get specific hitsory by its number */
router.get('/:history_id', asyncHandler(hitsoryCtrl.getById));

export default router;
