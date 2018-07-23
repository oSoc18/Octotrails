import express from 'express';
import asyncHandler from 'express-async-handler';

import categoryCtrl from '../controllers/categories.controller';

const router = express.Router();

/** GET /api/categories - List the categories */
router.get('/', categoryCtrl.list);

/** GET /api/categories/:category_num/question - Get the question in a category */
router.get('/:category_num/questions', asyncHandler(categoryCtrl.getQuestions));

export default router;
