import express from 'express';
import { register, login, forgotPassword } from '../controllers/auth.controller';
import {} from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

export default router;
