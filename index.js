import express from 'express';
import 'dotenv/config.js';

import apiRoutes from './routes/api.js';
import webRoutes from './routes/web.js';
import { generateSignedUrl } from './controllers/portalController.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// --- Routes ---
app.use('/api/v1', apiRoutes);
app.use('/u', webRoutes);

app.get('/generate-signed-url', generateSignedUrl);

app.get('/', (req, res) => {
    res.send('Hello, this is the main page. Visit /generate-signed-url to get a link for the portal.');
});

// --- Server ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
