require('dotenv').config();
const mongoose = require('mongoose');
const Session = require('./src/models/Session');
const Destination = require('./src/models/Destination');
const { rankDestinations } = require('./src/lib/scoring');

async function checkScoring() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbuddy');
        console.log('Connected to DB');

        const destinations = await Destination.find().lean();
        console.log(`Found ${destinations.length} destinations`);

        // Create a mock Session document
        const session = new Session({
            departureCity: 'NYC',
            duration: 7,
            travelers: 2,
            budget: 150000,
            vibeScores: { 'Nature': 5, 'Mountains': 5, 'Quiet': 2 },
            activityScores: { 'Hiking': 5, 'Wildlife': 4 }
        });

        console.log('Testing rankDestinations...');
        const shortlist = rankDestinations(session, destinations, session.budget);
        
        console.log('\n--- SHORTLIST RESULTS ---');
        shortlist.forEach((d, i) => {
            console.log(`${i+1}. ${d.name} -> Score: ${d.score}`);
        });

    } catch (err) {
        console.error('Test script failed:', err);
    } finally {
        await mongoose.disconnect();
    }
}

checkScoring();
