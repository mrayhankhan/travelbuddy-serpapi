const mongoose = require('mongoose');
const Session = require('./src/models/Session');
const { updatePreferenceVector } = require('./src/lib/scoring');

async function testMongooseMap() {
    try {
        await mongoose.connect('mongodb://localhost:27017/travelbuddy');
        console.log('Connected');
        
        const session = new Session({
            departureCity: 'Test', duration: 7, travelers: 2, budget: 150000
        });
        await session.save();
        
        session.vibeScores = updatePreferenceVector(session.vibeScores, ['Nature', 'Mountains'], 'LIKE');
        await session.save();
        
        const loaded = await Session.findById(session._id);
        const toJSON = loaded.vibeScores.toJSON();
        const fromEntries = loaded.vibeScores instanceof Map ? Object.fromEntries(loaded.vibeScores) : 'not a map';
        
        console.log('Saved vector:', loaded.vibeScores);
        console.log('toJSON():', toJSON);
        console.log('fromEntries:', fromEntries);
        
        const fs = require('fs');
        fs.writeFileSync('test_map.txt', `toJSON: ${JSON.stringify(toJSON)}\nfromEntries: ${JSON.stringify(fromEntries)}`);
    } catch(e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}
testMongooseMap();
