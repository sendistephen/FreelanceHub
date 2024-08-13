import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
export const register = async (req, res) => {
  try {
    // Hash the user's password before saving to the database
    const hash = bcrypt.hashSync(req.body.password, 12);

    // Create a new user object, spreading the request body and replacing the password with the hashed password
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message if the user is created successfully
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Something went wrong' });
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
export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Ensure email or username is provided
    if (!email && !username)
      return res.status(400).json({ message: 'Email or username is required' });

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    // If the user is not found, return a 404 error
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the user's password with the hashed password
    const isMatch = await bcrypt.compareSync(req.body.password, user.password);

    // If the password does not match, return a 401 error
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    // Remove the password from the response and return the user
    const { password: _, ...info } = user._doc;

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
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const logout = (req, res) => {};
