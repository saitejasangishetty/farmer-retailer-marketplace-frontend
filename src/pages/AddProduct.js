import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const farmerId = localStorage.getItem("farmerId");

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    quantity: "",
    category: "",
    location: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!image) {
    alert("Please upload product image");
    return;
  }

  if (!farmerId) {
    alert("Please login again ❌");
    navigate("/farmer-login");
    return;
  }

  const formData = new FormData();
  formData.append("productName", product.productName);
  formData.append("price", product.price);
  formData.append("quantity", product.quantity);
  formData.append("category", product.category);
  formData.append("location", product.location);
  formData.append("image", image);

  try {
    setLoading(true);

    await API.post(`/products/add/${farmerId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Product added successfully ✅");
    navigate("/my-products");

  } catch (err) {
    console.error("Add product error:", err);
    alert("Failed to add product ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="addp-container">
      <form className="addp-form" onSubmit={handleSubmit}>
        <h2>➕ Add New Product</h2>

        <label>Product Name</label>
        <input
          name="productName"
          value={product.productName}
          onChange={handleChange}
          required
        />

        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Quantity (kg)</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Vegetable / Fruit"
          required
        />

        <label>Location</label>
        <input
          name="location"
          value={product.location}
          onChange={handleChange}
          placeholder="Hyderabad"
          required
        />

        <label>Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
