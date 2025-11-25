import {Router} from 'express';
import * as userController from '../controllers/user.controller.js';
import { body } from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js'; 

const router = Router();
//register route page
router.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long'),
    userController.createUserController);
//login route page
router.post('/login',
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long'),
        userController.loginUserController
    )
//all users shown route page
router.get('/all', authMiddleware.authUser, userController.getAllUsersController)
// profile using routed page
router.get('/profile', authMiddleware.authUser, userController.profileController) 
//logout route page
router.get('/logout',authMiddleware.authUser, userController.logoutController)

export default router;