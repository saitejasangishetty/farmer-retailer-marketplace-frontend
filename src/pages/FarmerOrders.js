import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import "./FarmerOrders.css";

function FarmerOrders() {

  const farmerId = localStorage.getItem("farmerId");
  const [orders, setOrders] = useState([]);

  // ✅ Load Orders
  const loadOrders = useCallback(async () => {
    try {
      const res = await API.get(`/orders/farmer/${farmerId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  }, [farmerId]);

  // ✅ Auto Refresh + Initial Load
  useEffect(() => {
    loadOrders();

    const timer = setInterval(() => {
      loadOrders();
    }, 5000);

    return () => clearInterval(timer);
  }, [loadOrders]);

  // ✅ Update Status with Confirmation
  const updateStatus = async (orderId, status) => {
    const ok = window.confirm(`Are you sure you want to ${status}?`);
    if (!ok) return;

    try {
      await API.post("/orders/update-status", null, {
        params: { orderId, status }
      });

      // Update UI instantly
      setOrders(prev =>
        prev.map(o =>
          o.orderId === orderId ? { ...o, status } : o
        )
      );

    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="fo-container">
      <h2>📦 Incoming Orders</h2>

      {orders.length === 0 ? (
        <p>No orders received yet.</p>
      ) : (
        <table className="fo-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Retailer</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o.orderId}>
                <td>{o.orderId}</td>
                <td>{o.product.productName}</td>
                <td>{o.retailer.name}</td>
                <td>{o.quantity}</td>

                <td>
                  <span className={`status ${o.status}`}>
                    {o.status}
                  </span>
                </td>

                <td>

                  {/* ✅ Only PLACED */}
                  {o.status === "PLACED" && (
                    <>
                      <button 
                        className="accept-btn"
                        onClick={() => updateStatus(o.orderId, "ACCEPTED")}
                      >
                        Accept
                      </button>

                      <button 
                        className="reject-btn"
                        onClick={() => updateStatus(o.orderId, "CANCELLED")}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* ✅ Only ACCEPTED */}
                  {o.status === "ACCEPTED" && (
                    <button 
                      className="dispatch-btn"
                      onClick={() => updateStatus(o.orderId, "DISPATCHED")}
                    >
                      Dispatch
                    </button>
                  )}

                  {/* ✅ Only DISPATCHED */}
                  {o.status === "DISPATCHED" && (
                    <button 
                      className="deliver-btn"
                      onClick={() => updateStatus(o.orderId, "DELIVERED")}
                    >
                      Delivered
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default FarmerOrders;
