import express from 'express';
import authRoutes from './auth.route';
import stopsRoutes from './stops.route';
import questionsRoutes from './questions.route';
import categoriesRoutes from './categories.route';
import historiesRoutes from './histories.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get(['/', '/zen'], (req, res) => res.send('Yello'));

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount stops routes at /stops
router.use('/stops', stopsRoutes);

// mount question routes at /questions
router.use('/questions', questionsRoutes);

// mount question routes at /categories
router.use('/categories', categoriesRoutes);

// mount history routes at /histories
router.use('/histories', historiesRoutes);

export default router;
