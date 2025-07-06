import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import WishlistCard from "../components/wishlist/WishlistCard";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useAuth();
  const [wishlists, setWishlists] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchWishlists = async () => {
    try {
      const { data } = await API.get("/wishlists");
      setWishlists(data);
    } catch (err) {
      console.error("Error fetching wishlists", err);
      toast.error("Failed to fetch wishlists");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editId) {
        await API.put(`/wishlists/${editId}`, { title });
        toast.success("Wishlist updated");
      } else {
        await API.post("/wishlists", { title });
        toast.success("Wishlist created");
      }
      setTitle("");
      setEditId(null);
      fetchWishlists();
    } catch (err) {
      console.error(editId ? "Edit failed" : "Create failed", err);
      toast.error("Operation failed");
    }
  };

  const handleEdit = (wishlist) => {
    setEditId(wishlist._id);
    setTitle(wishlist.title);
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">{editId ? "Edit Wishlist" : "Your Wishlists"}</h2>
        <p className="text-muted">Manage and share your wishlists</p>
      </div>

      <div className="card shadow-sm p-4 mb-5">
        <form onSubmit={handleSubmit} className="row g-3 align-items-center">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Enter wishlist title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-3 d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success" type="submit">
              {editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {wishlists.length === 0 ? (
        <p className="text-muted text-center">No wishlists found. Start by creating one!</p>
      ) : (
        <div className="row">
          {wishlists.map((w) => (
            <div key={w._id} className="col-md-6 mb-4">
              <WishlistCard wishlist={w} onEdit={handleEdit} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
