import express from 'express';

import questionCtrl from '../controllers/questions.controller';

const router = express.Router();

/** GET /api/questions - List all questions */
router.get('/', questionCtrl.list);

export default router;
