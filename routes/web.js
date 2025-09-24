import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyApiKey } from '../middleware/verifyApiKey.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portalController = (req, res) => {
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
            res.sendFile(viewPath('portal'));
            break;
    }
};

router.get('/portal/:page', verifyApiKey, portalController);

router.get('/portal', verifyApiKey, (req, res) => {
    req.params.page = 'home';
    portalController(req, res);
});

export default router;
