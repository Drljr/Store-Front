import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../assets/logo.png';
import "./Sidebar.css";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { id: 'inventory', label: 'Inventory', icon: '📋', path: '/inventory' },
    { id: 'reports', label: 'Reports', icon: '📊', path: '/reports' },
    { id: 'suppliers', label: 'Suppliers', icon: '🏪', path: '/suppliers' },
    { id: 'orders', label: 'Orders', icon: '🛒', path: '/orders' },
    { id: 'stores', label: 'Manage Stores', icon: '🏬', path: '/Manage-Store' },
  ];
  const bottomMenuItems = [
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
    { id: 'logout', label: 'Logout', icon: '🚪', path: '/' },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="custom-logo" />
      </div>
      
      <div className="nav-menu">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`nav-item${location.pathname === item.path ? ' active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick(item.path);
            }}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </div>
      
      <div className="nav-bottom">
        {bottomMenuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`nav-item${location.pathname === item.path ? ' active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick(item.path);
            }}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;