const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { validateGeminiConfig } = require('./lib/geminiAuth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Request logger — log every incoming request
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes

app.use('/api/session', require('./routes/session'));
app.use('/api/cards', require('./routes/cards'));
app.use('/api/swipe', require('./routes/swipe'));
app.use('/api/destinations', require('./routes/destination'));
app.use('/api/calibration', require('./routes/calibration'));
app.use('/api/preferences', require('./routes/preferences'));
app.use('/api/photo', require('./routes/photo'));

// NEW Backend auth routes
app.use('/api/auth-backend', require('./routes/auth'));

// Chatbot route (Gemini-powered travel assistant)
app.use('/api/chatbot', require('./routes/chatbot'));

// Ready Itineraries route (Gemini multi-itinerary generation)
app.use('/api/itineraries', require('./routes/itineraries'));

// Health check
app.get("/", (req, res) => {
    res.send("TravelBuddy Backend is Running 🚀");
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbuddy';

console.log(`🔄 Starting server... PORT=${PORT}`);
console.log(`🔄 Connecting to MongoDB...`);

try {
    validateGeminiConfig();
    console.log('✅ Vertex AI configured (VERTEX_API_KEY, VERTEX_PROJECT_ID, VERTEX_LOCATION)');
} catch (err) {
    console.error('❌ Gemini configuration error:', err.message);
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 TravelBuddy API running on port ${PORT}`);
            console.log(`   Health: http://localhost:${PORT}/api/health`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });
