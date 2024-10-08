import mongoose from 'mongoose';
import express from 'express';
import Gig from '../models/gig.model';
import {
  AppError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/customErrors';
import { gigQueryBuilder } from '../utils/gigQueryBuilder';

/**
 * @function createGig
 * @description Handles the creation of a new gig. Only authenticated users who are sellers can create gigs.
 * @param {Object} req - Express request object
 * @param {boolean} req.isSeller - Indicates if the authenticated user is a seller
 * @param {string} req.userId - The ID of the authenticated user
 * @param {Object} req.body - The body of the request, containing the gig data
 * @param {string} req.body.title - The title of the gig
 * @param {string} req.body.desc - A detailed description of the gig
 * @param {number} req.body.price - The price of the gig
 * @param {string} req.body.cat - The category of the gig
 * @param {string} req.body.cover - URL of the cover image for the gig
 * @param {string[]} [req.body.images] - An array of URLs for additional gig images
 * @param {string} req.body.shortTitle - A brief title for the gig
 * @param {string} req.body.shortDesc - A short description or tagline for the gig
 * @param {number} req.body.deliveryTime - The delivery time in days
 * @param {number} req.body.revisionNumber - The number of revisions included
 * @param {string[]} [req.body.features] - A list of features included in the gig
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} Sends a JSON response with the created gig or an error
 * @throws {AppError} If the user is not a seller or not authenticated
 */
export const createGig = async (
  req: express.Request<
    object,
    object,
    CreateGigRequest & { isSeller: boolean; userId: string }
  >,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> => {
  //  Check if user is a seller or not
  if (!req.isSeller) {
    return next(new AppError('Only sellers can create gigs', 403));
  }

  //   check if user is authenticated
  if (!req.userId) {
    return next(new AppError('You are not authenticated', 401));
  }
                                               
  //  create a gig object
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId: _, ...gigData } = req.body; 

  const newGig = new Gig({
    userId: req.userId,
    ...gigData,
  });

  try {
    //   save the gig to the database
    const saveGig = await newGig.save();
    return res.status(201).json({
      message: 'Gig created successfully',
      data: saveGig,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @function getGigs
 * @description Retrieves all gigs from the database. If no gigs are found, returns an empty array with a message.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} Sends a JSON response with the list of gigs or an error
 */

export const getGigs = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> => {
  try {
    const { query, sort } = gigQueryBuilder(req.query);
    // fetch all gigs from the database
    const gigs = await Gig.find(query).sort(sort);
    if (gigs.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No gigs found',
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Gigs retrieved successfully',
      data: gigs,
    });
  } catch (error) {
    return next(error);
  }
};
export const getGig = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
  try {
    const {id } = req.params;

    if(!id){
      return next(new AppError('Invalid gig ID', 400));
    }
    // validate object id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError('Invalid gig ID', 400));
    }
    // find the gig by id
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(new NotFoundError('Gig not found'));
    }
    // Return the gig
    return res.status(200).json({
      success: true,
      message: 'Gig retrieved successfully',
      data: gig,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @function deleteGig
 * @description Handles the deletion of a gig by its ID. Only the owner of the gig can delete it.
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The ID of the gig to be deleted
 * @param {string} req.userId - The ID of the authenticated user
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} Sends a JSON response indicating success or failure
 */
export const deleteGig = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
  try {
    const {id } = req.params;

    if(!id){
      return next(new AppError('Invalid gig ID', 400));
    }
    // validate object id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError('Invalid gig ID', 400));
    }
    // find the gig by id
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(new NotFoundError('Gig not found'));
    }
    // check if gig belongs to the owner
    if (gig.userId !== req.userId) {
      return next(new UnauthorizedError('You can delete only your own gig!'));
    }
    // delete the gig
    await Gig.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: 'Gig deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};
