import { Link } from "react-router-dom";

const WishlistCard = ({ wishlist, onEdit }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{wishlist.title}</h5>
        <p className="card-text">
          Created by: <strong>{wishlist.createdBy?.name || "Unknown"}</strong>
        </p>
        <Link to={`/wishlist/${wishlist._id}`} className="btn btn-sm btn-primary me-2">
          View
        </Link>
        <button onClick={() => onEdit(wishlist)} className="btn btn-sm btn-warning">
          Edit
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
