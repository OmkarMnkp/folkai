const Wishlist = require("../models/Wishlist");

exports.createWishlist = async (req, res) => {
  const { title } = req.body;
  const wishlist = await Wishlist.create({
    title,
    createdBy: req.user._id,
    members: [req.user._id]
  });
  res.status(201).json(wishlist);
};

exports.getUserWishlists = async (req, res) => {
  const wishlists = await Wishlist.find({ members: req.user._id }).populate("createdBy", "name email");
  res.json(wishlists);
};
