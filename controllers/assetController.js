import Asset from '../models/Asset.js';

export const getAssets = async (req, res) => {
    try {
        const assets = await Asset.getAll();
        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assets' });
    }
};

export const getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (asset) {
            res.json(asset);
        } else {
            res.status(404).json({ message: 'Asset not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asset' });
    }
};

export const createAsset = async (req, res) => {
    try {
        const newAsset = await Asset.create(req.body);
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(500).json({ message: 'Error creating asset' });
    }
};
