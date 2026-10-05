const mongoose = require('mongoose');

const swipeCardSchema = new mongoose.Schema({
    cardId: { type: String, required: true, unique: true },
    type: { type: String, enum: ['vibe', 'activity', 'stay'], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [String],
    extraImages: [String],
    longDescription: String,
    highlights: [String],
});

module.exports = mongoose.model('SwipeCard', swipeCardSchema);
