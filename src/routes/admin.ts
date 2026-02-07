import { Router } from 'express';
import { login } from '../controllers/admin/authController';

export const adminRouter = Router();

adminRouter.post('/login', login);
