import Joi from "joi";

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
export const Heroes = {
  // POST /api/heroes
  createHero: {
    body: {
      name: Joi.string().required()
    }
  },

  // UPDATE /api/heroes/:heroId
  updateHero: {
    body: {
      name: Joi.string().required()
    },
    params: {
      heroId: Joi.string()
        .hex()
        .required()
    }
  }
};

export const Stops = {
  getSearch: {
    by: {
      in: ["query"],
      errorMessage: '"by" can only "name" or "tech_id"'
    },
    term: {
      in: ["query"],
      errorMessage: '"term" must be defined'
    }
  }
};
