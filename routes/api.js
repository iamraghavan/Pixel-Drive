import express from 'express';
import { getAssets, uploadAsset } from '../controllers/assetController.js';
import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// A protected route to get recent assets
router.get('/assets/recent', authMiddleware, getAssets);

// A protected route to upload a new asset
router.post('/assets/upload', authMiddleware, upload, uploadAsset);

// Route to handle API key authentication
router.post('/auth', authController);


export default router;