import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./RetailerLogin.css";

function RetailerLogin() {
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

      const res = await API.post("/retailer/login", {
        email,
        password,
      });

      // ✅ save retailer details
      localStorage.setItem("retailerId", res.data.retailerId);
      localStorage.setItem("retailerName", res.data.name);

      navigate("/retailer-dashboard");

    } catch (err) {
      console.error(err);
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rl-container">
      <form className="rl-form" onSubmit={handleLogin}>
        <h2>🏪 Retailer Login</h2>

        {error && <p className="rl-error">{error}</p>}

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

        <p className="rl-link">
          New Retailer? <Link to="/retailer-register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default RetailerLogin;
