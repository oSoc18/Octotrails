import express from 'express';
import heroesRoutes from './heroes.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>{
    //res.header();
    res.send('OK')
  }
);
router.use('/heroes', heroesRoutes);

export default router;
