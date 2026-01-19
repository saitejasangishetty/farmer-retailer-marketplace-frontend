import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./FarmerRegister.css";

function FarmerRegister() {

  const navigate = useNavigate();

  const [farmer, setFarmer] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFarmer({ ...farmer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/farmer/register", farmer);

      alert("Registration successful ✅");
      navigate("/farmer-login");

    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fr-container">
      <form className="fr-form" onSubmit={handleSubmit}>

        <h2>🌾 Farmer Registration</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={farmer.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={farmer.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={farmer.password}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={farmer.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={farmer.address}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="login-link">
          Already registered?{" "}
          <span onClick={() => navigate("/farmer-login")}>Login here</span>
        </p>

      </form>
    </div>
  );
}

export default FarmerRegister;
