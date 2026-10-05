const mongoose = require('mongoose');
const Destination = require('./server/src/models/Destination');

async function checkDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/travelagent');
        console.log('Connected to MongoDB');

        const count = await Destination.countDocuments();
        console.log(`Total destinations in DB: ${count}`);

        const all = await Destination.find({}, { name: 1, destinationId: 1 }).lean();
        console.log(`\nSample of destinations in DB:`);
        all.slice(0, 10).forEach(d => console.log(`- ${d.name} (${d.destinationId})`));

        // Find if any of the new cities (e.g., Zurich, Geneva, Tromso) exist
        const targetIds = ['zurich', 'geneva', 'tromso', 'mykonos'];
        const found = await Destination.find({ destinationId: { $in: targetIds } }, { name: 1, destinationId: 1 }).lean();

        console.log(`\nChecking specific new cities (${targetIds.join(', ')}):`);
        if (found.length === 0) {
            console.log('NONE of the new cities were found in the database!');
        } else {
            found.forEach(d => console.log(`✓ Found ${d.name}`));
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

checkDB();
