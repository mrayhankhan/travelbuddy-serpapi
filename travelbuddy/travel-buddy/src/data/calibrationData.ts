// Calibration data - duel pairs, opposing tag definitions, quick-tap chips

export interface DuelConfig {
  id: string;
  leftLabel: string;
  leftImage: string;
  leftTags: string[];
  rightLabel: string;
  rightImage: string;
  rightTags: string[];
}
//
export interface QuickTapChip {
  id: string;
  emoji: string;
  label: string;
  tags: string[];
  phases: ('vibes' | 'activities' | 'stays')[];
}

// ── Hardcoded Vibe Duels ──────────────────────────────
export const VIBE_DUELS: DuelConfig[] = [
  {
    id: 'vibe-duel-1',
    leftLabel: 'Northern Lights',
    leftImage: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&q=80',
    leftTags: ['Nature', 'Cold', 'Magical', 'Remote', 'Winter', 'Photography', 'Snowy'],
    rightLabel: 'Mediterranean Beaches',
    rightImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    rightTags: ['Beach', 'Sun', 'Relax', 'Scenic', 'Warm', 'Coastal', 'Beaches'],
  },
  {
    id: 'vibe-duel-2',
    leftLabel: 'Alpine Mountains',
    leftImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    leftTags: ['Mountains', 'Active', 'Scenic', 'Hiking', 'Nature', 'Adventure', 'Snowy'],
    rightLabel: 'City Vibes',
    rightImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&q=80',
    rightTags: ['City', 'Urban', 'Nightlife', 'Social', 'Food', 'Trendy', 'Metropolis'],
  },
  {
    id: 'vibe-duel-3',
    leftLabel: 'Adventure Vibe',
    leftImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
    leftTags: ['Adventure', 'Thrill', 'Active', 'Outdoors', 'Adrenaline', 'Sport'],
    rightLabel: 'Wellness Retreat',
    rightImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80',
    rightTags: ['Wellness', 'Spa', 'Calm', 'Nature', 'Relax', 'Spiritual'],
  },
];

// ── Hardcoded Activity Duels ──────────────────────────
export const ACTIVITY_DUELS: DuelConfig[] = [
  {
    id: 'act-duel-1',
    leftLabel: 'Nightlife & Parties',
    leftImage: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80',
    leftTags: ['Party', 'Social', 'Night', 'City', 'Music', 'Urban', 'Metropolis'],
    rightLabel: 'Nature & Hiking',
    rightImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
    rightTags: ['Nature', 'Hiking', 'Outdoors', 'Active', 'Scenic', 'Mountains', 'Green'],
  },
  {
    id: 'act-duel-2',
    leftLabel: 'Food & Culinary',
    leftImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    leftTags: ['Food', 'Gastronomy', 'Local', 'Culture', 'City', 'Social'],
    rightLabel: 'Adventure Sports',
    rightImage: 'https://images.unsplash.com/photo-1530143311094-34d807799e8f?w=600&q=80',
    rightTags: ['Adventure', 'Adrenaline', 'Sport', 'Active', 'Outdoors', 'Thrill'],
  },
  {
    id: 'act-duel-3',
    leftLabel: 'Heritage & History',
    leftImage: 'https://www.artchitectours.com/wp-content/uploads/2017/02/tours-in-berlin-001.jpg',
    leftTags: ['Heritage', 'History', 'Culture', 'Museum', 'City', 'Art', 'Historic City'],
    rightLabel: 'Relaxation & Spa',
    rightImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    rightTags: ['Spa', 'Wellness', 'Relax', 'Calm', 'Luxury', 'Peaceful'],
  },
];

// ── Hardcoded Stay Duels ──────────────────────────────
export const STAY_DUELS: DuelConfig[] = [
  {
    id: 'stay-duel-1',
    leftLabel: 'Luxury Boutique',
    leftImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    leftTags: ['Luxury', '5-Star', 'Premium', 'Boutique', 'Design', 'Unique', 'Trendy'],
    rightLabel: 'Budget Hotel',
    rightImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    rightTags: ['Budget', 'Value', 'Clean', 'City', 'Practical', 'Independent'],
  },
  {
    id: 'stay-duel-2',
    leftLabel: 'Castle & Manor',
    leftImage: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=600&q=80',
    leftTags: ['Castle', 'Historic', 'Luxury', 'Heritage', 'Romance', 'Unique', 'Historic City'],
    rightLabel: 'Social Hostel',
    rightImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
    rightTags: ['Hostel', 'Social', 'Budget', 'Party', 'Urban', 'Night', 'Metropolis'],
  },
  {
    id: 'stay-duel-3',
    leftLabel: 'Eco Lodge',
    leftImage: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=600&q=80',
    leftTags: ['Eco', 'Nature', 'Sustainable', 'Quiet', 'Forest', 'Wellness', 'Green'],
    rightLabel: 'Resort & Spa',
    rightImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    rightTags: ['Resort', 'All-inclusive', 'Relax', 'Luxury', 'Beach', 'Spa', 'Beaches'],
  },
];

// ── Helper: get duels for the current phase ───────────
export function getDuelsForPhase(phase: 'vibes' | 'activities' | 'stays'): DuelConfig[] {
  if (phase === 'vibes') return VIBE_DUELS;
  if (phase === 'activities') return ACTIVITY_DUELS;
  return STAY_DUELS;
}

// ── Quick-tap chips ────────────────────────────────────

