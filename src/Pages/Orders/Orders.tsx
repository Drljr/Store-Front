import { useState, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import "./Orders.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import OrderModal from "./orderModal";
import api from "../../api/axios.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [currentTime, setCurrentTime] = useState(new Date());

  const openModal = (order = null) => {
    setSelectedOrder(order);
    setIsEditMode(!!order);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setIsEditMode(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await api.get('/orders');
        const mappedOrders = response.data.map(order => ({
          ...order,
          id: order._id,
          date: order.date ? new Date(order.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) : 'N/A',
        }));
        setOrders(mappedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleAddOrder = (newOrder) => {
    const mappedOrder = {
      ...newOrder,
      id: newOrder._id,
      date: newOrder.date ? new Date(newOrder.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) : 'N/A',
    };
    setOrders(prev => [...prev, mappedOrder]);
  };

  const handleEditOrder = (updatedOrder) => {
    const mappedOrder = {
      ...updatedOrder,
      id: updatedOrder._id,
      date: updatedOrder.date ? new Date(updatedOrder.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) : 'N/A',
    };
    setOrders(prev => prev.map(o => o.id === mappedOrder.id ? mappedOrder : o));
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await api.delete(`/orders/${orderId}`);
        setOrders(prev => prev.filter(o => o.id !== orderId));
      } catch (err) {
        console.error("Error deleting order:", err);
        setError("Failed to delete order");
      }
    }
  };

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        (order.customer || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.id || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(order => order.priority === priorityFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "total":
          return b.total - a.total;
        case "customer":
          return (a.customer || "").localeCompare(b.customer || "");
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, priorityFilter, sortBy]);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalValue: orders.reduce((sum, order) => sum + order.total, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'processing': return '⚙️';
      case 'shipped': return '🚚';
      case 'delivered': return '✅';
      default: return '📦';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) return <div className="orders-loading">Loading...</div>;
  if (error) return <div className="orders-error">{error}</div>;

  return (
    <div className="orders-layout">
      <Sidebar />
      <div className="orders-main">
        <Navbar />
        <div className="orders-container">
          <div className="orders-header">
            <div className="header-content">
              <div className="title-section">
                <h1 className="page-title">
                  <span className="title-icon">📦</span>
                  Order Management
                </h1>
                <p className="page-subtitle">
                  Track and manage all your orders in one place
                </p>
                <div className="current-time">
                  Last updated: {currentTime.toLocaleTimeString()}
                </div>
              </div>
              <button className="add-order-btn" onClick={() => openModal()}>
                <span className="btn-icon">+</span>
                New Order
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card total-orders">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">📊</span>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Orders</div>
              </div>
            </div>
            
            <div className="stat-card pending-orders">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">⏳</span>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.pending}</div>
                <div className="stat-label">Pending Orders</div>
              </div>
            </div>
            
            <div className="stat-card total-value">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">💰</span>
              </div>
              <div className="stat-content">
                <div className="stat-number">{formatCurrency(stats.totalValue)}</div>
                <div className="stat-label">Total Value</div>
              </div>
            </div>
            
            <div className="stat-card avg-value">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">📈</span>
              </div>
              <div className="stat-content">
                <div className="stat-number">{formatCurrency(stats.avgOrderValue)}</div>
                <div className="stat-label">Avg Order Value</div>
              </div>
            </div>
          </div>

          <div className="controls-section">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search orders or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-controls">
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              
              <select
                className="filter-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="total">Sort by Value</option>
                <option value="customer">Sort by Customer</option>
              </select>
            </div>
          </div>

          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="card-header">
                  <div className="order-info">
                    <h3 className="order-id">{order.orderId}</h3>
                    <p className="customer-name">{order.customer}</p>
                  </div>
                  <div className="card-actions">
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                    <span className={`priority-badge ${order.priority}`}>
                      {getPriorityIcon(order.priority)}
                    </span>
                    <div className="action-buttons">
                      <button className="action-btn view-btn" title="View Details" onClick={() => openModal(order)}>
                        <Eye size={16} />
                      </button>
                      <button className="action-btn edit-btn" title="Edit" onClick={() => openModal(order)}>
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete-btn" title="Delete" onClick={() => handleDeleteOrder(order.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="order-details">
                  <div className="detail-row">
                    <span className="detail-label">📅 Order Date:</span>
                    <span className="detail-value">{order.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📦 Items:</span>
                    <span className="detail-value">{order.items} items</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💳 Payment:</span>
                    <span className={`payment-status ${order.paymentStatus}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
                
                <div className="order-value">
                  <div className="value-display">
                    <span className="currency-symbol">$</span>
                    <span className="amount">{order.total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="card-footer">
                  <button className="action-btn track-btn" title="Track">
                    📍 Track
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No orders found</h3>
              <p>Try adjusting your search criteria or create a new order</p>
              <button className="create-order-btn" onClick={() => openModal()}>Create First Order</button>
            </div>
          )}

          {/* Quick Stats Bar */}
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="quick-stat-icon">⏳</span>
              <span className="quick-stat-value">{stats.pending}</span>
              <span className="quick-stat-label">Pending</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">⚙️</span>
              <span className="quick-stat-value">{stats.processing}</span>
              <span className="quick-stat-label">Processing</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">🚚</span>
              <span className="quick-stat-value">{stats.shipped}</span>
              <span className="quick-stat-label">Shipped</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">✅</span>
              <span className="quick-stat-value">{stats.delivered}</span>
              <span className="quick-stat-label">Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;