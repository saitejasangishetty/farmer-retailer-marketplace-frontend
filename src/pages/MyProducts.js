import { useEffect, useState } from "react";
import API from "../services/api";
import "./MyProducts.css";

function MyProducts() {

  const farmerId = localStorage.getItem("farmerId");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!farmerId) return;
    const loadProducts = async () => {
      try {
        const res = await API.get(`/farmer/${farmerId}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Load products error:",err);
      }
    };

    loadProducts();

  }, [farmerId]);

  return (
    <div className="mp-container">
      <h2>🌾 My Products</h2>

      <div className="mp-grid">
        {products.map(p => (
          <div className="mp-card" key={p.productId}>
           <img
            src={`http://localhost:8080/uploads/${p.image}`}
            alt={p.productName}
           
          />

            <h3>{p.productName}</h3>
            <p>₹ {p.price}</p>
            <span>{p.quantity} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProducts;
