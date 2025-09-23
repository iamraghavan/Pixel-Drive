import crypto from 'crypto';
import url from 'url';

const SECRET_KEY = process.env.APP_KEY;

export const verifySignedUrl = (req, res, next) => {
    const { signature, expires, ...queryParams } = req.query;
    const originalUrl = url.parse(req.originalUrl).pathname;

    if (!signature || !expires) {
        return res.status(401).send('Invalid signature.');
    }

    if (Date.now() > parseInt(expires, 10)) {
        return res.status(401).send('URL has expired.');
    }

    // Reconstruct the URL to verify the signature
    const urlToSign = `${req.protocol}://${req.get('host')}${originalUrl}?${Object.entries(queryParams).map(([k, v]) => `${k}=${v}`).join('&')}&expires=${expires}`;

    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(urlToSign);
    const expectedSignature = hmac.digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
        next();
    } else {
        res.status(401).send('Invalid signature.');
    }
};