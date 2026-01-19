import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import "./RetailerOrders.css";

function RetailerOrders() {

  const retailerId = localStorage.getItem("retailerId");
  const [orders, setOrders] = useState([]);

  // ✅ Load Orders Function
  const loadOrders = useCallback(async () => {
    try {
      const res = await API.get(`/orders/retailer/${retailerId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  }, [retailerId]);

  // ✅ Initial Load + Auto Refresh
  useEffect(() => {
    loadOrders();   // first load

    const timer = setInterval(() => {
      loadOrders();   // refresh every 5 seconds
    }, 5000);

    return () => clearInterval(timer);   // cleanup
  }, [loadOrders]);

  return (
    <div className="ro-container">
      <h2>🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table className="ro-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product</th>
              <th>Farmer</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o.orderId}>
                <td>{o.orderId}</td>

                {/* ✅ Product Image */}
                <td>
                  {o.product?.image ? (
                    <img
                      src={`http://localhost:8080/uploads/${o.product.image}`}
                      alt={o.product.productName}
                      className="order-img"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td>{o.product?.productName}</td>
                <td>{o.product?.farmer?.name || "N/A"}</td>
                <td>{o.quantity}</td>
                <td>₹ {o.totalPrice}</td>

                <td>
                  <span className={`status ${o.status}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}

export default RetailerOrders;
