import express from 'express';
import { deleteUser, getUser } from '@/controller/user.controller'
import { verifyToken } from '@/middleware/jwt';


const router = express.Router();

router.delete('/:id', verifyToken, deleteUser);
router.get('/:id', getUser);

export default router;
