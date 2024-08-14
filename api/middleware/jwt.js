import jwt from 'jsonwebtoken';

/**
 * @description Middleware to verify the JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const verifyToken = (req, res) => {
  // Get user token from the cookie
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  // verify and decode the token
  const payload = jwt.verify(token, process.env.JWT_KEY);
  if (!payload) return res.status(403).json({ message: 'Token is invalid!' });

  // Set the user in the request object
  req.userId = payload.id;
  req.isSeller = payload.isSeller;
};
