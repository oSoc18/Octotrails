const { checkSchema } = require('express-validator/check');

/******************
 *  AUTH
 ***************/
export const Auth = {
  // POST /api/auth/login
  login: {
    email: {
      // The location of the field, can be one or more of body, cookies, headers, params or query.
      // If omitted, all request locations will be checked
      in: ['body'],
      errorMessage: 'User email is wrong',
      isEmail: true,
      // Sanitizers can go here as well
      toEmail: true
    },
    password: {
      in: ['body'],
      errorMessage: 'User password must be defined',
      exists: true,
      isString: true,
      toString: true
    }
  }
};

/******************
 * STOPS
 ***************/
export const Stops = {
  getSearch: {
    by: {
      in: ['query'],
      isIn: {
        errorMessage: '"?by" can only be "stop_name" or "stop_id"',
        options: [['stop_id', 'stop_name']]
      },
      toString: true
    },
    term: {
      in: ['query'],
      isLength: {
        options: { min: 2 },
        errorMessage: '"?term" must be defined'
      },
      toString: true
    }
  }
};
