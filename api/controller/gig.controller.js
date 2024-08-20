import Gig from '../models/gig.model.js';
import { AppError, NotFoundError } from '../utils/customErrors.js';

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
export const createGig = async (req, res, next) => {
  //  Check if user is a seller or not
  if (!req.isSeller) {
    return next(new AppError('Only sellers can create gigs', 403));
  }

  //   check if user is authenticated
  if (!req.userId) {
    return next(new AppError('You are not authenticated', 401));
  }

  //  create a gig object
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    //   save the gig to the database
    const saveGig = await newGig.save();
    return res.status(201).json({
      message: 'Gig created successfully',
      gig: saveGig,
    });
  } catch (error) {
    return next(error);
  }
};

export const getGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find();
    return res.status(200).json(gigs);
  } catch (error) {
    return next(error);
  }
};
export const getGig = async (req, res, next) => {
  console.log(req.params.id);
};
export const deleteGig = async (req, res, next) => {
  console.log(req.params.id);
};
