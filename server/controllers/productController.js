const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const { wishlistId, name, price, imageUrl } = req.body;
  const product = await Product.create({
    wishlist: wishlistId,
    name,
    price,
    imageUrl,
    addedBy: req.user._id,
  });
  res.status(201).json(product);
};

exports.getWishlistProducts = async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ wishlist: id }).populate("addedBy", "name email");
  res.json(products);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
