import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// A centralized controller to handle all portal pages
export const portalController = (req, res) => {
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