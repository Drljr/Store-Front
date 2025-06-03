import React, { useState, useEffect } from 'react';
import { Truck, Users, Package2, MapPin, Phone, Mail, Star, Filter, Search, Plus, MoreVertical, AlertTriangle, CheckCircle, Edit, Trash2 } from 'lucide-react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import SupplierModal from "./supplierModal.tsx";
import api from "../../api/axios.js";
import "./Suppliers.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const openModal = (supplier = null) => {
    setSelectedSupplier(supplier);
    setIsEditMode(!!supplier);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await api.get('/suppliers');
        const mappedSuppliers = response.data.map(supplier => ({
          ...supplier,
          id: supplier._id,
          lastOrder: supplier.lastOrder ? new Date(supplier.lastOrder).toLocaleDateString() : 'N/A',
        }));
        setSuppliers(mappedSuppliers);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
        setError(err.response?.data?.message || "Failed to fetch suppliers");
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  const handleAddSupplier = (newSupplier) => {
    const mappedSupplier = {
      ...newSupplier,
      id: newSupplier._id,
      lastOrder: newSupplier.lastOrder ? new Date(newSupplier.lastOrder).toLocaleDateString() : 'N/A',
    };
    setSuppliers(prev => [...prev, mappedSupplier]);
  };

  const handleEditSupplier = (updatedSupplier) => {
    const mappedSupplier = {
      ...updatedSupplier,
      id: updatedSupplier._id,
      lastOrder: updatedSupplier.lastOrder ? new Date(updatedSupplier.lastOrder).toLocaleDateString() : 'N/A',
    };
    setSuppliers(prev => prev.map(s => s.id === mappedSupplier.id ? mappedSupplier : s));
  };

  const handleDeleteSupplier = async (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await api.delete(`/api/suppliers/${supplierId}`);
        setSuppliers(prev => prev.filter(s => s.id !== supplierId));
      } catch (err) {
        console.error("Error deleting supplier:", err);
        setError("Failed to delete supplier");
      }
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredSuppliers = suppliers
    .filter(supplier => 
      (supplier.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.category || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(supplier => filterStatus === "all" || supplier.status === filterStatus)
    .sort((a, b) => {
      switch(sortBy) {
        case "rating": return b.rating - a.rating;
        case "orders": return b.totalOrders - a.totalOrders;
        case "value": return b.totalValue - a.totalValue;
        default: return (a.name || "").localeCompare(b.name || "");
      }
    });

  const supplierStats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    pending: suppliers.filter(s => s.status === 'pending').length,
    avgRating: suppliers.length ? (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1) : 0,
    totalValue: suppliers.reduce((sum, s) => sum + s.totalValue, 0),
    avgDelivery: suppliers.length ? Math.round(suppliers.reduce((sum, s) => sum + s.onTimeDelivery, 0) / suppliers.length) : 0
  };

  const handleViewDetails = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="supply-container">
      <Sidebar />
      <Navbar />
      
      <div className="supply-main-content">
        <div className="supply-header">
          <div className="header-content">
            <h1 className="page-title">
              <Truck className="title-icon" />
              Supplier Management
            </h1>
            <p className="page-subtitle">Manage your supplier relationships and track performance</p>
          </div>
          <button className="add-supplier-btn" onClick={() => openModal()}>
            <Plus className="btn-icon" />
            Add Supplier
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card total-suppliers">
            <div className="stat-icon-wrapper">
              <Users className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{supplierStats.total}</h3>
              <p className="stat-label">Total Suppliers</p>
            </div>
          </div>
          
          <div className="stat-card active-suppliers">
            <div className="stat-icon-wrapper">
              <CheckCircle className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{supplierStats.active}</h3>
              <p className="stat-label">Active Suppliers</p>
            </div>
          </div>
          
          <div className="stat-card avg-rating">
            <div className="stat-icon-wrapper">
              <Star className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{supplierStats.avgRating}</h3>
              <p className="stat-label">Avg Rating</p>
            </div>
          </div>
          
          <div className="stat-card total-value">
            <div className="stat-icon-wrapper">
              <Package2 className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">${(supplierStats.totalValue / 1000).toFixed(0)}K</h3>
              <p className="stat-label">Total Value</p>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search suppliers or categories..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
              <option value="orders">Sort by Orders</option>
              <option value="value">Sort by Value</option>
            </select>
          </div>
        </div>

        <div className="suppliers-grid">
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="supplier-card">
              <div className="card-header">
                <div className="supplier-info">
                  <h3 className="supplier-name">{supplier.name}</h3>
                  <span className="supplier-category">{supplier.category}</span>
                </div>
                <div className="card-actions">
                  <span className={`status-badge ${supplier.status}`}>
                    {supplier.status}
                  </span>
                  <div className="action-buttons">
                    <button className="action-btn edit" title="Edit" onClick={() => openModal(supplier)}>
                      <Edit size={14} />
                    </button>
                    <button className="action-btn delete" title="Delete" onClick={() => handleDeleteSupplier(supplier.id)}>
                      <Trash2 size={14} />
                    </button>
                    <button className="action-btn more" title="More">
                      <MoreVertical className="menu-icon" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="supplier-rating">
                <div className="rating-stars">
                  <Star className="star-icon filled" />
                  <span className="rating-value">{supplier.rating}</span>
                </div>
                <span className="total-orders">({supplier.totalOrders} orders)</span>
              </div>

              <div className="supplier-details">
                <div className="detail-item">
                  <MapPin className="detail-icon" />
                  <span className="detail-text">{supplier.location}</span>
                </div>
                <div className="detail-item">
                  <Phone className="detail-icon" />
                  <span className="detail-text">{supplier.phone}</span>
                </div>
                <div className="detail-item">
                  <Mail className="detail-icon" />
                  <span className="detail-text">{supplier.email}</span>
                </div>
              </div>

              <div className="performance-metrics">
                <div className="metric">
                  <span className="metric-label">On-time Delivery</span>
                  <span className="metric-value">{supplier.onTimeDelivery}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Quality Score</span>
                  <span className="metric-value">{supplier.qualityScore}%</span>
                </div>
              </div>

              <div className="card-footer">
                <div className="order-info">
                  <span className="order-value">${supplier.totalValue.toLocaleString()}</span>
                  <span className="last-order">Last order: {supplier.lastOrder}</span>
                </div>
                <button 
                  className="view-details-btn"
                  onClick={() => handleViewDetails(supplier)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="empty-state">
            <AlertTriangle className="empty-icon" />
            <h3>No suppliers found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {selectedSupplier && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Supplier Details</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="supplier-profile">
                <h3>{selectedSupplier.name}</h3>
                <p>{selectedSupplier.category}</p>
                <div className="profile-rating">
                  <Star className="star-icon filled" />
                  <span>{selectedSupplier.rating} Rating</span>
                </div>
              </div>
              
              <div className="modal-metrics">
                <div className="modal-metric">
                  <span className="modal-metric-label">Total Orders</span>
                  <span className="modal-metric-value">{selectedSupplier.totalOrders}</span>
                </div>
                <div className="modal-metric">
                  <span className="modal-metric-label">Total Value</span>
                  <span className="modal-metric-value">${selectedSupplier.totalValue.toLocaleString()}</span>
                </div>
                <div className="modal-metric">
                  <span className="modal-metric-label">On-time Delivery</span>
                  <span className="modal-metric-value">{selectedSupplier.onTimeDelivery}%</span>
                </div>
                <div className="modal-metric">
                  <span className="modal-metric-label">Quality Score</span>
                  <span className="modal-metric-value">{selectedSupplier.qualityScore}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <SupplierModal
          onClose={closeModal}
          onAddSupplier={isEditMode ? handleEditSupplier : handleAddSupplier}
          initialData={isEditMode ? selectedSupplier : null}
        />
      )}
    </div>
  );
};

export default Suppliers;