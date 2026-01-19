import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import FarmerRegister from "./pages/FarmerRegister";
import FarmerLogin from "./pages/FarmerLogin";
import FarmerDashboard from "./pages/FarmerDashboard";

import AdminDashboard from "./pages/AdminDashboard";

import RetailerRegister from "./pages/RetailerRegister";
import RetailerLogin from "./pages/RetailerLogin";
import RetailerDashboard from "./pages/RetailerDashboard";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import RetailerProducts from "./pages/RetailerProducts";

import FarmerOrders from "./pages/FarmerOrders";

import RetailerOrders from "./pages/RetailerOrders";

import FarmerProfile from "./pages/FarmerProfile";
import RetailerProfile from "./pages/RetailerProfile";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* FARMER */}
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />

        {/* RETAILER */}
        <Route path="/retailer-register" element={<RetailerRegister />} />
        <Route path="/retailer-login" element={<RetailerLogin />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* OPTIONAL HOME */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* PRODUCT MANAGEMENT */}
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/my-products" element={<MyProducts />} />  

        <Route path="/retailer-products" element={<RetailerProducts />} />

        <Route path="/farmer-orders" element={<FarmerOrders />} />

        <Route path="/retailer-orders" element={<RetailerOrders />} />

        <Route path="/farmer-profile" element={<FarmerProfile />} />
        <Route path="/retailer-profile" element={<RetailerProfile />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
