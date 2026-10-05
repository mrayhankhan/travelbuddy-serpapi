// Extract unique tag pools from swipeCards.js, categorised by card type
const cards = require('./swipeCards');

const vibeTags = new Set();
const activityTags = new Set();
const stayTags = new Set();

cards.forEach(card => {
    const pool = card.type === 'vibe' ? vibeTags
        : card.type === 'activity' ? activityTags
            : stayTags;
    (card.tags || []).forEach(t => pool.add(t));
});

module.exports = {
    vibeTags: [...vibeTags].sort(),
    activityTags: [...activityTags].sort(),
    stayTags: [...stayTags].sort(),
};
