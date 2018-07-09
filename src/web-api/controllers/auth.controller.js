import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/config';

// sample user, used for authentication
const user = {
  email: 'angular@mean.app',
  password: 'express'
};

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.email === user.email && req.body.password === user.password) {
    const token = jwt.sign(
      {
        email: user.email
      },
      config.jwtSecret
    );
    return res.json({
      token,
      email: user.email
    });
  }

  const err = new APIError(
    'Authentication error',
    httpStatus.UNAUTHORIZED,
    true
  );
  return next(err);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
