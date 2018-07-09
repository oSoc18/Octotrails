import express from 'express';
import authRoutes from './auth.route';
import postsRoutes from './posts.route';
import heroesRoutes from './heroes.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get(['/', '/health-check', '/zen'], (req, res) => {
  //res.header();
  res.send('Yello');
});

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount heroes routes at /heroes
router.use('/heroes', heroesRoutes);

// mount posts routes at /posts
router.use('/posts', postsRoutes);

export default router;
