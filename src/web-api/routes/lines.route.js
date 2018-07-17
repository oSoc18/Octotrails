import express from 'express';
import validate from 'express-validation';

import linesCtrl from '../controllers/lines.controller';

const router = express.Router();

router
  .route('/')
  /** GET /api/lines - Get list of lines */
  .get(linesCtrl.list)


router
  .route('/:lineNumber')
  /** GET /api/lines/:lineNumber - Get specific line by it number */
  .get(linesCtrl.get);



/** Load line with lineNumber route parameter is hit */
router.param('lineNumber', linesCtrl.load);

export default router;
