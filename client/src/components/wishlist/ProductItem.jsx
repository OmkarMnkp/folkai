import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const ProductItem = ({ product, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  const handleUpdate = async () => {
    try {
      const { data } = await API.put(`/products/${product._id}`, {
        name,
        price,
        image,
      });
      toast.success("Product updated");
      setEditing(false);
      onUpdate(); 
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        {editing ? (
          <>
            <input
              className="form-control mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="form-control mb-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <img src={product.image} alt={product.name} className="img-fluid mb-2" />
            <h5>{product.name}</h5>
            <p>₹{product.price}</p>
            <button className="btn btn-warning btn-sm" onClick={() => setEditing(true)}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
