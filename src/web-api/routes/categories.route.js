import express from 'express';

import categoriesCtrl from '../controllers/categories.controller';

const router = express.Router();

/** GET /api/categories - Get categories */
router.get('/', categoriesCtrl.get);

export default router;
