import { useEffect, useState } from "react";

function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5001");

    socket.onopen = () => console.log("👨‍🍳 Kitchen WebSocket connected");

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.event === "order_created") {
        const order = { ...message.data, status: "Pending" };
        setOrders((prev) => [...prev, order]);
      }

      if (message.event === "order_updated") {
        const updated = message.data;
        setOrders((prev) =>
          prev.map((o) =>
            o.timestamp === updated.timestamp ? { ...o, status: updated.status } : o
          )
        );
      }
    };

    socket.onclose = () => console.log("❌ Kitchen WebSocket disconnected");

    return () => socket.close();
  }, []);

  const sendStatusUpdate = (order, newStatus) => {
    const socket = new WebSocket("ws://localhost:5001");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          event: "order_updated",
          data: { ...order, status: newStatus }
        })
      );
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h4 className="text-3xl font-bold mb-6 text-gray-800">👨‍🍳 Kitchen Dashboard</h4>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders received yet...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg border-2 ${
                order.status === "Prepared" ? "border-green-500 bg-green-50" :
                order.status === "Rejected" ? "border-red-500 bg-red-50" :
                "border-yellow-400 bg-white"
              }`}
            >
              <h4 className="font-semibold text-lg mb-2">👤 {order.name}</h4>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Items:</strong> {order.cart?.map(item => `${item.name} x${item.qty}`).join(", ")}</p>
              <p><strong>Status:</strong> {order.status}</p>

              {order.status === "Pending" && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => sendStatusUpdate(order, "Prepared")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    ✅ Mark Prepared
                  </button>
                  <button
                    onClick={() => sendStatusUpdate(order, "Rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Kitchen;
