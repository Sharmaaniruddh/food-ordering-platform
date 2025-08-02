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
      console.log("📨 Received message:", message);

      if (message.event === "order_created") {
        const newOrder = { ...message.data, status: "Pending" };
        setOrders((prevOrders) => [...prevOrders, newOrder]);
      }

      if (message.event === "order_updated") {
        const updated = message.data;
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.timestamp === updated.timestamp
              ? { ...order, status: updated.status }
              : order
          )
        );
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    return () => socket.close(); // cleanup
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h4 className="text-2xl font-bold mb-4">📦 Live Order Tracker</h4>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow flex flex-col gap-1 border ${
                order.status === "Prepared"
                  ? "border-green-400 bg-green-50"
                  : order.status === "Rejected"
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300"
              }`}
            >
              <p><strong>Customer:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Items:</strong>{" "}
                {order.cart?.map((item) => `${item.name} x${item.qty}`).join(", ")}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {order.status === "Prepared"
                  ? "✅ Prepared"
                  : order.status === "Rejected"
                  ? "❌ Rejected"
                  : "⏳ Pending"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderTracker;
