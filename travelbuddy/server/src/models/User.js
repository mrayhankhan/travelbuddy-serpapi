const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  image: { type: String, default: "" },
  provider: { type: String, default: "credentials" }, // 'credentials' | 'google'

  // ── Profile Fields ──────────────────────────────────────────────────
  age: { type: Number, default: null },
  city: { type: String, default: "" },
  bio: { type: String, default: "", maxlength: 150 },
  photos: { type: [String], default: [] }, // up to 5 photo URLs

  // Travel Intent
  travelDates: {
    type: { type: String, enum: ["exact", "flexible"], default: "flexible" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    flexibleMonth: { type: String, default: "" },
  },

  // Budget Indicators
  budgetRange: { type: String, default: "" }, // '5k-10k' | '10k-25k' | '25k-60k' | '60k+'
  accommodationPref: { type: String, default: "" }, // 'Hostel' | 'Airbnb' | 'Hotel' | 'Resort'
  spendingStyle: { type: Number, default: 50, min: 0, max: 100 }, // 0=Budget, 100=Luxury

  // Session / Pre-Trip Settings
  departureCity: { type: String, default: "" },
  duration: { type: String, default: "5-7" },
  intendedTravelWindow: {
    type: String,
    enum: [
      "within-7-days",
      "within-1-month",
      "within-3-months",
      "within-6-months",
    ],
    default: "within-1-month",
  },
  travelers: { type: Number, default: 2 },
  adults: { type: Number, default: 2 },
  children: { type: Number, default: 0 },
  budget: { type: Number, default: 100000 },

  // Travel Style Tags
  travelStyleTags: { type: [String], default: [] },

  // Travel Cash (rewards balance in ₹)
  travelCash: { type: Number, default: 0 },

  // Trust & Verification
  isVerified: { type: Boolean, default: false },
  socialLink: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
