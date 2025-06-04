import { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import api from "../../api/axios.js";
import "./Dash.css";

const Dash = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [topSelling, setTopSelling] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await api.get("/products");
        if (Array.isArray(productsResponse.data)) {
          setProducts(productsResponse.data);
        } else {
          console.error("Unexpected products API response:", productsResponse.data);
        }

        // Fetch sales
        const salesResponse = await api.get("/sales");
        if (Array.isArray(salesResponse.data)) {
          setSales(salesResponse.data);
        } else {
          console.error("Unexpected sales API response:", salesResponse.data);
        }

        // Fetch top selling products
        const topSellingResponse = await api.get("/sales/top-selling");
        if (Array.isArray(topSellingResponse.data)) {
          setTopSelling(topSellingResponse.data);
        } else {
          console.error("Unexpected top-selling API response:", topSellingResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate stats based on fetched data
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalRevenue, 0).toLocaleString();
  const totalOrders = sales.length;
  const totalItems = products.length;
  const categories = [...new Set(products.map(p => p.category))].length;
  const activeProducts = products.filter(p => p.status === "Active").length;
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 20).length; // Low stock (0 < stock <= 20)
  const outOfStockProducts = products.filter(p => p.stock === 0).length; // Out of stock (stock = 0)
  const completedOrders = sales.filter(s => s.status === "Completed").length;
  const pendingOrders = sales.filter(s => s.status === "Pending").length;
  const shippedOrders = sales.filter(s => s.status === "Shipped").length;
  const cancelledOrders = sales.filter(s => s.status === "Cancelled").length;
  const topSellingUnits = topSelling[0]?.totalSold || 0;
  const topSellingRevenue = topSelling[0]?.product?.price * topSelling[0]?.totalSold || 0;

  return (
    <div className="Container">
      <Sidebar />
      <Navbar />
      <div className="main-content">
        <div className="dashboard-grid">
          {/* Row 1 */}
          <div className="widget widget-small">
            <div className="widget-title">Sales Overview</div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">${totalSales}</div>
                  <div className="stat-label">Total Sales</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{totalOrders}</div>
                  <div className="stat-label">Orders</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="widget widget-small">
            <div className="widget-title">Inventory Summary</div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{totalItems}</div>
                  <div className="stat-label">Total Items</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{categories}</div>
                  <div className="stat-label">Categories</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="widget widget-medium">
            <div className="widget-title">Purchase Overview</div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">$18,2K</div>
                  <div className="stat-label">Total Purchases</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">67</div>
                  <div className="stat-label">Purchase Orders</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">23</div>
                  <div className="stat-label">Suppliers</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="widget widget-medium">
            <div className="widget-title">Product Summary</div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{activeProducts}</div>
                  <div className="stat-label">Active Products</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{lowStockProducts}</div>
                  <div className="stat-label">Low Stock</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">34</div> {/* Missing createdAt in Product */}
                  <div className="stat-label">New This Month</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="widget widget-large">
            <div className="widget-title">Sales & Purchase</div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">${totalSales}</div>
                  <div className="stat-label">Total Revenue</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">$18,2K</div> {/* Missing /purchases */}
                  <div className="stat-label">Total Expenses</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">${(parseFloat(totalSales.replace(/,/g, '')) - 18200).toLocaleString()}</div>
                  <div className="stat-label">Net Profit</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{totalSales ? ((parseFloat(totalSales.replace(/,/g, '')) - 18200) / parseFloat(totalSales.replace(/,/g, '')) * 100).toFixed(1) : '0'}%</div>
                  <div className="stat-label">Profit Margin</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="widget widget-large">
            <div className="widget-title">Order Summary</div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{totalOrders}</div>
                  <div className="stat-label">Total Orders</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{completedOrders}</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{pendingOrders}</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{shippedOrders}</div>
                  <div className="stat-label">Shipped</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{cancelledOrders}</div>
                  <div className="stat-label">Cancelled</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Row 4 */}
          <div className="widget widget-small">
            <div className="widget-title">Top Selling Stock</div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{topSellingUnits}</div>
                  <div className="stat-label">Units Sold</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">${topSellingRevenue.toLocaleString()}</div>
                  <div className="stat-label">Revenue</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="widget widget-small">
            <div className="widget-title">Low Quantity Stock</div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{outOfStockProducts}</div>
                  <div className="stat-label">Out of Stock</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{lowStockProducts}</div>
                  <div className="stat-label">Low Stock</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;