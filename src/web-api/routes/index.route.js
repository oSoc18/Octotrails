import express from 'express';
import authRoutes from './auth.route';
import heroesRoutes from './heroes.route';
import linesRoutes from './lines.route';
import stopsRoutes from './stops.route';

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

// mount lines routes at /lines
router.use('/lines', linesRoutes);

// mount stops routes at /stops
router.use('/stops', stopsRoutes);

export default router;
