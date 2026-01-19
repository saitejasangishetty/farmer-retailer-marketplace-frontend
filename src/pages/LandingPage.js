import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">🌱 AgriTrade</div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-left">
          <h1>
            Farmer to Retailer <br />
            <span>Trading Platform</span>
          </h1>

          <p>
            Connecting farmers directly with retailers for better prices and
            fresh produce.
          </p>

          <div className="hero-buttons">
            <button className="primary" onClick={() => navigate("/login")}>
              Get Started
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/farmer-register")}
            >
              Join as Farmer
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/retailer-register")}
            >
              Join as Retailer
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img src="/images/farmer-hero.png" alt="Farmer" />
        </div>

      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="features">
        <h2>Why Choose AgriTrade?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            🌱
            <h4>Direct Farmer to Retailer</h4>
            <p>No middlemen, better profits.</p>
          </div>

          <div className="feature-card">
            💰
            <h4>Fair Pricing</h4>
            <p>Transparent pricing system.</p>
          </div>

          <div className="feature-card">
            📦
            <h4>Easy Order Management</h4>
            <p>Quick browsing and ordering.</p>
          </div>

          <div className="feature-card">
            📊
            <h4>Admin Monitoring</h4>
            <p>Track users and inventory.</p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how" className="how">

        <h2>How It Works</h2>

        <div className="steps">

          <div className="step">
            <img src="/images/step1.png" alt="step1" />
            <h4>Farmers list products</h4>
          </div>

          <div className="arrow">➜</div>

          <div className="step">
            <img src="/images/step2.png" alt="step2" />
            <h4>Retailers place orders</h4>
          </div>

          <div className="arrow">➜</div>

          <div className="step">
            <img src="/images/step3.png" alt="step3" />
            <h4>Farmers confirm orders</h4>
          </div>

          <div className="arrow">➜</div>

          <div className="step">
            <img src="/images/step4.png" alt="step4" />
            <h4>Products delivered</h4>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 AgriTrade | Final Year Project | CSE - JNTUH
      </footer>

    </div>
  );
}

export default LandingPage;
