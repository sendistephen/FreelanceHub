import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

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

export const login = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    // If the user is not found, return a 404 error
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the user's password with the hashed password
    const isMatch = await bcrypt.compareSync(req.body.password, user.password);

    // If the password does not match, return a 401 error
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Remove the password from the response and return the user
    const { password, ...info } = user._doc;

    // Return a 200 status code and the user's information
    return res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const logout = (req, res) => {};
