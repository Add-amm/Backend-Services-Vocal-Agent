import { Router } from 'express';
const router = Router();
import { validateLogin, validateRegister, validateUpdate } from '../middlewares/validateRequest.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import { login, logout, profile, singup, updateThisUserPassword, updateUser } from '../controllers/authController.js';

// Ensure route paths are valid and do not contain syntax errors
router.post('/login', login);
router.post('/register', validateRegister, singup);
router.get('/profile', authenticateToken, profile);
router.put('/self-user', authenticateToken, validateUpdate, updateUser);
router.post('/user/changepassword', authenticateToken, updateThisUserPassword);
router.post('/logout', authenticateToken,  logout);

export default router;