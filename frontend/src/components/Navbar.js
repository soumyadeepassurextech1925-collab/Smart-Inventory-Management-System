import React from "react";
import "../styling/navbar.css";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        Smart Inventory Management System
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
