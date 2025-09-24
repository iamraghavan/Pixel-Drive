import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import apiRoutes from './routes/api.js';
import webRoutes from './routes/web.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Session middleware
app.use(session({
    secret: process.env.APP_KEY, // Use a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

// Routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
