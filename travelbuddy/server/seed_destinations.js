require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Destination = require('./src/models/Destination');

async function seedDestinations() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelagent');
        console.log('Connected to MongoDB');

        // 1. Gather all destinations from seed files
        const dataDir = path.join(__dirname, 'src/data');
        const destFiles = fs.readdirSync(dataDir).filter(f => f.includes('estination'));

        const allDestinations = [];
        for (const file of destFiles) {
            try {
                const data = require(path.join(dataDir, file));
                allDestinations.push(...data);
            } catch (e) {
                console.error(`Failed to load ${file}:`, e);
            }
        }

        console.log(`Loaded ${allDestinations.length} destinations from JS files.`);

        // 2. Clear existing
        await Destination.deleteMany({});
        console.log('Cleared existing destinations from DB.');

        // 3. Insert all
        const result = await Destination.insertMany(allDestinations);
        console.log(`Successfully seeded ${result.length} destinations into DB!`);

    } catch (e) {
        console.error('Error seeding database:', e);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

seedDestinations();
