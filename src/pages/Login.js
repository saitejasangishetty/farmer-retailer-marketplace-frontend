import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Try farmer login
      try {
        const res = await API.post("/farmer/login", { email, password });
        if (res.data) {
          navigate("/farmer-dashboard");
          return;
        }
      } catch {}

      // Try retailer login
      try {
        const res = await API.post("/retailer/login", { email, password });
        if (res.data) {
          navigate("/retailer-dashboard");
          return;
        }
      } catch {}

      alert("Invalid credentials");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
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

export default Login;
