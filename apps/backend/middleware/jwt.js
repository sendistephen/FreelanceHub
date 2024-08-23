import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/customErrors.js';

/**
 * @description Middleware to verify the JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const verifyToken = (req, res, next) => {
  try {
    // Get user token from the cookie
    const token = req.cookies.accessToken;

    if (!token)
      throw new UnauthorizedError(
        'You are not authorized to access this resource'
      );

    // verify and decode the token
    const payload = jwt.verify(token, process.env.JWT_KEY);
    if (!payload)
      throw new UnauthorizedError(
        'You are not authorized to access this resource'
      );

    // Set the user in the request object
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  } catch (error) {
    next(error);
  }
};
