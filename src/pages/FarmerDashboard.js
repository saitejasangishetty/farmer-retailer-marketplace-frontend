import React from "react";
import { useNavigate } from "react-router-dom";   // ✅ ADD
import "./FarmerDashboard.css";



function FarmerDashboard() {
   const navigate = useNavigate(); 
  return (
    <div className="fd-layout">

      {/* ========== SIDEBAR ========== */}
      <aside className="fd-sidebar">
        <h2>🌾 AgriTrade</h2>

       <ul>
  <li className="active" onClick={() => navigate("/farmer-dashboard")}>
    📊 Dashboard
  </li>

  <li onClick={() => navigate("/my-products")}>
    📦 My Products
  </li>

  <li onClick={() => navigate("/add-product")}>
    ➕ Add Product
  </li>

<li onClick={() => navigate("/farmer-orders")} style={{ cursor: "pointer" }}>
  📦 Orders
</li>


  <li>🏪 Inventory</li>
  <li>💳 Payments</li>
  <li>📈 Sales Analytics</li>
  <li>⭐ Feedback & Ratings</li>

  <li>💬 Messages</li>
  
  <div className="menu-item" onClick={() => navigate("/farmer-profile")}>
   👤 Profile
  </div>


  <li>⚙ Settings</li>
</ul>

      </aside>

      {/* ========== MAIN AREA ========== */}
      <div className="fd-main">

        {/* HEADER */}
        <header className="fd-header">
          <h3>Welcome, Farmer 👨‍🌾</h3>

          <div className="fd-header-right">
            <span>💰 Wallet</span>
            <span>🔔</span>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="fd-cards">
          <div className="fd-card green">
            <h4>Total Products</h4>
            <p>12</p>
          </div>

          <div className="fd-card blue">
            <h4>Active Orders</h4>
            <p>5</p>
          </div>

          <div className="fd-card orange">
            <h4>Total Earnings</h4>
            <p>₹18,500</p>
          </div>

          <div className="fd-card red">
            <h4>Low Stock</h4>
            <p>2</p>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="fd-section">
          <h3>Recent Orders</h3>

          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#1021</td>
                <td>Tomatoes</td>
                <td>50 kg</td>
                <td className="done">Delivered</td>
              </tr>

              <tr>
                <td>#1022</td>
                <td>Potatoes</td>
                <td>80 kg</td>
                <td className="pending">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SALES CHART */}
        <div className="fd-section">
          <h3>Sales Overview</h3>
          <div className="chart-box">
            📊 Sales chart will appear here
          </div>
        </div>

      </div>
    </div>
  );
}

export default FarmerDashboard;
