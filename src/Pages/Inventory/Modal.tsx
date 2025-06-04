import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ onClose, onAddProduct, initialData }) => {
  const [productData, setProductData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    minStock: '',
    status: 'In Stock',
    supplier: '',
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    if (initialData) {
      setProductData({
        name: initialData.name || '',
        sku: initialData.sku || '',
        category: initialData.category || '',
        price: initialData.price || '',
        stock: initialData.stock || '',
        minStock: initialData.minStock || '',
        status: initialData.status || 'In Stock',
        supplier: initialData.supplier || '',
        lastUpdated: initialData.lastUpdated || new Date().toISOString(),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/products/${initialData ? initialData._id : "create"}`;
      const method = initialData ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productData.name,
          sku: productData.sku,
          category: productData.category || "all",
          price: Number(productData.price),
          stock: Number(productData.stock),
          minStock: Number(productData.minStock),
          status: productData.status,
          supplier: productData.supplier,
          lastUpdated: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        onAddProduct(data);
      } else {
        throw new Error(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{initialData ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>SKU</label>
            <input type="text" name="sku" value={productData.sku} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={productData.category} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} step="0.01" required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={productData.stock} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Min Stock</label>
            <input type="number" name="minStock" value={productData.minStock} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={productData.status} onChange={handleChange}>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <input type="text" name="supplier" value={productData.supplier} onChange={handleChange} required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{initialData ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;