import express from 'express';
import { createTiffin, providerSignup, providerLogin } from '../controllers/tiffinController.js'; // ✅ Fixed import
import { verifyProvider } from "../middleware/authProvider.js";

const router = express.Router();

// Register a provider
router.post("/register", providerSignup);
router.post('/tiffins/login', providerLogin); // ✅ /register is only for signup

// Provider creates a tiffin (secured route)
router.post("/", verifyProvider, createTiffin);
router.post('/tiffins/create', createTiffin); // ✅ middleware added only once

export default router;
