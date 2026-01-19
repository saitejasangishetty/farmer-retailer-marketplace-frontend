import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./FarmerLogin.css";

function FarmerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/farmer/login", {
        email,
        password,
      });

      // ✅ Save farmer info
      localStorage.setItem("farmerId", res.data.farmerId);
      localStorage.setItem("farmerName", res.data.name);

      navigate("/farmer-dashboard");

    } catch (err) {
      console.error(err);
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fl-container">
      <form className="fl-form" onSubmit={handleLogin}>
        <h2>👨‍🌾 Farmer Login</h2>

        {error && <p className="fl-error">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="fl-link">
          New Farmer? <Link to="/farmer-register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default FarmerLogin;
