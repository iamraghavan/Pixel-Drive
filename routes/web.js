import express from 'express';
import { showPortal } from '../controllers/portalController.js';
import { verifySignedUrl } from '../middleware/verifySignedUrl.js';

const router = express.Router();

router.get('/portal/:some_param', verifySignedUrl, showPortal);

export default router;