export const VIBES_QUICK_TAPS: QuickTapChip[] = [
  { id: 'qt-vibe-party', emoji: '🎉', label: 'Party & Nightlife', tags: ['Party', 'Social', 'Nightlife'], phases: ['vibes'] },
  { id: 'qt-vibe-relax', emoji: '🧘', label: 'Zen & Wellness', tags: ['Spiritual', 'Calm', 'Wellness'], phases: ['vibes'] },
  { id: 'qt-vibe-beach', emoji: '🌅', label: 'Sun & Beach', tags: ['Beach', 'Sun', 'Relax'], phases: ['vibes'] },
  { id: 'qt-vibe-snow', emoji: '🏔️', label: 'Winter & Snow', tags: ['Cold', 'Winter', 'Snowy'], phases: ['vibes'] },
  { id: 'qt-vibe-culture', emoji: '🏛️', label: 'Historical', tags: ['Heritage', 'History', 'Culture'], phases: ['vibes'] },
  { id: 'qt-vibe-nature', emoji: '🌲', label: 'Nature & Outdoors', tags: ['Nature', 'Scenic', 'Green'], phases: ['vibes'] },
  { id: 'qt-vibe-urban', emoji: '🏙️', label: 'Urban & City', tags: ['City', 'Urban', 'Metropolis'], phases: ['vibes'] },
  { id: 'qt-vibe-romance', emoji: '❤️', label: 'Romantic', tags: ['Romance', 'Couples', 'Scenic'], phases: ['vibes'] },
];

export const ACTIVITIES_QUICK_TAPS: QuickTapChip[] = [
  { id: 'qt-wine', emoji: '🍷', label: 'Wine & Dining', tags: ['Food', 'Gastronomy'], phases: ['activities'] },
  { id: 'qt-hiking', emoji: '🥾', label: 'Mountain Trails', tags: ['Mountains', 'Hiking', 'Active'], phases: ['activities'] },
  { id: 'qt-beach-act', emoji: '🏖️', label: 'Beach Day', tags: ['Beaches', 'Sunny', 'Relax'], phases: ['activities'] },
  { id: 'qt-museum', emoji: '🏛️', label: 'Museums', tags: ['Culture', 'History', 'Historic City'], phases: ['activities'] },
  { id: 'qt-food', emoji: '🍽️', label: 'Food Tours', tags: ['Food', 'Gastronomy', 'Local'], phases: ['activities'] },
  { id: 'qt-night', emoji: '🪩', label: 'Nightlife', tags: ['Nightlife', 'Party', 'Metropolis'], phases: ['activities'] },
  { id: 'qt-spa', emoji: '🧖', label: 'Spa Day', tags: ['Spa', 'Wellness', 'Relax'], phases: ['activities'] },
  { id: 'qt-shopping', emoji: '🛍️', label: 'Shopping', tags: ['Shopping', 'Fashion', 'City'], phases: ['activities'] },
  { id: 'qt-forest', emoji: '🌲', label: 'Forest Walk', tags: ['Green', 'Forest', 'Eco'], phases: ['activities'] },
  { id: 'qt-photo', emoji: '📸', label: 'Photography', tags: ['Scenic', 'Photography', 'Volcanic'], phases: ['activities'] },
  { id: 'qt-cycling', emoji: '🚴', label: 'Cycling', tags: ['Active', 'Outdoors', 'Adventure'], phases: ['activities'] },
  { id: 'qt-theater', emoji: '🎭', label: 'Theater & Shows', tags: ['Culture', 'Art', 'City'], phases: ['activities'] },
];

export const STAYS_QUICK_TAPS: QuickTapChip[] = [
  { id: 'qt-luxury', emoji: '👑', label: 'Luxury', tags: ['Luxury', '5-Star', 'Premium'], phases: ['stays'] },
  { id: 'qt-budget', emoji: '💰', label: 'Budget-Friendly', tags: ['Budget', 'Value', 'Clean'], phases: ['stays'] },
  { id: 'qt-unique', emoji: '✨', label: 'Unique & Quirky', tags: ['Boutique', 'Design', 'Unique'], phases: ['stays'] },
  { id: 'qt-nature-stay', emoji: '🏕️', label: 'Nature Stays', tags: ['Camping', 'Nature', 'Rustic'], phases: ['stays'] },
  { id: 'qt-social-stay', emoji: '🎒', label: 'Social & Hostel', tags: ['Hostel', 'Social', 'Budget'], phases: ['stays'] },
  { id: 'qt-resort', emoji: '🏖️', label: 'Resort & Spa', tags: ['Resort', 'All-inclusive', 'Relax'], phases: ['stays'] },
  { id: 'qt-cozy', emoji: '🏡', label: 'Cozy & Homey', tags: ['Boutique', 'Quiet', 'Relax'], phases: ['stays'] },
  { id: 'qt-modern', emoji: '🏙️', label: 'Modern & Sleek', tags: ['Design', 'City', 'Premium'], phases: ['stays'] },
];

// ── Scoring constants (proportional) ───────────────────
// Position ±1 = slight lean, ±2 = strong lean
export const DUEL_SCORE_MAP: Record<number, { winner: number; loser: number }> = {
  [-2]: { winner: 4.0, loser: -2.0 },   // strong lean
  [-1]: { winner: 1.5, loser: -0.5 },   // slight lean
  [0]: { winner: 0, loser: 0 },
  [1]: { winner: 1.5, loser: -0.5 },     // slight lean
  [2]: { winner: 4.0, loser: -2.0 },     // strong lean
};

export const QUICKTAP_BOOST = 1.5;

// ── Get chips for current phase ────────────────────────
export function getChipsForPhase(phase: 'vibes' | 'activities' | 'stays'): QuickTapChip[] {
  if (phase === 'vibes') return VIBES_QUICK_TAPS;
  if (phase === 'activities') return ACTIVITIES_QUICK_TAPS;
  return STAYS_QUICK_TAPS;
}
