import User from '@/models/user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { AppError, NotFoundError } from '@/utils/customErrors';
import express from 'express';

/**
 * @description Registers a new user in the system. The user's password is hashed before saving.
 * @route POST /auth/register
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing the user's information
 * @param {string} req.body.username - The user's username
 * @param {string} req.body.email - The user's email address
 * @param {string} req.body.password - The user's plain text password
 * @param {string} [req.body.img] - Optional profile image URL
 * @param {string} req.body.country - The user's country
 * @param {string} [req.body.phone] - Optional phone number
 * @param {string} [req.body.desc] - Optional description about the user
 * @param {boolean} [req.body.isSeller] - Optional flag indicating if the user is a seller
 *
 * @returns {void} - Sends a JSON response with a status message
 */
export const register = async (
  req: express.Request<object, object, Register>,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const { password, ...rest } = req.body;
    // Hash the user's password before saving to the database
    const hash = bcrypt.hashSync(password, 12);

    // Create a new user object, spreading the request body and replacing the password with the hashed password
    const newUser = new User({
      ...rest,
      password: hash,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message if the user is created successfully
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Logs in a user with their username/email and password. If the login is successful, the user's information is returned in the response.
 * @route POST /auth/login
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing login credentials
 * @param {string} [req.body.email] - The user's email address
 * @param {string} [req.body.username] - The user's username
 * @param {string} req.body.password - The user's password
 *
 * @returns {Object} - Returns the user's information in the response
 */
export const login = async (
  req: express.Request<object, object, Login>,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    // Ensure email or username is provided
    if (!email && !username)
      throw new AppError('Email or username is required', 400);

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    // If the user is not found, return a 404 error
    if (!user) throw new NotFoundError('User not found');

    // Compare the user's password with the hashed password
    const isMatch = bcrypt.compareSync(password, user.password);

    // If the password does not match, return a 401 error
    if (!isMatch) throw new AppError('Invalid credentials', 401);

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }, // 15 minutes
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY }, // 7 days
    );

    // save the refresh token to the database
    await user.save();

    // Remove the password from the response and return the user
    const { password: _, ...info } = user.toObject();

    // Set the access token cookie and return the user's information
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
      })
      .status(200)
      .json(info);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new AppError('Refresh token not provided', 401);

    const user = await User.findOne({ refreshToken });

    if (!user) throw new NotFoundError('Invalid refresh token');

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      ((err: any, decoded: any) => {
        if (err) {
          return next(new AppError('Invalid refresh token', 403));
        }

        if (decoded) {
          // Generate new access token
          const accessToken = jwt.sign(
            { id: user._id, isSeller: user.isSeller },
            process.env.JWT_ACCESS_TOKEN_SECRET as string,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY },
          );

          // Send the new access token as a cookie
          res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          });

          return res.status(200).json({ message: 'Token refreshed' });
        }

        // Handle other cases
        return next(new AppError('Something went wrong', 500));
      }) as jwt.VerifyCallback, // Type assertion here
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const user = await User.findOneAndUpdate(
      { refreshToken: req.cookies.refreshToken },
      { refreshToken: '' },
    );
    if (!user) throw new NotFoundError('User not found');
    res;
    res.clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('refreshToken');
    res.status(200).send('Logged out successfully');
  } catch (error) {
    next(error);
  }
};
