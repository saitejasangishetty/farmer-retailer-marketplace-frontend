import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import "./RetailerProducts.css";

function RetailerProducts() {

  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const retailerId = localStorage.getItem("retailerId");

  // ✅ API CALL FUNCTION (MEMOIZED)
  const fetchProducts = useCallback(() => {
    API.get("/products/search", {
      params: {
        category: category.trim() || null,
        location: location.trim() || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null
      }
    })
      .then(res => setProducts(res.data))
      .catch(err => console.error("Fetch products error:", err));
  }, [category, location, minPrice, maxPrice]);

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ LIVE SEARCH WITH DEBOUNCE
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delay);
  }, [category, location, minPrice, maxPrice, fetchProducts]);

  // ✅ PLACE ORDER
  const placeOrder = async (product) => {

    if (product.quantity === 0) {
      alert("❌ Out of stock!");
      return;
    }

    const qty = prompt(`Enter quantity (Available: ${product.quantity} kg)`);
    const quantity = parseInt(qty);

    if (!quantity || quantity <= 0) {
      alert("❌ Invalid quantity");
      return;
    }

    if (quantity > product.quantity) {
      alert(`⚠ Only ${product.quantity} kg available!`);
      return;
    }

    try {
      await API.post("/orders/place", null, {
        params: {
          retailerId,
          productId: product.productId,
          quantity
        }
      });

      // ✅ Instant UI Update
      setProducts(prev =>
        prev.map(p =>
          p.productId === product.productId
            ? { ...p, quantity: p.quantity - quantity }
            : p
        )
      );

      alert("✅ Order placed successfully!");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="rp-container">

      <h2>🛒 Available Products</h2>

      {/* 🔍 LIVE SEARCH */}
      <div className="rp-search">

        <input
          placeholder="Category (veg, fru...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          placeholder="Location (hyd, bang...)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

      </div>

      {/* 🧺 PRODUCTS */}
      <div className="rp-grid">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(p => (
            <div className="rp-card" key={p.productId}>

              {/* ✅ PRODUCT IMAGE */}
              <img
                src={`http://localhost:8080/uploads/${p.image}`}
                alt={p.productName}
                className="rp-image"
                onError={(e) => {
                  e.target.src = "/no-image.png";   // optional fallback
                }}
              />

              <h3>{p.productName}</h3>
              <p>₹ {p.price}</p>
              <span>Available: {p.quantity} kg</span>

              {p.quantity === 0 ? (
                <button className="out-btn" disabled>
                  Out of Stock
                </button>
              ) : (
                <button
                  className="buy-btn"
                  onClick={() => placeOrder(p)}
                >
                  Buy
                </button>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default RetailerProducts;
