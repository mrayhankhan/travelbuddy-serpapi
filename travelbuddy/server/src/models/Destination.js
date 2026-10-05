const mongoose = require('mongoose');

// Sub-schemas for embedded itinerary data
const flightSchema = new mongoose.Schema({
    type: { type: String, enum: ['departure', 'return'] },
    airline: String,
    flightNo: String,
    from: String,
    to: String,
    departure: String,
    arrival: String,
    duration: String,
    cost: Number,
}, { _id: false });

const hotelSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    location: String,
    distanceToCenter: String,
    totalCost: Number,
    image: String,
    nights: Number,
}, { _id: false });

const transferSchema = new mongoose.Schema({
    from: String,
    to: String,
    type: String,
    cost: Number,
}, { _id: false });

const activityItemSchema = new mongoose.Schema({
    time: String,
    activity: String,
    description: String,
    cost: Number,
    type: { type: String, enum: ['travel', 'activity', 'food', 'relax', 'shopping'] },
}, { _id: false });

const dayPlanSchema = new mongoose.Schema({
    day: Number,
    title: String,
    items: [activityItemSchema],
}, { _id: false });

// Main Destination schema
const destinationSchema = new mongoose.Schema({
    destinationId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    image: String,
    description: String,
    tags: [String],
    duration: String,
    costLevel: { type: Number, min: 1, max: 3 },     // 1=budget, 2=mid, 3=premium
    vibeVector: { type: Map, of: Number, default: {} }, // tag → weight for cosine sim
    activityVector: { type: Map, of: Number, default: {} }, // activity preference tags
    stayVector: { type: Map, of: Number, default: {} },     // stay/accommodation tags
    totalCost: Number,
    breakdown: {
        flights: Number,
        stay: Number,
        activities: Number,
        transfers: Number,
    },
    flights: [flightSchema],
    hotel: hotelSchema,
    transfers: [transferSchema],
    days: [dayPlanSchema],
});

module.exports = mongoose.model('Destination', destinationSchema);
