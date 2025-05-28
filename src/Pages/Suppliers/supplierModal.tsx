import React, { useState,useEffect } from "react";
import "./supplierModal.css"; // Reuse the same CSS for consistency

const supplierModal = ({ closeModal , onAdd}) => {
  const [supplierData, setSupplierData] = useState({
    name: "",
    product: "",
    category: "",
    contact: "",
    email: "",
    type: "",
    amountsupplied: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplierData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add supplier: ${errorText}`);
      }
      const result = await response.json();
      onAdd(result);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  
  


  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>New Supplier</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="modal-form">
            <div className="form-group">
              <label>Supplier Name</label>
              <input
                type="text"
                name="name"
                value={supplierData.name}
                onChange={handleChange}
                placeholder="Enter supplier name"
              />
            </div>
            <div className="form-group">
              <label>Product</label>
              <input
                type="text"
                name="product"
                value={supplierData.product}
                onChange={handleChange}
                placeholder="Enter product"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={supplierData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={supplierData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
            <div>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Not Taking return"
                    checked={supplierData.type === "Not Taking return"}
                    onChange={handleChange}
                  />
                  Not Taking return
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Taking return"
                    checked={supplierData.type === "Taking return"}
                    onChange={handleChange}
                  />
                  Taking return
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Amount Supplied</label>
              <input
                type="number"
                name="amountsupplied"
                value={supplierData.amountsupplied}
                onChange={handleChange}
                placeholder="Enter amount supplied"
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="discard-btn" onClick={() => { closeModal(); onAdd(supplierData); }}>
              Discard
            </button>
            <button type="submit" className="add-btn">
              Add Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default supplierModal;