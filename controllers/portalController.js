import path from 'path';
import { generateSignedUrl as signUrl } from '../utils/urlSigner.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const showPortal = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/portal.html'));
};

export const generateSignedUrl = (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    // Corrected path to match the new route structure, pointing to the portal's home.
    const pathToSign = '/portal/home'; 
    const queryParams = {
        user: '123',
        session: 'abc'
    };
    const ttl = 60 * 60 * 1000; // 1 hour

    const signedUrl = signUrl(baseUrl, pathToSign, queryParams, ttl);

    res.send(`
        <h1>Generated Signed URL</h1>
        <p>Access the portal with this URL:</p>
        <a href="${signedUrl}">${signedUrl}</a>
    `);
};