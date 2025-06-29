import express from 'express';
import { createUser, loginUser, getUser } from '../src/controllers/userController.js';

const router = express.Router();

router.get('/usuarios', getUser);
router.post('/usuarios', createUser);
router.post('/login', loginUser);



export default router;