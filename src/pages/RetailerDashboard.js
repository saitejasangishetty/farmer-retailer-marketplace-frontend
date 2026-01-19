import React from "react";
import { useNavigate } from "react-router-dom";
import "./RetailerDashboard.css";

function RetailerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="rd-layout">

      {/* ===== SIDEBAR ===== */}
      <aside className="rd-sidebar">
        <h2>🛒 AgriTrade</h2>

        <ul>
          <li className="active" onClick={() => navigate("/retailer-dashboard")}>
            📊 Dashboard
          </li>

          <li onClick={() => navigate("/retailer-products")}>
            🛍 Browse Products
          </li>

          <li>🔍 Search & Filters</li>
          
          <li onClick={() => navigate("/retailer-orders")}>
           📦 My Orders
          </li>

          <li>🚚 Order Tracking</li>
          <li>💳 Payments</li>
          <li>💬 Messages</li>
          <li>⭐ Feedback</li>

          <div className="menu-item"      onClick={() => navigate("/retailer-profile")}>
          👤 Profile
           </div>


          <li>⚙ Settings</li>
        </ul>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="rd-main">

        {/* HEADER */}
        <header className="rd-header">
          <h3>Welcome, Retailer 🏪</h3>

          <div className="rd-header-right">
            <span>🛒 Cart</span>
            <span>🔔</span>
          </div>
        </header>

        {/* OVERVIEW CARDS */}
        <div className="rd-cards">
          <div className="rd-card green">
            <h4>Orders Placed</h4>
            <p>18</p>
          </div>

          <div className="rd-card blue">
            <h4>Pending Deliveries</h4>
            <p>4</p>
          </div>

          <div className="rd-card orange">
            <h4>Total Spend</h4>
            <p>₹42,000</p>
          </div>
        </div>

        {/* QUICK ACTION */}
        <div className="rd-action">
          <button onClick={() => navigate("/retailer-products")}>
            🛒 View All Products
          </button>
        </div>

        {/* RECENT ORDERS */}
        <div className="rd-section">
          <h3>Recent Orders</h3>

          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#2011</td>
                <td>Tomato</td>
                <td className="done">Delivered</td>
              </tr>

              <tr>
                <td>#2012</td>
                <td>Potato</td>
                <td className="pending">In Transit</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default RetailerDashboard;
