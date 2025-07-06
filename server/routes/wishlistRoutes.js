const express = require("express");
const router = express.Router();
const { createWishlist, getUserWishlists } = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

const Wishlist = require("../models/Wishlist");

// Existing routes
router.post("/", protect, createWishlist);
router.get("/", protect, getUserWishlists);

// ✅ Add this PUT route for editing
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Wishlist.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { title: req.body.title },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Wishlist not found or not yours" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating wishlist:", err);
    res.status(500).json({ message: "Server error while updating" });
  }
});

module.exports = router;
