import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import {
  FiHome,
  FiActivity,
  FiMapPin,
  FiFlag,
  FiUser,
  FiLogOut
} from 'react-icons/fi';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar__header">
        <h1 className="sidebar__logo">EcoPulse</h1>
        <button 
          className="sidebar__toggle" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="sidebar__nav">
        <NavLink to="/"     className="sidebar__link"><FiHome /> Dashboard</NavLink>
        <NavLink to="/act"  className="sidebar__link"><FiActivity /> Activities</NavLink>
        <NavLink to="/eco"  className="sidebar__link"><FiMapPin /> Local Ecology</NavLink>
        <NavLink to="/chal" className="sidebar__link"><FiFlag /> Challenges</NavLink>
        <NavLink to="/lead" className="sidebar__link"><FiActivity /> Leaderboard</NavLink>
        <NavLink to="/me"   className="sidebar__link"><FiUser /> Profile</NavLink>
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__link sidebar__logout">
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}