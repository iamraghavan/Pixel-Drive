import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAssets = (req, res) => {
    res.send('This will send a list of recent assets.');
};

export const uploadAsset = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded.'
        });
    }

    res.status(201).json({
        success: true,
        message: 'Asset uploaded successfully!',
        filePath: `/uploads/${req.file.filename}`
    });
};
