import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function RoleLogin() {
  const { role } = useParams(); // farmer or retailer
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url =
        role === "farmer" ? "/farmer/login" : "/retailer/login";

      const res = await API.post(url, { email, password });

      if (res.data) {
        if (role === "farmer") navigate("/farmer-dashboard");
        else navigate("/retailer-dashboard");
      }
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h2>{role === "farmer" ? "Farmer Login" : "Retailer Login"}</h2>

      <form onSubmit={handleLogin} style={{ marginTop: "30px" }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default RoleLogin;
