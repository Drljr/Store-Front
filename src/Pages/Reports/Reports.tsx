import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, DollarSign, ArrowUpRight } from 'lucide-react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import api from '../../api/axios.js'; // Assuming axios is configured here
import './Reports.css';

const Reports = () => {
  const [data, setData] = useState({
    overview: {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      growthRate: 0
    },
    bestSellingCategory: [],
    profitRevenue: {
      revenue: 0,
      profit: 0,
      profitMargin: 0,
      monthlyGrowth: 0
    },
    bestSellingProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get('/orders');
        const orders = response.data.map(order => ({
          ...order,
          id: order._id,
          total: order.total || 0,
          customer: order.customer || `Customer${order._id}`,
          items: Array.isArray(order.items) ? order.items : [{ name: 'Item', quantity: 1 }],
          date: order.date ? new Date(order.date) : new Date(),
          category: order.category || order.items[0]?.name.split(' ')[0] || 'Uncategorized'
        }));

        // Calculate Overview
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const totalCustomers = new Set(orders.map(order => order.customer)).size;
        const growthRate = 12.5; // Mock growth rate; adjust if backend provides historical data

        // Calculate Best Selling Categories
        const categorySales = orders.reduce((acc, order) => {
          const cat = order.category;
          acc[cat] = (acc[cat] || 0) + order.total;
          return acc;
        }, {});
        const totalCategorySales = Object.values(categorySales).reduce((a, b) => a + b, 0);
        const bestSellingCategory = Object.entries(categorySales)
          .map(([name, sales]) => ({
            name,
            sales,
            percentage: ((sales / totalCategorySales) * 100).toFixed(1)
          }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 4); // Top 4 categories

        // Calculate Profit & Revenue
        const revenue = totalRevenue;
        const profitMargin = 26; // Mock profit margin; adjust if backend provides
        const profit = (revenue * (profitMargin / 100)).toFixed(2);
        const monthlyGrowth = 8.3; // Mock monthly growth; adjust with historical data

        // Calculate Best Selling Products
        const productSales = orders.reduce((acc, order) => {
          order.items.forEach(item => {
            const productName = item.name || 'Unknown';
            acc[productName] = (acc[productName] || 0) + (item.quantity || 1);
          });
          return acc;
        }, {});
        const bestSellingProducts = Object.entries(productSales)
          .map(([name, sales]) => ({
            name,
            sales,
            revenue: orders
              .filter(o => o.items.some(i => i.name === name))
              .reduce((sum, o) => sum + o.total, 0) / sales // Approx revenue per unit sold
          }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 4); // Top 4 products

        setData({
          overview: { totalRevenue, totalOrders, totalCustomers, growthRate },
          bestSellingCategory,
          profitRevenue: { revenue, profit, profitMargin, monthlyGrowth },
          bestSellingProducts
        });
      } catch (err) {
        console.error('Error fetching orders for reports:', err);
        setError(err.response?.data?.message || 'Failed to fetch reports data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="reports-loading">Loading...</div>;
  if (error) return <div className="reports-error">{error}</div>;

  return (
    <div className="reports-container">
      <Sidebar />
      <Navbar />
      
      <div className="main-content">
        <div className="widgets-grid">
          
          {/* Overview Widget */}
          <div className="widget overview-widget">
            <div className="widget-header">
              <h2 className="widget-title">
                <TrendingUp className="widget-icon" />
                Overview
              </h2>
              <div className="growth-indicator">
                <ArrowUpRight className="growth-icon" />
                <span>+{data.overview.growthRate}%</span>
              </div>
            </div>
            
            <div className="overview-metrics">
              <div className="metric-card revenue-card">
                <p className="metric-label">Total Revenue</p>
                <p className="metric-value">${data.overview.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="metric-card orders-card">
                <p className="metric-label">Total Orders</p>
                <p className="metric-value">{data.overview.totalOrders.toLocaleString()}</p>
              </div>
              <div className="metric-card customers-card">
                <p className="metric-label">Customers</p>
                <p className="metric-value">{data.overview.totalCustomers.toLocaleString()}</p>
              </div>
              <div className="metric-card growth-card">
                <p className="metric-label">Growth Rate</p>
                <p className="metric-value">{data.overview.growthRate}%</p>
              </div>
            </div>
          </div>

          {/* Best Selling Category Widget */}
          <div className="widget category-widget">
            <h2 className="widget-title">
              <Package className="widget-icon" />
              Best Selling Category
            </h2>
            
            <div className="category-list">
              {data.bestSellingCategory.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <p className="category-name">{category.name}</p>
                    <p className="category-sales">${category.sales.toLocaleString()} sales</p>
                  </div>
                  <div className="category-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="progress-percentage">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profit & Revenue Widget */}
          <div className="widget profit-widget">
            <h2 className="widget-title">
              <DollarSign className="widget-icon" />
              Profit & Revenue
            </h2>
            
            <div className="profit-metrics">
              <div className="profit-card revenue-profit-card">
                <div className="profit-main">
                  <p className="profit-label">Total Revenue</p>
                  <p className="profit-value">${data.profitRevenue.revenue.toLocaleString()}</p>
                </div>
                <div className="profit-secondary">
                  <p className="profit-label">Monthly Growth</p>
                  <div className="profit-growth">
                    <ArrowUpRight className="growth-icon" />
                    <span>{data.profitRevenue.monthlyGrowth}%</span>
                  </div>
                </div>
              </div>
              
              <div className="profit-card net-profit-card">
                <div className="profit-main">
                  <p className="profit-label">Net Profit</p>
                  <p className="profit-value">${data.profitRevenue.profit.toLocaleString()}</p>
                </div>
                <div className="profit-secondary">
                  <p className="profit-label">Profit Margin</p>
                  <p className="profit-margin">{data.profitRevenue.profitMargin}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Best Selling Product Widget */}
          <div className="widget products-widget">
            <h2 className="widget-title">
              <Package className="widget-icon" />
              Best Selling Products
            </h2>
            
            <div className="products-list">
              {data.bestSellingProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-info">
                    <div className="product-rank">#{index + 1}</div>
                    <div className="product-details">
                      <p className="product-name">{product.name}</p>
                      <p className="product-sales">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="product-revenue">
                    <p className="revenue-value">${product.revenue.toLocaleString()}</p>
                    <p className="revenue-label">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;