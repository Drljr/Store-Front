import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ closeModal, onAdd }) => {
  const [productData, setProductData] = useState({
    name: "",
    productId: "",
    category: "",
    buyingPrice: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    thresholdValue: "",
    availability: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert availability to boolean
    if (name === "availability") {
      setProductData(prev => ({
        ...prev,
        [name]: value === "true" ? true : false,
      }));
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Failed to add product");
      const newProduct = await response.json();

      onAdd(newProduct);  // Update parent product list here
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>New Product</h2>
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
              />
            </div>
            <div className="form-group">
              <label>Product ID</label>
              <input
                type="text"
                name="productId"
                value={productData.productId}
                onChange={handleChange}
                placeholder="Enter product ID"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                placeholder="Select product category"
              />
            </div>
            <div className="form-group">
              <label>Buying Price</label>
              <input
                type="number"
                name="buyingPrice"
                value={productData.buyingPrice}
                onChange={handleChange}
                placeholder="Enter buying price"
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                placeholder="Enter product quantity"
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={productData.expiryDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Threshold Value</label>
              <input
                type="number"
                name="thresholdValue"
                value={productData.thresholdValue}
                onChange={handleChange}
                placeholder="Enter threshold value"
              />
            </div>
            <div className="form-group">
              <label>Availability</label>
              <select
                name="availability"
                value={productData.availability}
                onChange={handleChange}
              >
                <option value="">Select availability</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="discard-btn" onClick={closeModal}>
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