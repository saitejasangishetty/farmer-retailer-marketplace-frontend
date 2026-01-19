import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./RetailerRegister.css";

function RetailerRegister() {

  const navigate = useNavigate();

  const [retailer, setRetailer] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRetailer({ ...retailer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/retailer/register", retailer);

      alert("Retailer registered successfully ✅");
      navigate("/retailer-login");

    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rr-container">
      <form className="rr-form" onSubmit={handleSubmit}>

        <h2>🏪 Retailer Registration</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={retailer.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={retailer.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={retailer.password}
          onChange={handleChange}
          required
        />

        <input
          name="shopName"
          placeholder="Shop Name"
          value={retailer.shopName}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Shop Address"
          value={retailer.address}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="login-link">
          Already registered?{" "}
          <span onClick={() => navigate("/retailer-login")}>Login here</span>
        </p>

      </form>
    </div>
  );
}

export default RetailerRegister;
