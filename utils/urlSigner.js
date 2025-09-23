import crypto from 'crypto';

const SECRET_KEY = process.env.APP_KEY;

export const generateSignedUrl = (baseUrl, pathToSign, queryParams, ttl) => {
    const expires = Date.now() + ttl;
    const urlToSign = `${baseUrl}${pathToSign}?${Object.entries(queryParams).map(([k, v]) => `${k}=${v}`).join('&')}&expires=${expires}`;

    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(urlToSign);
    const signature = hmac.digest('hex');

    return `${urlToSign}&signature=${signature}`;
};