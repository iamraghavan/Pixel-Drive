import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { portalController } from '../controllers/portalController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route to serve the login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Protected portal routes
router.get('/portal/:page', authMiddleware, portalController);
router.get('/portal', authMiddleware, (req, res) => {
    req.params.page = 'home';
    portalController(req, res);
});

export default router;
