import express from 'express';
import { assetController } from '../controllers/assetController.js';
import { authController } from '../controllers/authController.js';

const router = express.Router();

// A protected route to get recent assets
router.get('/assets/recent', assetController);

// Route to handle API key authentication
router.post('/auth', authController);


export default router;