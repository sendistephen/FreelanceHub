import User from '../models/user.model.js';

export const deleteUser = async (req, res, next) => {
  try {
    // Get user fromt the database
    const user = await User.findById(req.params.id);

    // check if the user exists and if the token is valid for this user
    if (req.userId !== user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
