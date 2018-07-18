import express from 'express';
import categoryCtrl from '../controllers/categories.controller';

const router = express.Router();

/** GET /api/categories - List the categories */
router.get('/', categoryCtrl.list);

export default router;
