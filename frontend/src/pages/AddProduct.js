import React, { useState } from "react";
import API from "../services/api";
import "../styling/addproduct.css";

function AddProduct({ onProductAdded }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        name,
        quantity: Number(quantity),
        price: Number(price),
        expiryDate
      });

      alert("Product added successfully");

      setName("");
      setQuantity("");
      setPrice("");
      setExpiryDate("");

      if (onProductAdded) onProductAdded();
    } catch (error) {
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-container">
      <h3>Add New Product</h3>
      <p className="form-subtitle">
        Enter product details to update inventory
      </p>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="input-row">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
