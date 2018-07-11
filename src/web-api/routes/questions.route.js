import express from 'express';

import questionCtrl from '../controllers/questions.controller';

const router = express.Router();

/** GET /api/questions - Get specific question by its number */
router.get('/questions', questionCtrl.get);

export default router;