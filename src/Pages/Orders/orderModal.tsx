import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import "./orderModal.css";

const OrderModal = ({ onClose, onAddOrder, onEditOrder, initialData }) => {
  const [orderData, setOrderData] = useState({
    customer: "",
    items: "",
    total: "",
    status: "Pending",
    priority: "low",
    paymentStatus: "unpaid",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setOrderData({
        customer: initialData.customer || "",
        items: initialData.items || "",
        total: initialData.total || "",
        status: initialData.status || "Pending",
        priority: initialData.priority || "low",
        paymentStatus: initialData.paymentStatus || "unpaid",
      });
    } else {
      setOrderData({
        customer: "",
        items: "",
        total: "",
        status: "Pending",
        priority: "low",
        paymentStatus: "unpaid",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let response;
      if (initialData) {
        // Edit existing order
        response = await api.put(`/orders/${initialData.id}`, {
          customer: orderData.customer,
          items: Number(orderData.items),
          total: Number(orderData.total),
          status: orderData.status,
          priority: orderData.priority,
          paymentStatus: orderData.paymentStatus,
          date: initialData.date || new Date(),
        });
        if (response.status === 200) {
          onEditOrder(response.data);
        } else {
          throw new Error("Unexpected response status for edit");
        }
      } else {
        // Add new order
        response = await api.post('/orders/create', {
          customer: orderData.customer,
          items: Number(orderData.items),
          total: Number(orderData.total),
          status: orderData.status,
          priority: orderData.priority,
          paymentStatus: orderData.paymentStatus,
          date: new Date(),
        });
        if (response.status === 201) {
          onAddOrder(response.data);
        } else {
          throw new Error("Unexpected response status for create");
        }
      }

      onClose();
    } catch (error) {
      console.error("Error adding/editing order:", error);
      setError(error.response?.data?.message || "Failed to add/edit order");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{initialData ? "Edit Order" : "Add Order"}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="modal-form">
            <div className="form-group">
              <label>Customer</label>
              <input
                type="text"
                name="customer"
                value={orderData.customer}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="form-group">
              <label>Items</label>
              <input
                type="number"
                name="items"
                value={orderData.items}
                onChange={handleChange}
                placeholder="Enter number of items"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Total</label>
              <input
                type="number"
                name="total"
                value={orderData.total}
                onChange={handleChange}
                placeholder="Enter total amount"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={orderData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={orderData.priority}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Payment Status</label>
              <select
                name="paymentStatus"
                value={orderData.paymentStatus}
                onChange={handleChange}
                required
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="discard-btn" onClick={onClose}>
              Discard
            </button>
            <button type="submit" className="add-btn">
              {initialData ? "Save Changes" : "Add Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;