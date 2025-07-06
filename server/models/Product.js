const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  wishlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' },
  name: String,
  imageUrl: String,
  price: Number,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
