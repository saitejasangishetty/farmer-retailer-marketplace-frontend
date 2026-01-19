import { useEffect, useState } from "react";
import API from "../services/api";
import "./Profile.css";

function RetailerProfile() {

  const retailerId = localStorage.getItem("retailerId");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    shopName: "",
    location: ""
  });

  // ✅ Load profile
  useEffect(() => {
    API.get(`/retailer/profile/${retailerId}`)
      .then(res => setProfile(res.data))
      .catch(() => alert("Failed to load profile ❌"));
  }, [retailerId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Update profile
  const updateProfile = async () => {
    try {
      await API.put(`/retailer/profile/${retailerId}`, profile);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile ❌");
    }
  };

  return (
    <div className="profile-container">
      <h2>🏪 Retailer Profile</h2>

      <label>Name</label>
      <input name="name" value={profile.name} onChange={handleChange} />

      <label>Email</label>
      <input name="email" value={profile.email} onChange={handleChange} />

      <label>Phone</label>
      <input name="phone" value={profile.phone} onChange={handleChange} />

      <label>Shop Name</label>
      <input name="shopName" value={profile.shopName} onChange={handleChange} />

      <label>Location</label>
      <input name="location" value={profile.location} onChange={handleChange} />

      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}

export default RetailerProfile;
