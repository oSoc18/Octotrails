import express from 'express';
import validate from 'express-validation';

import { Heroes } from '../config/param-validation';
import heroesCtrl from '../controllers/heroes.controller';

const router = express.Router();

router
  .route('/')
  /** GET /api/heroes - Get list of heroes */
  .get(heroesCtrl.list)

  /** POST /api/heroes - Create new hero */
  .post(validate(Heroes.createHero), heroesCtrl.create);

router
  .route('/:heroId')
  /** GET /api/heroes/:heroId - Get hero */
  .get(heroesCtrl.get)

  /** PUT /api/heroes/:heroId - Update hero */
  .put(validate(Heroes.updateHero), heroesCtrl.update)

  /** DELETE /api/heroes/:heroId - Delete hero */
  .delete(heroesCtrl.remove);

/** Load hero when API with heroId route parameter is hit */
router.param('heroId', heroesCtrl.load);

export default router;
