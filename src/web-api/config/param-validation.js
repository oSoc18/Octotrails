import Joi from 'joi';

//  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()

/******************
 *  AUTH
 ***************/

export const Auth = {
  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};

/******************
 *  POSTS
 ***************/
export const Posts = {
  // POST /api/posts
  createPost: {
    body: {
      title: Joi.string().required()
    }
  },

  // UPDATE /api/posts/:postId
  updatePost: {
    body: {
      title: Joi.string().required()
    },
    params: {
      postId: Joi.string()
        .hex()
        .required()
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
