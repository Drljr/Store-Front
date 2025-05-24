import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ closeModal }) => {
  const [productData, setProductData] = useState({
    productName: "",
    productId: "",
    category: "",
    buyingPrice: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    thresholdValue: "",
  });
  const [image, setImage] = useState(null); // State for the uploaded image
  const [imagePreview, setImagePreview] = useState(null); // State for the image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Include the image in the product data (you may need to upload it to a server)
    const formData = { ...productData, image };
    console.log("Product Data with Image:", formData); // Replace with API call
    // Clean up the preview URL to avoid memory leaks
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    closeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-image">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            ) : (
              <div className="dashed-box">
                <label htmlFor="image-upload">
                  Drag image here or Browse image
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </div>
          <div className="modal-form">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={productData.productName}
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
              <label>Unit</label>
              <input
                type="text"
                name="unit"
                value={productData.unit}
                onChange={handleChange}
                placeholder="Enter product unit"
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