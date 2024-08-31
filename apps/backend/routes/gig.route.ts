import express from 'express';
import { verifyToken } from '../middleware/jwt';
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from '../controller/gig.controller';

const router = express.Router();

router.post('/', verifyToken, createGig);
router.delete('/:id', verifyToken, deleteGig);
router.get('/single/:id',  getGig);
router.get('/', getGigs);

export default router;
