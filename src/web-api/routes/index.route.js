import express from 'express';
import authRoutes from './auth.route';
import stopsRoutes from './stops.route';
import questionsRoutes from './questions.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get(['/', '/health-check', '/zen'], (req, res) => {
  //res.header();
  res.send('Yello');
});

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount stops routes at /stops
router.use('/stops', stopsRoutes);

// mount question routes at /questions
router.use('/questions', questionsRoutes);

export default router;
