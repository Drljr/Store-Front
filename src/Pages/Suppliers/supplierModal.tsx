import  { useState, useEffect } from "react";
import "./supplierModal.css";

const SupplierModal = ({ onClose, onAddSupplier, initialData }) => {
  const [supplierData, setSupplierData] = useState({
    name: "",
    category: "",
    rating: "",
    status: "active",
    location: "",
    phone: "",
    email: "",
    totalOrders: "",
    onTimeDelivery: "",
    qualityScore: "",
    totalValue: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setSupplierData({
        name: initialData.name || "",
        category: initialData.category || "",
        rating: initialData.rating || "",
        status: initialData.status || "active",
        location: initialData.location || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        totalOrders: initialData.totalOrders || "",
        onTimeDelivery: initialData.onTimeDelivery || "",
        qualityScore: initialData.qualityScore || "",
        totalValue: initialData.totalValue || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/suppliers/${initialData ? initialData.id : 'create'}`,
        {
          method: initialData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: supplierData.name,
            category: supplierData.category,
            rating: Number(supplierData.rating),
            status: supplierData.status,
            location: supplierData.location,
            phone: supplierData.phone,
            email: supplierData.email,
            totalOrders: String(supplierData.totalOrders), // Ensure string as per schema
            onTimeDelivery: Number(supplierData.onTimeDelivery),
            qualityScore: Number(supplierData.qualityScore),
            totalValue: Number(supplierData.totalValue),
            lastOrder: initialData ? initialData.lastOrder : undefined, // Preserve if editing
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add/edit supplier");
      }

      const newSupplier = await response.json();
      onAddSupplier(newSupplier);
      onClose();
    } catch (error) {
      console.error("Error adding/editing supplier:", error);
      setError(error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{initialData ? "Edit Supplier" : "Add Supplier"}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="modal-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={supplierData.name}
                onChange={handleChange}
                placeholder="Enter supplier name"
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={supplierData.category}
                onChange={handleChange}
                placeholder="Enter category"
                required
              />
            </div>
            <div className="form-group">
              <label>Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={supplierData.rating}
                onChange={handleChange}
                placeholder="Enter rating"
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={supplierData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={supplierData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={supplierData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
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
                required
              />
            </div>
            <div className="form-group">
              <label>Total Orders</label>
              <input
                type="text"
                name="totalOrders"
                value={supplierData.totalOrders}
                onChange={handleChange}
                placeholder="Enter total orders"
                required
              />
            </div>
            <div className="form-group">
              <label>On-time Delivery (%)</label>
              <input
                type="number"
                name="onTimeDelivery"
                value={supplierData.onTimeDelivery}
                onChange={handleChange}
                placeholder="Enter on-time delivery percentage"
                required
              />
            </div>
            <div className="form-group">
              <label>Quality Score (%)</label>
              <input
                type="number"
                name="qualityScore"
                value={supplierData.qualityScore}
                onChange={handleChange}
                placeholder="Enter quality score percentage"
                required
              />
            </div>
            <div className="form-group">
              <label>Total Value</label>
              <input
                type="number"
                name="totalValue"
                value={supplierData.totalValue}
                onChange={handleChange}
                placeholder="Enter total value"
                required
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="discard-btn" onClick={onClose}>
              Discard
            </button>
            <button type="submit" className="add-btn">
              {initialData ? "Save Changes" : "Add Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;