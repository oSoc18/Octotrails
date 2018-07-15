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
 *
 ***************/
export const Stops = {
  // POST /api/heroes
  createHero: {
    body: {
      name: Joi.string().required()
    }
  },

  // UPDATE /api/heroes/:heroId
  updateStop: {
    body: {
      name: Joi.string().required()
    },
    params: {
      stopId: Joi.string()
        .hex()
        .required()
    }
  }
};
