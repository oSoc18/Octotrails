import Joi from 'joi';

export default {

  // POST /api/posts
  createHero: {
    body: {
      name: Joi.string().required(),
    }
  },

  // UPDATE /api/posts/:postId
  updateHero: {
    body: {
      name: Joi.string().required(),
    },
    params: {
      heroId: Joi.string().hex().required()
    }
  }
};
