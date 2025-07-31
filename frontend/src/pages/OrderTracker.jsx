// 📁 src/pages/OrderTracker.jsx
import { useEffect, useState } from "react";

function OrderTracker() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5001");

    socket.onopen = () => {
      console.log("📡 Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("✅ Pushing to state:", message.data);
      console.log("📨 Received message:", message);

      // Expecting: { event: "order_created", data: { name, phone, address, cart, ... } }
      if (message.event === "order_created") {
        setOrders((prevOrders) => [...prevOrders, message.data]);
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    return () => socket.close(); // Clean up WebSocket on unmount
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">📦 Live Order Tracker</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex flex-col gap-1 border border-gray-300"
            >
              <p><strong>Customer:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Items:</strong>{" "}
                {order.cart?.map((item) => `${item.name} x${item.qty}`).join(", ")}
              </p>
              <p><strong>Status:</strong> Pending ⏳</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderTracker;
// This component connects to a WebSocket server to receive live order updates.