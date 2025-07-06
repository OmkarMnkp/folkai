const express = require("express");
const router = express.Router();
const { addProduct, getWishlistProducts, deleteProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addProduct);
router.get("/:id", protect, getWishlistProducts);
router.delete("/:id", protect, deleteProduct);
const { protect } = require("../middleware/authMiddleware");

router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Optional: Only allow editing by the creator
    if (String(product.createdBy) !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, price, image } = req.body;

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.image = image ?? product.image;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error while updating product" });
  }
});

module.exports = router;
