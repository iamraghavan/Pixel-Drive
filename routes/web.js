import express from 'express';
import path from 'path';
import { showPortal } from '../controllers/portalController.js';
import { verifySignedUrl } from '../middleware/verifySignedUrl.js';

const router = express.Router();

// Serve static files from the 'views' directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);
router.use('/views', express.static(path.join(__dirname, '../views')));

router.get('/portal/:some_param', verifySignedUrl, showPortal);

// Routes for the asset management UI
router.get('/assets/create', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/assets/create.html'));
});

router.get('/assets/recent', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/assets/recent.html'));
});

export default router;
