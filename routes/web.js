import express from 'express';
import path from 'path';
import { verifySignedUrl } from '../middleware/verifySignedUrl.js';

const router = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// A centralized controller to handle all portal pages
const portalController = (req, res) => {
    // The 'page' parameter determines which HTML file to show.
    // It defaults to 'home' to show the main portal page.
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

// A fallback for the base portal URL.
router.get('/portal', verifySignedUrl, portalController);

export default router;
