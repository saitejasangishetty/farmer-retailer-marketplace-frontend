import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {

  const [farmers, setFarmers] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const f = await API.get("/admin/farmers");
      const r = await API.get("/admin/retailers");
      const p = await API.get("/admin/products");

      setFarmers(f.data);
      setRetailers(r.data);
      setProducts(p.data);

    } catch (err) {
      console.error("Admin load error:", err);
    }
  };

  return (
    <div className="ad-container">

      {/* HEADER */}
      <header className="ad-header">
        <h2>👨‍💼 Admin Dashboard</h2>
        <span>AgriTrade Control Panel</span>
      </header>

      {/* SUMMARY CARDS */}
      <div className="ad-cards">

        <div className="ad-card green">
          <h4>Farmers</h4>
          <p>{farmers.length}</p>
        </div>

        <div className="ad-card blue">
          <h4>Retailers</h4>
          <p>{retailers.length}</p>
        </div>

        <div className="ad-card orange">
          <h4>Products</h4>
          <p>{products.length}</p>
        </div>

      </div>

      {/* FARMERS TABLE */}
      <div className="ad-section">
        <h3>🌾 Farmers</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map(f => (
              <tr key={f.farmerId}>
                <td>{f.farmerId}</td>
                <td>{f.name}</td>
                <td>{f.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RETAILERS TABLE */}
      <div className="ad-section">
        <h3>🏪 Retailers</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th>
            </tr>
          </thead>
          <tbody>
            {retailers.map(r => (
              <tr key={r.retailerId}>
                <td>{r.retailerId}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="ad-section">
        <h3>📦 Products</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Price</th><th>Qty</th><th>Farmer</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.productId}>
                <td>{p.productId}</td>
                <td>{p.productName}</td>
                <td>₹{p.price}</td>
                <td>{p.quantity}</td>
                <td>{p.farmer?.farmerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminDashboard;
