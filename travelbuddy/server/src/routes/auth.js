const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Accept large JSON bodies for base64 photos
router.use(express.json({ limit: "10mb" }));

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = new User({ email: email.toLowerCase(), password, name });
    await user.save();

    res.status(201).json({ id: user._id, email: user.email, name: user.name });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ id: user._id, email: user.email, name: user.name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Upsert Google OAuth user (no password needed)
router.post("/google-user", async (req, res) => {
  try {
    const { email, name, image } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find or create the user
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      // Update name/image if changed
      if (name && name !== user.name) user.name = name;
      if (image) user.image = image;
      user.provider = "google";
      await user.save();
    } else {
      user = new User({
        email: email.toLowerCase(),
        name,
        image,
        provider: "google",
        password: require("crypto").randomBytes(32).toString("hex"), // random password — user won't use it
      });
      await user.save();
    }

    res.json({ id: user._id, email: user.email, name: user.name });
  } catch (err) {
    console.error("Google user upsert error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ error: "Email and new password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Profile Endpoints ────────────────────────────────────────────────────

// GET /api/auth-backend/profile/:email — Fetch user profile
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      email: user.email,
      name: user.name,
      image: user.image,
      age: user.age,
      city: user.city,
      bio: user.bio,
      photos: user.photos || [],
      travelDates: user.travelDates || {
        type: "flexible",
        startDate: "",
        endDate: "",
        flexibleMonth: "",
      },
      budgetRange: user.budgetRange || "",
      accommodationPref: user.accommodationPref || "",
      spendingStyle: user.spendingStyle ?? 50,

      // Session / Pre-Trip Settings
      departureCity: user.departureCity || "",
      duration: user.duration || "5-7",
      intendedTravelWindow: user.intendedTravelWindow || "within-1-month",
      travelers: user.travelers ?? 2,
      adults: user.adults ?? 2,
      children: user.children ?? 0,
      budget: user.budget ?? 100000,

      travelStyleTags: user.travelStyleTags || [],
      travelCash: user.travelCash || 0,
      isVerified: user.isVerified || false,
      socialLink: user.socialLink || "",
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// PATCH /api/auth-backend/profile/:email — Update user profile
router.patch("/profile/:email", async (req, res) => {
  try {
    const allowed = [
      "name",
      "age",
      "city",
      "bio",
      "photos",
      "image",
      "travelDates",
      "budgetRange",
      "accommodationPref",
      "spendingStyle",
      "departureCity",
      "duration",
      "intendedTravelWindow",
      "travelers",
      "adults",
      "children",
      "budget",
      "travelStyleTags",
      "socialLink",
      "travelCash",
    ];

    // Build $set object from whitelisted fields only
    const update = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        update[key] = req.body[key];
      }
    }

    if (Object.keys(update).length === 0) {
      return res.json({ success: true }); // nothing to update
    }

    // findOneAndUpdate avoids the VersionError that happens when multiple
    // concurrent requests use findOne+save (Mongoose optimistic concurrency).
    const result = await User.findOneAndUpdate(
      { email: req.params.email.toLowerCase() },
      { $set: update },
      { new: true, runValidators: false },
    );

    if (!result) return res.status(404).json({ error: "User not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// POST /api/auth-backend/profile/:email/credit-cashback — Atomically add travel cash
router.post("/profile/:email/credit-cashback", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Valid positive amount is required" });
    }

    const result = await User.findOneAndUpdate(
      { email: req.params.email.toLowerCase() },
      { $inc: { travelCash: amount } },
      { new: true },
    );

    if (!result) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, travelCash: result.travelCash });
  } catch (err) {
    console.error("Credit cashback error:", err);
    res.status(500).json({ error: "Failed to credit cashback" });
  }
});

// POST /api/auth-backend/profile/:email/deduct-cashback — Atomically deduct travel cash
router.post("/profile/:email/deduct-cashback", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Valid positive amount is required" });
    }

    // Use findOneAndUpdate to atomically decrement travelCash, ensuring it doesn't drop below 0
    const user = await User.findOne({ email: req.params.email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "User not found" });

    const newBalance = Math.max(0, (user.travelCash || 0) - amount);

    const result = await User.findOneAndUpdate(
      { email: req.params.email.toLowerCase() },
      { $set: { travelCash: newBalance } },
      { new: true },
    );

    res.json({ success: true, travelCash: result.travelCash });
  } catch (err) {
    console.error("Deduct cashback error:", err);
    res.status(500).json({ error: "Failed to deduct cashback" });
  }
});

module.exports = router;
