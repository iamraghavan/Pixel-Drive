import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dataPath = path.resolve('data/assets.json');

async function readData() {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []; // Return empty array if file doesn't exist
        }
        throw error;
    }
}

async function writeData(data) {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

export default class Asset {
    static async getAll() {
        return readData();
    }

    static async findById(id) {
        const assets = await readData();
        return assets.find(asset => asset.id === id);
    }

    static async create(assetData) {
        const assets = await readData();
        const newAsset = {
            id: uuidv4(),
            ...assetData,
            createdAt: new Date().toISOString(),
        };
        assets.push(newAsset);
        await writeData(assets);
        return newAsset;
    }
}
