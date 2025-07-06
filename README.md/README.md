# 📝 Wishlist App

A full-stack MERN application where users can register, log in, create/edit wishlists, and add/edit/delete products under each wishlist.

---

## 🚀 Tech Stack

- **Frontend**: React, React Router, Bootstrap, Axios, React Toastify
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Auth**: JWT-based authentication with protected routes

---

## 🛠 Setup Instructions

### Prerequisites:
- Node.js and npm installed
- MongoDB running locally or URI from MongoDB Atlas


### How I'd Scale or Improve This App ###


1) Add Pagination and Search Filters

Implement pagination on both the wishlist and product listings to enhance performance, especially when dealing with large datasets. Add search and filter capabilities (e.g., filter by price range, sort alphabetically, etc.) using query parameters on the backend and controlled inputs on the frontend.

2) Support Inviting Collaborators to Wishlists
Allow users to invite others to collaborate on specific wishlists. This would involve updating the wishlist schema to include a members array and creating endpoints for inviting/removing collaborators, along with UI support for managing them.

3) Integrate AI Suggestions
Use a recommendation engine or integrate AI services to suggest products based on previous entries or wishlist content. This can improve user engagement by making the app feel more personalized.

4) Use Cloudinary or Firebase for Image Uploads
Replace direct URL-based image entry with image uploads. Integrate Cloudinary or Firebase Storage to allow users to upload and preview product images securely and reliably, especially for non-technical users.

5) Role-Based Permissions (Admin vs User)
Introduce roles such as Admin and User. Admins can manage all wishlists/products, while regular users can only access their own. Implement middleware for role validation and adjust UI controls accordingly.

6) Add Responsive Mobile-Friendly Enhancements
Ensure the app layout works seamlessly on all screen sizes. Use Bootstrap’s grid system effectively or integrate a mobile-first CSS framework. Also, add mobile-specific UI tweaks such as collapsible menus and larger buttons.

7) Use TanStack Table for Advanced Product Listing
Integrate TanStack Table (formerly React Table) to handle complex product listings with features like inline editing, sorting, filtering, and customizable cell rendering. This would improve usability and performance when managing large lists.

8) Dockerize Backend and Frontend for Deployment
Create Dockerfiles and docker-compose.yml to containerize the backend and frontend. This makes deployment consistent across environments, simplifies onboarding for new developers, and is essential for scaling the app to production.