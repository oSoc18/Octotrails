import Joi from 'joi';

//  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()

/******************
 *  AUTH
 ***************/

export const Auth = {
  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};

/******************
 * STOPS
 ***************/

export const Stops = {
  // GET /api/stops/search
  getSearch: {}
};
