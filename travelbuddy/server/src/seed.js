/**
 * Seed script — populates MongoDB with swipe cards and destinations
 * Run: cd server && npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const SwipeCard = require('./models/SwipeCard');
const Destination = require('./models/Destination');
const swipeCardsData = require('./data/swipeCards');
const destinationsData = require('./data/destinations');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbuddy';

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await SwipeCard.deleteMany({});
        await Destination.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Seed swipe cards
        const cards = await SwipeCard.insertMany(swipeCardsData);
        console.log(`📇 Seeded ${cards.length} swipe cards`);

        // Seed destinations
        const dests = await Destination.insertMany(destinationsData);
        console.log(`🌍 Seeded ${dests.length} destinations`);

        console.log('\n✨ Seed complete!');
        console.log(`   Cards: ${cards.length} (20 vibes, 28 activities, 18 stays)`);
        console.log(`   Destinations: ${dests.length}`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
}

seed();
