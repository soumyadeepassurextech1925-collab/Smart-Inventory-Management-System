import React, { useEffect, useState } from "react";
import API from "../services/api";
import AddProduct from "./AddProduct";
import "../styling/inventory.css";

function Inventory() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="inventory-page">
      {/* Header */}
      <div className="inventory-header">
        <h2>Inventory Management</h2>
        <p>Monitor stock levels and manage products efficiently</p>
      </div>

      {/* Add Product */}
      <div className="add-product-center">
        <AddProduct onProductAdded={fetchProducts} />
      </div>

      {/* Product Cards */}
      <div className="product-grid">
        {products.length === 0 && (
          <p className="empty-text">No products available</p>
        )}

        {products.map((product) => (
          <div className="product-card" key={product._id}>
            {/* Status Strip */}
            <div
              className={`status-strip ${
                product.quantity < 5
                  ? "strip-low"
                  : product.quantity <= 20
                  ? "strip-normal"
                  : "strip-high"
              }`}
            />

            <div className="product-body">
              <h4 className="product-name">{product.name}</h4>

              <div className="product-meta">
                <span>Quantity: {product.quantity}</span>
                <span>₹ {product.price}</span>
              </div>

              {/* Stock Badge */}
              <span
                className={`stock-badge ${
                  product.quantity < 5
                    ? "stock-low"
                    : product.quantity <= 20
                    ? "stock-normal"
                    : "stock-high"
                }`}
              >
                {product.quantity < 5
                  ? "Low Stock"
                  : product.quantity <= 20
                  ? "Normal Stock"
                  : "High Stock"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
