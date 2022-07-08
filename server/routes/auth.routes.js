import { Router } from 'express';
const AuthRouter = Router();
import AuthController from '../controllers/AuthController.js';

// /api/auth/    create user
AuthRouter.post('/register', AuthController.register);

// /api/auth/    user login
AuthRouter.post('/login', AuthController.login);

export default AuthRouter;
