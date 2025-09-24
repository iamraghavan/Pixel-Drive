
const APP_KEY = process.env.APP_KEY;

export const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== APP_KEY) {
        return res.status(401).send('Unauthorized. Invalid API Key.');
    }

    next();
};
