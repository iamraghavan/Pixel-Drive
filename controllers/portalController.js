import path from 'path';
import { generateSignedUrl as signUrl } from '../utils/urlSigner.js';

export const showPortal = (req, res) => {
    res.sendFile(path.resolve('views/portal.html'));
};

export const generateSignedUrl = (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const pathToSign = '/u/portal/some-asset'; // example path
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