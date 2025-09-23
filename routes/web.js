import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifySignedUrl } from '../middleware/verifySignedUrl.js';

const router = express.Router();

// Correctly resolve __dirname in ES modules for cross-platform compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// A centralized controller to handle all portal pages
const portalController = (req, res) => {
    // The 'page' parameter determines which HTML file to show.
    const page = req.params.page || 'home';
    const viewPath = (view) => path.join(__dirname, `../views/${view}.html`);

    switch(page) {
        case 'create-asset':
            res.sendFile(viewPath('assets/create'));
            break;
        case 'recent-assets':
            res.sendFile(viewPath('assets/recent'));
            break;
        default:
            // For any other value, show the main portal page.
            res.sendFile(viewPath('portal'));
            break;
    }
};

// A single, protected route for the entire portal.
// It will handle URLs like /portal/home, /portal/create-asset, etc.
router.get('/portal/:page', verifySignedUrl, portalController);

// A fallback for the base portal URL, defaulting to the 'home' page.
router.get('/portal', verifySignedUrl, (req, res) => {
    // Manually set page to 'home' and call the controller
    req.params.page = 'home';
    portalController(req, res);
});

export default router;
