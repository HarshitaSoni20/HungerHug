import express from 'express'
import { body } from 'express-validator'
import { registerUser, loginUser } from '../controllers/userController.js'

const router = express.Router()
import User from "../models/User.js";

// Signup Route with Validation
router.post(
  '/register',
  [
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  registerUser
)

// Login Route with Validation
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  loginUser
)

export default router
