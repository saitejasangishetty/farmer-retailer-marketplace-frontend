import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-container">

      <h1>Farmer – Retailer Trading Platform</h1>

      <div className="card-container">

        <div className="card">
          <h2>Farmer</h2>
          <button onClick={() => navigate("/farmer-login")}>Login</button>
          <button onClick={() => navigate("/farmer-register")}>Register</button>
        </div>

        <div className="card">
          <h2>Retailer</h2>
          <button onClick={() => navigate("/retailer-login")}>Login</button>
          <button onClick={() => navigate("/retailer-register")}>Register</button>
        </div>

        <div className="card">
         <h2>Admin</h2>
         <button onClick={() => navigate("/admin-dashboard")}>Dashboard</button>
        </div>

      </div>

    </div>
  );
}

export default Home;
