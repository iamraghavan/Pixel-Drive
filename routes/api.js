import express from 'express';
import { getAssets, getAssetById, createAsset } from '../controllers/assetController.js';

const router = express.Router();

router.get('/', getAssets);
router.post('/', createAsset);
router.get('/:id', getAssetById);

export default router;
