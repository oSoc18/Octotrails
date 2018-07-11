import express from 'express';

import stopsCtrl from '../controllers/stops.controller';

const router = express.Router();

/** GET /api/stops/search - Get specific line by it number */
router.get('/search', stopsCtrl.search);


export default router;
