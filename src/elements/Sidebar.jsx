import React, { useState, useEffect } from 'react';
import { LuLeaf } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiActivity,
  FiMapPin,
  FiFlag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiBarChart2
} from 'react-icons/fi';

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Automatically collapse sidebar on mobile screens
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Notify parent component about sidebar state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(collapsed);
    }
  }, [collapsed, onToggle]);

  const menuItems = [
    { path: "/", title: "Dashboard", icon: <FiHome size={20} /> },
    { path: "/act", title: "Activities", icon: <FiActivity size={20} /> },
    { path: "/eco", title: "Local Ecology", icon: <FiMapPin size={20} /> },
    { path: "/chal", title: "Challenges", icon: <FiFlag size={20} /> },
    { path: "/lead", title: "Leaderboard", icon: <FiBarChart2 size={20} /> },
    { path: "/me", title: "Profile", icon: <FiUser size={20} /> },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
      {!collapsed && <div className="logo-icon"> <LuLeaf size={40} stroke='#34a67f' /> </div>}
        {!collapsed && <h2 className="sidebar-logo">EcoPulse</h2>}
        <button 
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FiMenu size={22} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-text">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-link logout-button">
          <span className="sidebar-icon"><FiLogOut size={20} /></span>
          {!collapsed && <span className="sidebar-text">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;