import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const WishlistDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [form, setForm] = useState({ name: "", price: "", imageUrl: "" });

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setProducts(data);
    } catch (err) {
      toast.error("Error loading products");
    }
  };

  const fetchWishlistInfo = async () => {
    const { data } = await axios.get(`/api/wishlists`);
    const current = data.find(w => w._id === id);
    setWishlist(current || {});
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { name, price, imageUrl } = form;
    if (!name || !price || !imageUrl) return toast.warn("Fill all fields");
    try {
      await axios.post("/api/products", { ...form, wishlistId: id });
      toast.success("Product added!");
      setForm({ name: "", price: "", imageUrl: "" });
      fetchProducts();
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  const handleDelete = async (pid) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`/api/products/${pid}`);
      toast.success("Deleted!");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  useEffect(() => {
    fetchWishlistInfo();
    fetchProducts();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Wishlist: {wishlist?.title}</h2>
        <p className="text-muted">
          Created by: <strong>{wishlist?.createdBy?.name || "N/A"}</strong>
        </p>
      </div>

      <div className="card p-4 mb-5 shadow-sm">
        <h5>Add Product</h5>
        <form onSubmit={handleAdd} className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Product Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>
          <div className="col-md-1 d-grid">
            <button className="btn btn-success">Add</button>
          </div>
        </form>
      </div>

      <h4 className="mb-3">Products</h4>
      {products.length === 0 ? (
        <p className="text-muted">No products added yet.</p>
      ) : (
        <div className="row">
          {products.map(product => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text mb-1">Price: ₹{product.price}</p>
                  <small className="text-muted">Added by: {product.addedBy?.name || "Unknown"}</small>
                </div>
                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistDetail;
