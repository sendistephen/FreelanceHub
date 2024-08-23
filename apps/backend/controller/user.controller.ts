import mongoose from 'mongoose';
import express from 'express';
import User from '@/models/user.model';
import { AppError, NotFoundError, UnauthorizedError } from '@/utils/customErrors';

export const deleteUser = async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<express.Response | void> => {
  try {
    // Get user fromt the database
    const user = await User.findById(req.params.id);

    if (!user) throw new NotFoundError('User not found');

    // check if the user exists and if the token is valid for this user
    if (req.userId !== user._id.toString()) {
      throw new UnauthorizedError('You are not authorized to delete this user');
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser controller:', error);
    next(error);
  }
};

export const getUser = async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<express.Response | void> =>{
  try {
    // validate mongoose ObjectId
    if (!mongoose.isValidObjectId(req.params.id)) {
      return next(new AppError('Invalid user id', 400));
    }

    // find user by id
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundError('User not found');

    // return user
    return res.status(200).json({
      success: true,
      message: 'User found successfully',
      data: user
    })
  } catch (error) {
    next(error);
  }
}