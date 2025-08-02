// 📁 backend/wsServer.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5001 });
console.log("🟢 WebSocket server running on ws://localhost:5001");

let clients = [];

wss.on("connection", (ws) => {
  console.log("🧩 New client connected via WebSocket");
  clients.push(ws);

  ws.on("message", (data) => {
    const message = JSON.parse(data);

    if (message.event === "order_updated") {
      console.log("🔁 Order status updated:", message.data.status);
      broadcastOrder("order_updated", message.data);
    }
  });

  ws.on("close", () => {
    console.log("🔌 Client disconnected");
    clients = clients.filter((client) => client !== ws);
  });
});

function broadcastOrder(event, data) {
  const payload = JSON.stringify({ event, data });

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

module.exports = { broadcastOrder };
