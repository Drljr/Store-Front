import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ onClose, onAddProduct }) => {
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
    status: "In Stock",
    supplier: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productData.name,
          sku: productData.sku,
          category: productData.category || "all",
          price: Number(productData.price),
          stock: Number(productData.stock),
          minStock: Number(productData.minStock),
          status: productData.status,
          supplier: productData.supplier,
          lastUpdated: new Date().toISOString(), // Automatically set to current date
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add product");
      }

      const newProduct = await response.json();
      onAddProduct(newProduct); // Update parent product list
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>New Product</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="modal-form">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="form-group">
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleChange}
                placeholder="Enter SKU"
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="all">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Sports">Sports</option>
                <option value="Books">Books</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                required
              />
            </div>
            <div className="form-group">
              <label>Minimum Stock</label>
              <input
                type="number"
                name="minStock"
                value={productData.minStock}
                onChange={handleChange}
                placeholder="Enter minimum stock"
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={productData.status}
                onChange={handleChange}
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="form-group">
              <label>Supplier</label>
              <input
                type="text"
                name="supplier"
                value={productData.supplier}
                onChange={handleChange}
                placeholder="Enter supplier name"
                required
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="discard-btn" onClick={onClose}>
              Discard
            </button>
            <button type="submit" className="add-btn">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;