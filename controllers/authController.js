const APP_KEY = process.env.APP_KEY;

export const authController = (req, res) => {
    const { apiKey } = req.body;

    if (apiKey && apiKey === APP_KEY) {
        req.session.isAuthenticated = true;
        return res.json({ success: true, message: 'Authentication successful.' });
    }

    res.status(401).json({ success: false, message: 'Invalid API Key.' });
};
