import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';

import config from '../config/config';
import { Auth } from '../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import APIError from '../helpers/APIError';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login').post(validate(Auth.login), authCtrl.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router
  .route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

router.route('/random-number').get(
  expressJwt({
    secret: config.jwtSecret,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      throw new APIError('Invalid token provided', httpStatus.UNAUTHORIZED);
    }
  }),
  authCtrl.getRandomNumber
);

export default router;
