const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const checkRole = require('../middleware/roleCheck'); // 1. Import the middleware

// ─── POST: Create a New Listing (Hosts Only) ──────────────────────────────────
// 2. Drop the middleware right before the async function
router.post('/', checkRole(['Host']), async (req, res) => {
    try {
        const newListing = new Listing(req.body);
        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error creating listing', error: error.message });
    }
});

// ─── GET: Fetch All Listings (Public / All Roles) ─────────────────────────────
// No middleware here because Guests need to see listings before logging in
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching listings', error: error.message });
    }
});

// ─── PUT: Update an Existing Listing (Hosts Only) ─────────────────────────────
router.put('/:id', checkRole(['Host']), async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedListing) return res.status(404).json({ message: 'Listing not found' });
        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error updating listing', error: error.message });
    }
});

// ─── DELETE: Remove a Listing (Hosts and Admins) ──────────────────────────────
router.delete('/:id', checkRole(['Host', 'Admin']), async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);
        if (!deletedListing) return res.status(404).json({ message: 'Listing not found' });
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting listing', error: error.message });
    }
});

module.exports = router;