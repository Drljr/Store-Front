import './Inventory.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import { useState, useEffect } from 'react';
import api from '../../api/axios.js';
import Modal from './Modal';

export const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    console.log('Fetching products...');
    setLoading(true);
    api.get('/products') 
      .then(response => {
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          const mappedProducts = response.data.map(product => {
            if (!product || typeof product !== 'object') {
              console.warn('Invalid product data:', product);
              return null;
            }
            return {
              ...product,
              id: product.productId,
              status: product.status,
            };
          }).filter(product => product !== null);
          setProducts(mappedProducts);
        } else {
          console.error('Unexpected API response format:', response.data);
          setProducts([]);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError(error.response?.data?.message || "Failed to fetch products");
      })
      .finally(() => {
        setLoading(false);
        console.log('Fetch completed, products:', products);
      });
  }, []); // Consider adding a dependency if re-fetch is needed

  const handleAddOrUpdateProduct = (newProduct) => {
    try {
      const mappedProduct = {
        ...newProduct,
        id: newProduct.productId,
        status: newProduct.status, 
      };
      setProducts(prev => 
        prev.some(p => p._id === newProduct._id)
          ? prev.map(p => p._id === newProduct._id ? mappedProduct : p)
          : [...prev, mappedProduct]
      );
      // Re-fetch to ensure consistency with backend
      api.get('/products')
        .then(response => {
          if (Array.isArray(response.data)) {
            setProducts(response.data.map(product => ({
              ...product,
              id: product.productId,
              status: product.status,
            })));
          }
        })
        .catch(error => console.error("Error re-fetching products:", error));
      closeModal();
    } catch (error) {
      console.error("Error adding/updating product:", error);
      setError("Failed to add/update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        setProducts(prev => prev.filter(p => p._id !== productId));
        setSelectedProducts(prev => prev.filter(id => id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Failed to delete product");
      }
    }
  };

  const categories = ["all", ...new Set(products.map(product => product.category))];

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p._id));
    }
  };

  const filteredProducts = products.filter(product => {
    const name = product.name || '';
    const sku = product.sku || '';
    const productId = product.productId || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         productId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || (product.category || '').toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(/ /g, '-')) {
      case "in-stock": return "success";
      case "out-of-stock": return "danger";
      default: return "neutral";
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="Container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        
        <div className="inventory-header">
          <div className="header-content">
            <h1 className="page-title">Inventory Management</h1>
            <p className="page-subtitle">Track and manage your product inventory</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <Download size={16} />
              Export
            </button>
            <button className="btn btn-primary" onClick={() => openModal()}>
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </div>

        <div className="inventory-widget1">
          <h2 className="text-wrapper1">Overall Inventory</h2>
          <div className="stats-grid">
            {[
              { title: "Total Products", value: products.length, change: "+12.5%", trend: "up", icon: Package, color: "blue" },
              { title: "Low Stock Items", value: products.filter(p => p.stock <= p.minStock && p.stock > 0).length, change: "-8.2%", trend: "down", icon: AlertTriangle, color: "orange" },
              { title: "Out of Stock", value: products.filter(p => p.stock === 0).length, change: "+2.1%", trend: "up", icon: TrendingDown, color: "red" },
              { title: "Total Categories", value: new Set(products.map(p => p.category)).size, change: "+5.3%", trend: "up", icon: TrendingUp, color: "green" },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className={`stat-card ${stat.color}`}>
                  <div className="stat-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-title">{stat.title}</p>
                    <div className={`stat-change ${stat.trend}`}>
                      {stat.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="inventory-widget2">
          <div className="products-header">
            <h2 className="text-wrapper2">Products</h2>
            <div className="products-controls">
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="filter-dropdown">
                <Filter size={16} className="filter-icon" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="filter-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="products-table-container">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">No products found.</div>
            ) : (
              <table className="products-table">
                <thead>
                  <tr>
                    <th className="checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === products.length}
                        onChange={handleSelectAll}
                        className="checkbox"
                      />
                    </th>
                    <th>Product ID</th>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Supplier</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={`${product.id}-${product.status}`} className="product-row">
                      <td className="checkbox-column">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="checkbox"
                        />
                      </td>
                      <td className="product-id">{product.productId}</td>
                      <td className="product-info">
                        <div className="product-details">
                          <div className="product-avatar">
                            <Package size={20} />
                          </div>
                          <div>
                            <div className="product-name">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="product-sku">{product.sku}</td>
                      <td className="product-category">
                        <span className="category-badge">{product.category}</span>
                      </td>
                      <td className="product-price">${product.price.toFixed(2)}</td>
                      <td className="product-stock">
                        <div className="stock-info">
                          <span className="stock-quantity">{product.stock}</span>
                          {product.stock <= product.minStock && product.stock > 0 && (
                            <AlertTriangle size={14} className="stock-warning" />
                          )}
                        </div>
                      </td>
                      <td className="product-status">
                        <span className={`status-badge ${getStatusColor(product.status)}`}>
                          {product.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="product-supplier">{product.supplier}</td>
                      <td className="product-updated">{new Date(product.lastUpdated).toLocaleDateString()}</td>
                      <td className="product-actions">
                        <div className="action-buttons">
                          <button className="action-btn view" title="View" onClick={() => openModal(product)}>
                            <Eye size={14} />
                          </button>
                          <button className="action-btn edit" title="Edit" onClick={() => openModal(product)}>
                            <Edit size={14} />
                          </button>
                          <button className="action-btn delete" title="Delete" onClick={() => handleDeleteProduct(product._id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="table-footer">
            <div className="selected-info">
              {selectedProducts.length > 0 && (
                <span>{selectedProducts.length} item(s) selected</span>
              )}
            </div>
            <div className="pagination">
              <span className="page-info">Showing {filteredProducts.length} of {products.length} products</span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onAddProduct={handleAddOrUpdateProduct}
          initialData={selectedProduct}
        />
      )}
    </div>
  );
};

export default Inventory;