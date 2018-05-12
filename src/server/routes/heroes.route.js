import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import heroesCtrl from '../controllers/heroes.controller';

const router = express.Router();

router.route('/')
/** GET /api/posts - Get list of posts */
  .get(heroesCtrl.list)

  /** POST /api/posts - Create new post */
  .post(validate(paramValidation.createPost), heroesCtrl.create);

router.route('/:postId')
/** GET /api/post/:postId - Get post */
  .get(heroesCtrl.get)

  /** PUT /api/posts/:postId - Update post */
  .put(validate(paramValidation.updatePost), heroesCtrl.update)

  /** DELETE /api/posts/:postId - Delete post */
  .delete(heroesCtrl.remove);

/** Load post when API with postId route parameter is hit */
router.param('postId', heroesCtrl.load);

export default router;
