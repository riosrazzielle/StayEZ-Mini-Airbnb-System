const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// ─── POST: Create a New Listing ───────────────────────────────────────────────
router.post('/', async (req, res) => {
    try {
        // The frontend will send the listing data inside req.body
        const newListing = new Listing(req.body);
        const savedListing = await newListing.save();

        // Respond with a 201 (Created) status and the saved data
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error creating listing', error: error.message });
    }
});

// ─── GET: Fetch All Listings ──────────────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find(); // Fetches everything from the DB
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching listings', error: error.message });
    }
});

// ─── PUT: Update a Listing by ID ─────────────────────────────────────────────
router.put('/:id', async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,  // The ID from the URL (e.g., /api/listings/abc123)
            req.body,       // The new data sent from the frontend
            { new: true, runValidators: true } // Return the updated doc & validate fields
        );

        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error updating listing', error: error.message });
    }
});

// ─── DELETE: Remove a Listing by ID ──────────────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);

        if (!deletedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.status(200).json({ message: 'Listing deleted successfully', deletedListing });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting listing', error: error.message });
    }
});

module.exports = router;