// Load environment variables FIRST — before anything else
require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

// ─── Initialize Express App ───────────────────────────────────────────────────
const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors());            // Allow cross-origin requests from Member 1's frontend
app.use(express.json());    // Parse incoming JSON request bodies

// ─── Database Connection ──────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅  MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1); // Exit if DB connection fails — nothing works without it
  });

// ─── Routes (add here as you build them) ─────────────────────────────────────
// Example:
// const listingRoutes = require('./routes/listings');
// app.use('/api/listings', listingRoutes);

// ─── Root Health-Check Endpoint ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'StayEZ API is running 🏠' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  Server is running on http://localhost:${PORT}`);
});
