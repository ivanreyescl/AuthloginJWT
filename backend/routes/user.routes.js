import express from 'express';
import { createUser, loginUser, getUser } from '../src/controllers/userController.js';
import { validateCreateUser } from '../middlewares/validateCreateUser.js';
import { validateAuthUser } from '../middlewares/validateAuthUser.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/usuarios',verifyToken, getUser);
router.post('/usuarios',validateCreateUser, createUser);
router.post('/login',validateAuthUser, loginUser);



export default router;