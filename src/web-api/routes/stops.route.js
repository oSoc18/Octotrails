import express from 'express';
import validate from 'express-validation';

import stopsCtrl from '../controllers/stops.controller';

const router = express.Router();


  /** GET /api/stops/search - Get specific line by it number */
  router.get([ '/search', '/zen'], stopsCtrl.search);


export default router;
